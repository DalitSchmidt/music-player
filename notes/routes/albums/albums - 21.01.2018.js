const express = require('express')
const router = express.Router()
const models = require('../models')
const AlbumModel = models.Album
const SongModel = models.Song
const GenresController = require('../controllers/GenresController')
const GenreModel = models.Genre
const AlbumsToGenresModel = models.AlbumToGenres

router.get('/', function ( req, res ) {
    AlbumModel.findAll({
        attributes: { exclude: ['album_description'] },
        order: [
            ['album_id']
        ]
    }).then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

router.get('/search/:term', function( req, res ) {
    let term = req.params.term

    AlbumModel.findAndCountAll({
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.count )
            res.sendStatus(204)
        else
            res.json({ count: results.count, albums: results.rows })
    })
})

router.get('/suggestions/:term', function( req, res ) {
    let term = req.params.term

    AlbumModel.findAll({
        attributes: {
            exclude: ['album_artist', 'album_description', 'album_year', 'album_image']
        },
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.length )
            res.sendStatus(204)
        else
            res.json({ results })
    })
})

router.get('/:album_id', function ( req, res ) {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.SELECT}),
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id} ORDER BY song_id`, {type: models.sequelize.QueryTypes.SELECT}),
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, {type: models.sequelize.QueryTypes.SELECT})
    ).spread(( album, songs, genres ) => {
        if ( album.length ) {
            let results = album[0]
            results.songs = songs
            results.genres = genres
            res.json( results )
        } else
            res.sendStatus(404)
    })
})

router.post('/', function ( req, res ) {
    let album = req.body
    let songs = album.songs

    if ( !Array.isArray( songs ) )
        res.status(422).json({ err: 'No Songs!' })

    if ( !album.genres.length )
        res.status(422).json({err: 'No Genres!'})

    let new_genres = GenresController.getNewGenres( album.genres )
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

        // Create the songs in the DB and link theme to the album
        AlbumModel.create( album )
            .then(function ( result ) {
                let album_id = result.album_id

                GenreModel.bulkCreate( new_genres,  { returning: true } ).then(
                    results => {
                        let new_genres_ids = results.map( genre => genre.genre_id )
                        let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map( genre_id => {
                            return { genre_id, album_id }
                        })
                        AlbumsToGenresModel.bulkCreate( album_genres_ids ).then(
                            () => {
                                songs = songs.map(song => {
                                    song.album_id = album_id
                                    return song
                                })

                                SongModel.bulkCreate( songs ).then(
                                    res.status(201).json({ result })
                                )
                            }
                        )
                    }
                )
            }).catch(function ( err ) {
                let errors = err.errors[0]

                res.status(422).json({
                    error: 'Unable to create album',
                    reason: {
                        message: errors.message,
                        error: `${errors.path} '${errors.value}' already exists`
                    }
                })

            throw new Error()
        })

    //
    // AlbumModel.create( album ).then(result => {
    //     let album_id = result.album_id
    //     let genres = album.genres
    //     songs = songs.map( song => {
    //         song.album_id = album_id
    //         return song
    //     })
    //
    //     // Create the songs in the DB and link theme to the album
    //     SongModel.bulkCreate( songs ).then( () => {
    //         res.status(201).json({ album_id })
    //     }).catch(err => {
    //         res.status(422).json({ err })
    //     })
    //     // SongModel.save().then( () => {
    //
    //     // let query = []
    //     //
    //     // genres.forEach( id => query.push(`(${album_id}, ${id})`) )
    //     // models.sequelize.query('INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', '))
    //
    //     //     res.status(201).json({ album_id })
    //     //
    //     // }).catch(err => {
    //     //     throw new Error( err )
    //     // })
    // }).catch( err => {
    //     res.status(422).json({ err })
    //     let errors = err.errors[0]
    //
    //     res.status(422).json({
    //         error: 'Unable to create album',
    //         reason: {
    //             message: errors.message,
    //             error: `${errors.path} '${errors.value}' already exists`
    //         }
    //     })
    // })
})

router.put('/:album_id', ( req, res ) => {
    let album = req.body
    let album_id = req.params.album_id

    if ( !Array.isArray( album.songs ) )
        res.status(422).json({ err: 'No Songs!' })

    if ( !album.genres.length )
        res.status(422).json({err: 'No Genres!'})

    let new_genres = GenresController.getNewGenres( album.genres )
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    AlbumModel.update( album, {
        where: { album_id: album_id }
    }).then( () => {
        GenreModel.bulkCreate( new_genres,  { returning: true } ).then(
            results => {
                let new_genres_ids = results.map( genre => genre.genre_id )
                let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map( genre_id => {
                    return { genre_id, album_id }
                })
                AlbumsToGenresModel.destroy({
                    where: {
                        album_id: album_id
                    }
                }).then( () => {
                    AlbumsToGenresModel.bulkCreate( album_genres_ids ).then(
                        () => {
                            SongModel.destroy({
                                where: {
                                    album_id: album_id
                                }
                            }).then( () => {
                                let songs = album.songs.map(song => {
                                    song.album_id = album_id
                                    return song
                                })
                                SongModel.bulkCreate( songs ).then(
                                    results => {
                                        res.json( results )
                                    }
                                )
                            })
                        }
                    )
                })
            }
        )
    })
})

router.delete('/:album_id', ( req, res ) => {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`DELETE FROM albums WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
        models.sequelize.query(`DELETE FROM songs WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
        models.sequelize.query(`DELETE FROM albums_to_genres WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE})
    ).spread( affected_rows => {
        if ( affected_rows === 0 )
            res.json( {message: `Album id ${album_id} not found`} )
        else
            res.json( {album_id} )
    })
})

module.exports = router