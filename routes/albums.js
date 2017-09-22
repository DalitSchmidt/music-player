const express = require('express')
const router = express.Router()
const models = require('../models')
const AlbumModel = models.Album

router.get('/', function(req, res) {
    AlbumModel.findAll({ attributes: { exclude: ['album_description'] } }).then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

router.get('/:album_id', function( req, res ) {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.SELECT }),
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.SELECT }),
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, { type: models.sequelize.QueryTypes.SELECT })
    ).spread(( album, songs, genres ) => {
        let results = album[0]
        results.songs = songs
        results.genres = genres
        res.json(results)
    })
})

router.post('/', function( req, res ) {
    let album = req.body

    AlbumModel.create( album ).then(result => {
            let album_id = result.album_id
            let genres = album.genres, query = []

            genres.forEach(id => query.push(`(${album_id}, ${id})`))
            models.sequelize.query('INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', '))

            res.status(201).json({ album_id })
        })
        .catch(err => {
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

/*
router.delete('/:album_id', ( req, res ) => {
    let album_id = req.params.album_id

    models.sequelize.Promise.join(
        models.sequelize.query(`DELETE * FROM albums WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.DELETE }),
        models.sequelize.query(`DELETE * FROM songs WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.DELETE }),
        models.sequelize.query(`DELETE * FROM albums_to_genres WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.DELETE }),
    ).spread(affected_rows => {
        if ( affected_rows === 0 )
            res.json({ message: `Album id ${album_id} not found` })
        else
            res.json({ album_id })
   })
})
*/

module.exports = router