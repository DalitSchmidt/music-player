process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
chai.use( chaiHttp )

describe('Albums REST API', () => {
    describe('GET /albums', () => {
        it('Should find All the albums and return id, name, artist, image and year of the album', done => {
            chai.request( server ).get('/api/albums').end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].should.have.property('album_id')
                res.body[1].should.have.property('album_name')
                res.body[2].should.have.property('album_artist')
                res.body[3].should.have.property('album_image')
                // res.body[4].should.have.property('album_year')
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
            chai.request(server).get('/api/albums/0').end(( err, res ) => {
                res.should.have.status(404)
                done()
            })
        })
    })

    // describe('POST /albums', () => {
    //     it('Should create new album', done => {
    //         chai.request(server).post('/api/albums').set('Content-Type', 'application/json').send(JSON.stringify({
    //             album_name: 'Californication',
    //             album_artist: 'Red Hot Chili Peppers',
    //             album_image: 'https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg',
    //             album_year: '1999',
    //             album_description: `Californication is the seventh studio album by American rock band Red Hot Chili Peppers. It was released on June 8, 1999, on Warner Bros. Records and was produced by Rick Rubin. Californication marked the return of John Frusciante, who had previously appeared on Mother's Milk and Blood Sugar Sex Magik, to replace Dave Navarro as the band's guitarist. Frusciante's return was credited with changing the band's sound altogether, producing a notable shift in style from the music recorded with Navarro. The album's subject material incorporated various sexual innuendos commonly associated with the band, but also contained more varied themes than previous outings, including lust, death, contemplations of suicide, California, drugs, globalization, and travel. Californication is the Chili Peppers' most commercially successful studio release internationally, with over 15 million copies sold worldwide, and more than 6 million in the United States alone. As of 2002, the album had sold over 4 million copies in Europe. The record produced several hits for the band, including "Otherside", "Californication" and the Grammy Award-winning "Scar Tissue". Californication peaked at number three on the U.S. Billboard 200. The record marked a significant change in style for the band: Rolling Stone's Greg Tate noted that "while all previous Chili Peppers projects have been highly spirited, Californication dares to be spiritual and epiphanic". Another critic, Billboard's Paul Verna, mentioned that the album brought out "the group's softer, melodic side," as opposed to their previous six albums.`,
    //             songs: [
    //                 {
    //                     song_id: 340,
    //                     song_name: 'Around The World',
    //                     song_time: 239,
    //                     song_youtube: 'uaRM4sG8q64',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 341,
    //                     song_name: 'Parallel Universe',
    //                     song_time: 270,
    //                     song_youtube: 'vsfMDtJuS6M',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 342,
    //                     song_name: 'Scar Tissue',
    //                     song_time: 217,
    //                     song_youtube: 'TyPT1l5sRLM',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 343,
    //                     song_name: 'Otherside',
    //                     song_time: 256,
    //                     song_youtube: 'YcflAMbpJiM',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 344,
    //                     song_name: 'Get On Top',
    //                     song_time: 199,
    //                     song_youtube: '1-AX5Klx974',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 345,
    //                     song_name: 'Californication',
    //                     song_time: 330,
    //                     song_youtube: 'uf0CvfyuJDU',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 346,
    //                     song_name: 'Easily',
    //                     song_time: 232,
    //                     song_youtube: 'srfAkxwljuw',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 347,
    //                     song_name: 'Porcelain',
    //                     song_time: 164,
    //                     song_youtube: 'n0iEZaI-kGE',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 348,
    //                     song_name: 'Emit Remmus',
    //                     song_time: 241,
    //                     song_youtube: 'bh1oKhG-9ws',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 349,
    //                     song_name: 'I Like Dirt',
    //                     song_time: 158,
    //                     song_youtube: '1KRzHX0LGDE',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 350,
    //                     song_name: 'This Velvet Glove',
    //                     song_time: 226,
    //                     song_youtube: 'sl5WrP7EGS8',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 351,
    //                     song_name: 'Savior',
    //                     song_time: 293,
    //                     song_youtube: 'MqMTChc6S2I',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 352,
    //                     song_name: 'Purple Stain',
    //                     song_time: 254,
    //                     song_youtube: 'oAVn1I9txRg',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 353,
    //                     song_name: 'Right On Time',
    //                     song_time: 113,
    //                     song_youtube: 'ukO_WBNH0iI',
    //                     album_id: 762
    //                 },
    //                 {
    //                     song_id: 354,
    //                     song_name: 'Road Trippin'',
    //                     song_time: 206,
    //                     song_youtube: 'hU3KFtAlsI0',
    //                     album_id: 762
    //                 }
    //             ],
    //             genres: [
    //                 {
    //                     genre_id: 23,
    //                     genre_slug: 'alternative-rock',
    //                     genre_name: 'Alternative Rock'
    //                 },
    //                 {
    //                     genre_id: 750,
    //                     genre_slug: 'funk-rock',
    //                     genre_name: 'Funk Rock'
    //                 }
    //             ]
    //         })).end((err, res) => {
    //             res.should.have.status(500)
    //             res.body.album_id.should.be.a('number')
    //             done()
    //         })
    //     })
    // })
    //
    // it('Should response with 422 because of validation errors', ( done ) => {
    //     chai.request( server )
    //         .post('/albums')
    //         .send({
    //             album_name: 'AM',
    //             album_artist: 'Arctic Monkeys',
    //             album_image: 'https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png',
    //             album_year: '2013',
    //             album_description: 'AM is the fifth studio album by English indie rock band Arctic Monkeys. It was produced by James Ford and co-produced by Ross Orton at Sage & Sound Recording in Los Angeles and Rancho De La Luna in Joshua Tree, California, and released in September 2013 through Domino. The album was promoted by the singles "R U Mine?", "Do I Wanna Know?", "Why\\\'d You Only Call Me When You\\\'re High?", "One for the Road", "Arabella", and "Snap Out of It". It features guest appearances by Josh Homme, Bill Ryder-Jones, and Pete Thomas.\\n\' +\n' +
    //             '                    \'\\n\' +\n' +
    //             '                    \'The album received critical acclaim from music critics and featured in many year-end lists as one of the best of 2013. It was nominated for the 2013 Mercury Prize for best album, hailed the Best Album of 2013 by NME magazine, and featured at number 449 on NME\\\'s list of the 500 Greatest Albums of All Time. Commercially, AM has become one of Arctic Monkeys\\\' most successful albums to date, topping charts in several countries, and reaching top ten positions in many more. In the United Kingdom, Arctic Monkeys broke a record with AM, becoming the first independent-label band to debut at number one in the UK with their first five albums. The album is also considered the band\\\'s breakthrough in America. The single "Do I Wanna Know?" was the first song by the band to enter the Billboard Hot 100.\\n\' +\n' +
    //             '                    \'\\n\' +\n' +
    //             '                    \'AM has been recognised as one of the bestselling vinyl albums of the decade, selling 27,000 units.',
    //
    //             songs: [
    //                 {
    //                     song_id: 25,
    //                     song_name: 'Do I Wanna Know?',
    //                     song_time: 273,
    //                     song_youtube: '9xE0x05Xuuk',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 26,
    //                     song_name: 'R U Mine?',
    //                     song_time: 201,
    //                     song_youtube: 'mULMm59PzFA',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 27,
    //                     song_name: 'One for the Road',
    //                     song_time: 207,
    //                     song_youtube: 'ZkkqIA4R4hI',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 28,
    //                     song_name: 'Arabella',
    //                     song_time: 210,
    //                     song_youtube: 'W5EKTvW2Atg',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 29,
    //                     song_name: 'I Want It All',
    //                     song_time: 185,
    //                     song_youtube: 'CPBX89Rq688',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 30,
    //                     song_name: 'No.1 Party Anthem',
    //                     song_time: 245,
    //                     song_youtube: 'pDYlWAf-ekk',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 31,
    //                     song_name: 'Mad Sounds',
    //                     song_time: 216,
    //                     song_youtube: 'iP9zhCA9AfQ',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 32,
    //                     song_name: 'Fireside',
    //                     song_time: 182,
    //                     song_youtube: 'pLdfn_1KUzE',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 33,
    //                     song_name: 'Why'd You Only Call Me When You're High?',
    //                     song_time: 163,
    //                     song_youtube: 'C8zDfF2sT6w',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 34,
    //                     song_name: 'Snap Out of It',
    //                     song_time: 194,
    //                     song_youtube: '4ZWOnok69Mw',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 35,
    //                     song_name: 'Knee Cocks',
    //                     song_time: 258,
    //                     song_youtube: '4zA8U0aKtaQ',
    //                     album_id: 3
    //                 },
    //                 {
    //                     song_id: 36,
    //                     song_name: 'I Wanna Be Yours',
    //                     song_time: 185,
    //                     song_youtube: '1r3kEcCJo9g',
    //                     album_id: 3
    //                 }
    //             ],
    //             genres: [
    //                 {
    //                     genre_id: 364,
    //                     genre_slug: 'indie-rock',
    //                     genre_name: 'Indie Rock'
    //                 },
    //                 {
    //                     genre_id: 330,
    //                     genre_slug: 'hard-rock',
    //                     genre_name: 'Hard Rock'
    //                 },
    //                 {
    //                     genre_id: 580,
    //                     genre_slug: 'psychedelic-rock',
    //                     genre_name: 'Psychedelic Rock'
    //                 }
    //             ]
    //         })
    //         .end(( err, res ) => {
    //
    //             // res.should.be.json
    //             // res.body.should.be.a('object')
    //             // res.body.should.have.property('SUCCESS')
    //             // res.body.SUCCESS.should.be.a('object');
    //             // res.body.SUCCESS.should.have.property('name');
    //             // res.body.SUCCESS.should.have.property('lastName');
    //             // res.body.SUCCESS.should.have.property('_id');
    //             // res.body.SUCCESS.name.should.equal('Java');
    //             // res.body.SUCCESS.lastName.should.equal('Script');
    //             // done();
    //
    //             res.body.album_name.should.be.equals('AM')
    //             res.body.album_artist.should.be.equals('Arctic Monkeys')
    //             res.body.album_image.should.be.equals('https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png')
    //             res.body.album_year.should.be.equals('2013')
    //             res.body.album_description.should.be.equals('AM is the fifth studio album by English indie rock band Arctic Monkeys. It was produced by James Ford and co-produced by Ross Orton at Sage & Sound Recording in Los Angeles and Rancho De La Luna in Joshua Tree, California, and released in September 2013 through Domino. The album was promoted by the singles "R U Mine?", "Do I Wanna Know?", "Why\'d You Only Call Me When You\'re High?", "One for the Road", "Arabella", and "Snap Out of It". It features guest appearances by Josh Homme, Bill Ryder-Jones, and Pete Thomas.\n' +
    //                 '\n' +
    //                 'The album received critical acclaim from music critics and featured in many year-end lists as one of the best of 2013. It was nominated for the 2013 Mercury Prize for best album, hailed the Best Album of 2013 by NME magazine, and featured at number 449 on NME\'s list of the 500 Greatest Albums of All Time. Commercially, AM has become one of Arctic Monkeys\' most successful albums to date, topping charts in several countries, and reaching top ten positions in many more. In the United Kingdom, Arctic Monkeys broke a record with AM, becoming the first independent-label band to debut at number one in the UK with their first five albums. The album is also considered the band\'s breakthrough in America. The single "Do I Wanna Know?" was the first song by the band to enter the Billboard Hot 100.\n' +
    //                 '\n' +
    //                 'AM has been recognised as one of the bestselling vinyl albums of the decade, selling 27,000 units.')
    //             res.body.songs.should.be.a('array')
    //             res.body.songs[0].should.have.property('song_id')
    //             res.body.songs[1].should.have.property('song_name')
    //             res.body.songs[2].should.have.property('song_time')
    //             res.body.songs[3].should.have.property('song_youtube')
    //             res.body.songs[4].should.have.property('album_id')
    //             res.body.genres.should.be.a('array')
    //             res.body.genres[0].should.have.property('genre_id')
    //             res.body.genres[1].should.have.property('genre_slug')
    //             res.body.genres[2].should.have.property('genre_name')
    //             res.should.have.status(422)
    //             done()
    //         })
    // })
    //
    // describe('PUT /albums/:album_id', () => {
    //     it('Should update a single album', done => {
    //         chai.request(server)
    //             .get('/albums')
    //             .end( () => {
    //                 chai.request(server)
    //                     .put('/albums/3')
    //                     .send({'album_name': 'AM - Test'})
    //                     .end( (err, res) => {
    //                         res.should.have.status(200)
    //                         res.body.should.be.a('object');
    //                         res.body.should.have.property('UPDATED')
    //                         res.body.UPDATED.should.have.property('album_name')
    //                         done()
    //                     })
    //             })
    //     })
    // })
})