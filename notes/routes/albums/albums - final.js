// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API לאלבומים
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express ושבאמצעותה מתאפשר לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה models מכיל את כל היכולות המצויות בקבצים המצויים בתיקיית models באמצעות חיבורה
const models = require('../models')
// המשתנה AlbumModel מכיל את המודל של Album המצוי תחת המשתנה models
const AlbumModel = models.Album
// המשתנה GenreModel מכיל את המודל של Genre המצוי תחת המשתנה models
const GenreModel = models.Genre
// המשתנה AlbumToGenresModel מכיל את המודל של AlbumToGenres המצוי תחת המשתנה models
const AlbumToGenresModel = models.AlbumToGenres
// המשתנה SongModel מכיל את המודל של Song המצוי תחת המשתנה models
const SongModel = models.Song
// המשתנה AlbumsController מכיל את כל היכולות המצויות בקובץ AlbumsController באמצעות חיבורו
const AlbumsController = require('../controllers/AlbumsController')
// המשתנה GenresController מכיל את כל היכולות המצויות בקובץ GenresController באמצעות חיבורו
const GenresController = require('../controllers/GenresController')

// ביצוע בקשת get המביאה את כל האלבומים, ובכך מתאפשר להביא את כל הנתונים הקשורים לאלבומים ממסד הנתונים
router.get('/', function ( req, res ) {
    // בבקשה אנו מוצאים את כל הנתונים הקיימים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_description ואת התשובות המתקבלות מסדרים לפי ה- attributes בשם album_id
    AlbumModel.findAll({
        attributes: { exclude: ['album_description'] },
        order: [
            ['album_id']
        ]
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
    }).then(results => {
        // נבדוק את אורך הנתונים המצויים במשתנה results ואם כמות התוצאות היא 0, אז נבצע מספר פעולות
        if ( results.length === 0 )
            // שליחה של הודעת שגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן
            res.status(204).send()
        // אחרת, כלומר יש נתונים במשתנה results והמשתנה results מכיל תוצאות, אז נבצע מספר פעולות
        else
            // שליחה של תשובת json המכילה את כל הנתונים המצויים במשתנה results
            res.json( results )
    })
})

// ביצוע בקשת get לפי המזהה הייחודי של האלבום, ובכך מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי ממסד הנתונים לפי המזהה הייחודי שלו
router.get('/:album_id', function ( req, res ) {
    // המשתנה album_id מכיל את המזהה הייחודי של האלבום
    let album_id = req.params.album_id

    // מאחר ואנו רוצים להביא את כל הנתונים הקשורים לאלבום ספציפי הכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו, צריך לחבר מספר שאילתות המביאות את כל הנתונים הקשורים לאלבום ומצויים בטבלאות השונות
    models.sequelize.Promise.join(
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של האלבומים בהתאם למזהה הייחודי של האלבום והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר והנתיב הוא של בקשת get שבאמצעותה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM albums WHERE album_id = ${album_id}`, { type: models.sequelize.QueryTypes.SELECT }),
        // השאילתא מביאה את כל הנתונים המצויים בטבלה של השירים בהתאם למזהה הייחודי של האלבום שאת התוצאות המתקבלות מהשאילתא מסדרים לפי השדה של המזהה הייחודי של השיר והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר והנתיב הוא של בקשת get שבאמצעותה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM songs WHERE album_id = ${album_id} ORDER BY song_id`, { type: models.sequelize.QueryTypes.SELECT }),
        // מאחר וצריך להביא את כל הנתונים של הז'אנרים הקשורים לאלבום בהתאם למזהה הייחודי של האלבום מהטבלה המקשרת של albums_to_genres, נשתמש בשאילתא בתוך שאילתא והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר והנתיב הוא של בקשת get שבאמצעותה מתאפשר להביא את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג SELECT
        models.sequelize.query(`SELECT * FROM genres WHERE genre_id IN (SELECT genre_id FROM albums_to_genres WHERE album_id = ${album_id})`, { type: models.sequelize.QueryTypes.SELECT })
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album המכיל את כל הפרטים של האלבום, את המשתנה songs המכיל את כל הפרטים של השירים המצויים באלבום ואת המשתנה genres המכיל את כל הפרטים של הז'אנרים המצויים באלבום, מאחדת את כל השאילתות המכילות את כל הנתונים הקשורים לאלבום ומבצעת מספר פעולות
    ).spread(( album, songs, genres ) => {
        // נבדוק את אורך הנתונים המצויים במשתנה album ואם יש נתונים, אז נבצע מספר פעולות
        if ( album.length ) {
            // המשתנה result מכיל את המשתנה album שהאינדקס שלו במערך הוא 0
            let result = album[0]

            // המשתנה songs מכיל את כל הפרטים של השירים המצויים באלבום
            result.songs = songs
            // המשתנה genres מכיל את כל הפרטים של הז'אנרים המצויים באלבום
            result.genres = genres

            // שליחה של תשובת json המכילה את כל הנתונים המצויים במשתנה result
            res.json( result )
        // אחרת, כלומר אין נתונים במשתנה album, אז נבצע מספר פעולות
        } else
            // שליחה של הודעת שגיאה עם הסטטוס קוד 404 (Not Found) האומרת שהנתונים המבוקשים לא נמצאים
            res.status(404).send()
    })
})

