const express = require('express')
const router = express.Router()
const request = require('request')
require('dotenv').config()

router.get('/:youtube_id', function ( req, res ) {
    let youtube_id = req.params.youtube_id

    if ( youtube_id.length < 8 || youtube_id.length > 14 )
        res.status(422).json({ error: 'Youtube ID is out of bounds [8-14]' })

    else {
        request('https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id, ( error, response, body ) => {
            if ( response.statusCode === 200 ) {
                let video = {}
                let data = JSON.parse( body )
                video.title = data.title

                    request(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${process.env.YOUTUBE_API_KEY}`, ( error, response, body ) => {
                    data = JSON.parse( body )
                    // video.duration = data.items[0].contentDetails.duration.split('PT')[1]
                    //  video.duration = /(?<=PT)(.*)(?=M)/.exec(data.items[0].contentDetails.duration)

                    let minutes = parseInt(/\d+(?=M)/.exec( data.items[0].contentDetails.duration)[0] ) * 60
                    let seconds = parseInt(/\d+(?=S)/.exec( data.items[0].contentDetails.duration)[0] )

                    video.duration = minutes + seconds
                        res.json( video )
                })
            } else
                res.status(404).json({ error: 'Youtube ID is incorrect' })
        })
    }
})

module.exports = router