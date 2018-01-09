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
                album_name: 'AM',
                album_artist: 'Arctic Monkeys',
                album_image: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png',
                songs: [
                    {
                        song_name: 'Do I Wanna Know?',
                        song_time: '273',
                        song_youtube: '9xE0x05Xuuk'
                    },
                    {
                        song_name: 'R U Mine?',
                        song_time: '201',
                        song_youtube: 'mULMm59PzFA'
                    },
                    {
                        song_name: 'One for the Road',
                        song_time: '207',
                        song_youtube: 'ZkkqIA4R4hI'
                    },
                    {
                        song_name: 'Arabella',
                        song_time: '210',
                        song_youtube: 'W5EKTvW2Atg'
                    },
                    {
                        song_name: 'I Want It All',
                        song_time: '185',
                        song_youtube: 'CPBX89Rq688'
                    },
                    {
                        song_name: 'No 1 Party Anthem',
                        song_time: '245',
                        song_youtube: 'pDYlWAf-ekk'
                    },
                    {
                        song_name: 'Mad Sounds',
                        song_time: '216',
                        song_youtube: 'iP9zhCA9AfQ'
                    },
                    {
                        song_name: 'Fireside',
                        song_time: '182',
                        song_youtube: 'pLdfn_1KUzE'
                    },
                    {
                        song_name: 'Why\'d You Only Call Me When You\'re High?',
                        song_time: '163',
                        song_youtube: 'C8zDfF2sT6w'
                    },
                    {
                        song_name: 'Snap Out of It',
                        song_time: '194',
                        song_youtube: '4ZWOnok69Mw'
                    },
                    {
                        song_name: 'Knee Socks',
                        song_time: '258',
                        song_youtube: '4zA8U0aKtaQ'
                    },
                    {
                        song_name: 'I Wanna Be Yours',
                        song_time: '185',
                        song_youtube: '1r3kEcCJo9g'
                    }
                ],
                genres: [34, 40, 61]
            })).end((err, res) => {
                res.should.have.status(201)
                res.body.album_id.should.be.a('number')
                done()
            })
        })
    })
})