// ביצוע בקשת get לנתיב של החיפוש, ובכך מתאפשר להביא את כל הנתונים שהתקבלו בעת ביצוע החיפוש ממסד הנתונים
router.get('/search/:term', function ( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות של תוצאות החיפוש
    let term = req.params.term

    // בבקשה אנו מוצאים וסופרים את כל הנתונים הקיימים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) איפה שמצויים הנתונים של השדה album_name בהתאם לנתונים המצויים במשתנה term
    AlbumModel.findAndCountAll({
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
    }).then(results => {
        // נבדוק את כמות הנתונים המצויים במשתנה results ואם כמות התוצאות היא 0, אז נבצע מספר פעולות
        if ( results.count === 0 )
            // שליחה של הודעת שגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן
            res.status(204).send()
        // אחרת, כלומר יש נתונים במשתנה results והמשתנה results מכיל כמות תוצאות שהיא לא 0, אז נבצע מספר פעולות
        else
            // שליחה של תשובת json הסוכמת את כל התוצאות והשורות של התוצאות המכילות את תוצאות החיפוש
            res.json({ count: results.count, albums: results.rows })
    })
})

// ביצוע בקשת get לנתיב של ההצעות האפשריות לתוצאות החיפוש, ובכך מתאפשר להביא את כל הנתונים של ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים
router.get('/suggestions/:term', function ( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות של תוצאות החיפוש
    let term = req.params.term

    // בבקשה אנו מוצאים את כל הנתונים הקיימים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_artist, album_image, album_year ו- album_description איפה שמצויים הנתונים של השדה album_name בהתאם לנתונים המצויים במשתנה term
    AlbumModel.findAll({
        attributes: {
            exclude: ['album_artist', 'album_image', 'album_year', 'album_description']
        },
        where: {
            album_name: {
                $like: `%${term}%`
            }
        }
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
    }).then(results => {
        // נבדוק את אורך הנתונים המצויים במשתנה results ואם כמות התוצאות היא 0, אז נבצע מספר פעולות
        if ( results.length === 0 )
            // שליחה של הודעת שגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן
            res.status(204).send()
        // אחרת, כלומר יש נתונים במשתנה results והמשתנה results מכיל תוצאות, אז נבצע מספר פעולות
        else
            // שליחה של תשובת json המכילה את כל הנתונים המצויים במשתנה results
            res.json({ results })
    })
})

