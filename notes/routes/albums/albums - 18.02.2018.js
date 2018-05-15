// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API לאלבומים
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express (המכיל את כל היכולות של המודול express) ושבאמצעותה אנו יכולים לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה models מכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')
// המשתנה AlbumModel מכיל את המודל של Album המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const AlbumModel = models.Album
// המשתנה GenreModel מכיל את המודל של Genre המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const GenreModel = models.Genre
// המשתנה AlbumToGenresModel מכיל את המודל של AlbumToGenres המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const AlbumToGenresModel = models.AlbumToGenres
// המשתנה SongModel מכיל את המודל של Song המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const SongModel = models.Song
// המשתנה AlbumsController מכיל את כל היכולות המצויות בקובץ AlbumsController באמצעות חיבור הקובץ
const AlbumsController = require('../controllers/AlbumsController')
// המשתנה GenresController מכיל את כל היכולות המצויות בקובץ GenresController באמצעות חיבור הקובץ
const GenresController = require('../controllers/GenresController')

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

// ביצוע בקשת get לפי המספר id של האלבום, ובכך למעשה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
router.get('/:album_id', function ( req, res ) {
    // ביצוע בקשת get לפי המספר id של האלבום, ובכך למעשה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
    let album_id = req.params.album_id

    // מאחר ואנו רוצים להביא את כל הנתונים הקשורים לאלבום ספציפי הכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו, אנו צריכים לחבר מספר שאילתות המביאות את כל הנתונים הקשורים לאלבום ומצויים בטבלאות השונות
    models.sequelize.Promise.join(
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של האלבומים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.SELECT }),
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של השירים בהתאם למספר id של האלבום שאת התוצאות המתקבלות מהשאילתא אנו מסדרים לפי השדה של song_id והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id} ORDER BY song_id`, { type: models.sequelize.QueryTypes.SELECT }),
        // מאחר ואנו רוצים להביא את כל הנתונים של הז'אנרים הקשורים לאלבום בהתאם למספר id של האלבום מהטבלה המקשרת (שהיא במקרה זה 'albums_to_genres') אנו צריכים להשתמש בשאילתא בתוך שאילתא והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו בנתיב של בקשת get המאפשרת להביא את כל הנתונים הקשורים לאלבום ספציפים לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, { type: models.sequelize.QueryTypes.SELECT })
    // מאחר ואנו משתמשים ב- sequelize שזהו מודול המבוסס על promise, נפעיל promise המאחד את כל השאילתות ומכיל את כל הנתונים הקשורים לאלבום שהבאנו
    ).spread(( album, songs, genres ) => {
        // נבדוק אם יש נתונים במשתנה album, אם כן, אז נכניס את הנתונים למערך ונציג את התוצאות
        if ( album.length ) {
            // המשתנה results מכיל את המשתנה album שהאינדקס שלו במערך הוא 0
            let result = album[0]
            // המשתנה songs שמצוי תחת המשתנה results מכיל את השירים של האלבום
            result.songs = songs
            // המשתנה genres שמצוי תחת המשתנה results מכיל את הז'אנרים של האלבום
            result.genres = genres
            // שליחת תשובת json המכילה את כל הנתונים המצויים במשתנה results
            res.json( result )
        } else
            // אחרת, כלומר אין נתונים במשתנה album וקיימת שגיאה, נשלח הודעה עם הסטטוס קוד שמספרו 404 (Not Found) האומרת שהנתונים המבוקשים לא נמצאים
            res.status(404).send()
    })
})

// ביצוע בקשת get לנתיב של החיפוש, ובכך למעשה אנו מביאים את כל הנתונים שהתקבלו בעת ביצוע החיפוש
router.get('/search/:term', function ( req, res ) {
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
            res.status(204).send()
        else
            res.json({ count: results.count, albums: results.rows })
    })
})

// ביצוע בקשת get לנתיב של ההצעות האפשריות לתוצאות החיפוש, ובכך למעשה אנו מביאים את כל הנתונים של ההצעות האפשריות לתוצאות החיפוש
router.get('/suggestions/:term', function ( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש
    let term = req.params.term

    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_artist, album_description, album_year ו- album_image, איפה שמצויים הנתונים של השדה album_name בהתאם לנתונים שמצויים במשתנה term (המכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות, כך שאם אין תווים במשתנה results והוא לא מכיל תוצאות, אז נשלח הודעת סטטוס עם הקוד 204 (No Content), האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר יש תווים במשתנה results והוא מכיל תוצאות, נשלח תשובת json עם התוצאות
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
            res.status(204).send()
        else
            res.json({ results })
    })
})

// ביצוע בקשת get לנתיב של ההצעות האפשריות לתוצאות החיפוש של שם האמן היוצר את האלבום, ובכך למעשה אנו מביאים את כל הנתונים של ההצעות האפשריות לתוצאות החיפוש של שם האמן היוצר את האלבום ושמור במסד הנתונים
router.get('/suggestions/artist/:term', function ( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש
    let term = req.params.term

    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_year, album_description, album_name ו- album_image, איפה שמצויים הנתונים של השדה album_artist בהתאם לנתונים שמצויים במשתנה term (המכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות לתוצאות החיפוש), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות, כך שאם אין תווים במשתנה results והוא לא מכיל תוצאות, אז נשלח הודעת סטטוס עם הקוד 204 (No Content), האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר יש תווים במשתנה results והוא מכיל תוצאות, נשלח תשובת json עם התוצאות
    AlbumModel.findAll({
        attributes: {
            exclude: ['album_name', 'album_description', 'album_year', 'album_image']
        },
        where: {
            album_artist: {
                $like: `${term}%`
            }
        }
    }).then(results => {
        if ( !results.length )
            res.sendStatus(204)
        else
            res.json({ results })
    })
})

// ביצוע בקשת post המאפשרת ליצור אלבום חדש
router.post('/', function ( req, res ) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body
    // המשתנה songs מכיל את השירים של האלבום שנוצר המצויים תחת המשתנה album
    let songs = album.songs
    // המשתנה album_id מכיל את הערך הבוליאני false
    let album_id = false
    // המשתנה new_genres מכיל את הפונקציה getNewGenres שמקבלת את המשתנה album.genres המכיל את המערך של הז'אנרים המצויים באלבום ומצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    let new_genres = GenresController.getNewGenres( album.genres )
    // המשתנה old_genres_ids מכיל את הפונקציה getExistingGenresIds שמקבלת את המשתנה album.genres המכיל את המערך של הז'אנרים המצויים באלבום ומצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לקבל את המספר הייחודי של הז'אנרים הקיימים
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    // נבדוק אם המשתנה songs מכיל את השירים של האלבום שנוצר המצויים תחת המשתנה album הוא אכן מערך עם פריטים
    if ( !Array.isArray( songs ) )
        // אם לא, אז נשלח הודעת שגיאה מתאימה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין שירים במערך
        res.status(422).json({ err: 'No Songs!' })

    // נבדוק אם לפרופרטי genres המצוי במשתנה album יש ערכים, למעשה אנו בודקים אם יש פריטים במערך של הז'אנרים
    if ( !album.genres.length )
        // אם לא, אז נשלח הודעת שגיאה מתאימה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין ז'אנרים במערך
        res.status(422).json({ err: 'No Genres!' })

    // Create the songs in the DB and link theme to the album
    // בבקשה אנחנו יוצרים אלבום חדש לפי הסכימה של האלבום המצוי במשתנה AlbumModel (המכיל את המודל של Album שמצוי תחת המשתנה models)
    AlbumModel.create( album )
        // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה result המכיל את התוצאה שקיבלנו
        .then(result  => {
            // המשתנה album_id מכיל את המספר id של האלבום שנוצר המצוי תחת המשתנה result
            album_id = result.album_id

            // הפונקציה מחזירה את המשתנה album_id המכיל את המספר id של האלבום שנוצר המצוי תחת המשתנה result
            return album_id
        })
        // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album_id המכיל את המספר id של האלבום שנוצר
        .then(album_id => {
            // המשתנה songs מפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת כל שיר לאלבום שלו לפי המספר id של האלבום ומחזירה את השיר
            songs = songs.map(song => {
                song.album_id = album_id

                // הפונקציה מחזירה את המשתנה song המכיל את הפרטים של השיר
                return song
            })

            // הפונקציה מחזירה את המשתנה SongModel המפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של songs, כך שלמעשה היא מוסיפה את כל השירים לתוך האלבום שנוצר
            return SongModel.bulkCreate( songs )
        })
        // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise נפעיל promise שפונקציית ה- callback שלו מבצעת מספר פעולות
        .then(() => {
            // הפונקציה מחזירה את המשתנה GenreModel המפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של new_genres
            return GenreModel.bulkCreate( new_genres,  { returning: true } )
        })
        // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise נפעיל promise שפונקציית ה- callback שלו מבצעת מספר פעולות
        .then(() => {
            // המשתנה new_genres_ids מכיל את המשתנה results שמפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת את ה- genre_id
            let new_genres_ids = results.map(genre => genre.genre_id)
            // המשתנה album_genres_ids מכיל את המערך המאוחד של הנתונים המצויים במשתנה old_genres_ids ומפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת את ה- genre_id ו- album_id
            let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                // הפונקציה מחזירה אובייקט המכיל את המשתנים genre_id ו- album_id
                return { genre_id, album_id }
            })

            // הפונקציה מחזירה את המשתנה AlbumToGenresModel מפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של album_genres_ids, כך שלמעשה היא מוסיפה את המזהה הייחודי של הז'אנרים שלגביהם מבוצע עדכון של הנתונים
            return  AlbumToGenresModel.bulkCreate( album_genres_ids )
        })
        // ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise נפעיל promise שפונקציית ה- callback שלו מבצעת מספר פעולות
        .then(() => {
            // שליחת הודעת סטטוס עם הקוד 201 (Created) האומרת שהמידע המבוקש נוצר עם תשובת json המכילה את התוצאה של האלבום שנוצר
            res.status(201).json({ result })
        })
        // במידה ויש שגיאות המונעות מאיתנו לשמור את האלבום נפעיל promise התופס את השגיאות ושפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה err
        .catch(err => {
            // נבדוק אם יש שגיאה בנתונים המצויים במשתנה album_id
            if ( album_id ) {
                // אז נפעיל את הפונקציה deleteAlbum המקבלת את המשתנה album_id המצויה תחת האובייקט AlbumsController ושבאמצעותה מתאפשר לבצע בקרה על מחיקת האלבום ומאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise המחבר את כל השאילתות המצויות בפונקציה deleteAlbum ושפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
                AlbumsController.deleteAlbum( album_id ).spread(() => {
                    // המשתנה errors מכיל את השגיאה שקיבלנו
                    let errors = err.errors[0]

                    // במידה וקיבלנו הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ולא ניתן ליצור את האלבום ונשלח json המפרט את הודעת השגיאה שקיבלנו
                    res.status(422).json({
                        error: 'Unable to create album',
                        reason: {
                            message: errors.message,
                            error: `${errors.path} '${errors.value}' already exists`
                        }
                    })
                })

                return
            }

            // המשתנה errors מכיל את השגיאה שקיבלנו
            let errors = err.errors[0]

            // במידה וקיבלנו הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ולא ניתן ליצור את האלבום ונשלח json המפרט את הודעת השגיאה שקיבלנו
            res.status(422).json({
                error: 'Unable to create album',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })

        // אם הגענו עד לכאן, נזרוק הודעת שגיאה חדשה
        throw new Error()
    })
})

// ביצוע בקשת put לפי המספר id של האלבום, ובכך למעשה מתאפשר לעדכן את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
router.put('/:album_id', function ( req, res ) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body
    // המשתנה album מכיל את הגוף של הבקשה
    let album_id = req.params.album_id
    // המשתנה new_genres מכיל את הפונקציה getNewGenres שמקבלת את המשתנה album.genres המכיל את המערך של הז'אנרים המצויים באלבום ומצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    let new_genres = GenresController.getNewGenres( album.genres )
    // המשתנה old_genres_ids מכיל את הפונקציה getExistingGenresIds שמקבלת את המשתנה album.genres המכיל את המערך של הז'אנרים המצויים באלבום ומצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לקבל את המספר הייחודי של הז'אנרים הקיימים
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    // נבדוק אם המשתנה songs מכיל את השירים של האלבום שנוצר המצויים תחת המשתנה album הוא אכן מערך עם פריטים
    if ( !Array.isArray( album.songs ) )
        // אם לא, אז נשלח הודעת שגיאה מתאימה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין שירים במערך
        res.status(422).json({ err: 'No Songs!' })

    // נבדוק אם לפרופרטי genres המצוי במשתנה album יש ערכים, למעשה אנו בודקים אם יש פריטים במערך של הז'אנרים
    if ( !album.genres.length )
        // אם לא, אז נשלח הודעת שגיאה מתאימה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין ז'אנרים במערך
        res.status(422).json({ err: 'No Genres!' })

    // בבקשה אנחנו מעדכנים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) בהתאם למספר id של האלבום
    AlbumModel.update( album, {
        where: { album_id: album_id }
    // ואז מאחר ואנו משתתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise בו המשתנה GenreModel מפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של new_genres, ולאחר מכן נפעיל promise נוסף על התוצאות שמתקבלות
    }).then(() => {
        GenreModel.bulkCreate( new_genres,  { returning: true } ).then(
            results => {
                // המשתנה new_genres_ids מכיל את המשתנה results שמפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת את ה- genre_id
                let new_genres_ids = results.map(genre => genre.genre_id)
                // המשתנה album_genres_ids מכיל את המערך המאוחד של הנתונים המצויים במשתנה old_genres_ids ומפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת את ה- genre_id ו- album_id
                let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                    return { genre_id, album_id }
                })
                // לאחר מכן, נמחק את הנתונים המצויים במשתנה AlbumToGenresModel (המכיל את המודל של AlbumToGenresModel המצוי תחת המשתנה models) בהתאם למספר id של האלבום
                AlbumToGenresModel.destroy({
                    where: {
                        album_id: album_id
                    }
                }).then(() => {
                    // המשתנה AlbumToGenresModel מפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של album_genres_ids, כך שלמעשה היא מוסיפה את המזהה הייחודי של הז'אנרים שלגביהם מבוצע עדכון של הנתונים
                    AlbumToGenresModel.bulkCreate( album_genres_ids ).then(
                        () => {
                            // לאחר מכן, נמחק את הנתונים המצויים במשתנה SongModel (המכיל את המודל של Song המצוי תחת המשתנה models) בהתאם למספר id של האלבום
                            SongModel.destroy({
                                where: {
                                    album_id: album_id
                                }
                            // לאחר מכן, נפעיל promise שבו המשתנה songs מפעיל את הפונקציה map היוצרת מערך חדש עם התוצאות של הפונקציה הקוראת בכל אלמנט במערך, כאשר במקרה שלנו היא משייכת כל שיר לאלבום שלו לפי המספר id של האלבום ומחזירה את השיר
                            }).then(() => {
                                let songs = album.songs.map(song => {
                                    song.album_id = album_id
                                    return song
                                })
                                // ולאחר מכן, נפעיל promise נוסף בו המשתנה SongModel מפעיל את הפונקציה bulkCreate היוצרת ומוסיפה את כל האירועים המצויים במערך של songs, כך שלמעשה היא מוסיפה את כל השירים לתוך האלבום שמבוצע לגביו עדכון של הנתונים ונשלח תשובת json עם התוצאה
                                SongModel.bulkCreate( songs ).then(
                                    result => {
                                        res.json( result )
                                    }
                                )
                            })
                        }
                    )
                })
            }
        )
    })
})

// ביצוע בקשת delete לפי המספר id של האלבום, ובכך למעשה מתאפשר למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו
router.delete('/:album_id', function ( req, res ) {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

    // הפעלה של הפונקציה deleteAlbum המקבלת את המשתנה album_id המצויה תחת האובייקט AlbumsController ושבאמצעותה מתאפשר לבצע בקרה על מחיקת האלבום ומאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise המחבר את כל השאילתות המצויות בפונקציה deleteAlbum ושפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה affected_rows
    AlbumsController.deleteAlbum( album_id ).spread(affected_rows => {
        // אם התוצאה שקיבלנו היא 0, זאת אומרת שלא הושפעו שורות ונשלח תשובת json המכילה הודעה האומרת שהאלבום עם המספר id שביקשנו למחוק לא קיים
        if ( affected_rows === 0 )
            res.json({ message: `Album id ${album_id} not found` })
        else
            // אם התוצאה היא אחרת, כלומר 1, כי זה המספר המקסימלי של השורות שיכולות להיות מושפעות מאחר ואנו מבקשים למחוק אלבום ספציפי לפי המספר id שלו ויכול להיות רק אלבום אחד שמכיל את אותו מספר id, אז נשלח תשובת json עם המספר id של האלבום הספציפי שנמחק
            res.json({ album_id })
    })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router