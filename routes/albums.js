const models = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    let albums = [
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://i.ytimg.com/vi/1ybrgGaLtRI/hqdefault.jpg'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://i.ytimg.com/vi/1ybrgGaLtRI/hqdefault.jpg'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://i.ytimg.com/vi/1ybrgGaLtRI/hqdefault.jpg'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://i.ytimg.com/vi/1ybrgGaLtRI/hqdefault.jpg'
        }
    ]

    res.json(albums)
})

router.get('/:album_id', function(req, res) {
    let album_id = req.params.album_id

    let User = models.User
    User.findById( album_id , function( results ) {
        res.json( results )
    })
})

router.post('/', function(req, res) {
    let album = req.body
})

router.get('/search/:term', function(req, res) {
    let term = req.params.term
    let User = models.User
    User.findAll({ where: { album_name: { like: `%${term}%` } } }, function( results ) {
        res.json( results )
    })
})

module.exports = router
