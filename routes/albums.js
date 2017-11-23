const express = require('express')
const router = express.Router()
const models = require('../models')
const AlbumModel = models.Album

router.get('/', function (req, res) {
    AlbumModel.findAll({ attributes: { exclude: ['album_description'] } }).then(results => {
        if (results.length === 0)
            res.status(204).send()
        else
            res.json( results )
    })
})

router.get('/search/:term', function( req, res ) {
    let term = req.params.term

    AlbumModel.findAndCountAll({ where: { album_name: { $like: `%${term}%` } } }).then(results => {
        if ( !results.count )
            res.sendStatus(204)
        else
            res.json({
                count: results.count,
                albums: results.rows
            })
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

router.get('/:album_id', function (req, res) {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.SELECT}),
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.SELECT}),
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, {type: models.sequelize.QueryTypes.SELECT})
    ).spread((album, songs, genres) => {
        let results = album[0]
        results.songs = songs
        results.genres = genres
        res.json( results )
    })
})

router.post('/', function (req, res) {
    let album = req.body

    AlbumModel.create( album ).then(result => {
        let album_id = result.album_id
        let genres = album.genres
        let songs = album.songs

        // if ( !Array.isArray( songs ) || !Array.isArray( songs ) )
        //     throw error()

        let query = []

        genres.forEach(id => query.push(`(${album_id}, ${id})`))
        models.sequelize.query('INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', '))

        // Create the songs in the DB and link theme to the album

        res.status(201).json({album_id})
    }).catch(err => {
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

router.delete('/:album_id', (req, res) => {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`DELETE * FROM albums WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.DELETE}),
        models.sequelize.query(`DELETE * FROM songs WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.DELETE}),
        models.sequelize.query(`DELETE * FROM albums_to_genres WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.DELETE})
    ).spread(affected_rows => {
        if (affected_rows === 0)
            res.json( {message: `Album id ${album_id} not found`} )
        else
            res.json( {album_id} )
    })
})

module.exports = router