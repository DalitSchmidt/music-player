require('dotenv').config()
const express = require('express')
const router = express.Router()
const request = require('request')
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

router.get('/:youtube_id', ( req, res ) => {
    let youtube_id = req.params.youtube_id

    if ( youtube_id.length < 8 || youtube_id.length > 14 )
        res.status(422).json({ error: 'Youtube code is out of bounds [8-14]' })

    else {
        request('https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id, function( error, response, body ) {
            if ( response.statusCode === 200 ) {
                let video = {}
                let data = JSON.parse( body )
                video.title = data.title

                    request(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${YOUTUBE_API_KEY}`, function( error, response, body ) {
                    data = JSON.parse( body )
                    video.duration = data.items[0].contentDetails.duration.split('PT')[1]

                    res.json( video )
                })
            } else {
                res.status(404).json({ error: 'Youtube code is incorrect' })
            }
        })
    }
})

module.exports = router