// ביצוע בקשת get לנתיב של ההצעות האפשריות לתוצאות החיפוש של שם האמן היוצר את האלבום, ובכך מתאפשר להביא את כל הנתונים של ההצעות האפשריות לתוצאות החיפוש של שם האמן היוצר את האלבום ממסד הנתונים
router.get('/suggestions/artist/:term', function ( req, res ) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתקבלות ההצעות האפשריות של תוצאות החיפוש
    let term = req.params.term

    // בבקשה אנו מוצאים את כל הנתונים הקיימים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) ב- attributes בשם album_artist המצוי בקבוצה המתאימה, איפה שמצויים הנתונים של השדה album_artist בהתאם לנתונים המצויים במשתנה term
    AlbumModel.findAll({
        attributes: ['album_artist'],
        group: ['album_artist'],
        where: {
            album_artist: {
                $like: `%${term}%`
            }
        }
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
    }).then(results => {
        // נבדוק את אורך הנתונים המצויים במשתנה results ואם כמות התוצאות היא 0, אז נבצע מספר פעולות
        if ( results.length === 0 )
            // שליחה של הודעת שגיאה עם הסטטוס קוד 204 (No Content), האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן
            res.status(204).send()
        // אחרת, כלומר יש נתונים במשתנה results והמשתנה results מכיל תוצאות, אז נבצע מספר פעולות
        else {
            // המשתנה results מפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של שם האמן היוצר את האלבום ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה artist המכיל את שם האמן היוצר את האלבום ויוצרת מערך חדש של שם האמן היוצר את האלבום
            results = results.map(artist => artist.album_artist)

            // שליחה של תשובת json המכילה את כל הנתונים המצויים במשתנה results
            res.json({ results })
        }
    })
})

