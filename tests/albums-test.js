process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
chai.use( chaiHttp )

describe('Albums REST API', () => {
    describe('GET /albums', () => {
        it('Should find All the albums and return id, name, artist, image and year of the album', done => {
            chai.request( server ).get('/api/albums').end(( err, res ) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].should.have.property('album_id')
                res.body[1].should.have.property('album_name')
                res.body[2].should.have.property('album_artist')
                res.body[3].should.have.property('album_image')
                done()
            })
        })
    })

    describe('GET /albums/:album_id', () => {
        it('Should find the album and return id, name, artist, image, year, description, songs and genres of the album', done => {
            chai.request( server ).get('/api/albums/3').end(( err, res ) => {
                res.should.have.status(200)
                res.body.album_name.should.be.equals('AM')
                res.body.album_artist.should.be.equals('Arctic Monkeys')
                res.body.album_image.should.be.equals('https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png')
                res.body.album_year.should.be.equals('2013')
                res.body.album_description.should.be.equals('AM is the fifth studio album by English indie rock band Arctic Monkeys. It was produced by James Ford and co-produced by Ross Orton at Sage & Sound Recording in Los Angeles and Rancho De La Luna in Joshua Tree, California, and released in September 2013 through Domino. The album was promoted by the singles "R U Mine?", "Do I Wanna Know?", "Why\'d You Only Call Me When You\'re High?", "One for the Road", "Arabella", and "Snap Out of It". It features guest appearances by Josh Homme, Bill Ryder-Jones, and Pete Thomas.\n' +
                    '\n' +
                    'The album received critical acclaim from music critics and featured in many year-end lists as one of the best of 2013. It was nominated for the 2013 Mercury Prize for best album, hailed the Best Album of 2013 by NME magazine, and featured at number 449 on NME\'s list of the 500 Greatest Albums of All Time. Commercially, AM has become one of Arctic Monkeys\' most successful albums to date, topping charts in several countries, and reaching top ten positions in many more. In the United Kingdom, Arctic Monkeys broke a record with AM, becoming the first independent-label band to debut at number one in the UK with their first five albums. The album is also considered the band\'s breakthrough in America. The single "Do I Wanna Know?" was the first song by the band to enter the Billboard Hot 100.\n' +
                    '\n' +
                    'AM has been recognised as one of the bestselling vinyl albums of the decade, selling 27,000 units.')
                res.body.songs.should.be.a('array')
                res.body.songs[0].should.have.property('song_id')
                res.body.songs[1].should.have.property('song_name')
                res.body.songs[2].should.have.property('song_time')
                res.body.songs[3].should.have.property('song_youtube')
                res.body.songs[4].should.have.property('album_id')
                res.body.genres.should.be.a('array')
                res.body.genres[0].should.have.property('genre_id')
                res.body.genres[1].should.have.property('genre_slug')
                res.body.genres[2].should.have.property('genre_name')
                done()
            })
        })

        it('Should not found the album', done => {
            chai.request( server ).get('/api/albums/0').end(( err, res ) => {
                res.should.have.status(404)
                done()
            })
        })
    })
})