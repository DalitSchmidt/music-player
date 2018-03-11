const express = require('express')
const router = express.Router()
const models = require('../models')
const AlbumModel = models.Album
const GenreModel = models.Genre
const AlbumToGenresModel = models.AlbumToGenres
const SongModel = models.Song
const AlbumsController = require('../controllers/AlbumsController')
const GenresController = require('../controllers/GenresController')

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

router.get('/:album_id', function ( req, res ) {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.SELECT }),
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id} ORDER BY song_id`, { type: models.sequelize.QueryTypes.SELECT }),
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, { type: models.sequelize.QueryTypes.SELECT })
    ).spread(( album, songs, genres ) => {
        if ( album.length ) {
            let result = album[0]
            result.songs = songs
            result.genres = genres
            res.json( result )
        } else
            res.status(404).send()
    })
})

router.get('/search/:term', function ( req, res ) {
    let term = req.params.term

    AlbumModel.findAndCountAll({
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.count )
            res.status(204).send()
        else
            res.json({ count: results.count, albums: results.rows })
    })
})

router.get('/suggestions/:term', function ( req, res ) {
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
            res.status(204).send()
        else
            res.json({ results })
    })
})

router.get('/suggestions/artist/:term', function ( req, res ) {
    let term = req.params.term

    AlbumModel.findAll({
        attributes: ['album_artist'],
        group: ['album_artist'],
        where: {
            album_artist: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.length )
            res.status(204).send()
        else {
            results = results.map( artist => artist.album_artist )
            res.json({ results })
        }
    })
})

router.post('/', function ( req, res ) {
    let album = req.body
    let songs = album.songs
    let album_id = false
    let new_genres = GenresController.getNewGenres( album.genres )
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    if ( !Array.isArray( songs ) )
        res.status(422).json({ err: 'No Songs!' })

    if ( !album.genres.length )
        res.status(422).json({ err: 'No Genres!' })

    // Create the songs in the DB and link theme to the album
    AlbumModel.create( album )
        .then(result => {
            album_id = result.album_id

            return album_id
        })
        .then(album_id => {
            songs = songs.map(song => {
                song.album_id = album_id

                return song
            })

            return SongModel.bulkCreate( songs )
        })
        .then(() => {
            return GenreModel.bulkCreate( new_genres,  { returning: true } )
        })
        .then(genre_results => {
            let new_genres_ids = genre_results.map(genre => genre.genre_id)
            let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                return { genre_id, album_id }
            })

            return AlbumToGenresModel.bulkCreate( album_genres_ids )
        })
        .then(result => {
            res.status(201).json({ result })
        })
        .catch(err => {
            if ( album_id ) {
                AlbumsController.deleteAlbum( album_id ).spread(affected_rows => {
                    if ( affected_rows === 0 )
                        res.json({ message: `Album id ${album_id} not found` })
                    else {
                        let errors = err.errors[0]

                        res.status(422).json({
                            error: 'Unable to create album',
                            reason: {
                                message: errors.message,
                                error: `${errors.path} '${errors.value}' already exists`
                            }
                        })
                    }
                })

                return
            }

            let errors = err.errors[0]

            res.status(422).json({
                error: 'Unable to create album',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })
    })
})

router.put('/:album_id', function ( req, res ) {
    let album = req.body
    let album_id = req.params.album_id
    let new_genres = GenresController.getNewGenres( album.genres )
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    if ( !Array.isArray( album.songs ) )
        res.status(422).json({ err: 'No Songs!' })

    if ( !album.genres.length )
        res.status(422).json({ err: 'No Genres!' })

    AlbumModel.update( album, {
        where: { album_id: album_id }
    }).then(() => {
        GenreModel.bulkCreate( new_genres,  { returning: true } ).then(
            results => {
                let new_genres_ids = results.map(genre => genre.genre_id)
                let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                    return { genre_id, album_id }
                })
                AlbumToGenresModel.destroy({
                    where: {
                        album_id: album_id
                    }
                }).then(() => {
                    AlbumToGenresModel.bulkCreate( album_genres_ids ).then(
                        () => {
                            SongModel.destroy({
                                where: {
                                    album_id: album_id
                                }
                            }).then(() => {
                                let songs = album.songs.map(song => {
                                    song.album_id = album_id
                                    return song
                                })
                                SongModel.bulkCreate( songs ).then(
                                    result => {
                                        res.json( result )
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

router.delete('/:album_id', function ( req, res ) {
    let album_id = req.params.album_id

    AlbumsController.deleteAlbum( album_id ).spread(affected_rows => {
        if ( affected_rows === 0 )
            res.json({ message: `Album id ${album_id} not found` })
        else
            res.json({ album_id })
    })
})

module.exports = router