// ביצוע בקשת post שבאמצעותה מתאפשר ליצור אלבום חדש במסד הנתונים
router.post('/', function ( req, res ) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body
    // המשתנה songs מכיל את כל הפרטים של השירים המצויים באלבום
    let songs = album.songs
    // המשתנה album_id מכיל את הערך הבוליאני false
    let album_id = false
    // המשתנה new_genres מפעיל את הפונקציה getNewGenres (שמקבלת את המשתנה album.genres המכיל את המערך עם הז'אנרים המצויים באלבום) המצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    let new_genres = GenresController.getNewGenres( album.genres )
    // המשתנה old_genres_ids מפעיל את הפונקציה getExistingGenresIds (שמקבלת את המשתנה album.genres המכיל את המערך עם הז'אנרים המצויים באלבום) המצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של הז'אנרים השמורים במסד הנתונים
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    // נבדוק את אורך המערך עם הז'אנרים המצויים באלבום המצוי במשתנה album.genres ואם המערך מכיל 0 ערכים, אז נבצע מספר פעולות
    if ( album.genres.length === 0 )
        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין ז'אנרים במערך עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
        res.status(422).json({ err: 'No Genres!' })

    // נבדוק אם המשתנה songs אינו מכיל מערך עם השירים של האלבום, אז נבצע מספר פעולות
    if ( !Array.isArray( songs ) )
        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין שירים במערך עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
        res.status(422).json({ err: 'No Songs!' })

    // Create the songs in the DB and link theme to the album
    // בבקשה אנו יוצרים אלבום חדש לפי הסכימה של האלבום המצוי במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models)
    AlbumModel.create( album )
        // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה result המכיל את התוצאה שקיבלנו ומבצעת מספר פעולות
        .then(result => {
            // המשתנה album_id מכיל את המזהה הייחודי של האלבום שנוצר המצוי תחת המשתנה result
            album_id = result.album_id

            // הפונקציה מחזירה את המשתנה album_id המכיל את המזהה הייחודי של האלבום שנוצר המצוי תחת המשתנה result
            return album_id
        })
        // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום שנוצר המצוי תחת המשתנה result ומבצעת מספר פעולות
        .then(album_id => {
            // המשתנה songs מפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של השירים ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה song המכיל את כל הפרטים של השיר ומבצעת מספר פעולות
            songs = songs.map(song => {
                // יצירת מערך חדש של השירים לפי המזהה הייחודי של האלבום, ובכך מתאפשר להכניס שירים לאלבום לפי המזהה הייחודי של האלבום
                song.album_id = album_id

                // הפונקציה מחזירה את המשתנה song המכיל את כל הפרטים של השיר
                return song
            })

            // הפונקציה מחזירה את הפונקציה bulkCreate המצויה תחת המשתנה SongModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של songs, ובכך מתאפשר ליצור ולהוסיף את כל השירים לתוך האלבום שנוצר
            return SongModel.bulkCreate( songs )
        })
        // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
        .then(() => {
            // הפונקציה מחזירה את הפונקציה bulkCreate המצויה תחת המשתנה GenreModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של new_genres, ובכך מתאפשר ליצור ולהוסיף את כל הז'אנרים לתוך האלבום שנוצר
            return GenreModel.bulkCreate( new_genres, { returning: true } )
        })
        // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה genre_results המכיל את תוצאות הז'אנרים שקיבלנו ומבצעת מספר פעולות
        .then(genre_results => {
            // המשתנה new_genres_ids מפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של תוצאות הז'אנרים לפי המזהה הייחודי של הז'אנרים ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ויוצרת מערך חדש של תוצאות הז'אנרים לפי המזהה הייחודי של הז'אנרים
            let new_genres_ids = genre_results.map(genre => genre.genre_id)
            // המשתנה album_genres_ids מפעיל את הפונקציה concat (שמקבלת את המשתנה new_genres_ids המכיל מערך עם המזהה הייחודי החדש של הז'אנרים) שבאמצעותה מתאפשר לאחד בין המערך המצוי במשתנה old_genres_ids לבין המערך המצוי במשתנה new_genres_ids, ולאחר מכן נפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של הז'אנרים לפי המזהה הייחודי של הז'אנר והאלבום ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר ומבצעת מספר פעולות
            let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                // הפונקציה מחזירה אובייקט המכיל את המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר ואת המשתנה album_id המכיל את המזהה הייחודי של האלבום
                return { genre_id, album_id }
            })

            // הפונקציה מחזירה את הפונקציה bulkCreate המצויה תחת המשתנה AlbumToGenresModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של album_genres_ids, ובכך מתאפשר ליצור ולהוסיף את המזהה הייחודי של הז'אנר שנוצר במסד הנתונים
            return AlbumToGenresModel.bulkCreate( album_genres_ids )
        })
        // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה result המכיל את התוצאה שקיבלנו ומבצעת מספר פעולות
        .then(result => {
            // שליחה של הודעה עם הסטטוס קוד 201 (Created) האומרת שהנתונים המבוקשים נוצרו עם תשובת json המכילה את התוצאה של האלבום שנוצר
            res.status(201).json({ result })
        })
        // במידה ויש שגיאה המונעת מאיתנו לשמור את האלבום, נתפוס את השגיאה ונפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה err המכיל את השגיאה שקיבלנו ומבצעת מספר פעולות
        .catch(err => {
            // נבדוק אם יש שגיאה בנתונים המצויים במשתנה album_id, אז נבצע מספר פעולות
            if ( album_id ) {
                // הפעלה של הפונקציה deleteAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumsController ושבאמצעותה מתאפשר לבצע בקרה על המחיקה של האלבום ומאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה affected_rows המכיל את השורות המושפעות מביצוע הפעולה, מאחדת את כל השאילתות המצויות בפונקציה deleteAlbum ומבצעת מספר פעולות
                AlbumsController.deleteAlbum( album_id ).spread(affected_rows => {
                    // נבדוק אם המשתנה affected_rows מכיל 0 תוצאות, זאת אומרת שלא הושפעו שורות מביצוע הפעולה, אז נבצע מספר פעולות
                    if ( affected_rows === 0 )
                        // שליחה של תשובת json המכילה הודעה האומרת שהאלבום עם המזהה הייחודי שביקשנו למחוק לא קיים
                        res.json({ message: `Album id ${album_id} not found` })
                    // אחרת, כלומר אם התוצאה היא 1, כי זה המספר המקסימלי של השורות שיכולות להיות מושפעות מאחר ואנו מבקשים למחוק נתונים מאלבום ספציפי לפי המזהה הייחודי שלו ויכול להיות רק אלבום אחד המכיל את אותו מזהה ייחודי, אז נבצע מספר פעולות
                    else {
                        // המשתנה errors מכיל את השגיאה שקיבלנו
                        let errors = err.errors[0]

                        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ולא ניתן ליצור את האלבום עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
                        res.status(422).json({
                            error: 'Unable to create album',
                            reason: {
                                message: errors.message,
                                error: `${errors.path} '${errors.value}' already exists`
                            }
                        })
                    }
                })

                // ביצוע חזרה להמשך פעולות הפונקציה
                return
            }

            // המשתנה errors מכיל את השגיאה שקיבלנו
            let errors = err.errors[0]

            // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ולא ניתן ליצור את האלבום עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
            res.status(422).json({
                error: 'Unable to create album',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })
        })
})

