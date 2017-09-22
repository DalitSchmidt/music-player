// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API לז'אנרים
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express (המכיל את כל היכולות של המודול express) שבאמצעותה אנו יכולים לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה models את כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')
// המשתנה AlbumModel מכיל את המודל של Album המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const GenreModel = models.Genre

// ביצוע בקשת get המביאה את כל הז'אנרים, ובכך למעשה אנו מביאים את כל הנתונים הקשורים לז'אנרים
router.get('/', function(req, res) {
    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה GenreModel (המכיל את המודל של Genre המצוי תחת המשתנה models), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות ונבדוק שאם כמות התוצאות היא 0, נשלח הודעת סטטוס עם הקוד 204 (No Content) האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר כמות התוצאות היא לא 0, נקבל תשובת json עם התוצאות
    GenreModel.findAll().then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

// ביצוע בקשת get לפי המספר id של הז'אנר, ובכך למעשה מתאפשר להביא נתונים של ז'אנר ספציפי לפי המספר id שלו
router.get('/:genre_id', function( req, res ) {
    // המשתנה gener_id מכיל את המספר id של הז'אנר
    let genre_id = req.params.genre_id

    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה GenreModel (המכיל את המודל של Genre המצוי תחת המשתנה models) לפי המספר id של הז'אנר, ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאה שקיבלנו ונבדוק שאם התוצאה שקיבלנו היא ריקה מתוכן נשלח הודעת סטטוס עם הקוד 204 (No Content) האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת כלומר התוצאה שקיבלנו מכילה מידע נקבל תשובת json עם התוצאה
    GenreModel.findById( genre_id ).then(result => {
        if ( result === null )
            res.status(204).send()
        else
            res.json( result )
    })
})

// ביצוע בקשת post המאפשרת ליצור ז'אנר חדש
router.post('/', function( req, res ) {
    // המשתנה genre מכיל את הגוף של הבקשה
    let genre = req.body

    // בבקשה אנחנו יוצרים מידע חדש לפי הסכימה של האלבום המצוי במשתנה GenreModel (המכיל את המודל של Genre שמצוי תחת המשתנה models), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס של promise, נפעיל promise על התוצאה שקיבלנו ששולחת הודעת סטטוס עם הקוד 201 (Created) האומרת שהמידע המבוקש נוצר עם תשובת json המכילה את המספר id  של הז'אנר שנוצר ונתפוס את השגיאות במידה וקיבלנו הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר והמספר id של הז'אנר כבר קיים תוצג הודעת שגיאה מתאימה
    GenreModel.create( genre )
        .then(result => res.status(201).json({ genre_id: result.genre_id }))
        .catch(err => {
            let errors = err.errors[0]
            res.status(422).json({
                error: 'Unable to create genre',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })
        })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router