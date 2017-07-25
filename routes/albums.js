const models = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    let albums = [
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
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

    let albums = [
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        }
    ]
    res.json(albums)
})

module.exports = router