// ביצוע בקשת put לפי המזהה הייחודי של האלבום, ובכך מתאפשר לעדכן את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו במסד הנתונים
router.put('/:album_id', function ( req, res ) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body
    // המשתנה album_id מכיל את המזהה הייחודי של האלבום
    let album_id = req.params.album_id
    // המשתנה new_genres מפעיל את הפונקציה getNewGenres (שמקבלת את המשתנה album.genres המכיל את המערך עם הז'אנרים המצויים באלבום) המצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    let new_genres = GenresController.getNewGenres( album.genres )
    // המשתנה old_genres_ids מפעיל את הפונקציה getExistingGenresIds (שמקבלת את המשתנה album.genres המכיל את המערך עם הז'אנרים המצויים באלבום) המצויה תחת האובייקט GenresController ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של הז'אנרים השמורים במסד הנתונים
    let old_genres_ids = GenresController.getExistingGenresIds( album.genres )

    // נבדוק את אורך המערך עם הז'אנרים המצויים באלבום המצוי במשתנה album.genres ואם המערך מכיל 0 ערכים, אז נבצע מספר פעולות
    if ( album.genres.length === 0 )
        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין ז'אנרים במערך עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
        res.status(422).json({ err: 'No Genres!' })

    // נבדוק אם המשתנה album.songs אינו מכיל מערך עם השירים של האלבום, אז נבצע מספר פעולות
    if ( !Array.isArray( album.songs ) )
        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ואין שירים במערך עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
        res.status(422).json({ err: 'No Songs!' })

    // בבקשה אנו מעדכנים את כל הנתונים הקיימים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) בהתאם למזהה הייחודי של האלבום
    AlbumModel.update( album, {
        where: { album_id: album_id }
    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
    }).then(() => {
        // הפעלה של הפונקציה bulkCreate המצויה תחת המשתנה GenreModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של new_genres, ובכך מתאפשר ליצור ולהוסיף את כל הז'אנרים לתוך האלבום שמבוצע לגביו עדכון של הנתונים במסד הנתונים, ומאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
        GenreModel.bulkCreate( new_genres, { returning: true } ).then(results => {
            // המשתנה new_genres_ids מפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של תוצאות הז'אנרים לפי המזהה הייחודי של הז'אנרים ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ויוצרת מערך חדש של תוצאות הז'אנרים לפי המזהה הייחודי של הז'אנרים
            let new_genres_ids = results.map(genre => genre.genre_id)
            // המשתנה album_genres_ids מפעיל את הפונקציה concat (שמקבלת את המשתנה new_genres_ids המכיל מערך עם המזהה הייחודי החדש של הז'אנרים) שבאמצעותה מתאפשר לאחד בין המערך המצוי במשתנה old_genres_ids לבין המערך המצוי במשתנה new_genres_ids, ולאחר מכן נפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של הז'אנרים לפי המזהה הייחודי של הז'אנר והאלבום ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר ומבצעת מספר פעולות
            let album_genres_ids = old_genres_ids.concat( new_genres_ids ).map(genre_id => {
                // הפונקציה מחזירה אובייקט המכיל את המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר ואת המשתנה album_id המכיל את המזהה הייחודי של האלבום
                return { genre_id, album_id }
            })
            // מחיקה של הנתונים המצויים במשתנה AlbumToGenresModel (המכיל את המודל של AlbumToGenresModel המצוי תחת המשתנה models) בהתאם למזהה הייחודי של האלבום
            AlbumToGenresModel.destroy({
                where: {
                    album_id: album_id
                }
            // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
            }).then(() => {
                // הפעלה של הפונקציה bulkCreate המצויה תחת המשתנה AlbumToGenresModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של album_genres_ids, ובכך מתאפשר ליצור ולהוסיף את המזהה הייחודי של הז'אנר לתוך האלבום שמבוצע לגביו עדכון של הנתונים במסד הנתונים, ומאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
                AlbumToGenresModel.bulkCreate( album_genres_ids ).then(() => {
                    // מחיקה של הנתונים המצויים במשתנה SongModel (המכיל את המודל של Song המצוי תחת המשתנה models) בהתאם למזהה הייחודי של האלבום
                    SongModel.destroy({
                        where: {
                            album_id: album_id
                        }
                    // מאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
                    }).then(() => {
                        // המשתנה songs מפעיל את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של שירים ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה song המכיל את כל הפרטים של השיר ומבצעת מספר פעולות
                        let songs = album.songs.map(song => {
                            // יצירת מערך חדש של השירים לפי המזהה הייחודי של האלבום, ובכך מתאפשר להכניס שירים לאלבום לפי המזהה הייחודי של האלבום
                            song.album_id = album_id

                            // הפונקציה מחזירה את המשתנה song המכיל את כל הפרטים של השיר
                            return song
                        })
                        // הפעלה של הפונקציה bulkCreate המצויה תחת המשתנה SongModel שבאמצעותה מתאפשר ליצור ולהוסיף את כל האירועים המצויים במערך של songs, ובכך מתאפשר ליצור ולהוסיף את כל השירים לתוך האלבום שמבוצע לגביו עדכון של הנתונים במסד הנתונים, ומאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה result המכיל את התוצאה שקיבלנו ומבצעת מספר פעולות
                        SongModel.bulkCreate( songs ).then(result => {
                            // שליחה של תשובת json המכילה את כל הנתונים המצויים במשתנה result
                            res.json( result )
                        })
                    })
                })
            })
        })
    // במידה ויש שגיאה המונעת מאיתנו לעדכן את האלבום במסד הנתונים, נתפוס את השגיאה ונפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה err המכיל את השגיאה שקיבלנו ומבצעת מספר פעולות
    }).catch(err => {
        // המשתנה errors מכיל את השגיאה שקיבלנו
        let errors = err.errors[0]

        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ולא ניתן לעדכן את האלבום במסד הנתונים עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
        res.status(422).json({
            error: 'Unable to update album',
            reason: {
                message: errors.message,
                error: `${errors.path} - ${errors.value}`
            }
        })
    })
})

