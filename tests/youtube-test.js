process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
chai.use( chaiHttp )

describe('YouTube REST API', () => {
    describe('GET /youtube_id', () => {
        it('Should find the movie and return title and duration', done => {
            chai.request( server ).get('/api/youtube/dvgZkm1xWPE').end((err, res) => {
                res.should.have.status(200)
                res.body.title.should.be.equals('Coldplay - Viva La Vida')
                done()
            })
        })

        it('Should not found the movie and return title and duration', done => {
            chai.request(server).get('/api/youtube/W7HFTzCCRYW').end((err, res) => {
                res.should.have.status(404)
                done()
            })
        })
    })
})