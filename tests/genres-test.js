process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
chai.use( chaiHttp )

describe('Genres REST API', () => {
    describe('GET /genres', () => {
        it('Should find All the genres and return id, slug and name', done => {
            chai.request( server ).get('/api/genres/').end(( err, res ) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].should.have.property('genre_id')
                res.body[1].should.have.property('genre_slug')
                res.body[2].should.have.property('genre_name')
                done()
            })
        })
    })

    describe('GET /genres/:genre_id', () => {
        it('Should find the genre and return id, slug and name', done => {
            chai.request( server ).get('/api/genres/610').end(( err, res ) => {
                res.should.have.status(200)
                res.body.genre_slug.should.be.equals('rhythm-and-blues')
                res.body.genre_name.should.be.equals('Rhythm and Blues')
                done()
            })
        })

        it('Should not found the genre', done => {
            chai.request(server).get('/api/genres/0').end(( err, res ) => {
                res.should.have.status(204)
                done()
            })
        })
    })

    describe('POST /genres', () => {
        it('Should create a new genre', done => {
            chai.request(server).
            post('/api/genres').
            set('Content-Type', 'application/json').
            send(JSON.stringify({
                genre_slug: 'genre-test',
                genre_name: 'Genre Test'
            })).
            end((err, res) => {
                res.should.have.status(201)
                res.body.genre_id.should.be.a('number')
                done()
            })
        })

        // it('Should response with 422 because of validation errors', done => {
        //     chai.request(server).
        //     post('/api/genres').
        //     set('Content-Type', 'application/json').
        //     send(JSON.stringify({
        //         genre_slug: 'pop-rock',
        //         genre_name: 'Pop Rock'
        //     })).
        //     end((err, res) => {
        //         res.should.have.status(422)
        //         done()
        //     })
        // })
    })
})