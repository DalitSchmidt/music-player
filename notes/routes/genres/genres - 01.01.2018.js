const express = require('express')
const router = express.Router()
const models = require('../models')
const GenreModel = models.Genre

router.get('/', function(req, res) {
    GenreModel.findAll().then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

router.get('/:genre_id', function( req, res ) {
    let genre_id = req.params.genre_id

    GenreModel.findById( genre_id ).then(result => {
        if ( result === null )
            res.status(204).send()
        else
            res.json( result )
    })
})

router.get('/suggestions/:term', function( req, res ) {
    let term = req.params.term

    GenreModel.findAll({
        where: {
            genre_name: {
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

router.post('/', function( req, res ) {
    let genre = req.body

    GenreModel.create( genre )
        .then(result => res.status(201).json({ genre_id: result.genre_id }))
        .catch(err => {
            let errors = err.errors[0]
            res.status(422).json({
                error: 'Unable to create genre',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })
        })
})

module.exports = router