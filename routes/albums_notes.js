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

    AlbumModel.findById( album_id ).then(result => {
        if ( result === null )
            res.status(204).send()
        else
            res.json( result )
    })
})

router.post('/', function( req, res ) {
    let album = req.body

    AlbumModel.create( album )
        .then(result => res.status(201).json({ album_id: result.album_id }))
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

router.delete('/:album_id', function( req, res ) {
    let album_id = req.params.album_id

    AlbumModel.destroy({ where: { album_id } }).then(affected_rows => {
        if ( affected_rows === 0 )
            res.json({ message: `Album id ${album_id} not found` })
        else
            res.json({ album_id })
    })
})

module.exports = router