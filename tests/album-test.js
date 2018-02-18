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
                album_image: 'https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png',
                album_year: '2013',
                album_description: "AM is the fifth studio album by English indie rock band Arctic Monkeys. It was produced by James Ford and co-produced by Ross Orton at Sage & Sound Recording in Los Angeles and Rancho De La Luna in Joshua Tree, California, and released in September 2013 through Domino. The album was promoted by the singles \"R U Mine?\", \"Do I Wanna Know?\", \"Why\'d You Only Call Me When You\'re High?\", \"One for the Road\", \"Arabella\", and \"Snap Out of It\". It features guest appearances by Josh Homme, Bill Ryder-Jones, and Pete Thomas. The album received critical acclaim from music critics and featured in many year-end lists as one of the best of 2013. It was nominated for the 2013 Mercury Prize for best album, hailed the Best Album of 2013 by NME magazine, and featured at number 449 on NME\'s list of the 500 Greatest Albums of All Time. Commercially, AM has become one of Arctic Monkeys\' most successful albums to date, topping charts in several countries, and reaching top ten positions in many more. In the United Kingdom, Arctic Monkeys broke a record with AM, becoming the first independent-label band to debut at number one in the UK with their first five albums. The album is also considered the band's breakthrough in America. The single \"Do I Wanna Know?\" was the first song by the band to enter the Billboard Hot 100. AM has been recognised as one of the bestselling vinyl albums of the decade, selling 27,000 units.",
                    songs: [
                        {
                            song_id: 25,
                            song_name: 'Do I Wanna Know?',
                            song_time: 273,
                            song_youtube: '9xE0x05Xuuk',
                            album_id: 3
                        },
                        {
                            song_id: 26,
                            song_name: 'R U Mine?',
                            song_time: 201,
                            song_youtube: 'mULMm59PzFA',
                            album_id: 3
                        },
                        {
                            song_id: 27,
                            song_name: 'One for the Road',
                            song_time: 207,
                            song_youtube: 'ZkkqIA4R4hI',
                            album_id: 3
                        },
                        {
                            song_id: 28,
                            song_name: 'Arabella',
                            song_time: 210,
                            song_youtube: 'W5EKTvW2Atg',
                            album_id: 3
                        },
                        {
                            song_id: 29,
                            song_name: "I Want It All",
                            song_time: 185,
                            song_youtube: "CPBX89Rq688",
                            album_id: 3
                        },
                        {
                            song_id: 30,
                            song_name: 'No.1 Party Anthem',
                            song_time: 245,
                            song_youtube: "pDYlWAf-ekk",
                            album_id: 3
                        },
                        {
                            song_id: 31,
                            song_name: 'Mad Sounds',
                            song_time: 216,
                            song_youtube: 'iP9zhCA9AfQ',
                            album_id: 3
                        },
                        {
                            song_id: 32,
                            song_name: 'Fireside',
                            song_time: 182,
                            song_youtube: 'pLdfn_1KUzE',
                            album_id: 3
                        },
                        {
                            song_id: 33,
                            song_name: 'Why\'d You Only Call Me When You\'re High?',
                            song_time: 163,
                            song_youtube: 'C8zDfF2sT6w',
                            album_id: 3
                        },
                        {
                            song_id: 34,
                            song_name: 'Snap Out of It',
                            song_time: 194,
                            song_youtube: '4ZWOnok69Mw',
                            album_id: 3
                        },
                        {
                            song_id: 35,
                            song_name: 'Knee Cocks',
                            song_time: 258,
                            song_youtube: '4zA8U0aKtaQ',
                            album_id: 3
                        },
                        {
                            song_id: 36,
                            song_name: 'I Wanna Be Yours',
                            song_time: 185,
                            song_youtube: '1r3kEcCJo9g',
                            album_id: 3
                        }
                    ],
                genres: [
                    {
                        genre_id: 364,
                        genre_slug: 'indie-rock',
                        genre_name: 'Indie Rock'
                    },
                    {
                        genre_id: 330,
                        genre_slug: 'hard-rock',
                        genre_name: 'Hard Rock'
                    },
                    {
                        genre_id: 580,
                        genre_slug: 'psychedelic-rock',
                        genre_name: 'Psychedelic Rock'
                    }
                ]
            })).end(( err, res ) => {
                res.should.have.status(201)
                res.body.album_id.should.be.a('number')
                done()
            })
        })
    })
})