// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API לאלבומים
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express (המכיל את כל היכולות של המודול express) ושבאמצעותה אנו יכולים לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה models מכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')
// המשתנה AlbumModel מכיל את המודל של Album המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const AlbumModel = models.Album
// המשתנה SongModel מכיל את המודל של Song המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const SongModel = models.Song

// ביצוע בקשת get המביאה את כל האלבומים, ובכך למעשה אנו מביאים את כל הנתונים הקשורים לאלבומים
router.get('/', function ( req, res ) {
    // בבקשה אנחנו מוצאים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_description ואת התשובות המתקבלות אנו מסדרים לפי ה- attributes בשם album_id, ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות ונבדוק שאם כמות התוצאות היא 0, נשלח הודעת סטטוס עם הקוד 204 (No Content) האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר כמות התוצאות שקיבלנו היא לא 0, נקבל תשובת json עם התוצאות
    AlbumModel.findAll({
        attributes: { exclude: ['album_description'] },
        order: [
            ['album_id']
        ]
    }).then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

// ביצוע בקשת get לנתיב של החיפוש, ובכך למעשה אנו מביאים את כל הנתונים שהתקבלו בעת ביצוע החיפוש
router.get('/search/:term', function( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתבצע החיפוש
    let term = req.params.term

    // בבקשה אנחנו מחפשים וסופרים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) איפה שמצויים הנתונים של השדה album_name בהתאם לנתונים שמצויים במשתנה term (המכיל את הנתונים שהוזנו ושלגביהם מתבצע החיפוש), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות ונבדוק שאם אין תוצאות, נשלח הודעת סטטוס עם הקוד 204 (No Content), האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר יש תוצאות נשלח תשובת json הסוכמת את התוצאות ואת השורות של התוצאות המכילות את תוצאות החיפוש
    AlbumModel.findAndCountAll({
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.count )
            res.sendStatus(204)
        else
            res.json({
                count: results.count,
                albums: results.rows
            })
    })
})

// ביצוע בקשת get לנתיב של ההצעות האפשריות לתוצאות החיפוש, ובכך למעשה אנו מביאים את כל הנתונים של ההצעות האפשריות לתוצאות החיפוש
router.get('/suggestions/:term', function( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש
    let term = req.params.term

    // בבקשה אנחנו מחפשים את כל המידע הקייםם במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_artist, album_description, album_year ו- album_image, איפה שמצויים הנתונים של השדה album_name בהתאם לנתונים שמצויים במשתנה term (המכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות, כך שאם אין תווים במשתנה results והוא לא מכיל תוצאות, אז נשלח הודעת סטטוס עם הקוד 204 (No Content), האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר יש תווים במשתנה results והוא מכיל תוצאות, נשלח תשובת json עם התוצאות
    AlbumModel.findAll({
        attributes: {
            exclude: ['album_artist', 'album_description', 'album_year', 'album_image']
        },
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    }).then(results => {
        if ( !results.length )
            res.sendStatus(204)
        else
            res.json({ results })
    })
})

// ביצוע בקשת get לפי המספר id של האלבום, ובכך למעשה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
router.get('/:album_id', function ( req, res ) {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

    // מאחר ואנו רוצים להביא את כל הנתונים הקשורים לאלבום ספציפי הכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו, אנו צריכים לחבר מספר שאילתות המביאות את כל הנתונים הקשורים לאלבום ומצויים בטבלאות השונות
    models.sequelize.Promise.join(
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של האלבומים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, {type: models.sequelize.QueryTypes.SELECT}),
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של השירים בהתאם למספר id של האלבום שאת התוצאות המתקבלות מהשאילתא אנו מסדרים לפי השדה של song_id והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id} ORDER BY song_id`, {type: models.sequelize.QueryTypes.SELECT}),
        // מאחר ואנו רוצים להביא את כל הנתונים של הז'אנרים הקשורים לאלבום בהתאם למספר id של האלבום מהטבלה המקשרת (שהיא במקרה זה 'albums_to_genres') אנו צריכים להשתמש בשאילתא בתוך שאילתא
        // הגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפים לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, {type: models.sequelize.QueryTypes.SELECT})
    // מאחר ואנו משתמשים ב- sequelize שזהו מודול המבוסס על promise, נפעיל promise המאחד את כל השאילתות ומכיל את כל הנתונים הקשורים לאלבום שהבאנו
    ).spread(( album, songs, genres ) => {
        // המשתנה results מכיל את המשתנה album שהאינדקס שלו במערך הוא 0
        let results = album[0]
        // המשתנה songs שמצוי תחת המשתנה results מכיל את השירים של האלבום
        results.songs = songs
        // המשתנה genres שמצוי תחת המשתנה results מכיל את הז'אנרים של האלבום
        results.genres = genres
        // שליחת תשובת json המכילה את כל הנתונים המצויים במשתנה results
        res.json( results )
    })
})

// ביצוע בקשת post המאפשרת ליצור אלבום חדש
router.post('/', function ( req, res ) {
    // המשתנה album_id מכיל את המספר id של האלבום שנוצר המצוי תחת המשתנה result
    let album = req.body
    // המשתנה songs מכיל את השירים של האלבום שנוצר המצויים תחת המשתנה album
    let songs = album.songs

    // נבדוק אם המשתנה songs מכיל את השירים של האלבום שנוצר המצויים תחת המשתנה album הוא אכן מערך עם פריטים
    if ( !Array.isArray( songs ) ) {
        // אם לא, אז נשלח הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין שירים במערך, אז תוצג הודעת שגיאה מתאימה
        res.status(422).json({ err: 'No Songs!' })
    }
    // מאחר ואנו רוצים שאם יש שגיאות כלשהן בעת יצירת אלבום חדש, לא יווצר עדין האלבום החדש במסד הנתונים, לכן נשתמש ב- transaction
    return models.sequelize.transaction(function (t) {
        // בבקשה אנחנו יוצרים מידע חדש לפי הסכימה של האלבום המצוי במשתנה AlbumModel (המכיל את המודל של Album שמצוי תחת המשתנה models) ואם יש שגיאות כלשהן באלבום שבעקבותיהן אנו לא מעוניינים שהוא יווצר עדין במסד הנתונים נשתמש ב- transaction
        // Create the songs in the DB and link theme to the album
        return AlbumModel.create(album, {transaction: t})
            // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס של promise, נפעיל promise על התוצאה שקיבלנו
            .then(function (result) {
                // המשתנה album_id מכיל את המספר id של האלבום שנוצר המצוי תחת המשתנה result
                let album_id = result.album_id
                // המשתנה genres מכיל את הז'אנרים של האלבום שנוצר המצויים תחת המשתנה album
                let genres = album.genres
                // המשתנה songs מפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת כל שיר לאלבום שלו לפי המספר id של האלבום ומחזירה את השיר
                songs = songs.map(song => {
                    song.album_id = album_id
                    return song
                })

                // המשתנה SongModel מפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של songs, כך שלמעשה היא מוסיפה את כל השירים לתוך האלבום שיווצר, ואם יש שגיאות כלשהן בשירים שבעקבותיהן אנו לא מעוניינים שהאלבום יווצר עדין במסד הנתונים נשתמש ב- transaction
                return SongModel.bulkCreate(songs, {transaction: t})
            })
        // ומאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על יצירת האלבום, וכך למעשה אנו יוצרים את השירים במסד הנתונים ומקשרים אותם לאלבום הרלוונטי
        }).then(function ( result ) {
            // שליחת הודעת סטטוס עם הקוד 201 (Created) האומרת שהמידע המבוקש נוצר עם תשובת json המכילה את המספר id של האלבום שנוצר
            res.status(201).json({ result })
        // נתפוס את השגיאות במידה וקיבלנו הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר והמספר id של האלבום כבר קיים תוצג הודעת שגיאה מתאימה
        }).catch(function ( err ) {
            let errors = err.errors[0]

            res.status(422).json({
                error: 'Unable to create album',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })

            throw new Error()
        })

    //
    // AlbumModel.create( album ).then(result => {
    //     let album_id = result.album_id
           // המשתנה genres מכיל את הז'אנרים של האלבום שנוצר המצויים תחת המשתנה album
    //     let genres = album.genres
    //     songs = songs.map( song => {
    //         song.album_id = album_id
    //         return song
    //     })
    //
    //     // Create the songs in the DB and link theme to the album
    //     SongModel.bulkCreate( songs ).then( () => {
    //         res.status(201).json({ album_id })
    //     }).catch(err => {
    //         res.status(422).json({ err })
    //     })
    //     // SongModel.save().then( () => {
    //
           // המשתנה query מכיל מערך ריק
    //     // let query = []
    //     //
           // לולאת forEach העוברת על המשתנה genres ומוסיפה למערך של query את המספרי id של האלבום ושל הז'אנרים שנוצרו
    //     // genres.forEach( id => query.push(`(${album_id}, ${id})`) )
           // השאילתא מוסיפה את המספרי id של האלבום ושל הז'אנרים שנוצרו לטבלה של 'albums_to_genres' (שהיא טבלה מקשרת) ומחברת את התוצאות של השאילתא המופרדות באמצעות פסיקים
    //     // models.sequelize.query('INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', '))
    //
    //     //     res.status(201).json({ album_id })
    //     //
    //     // }).catch(err => {
    //     //     throw new Error( err )
    //     // })
    // }).catch( err => {
    //     res.status(422).json({ err })
    //     let errors = err.errors[0]
    //
    //     res.status(422).json({
    //         error: 'Unable to create album',
    //         reason: {
    //             message: errors.message,
    //             error: `${errors.path} '${errors.value}' already exists`
    //         }
    //     })
    // })
})

// ביצוע בקשת delete לפי המספר id של האלבום, ובכך למעשה מתאפשר למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
router.delete('/:album_id', ( req, res ) => {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

    // מאחר ואנו רוצים למחוק את כל הנתונים הקשורים לאלבום ספציפי הכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו, אנו צריכים לחבר מספר שאילתות המוחקות את כל הנתונים הקשורים לאלבום ומצויים בטבלאות השונות
    models.sequelize.Promise.join(
        // השאילתא מוחקת את כל הנתונים המצויים בטבלה של האלבומים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת delete המאפשרת למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
        models.sequelize.query(`DELETE FROM albums WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
        // השאילתא מוחקת את כל הנתונים המצויים בטבלה של השירים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת delete המאפשרת למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
        models.sequelize.query(`DELETE FROM songs WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
        // השאילתא מוחקת את כל הנתונים המצויים בטבלה של 'albums_to_genres' בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת delete המאפשרת למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
        models.sequelize.query(`DELETE FROM albums_to_genres WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE})
    // מאחר ואנו משתמשים ב- sequelize שזהו מודול המבוסס על promise, נפעיל promise המאחד את כל השאילתות ובו נבדוק כמה שורות הושפעו מפעולת המחיקה שבוצעה
    ).spread( affected_rows => {
        // אם התוצאה שקיבלנו היא 0, זאת אומרת שלא הושפעו שורות ונשלח תשובת json המכילה הודעה האומרת שהאלבום עם המספר id שביקשנו למחוק לא קיים
        if ( affected_rows === 0 )
            res.json( {message: `Album id ${album_id} not found`} )
        else
            // אם התוצאה היא אחרת, כלומר 1, כי זה המספר המקסימלי של השורות שיכולות להיות מושפעות מאחר ואנו מבקשים למחוק אלבום ספציפי לפי המספר id שלו ויכול להיות רק אלבום אחד שמכיל את אותו מספר id, אז נשלח תשובת json עם המספר id של האלבום הספציפי שנמחק
            res.json( {album_id} )
    })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router