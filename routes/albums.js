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

})

router.post('/', function(req, res) {
    let album = req.body
})

router.get('/search/:term', function(req, res) {
    let term = req.params.term
    let Album = models.Album

    res.json([
        {
            name: 'erg4erg',
            id: 5
        },
        {
            name: 'erg4tg4g',
            id: 6
        }
    ])

})

module.exports = router