// ביצוע בקשת delete לפי המזהה הייחודי של האלבום, ובכך מתאפשר למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו ממסד הנתונים
router.delete('/:album_id', function ( req, res ) {
    // המשתנה album_id מכיל את המזהה הייחודי של האלבום
    let album_id = req.params.album_id

    // הפעלה של הפונקציה deleteAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumsController ושבאמצעותה מתאפשר לבצע בקרה על המחיקה של האלבום ומאחר ואנו מבצעים שימוש ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה affected_rows המכיל את השורות המושפעות מביצוע הפעולה, מאחדת את כל השאילתות המצויות בפונקציה deleteAlbum ומבצעת מספר פעולות
    AlbumsController.deleteAlbum( album_id ).spread(affected_rows => {
        // נבדוק אם המשתנה affected_rows מכיל 0 תוצאות, זאת אומרת שלא הושפעו שורות מביצוע הפעולה, אז נבצע מספר פעולות
        if ( affected_rows === 0 )
            // שליחה של תשובת json המכילה הודעה האומרת שהאלבום עם המזהה הייחודי שביקשנו למחוק לא קיים
            res.json({ message: `Album id ${album_id} not found` })
        // אחרת, כלומר אם התוצאה היא 1, כי זה המספר המקסימלי של השורות שיכולות להיות מושפעות מאחר ואנו מבקשים למחוק אלבום ספציפי לפי המזהה הייחודי שלו ויכול להיות רק אלבום אחד המכיל את אותו מזהה ייחודי, אז נבצע מספר פעולות
        else
            // שליחה של תשובת json המכילה את המשתנה album_id המכיל את המזהה הייחודי של האלבום הספציפי שנמחק
            res.json({ album_id })
    })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router