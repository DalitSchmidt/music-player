process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
const db = require('../models')
chai.use(chaiHttp)

describe('YouTube REST API', () => {
    describe('GET /youtube_id', () => {
        it('Should GET youtube_id is valid', done => {
            chai.request(server).get('/api/youtube_id').end((err, res) => {
                res.should.have.status(200)
                res.body.youtube.should.be.a('7wtfhZwyrcc')
                done()
            })
        })

        it('Should GET youtube_id is not valid', done => {
            chai.request(server).get('/api/youtube_id').end((err, res) => {
                res.should.have.status(204)
                res.body.youtube.should.be.a('W7HFTzCCRYW')
                done()
            })
        })
    })
})