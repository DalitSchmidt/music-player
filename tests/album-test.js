process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
chai.use( chaiHttp )

describe('Album REST API', () => {
    describe('POST /api/album', () => {
        it('Should create new album', done => {
            chai.request( server ).post('/api/album').set('Content-Type', 'application/json')
            .send(JSON.stringify({
                album_name: '',
                album_image: '',
                album_artist: '',
                songs: [
                    {
                        name: '',
                        duration: '',
                        youtube: ''
                    },
                    {
                        name: '',
                        duration: '',
                        youtube: ''
                    },
                    {
                        name: '',
                        duration: '',
                        youtube: ''
                    }
                ],
                genres: [65,98,11,52]
            })).end((err, res) => {
                res.should.have.status(201)
                res.body.album_id.should.be.a('number')
                done()
            })
        })
    })
})