// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API לאלבומים
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express (המכיל את כל היכולות של המודול express) ושבאמצעותה אנו יכולים לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה models מכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')
// המשתנה AlbumModel מכיל את המודל של Album המצוי תחת המשתנה models (המכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models)
const AlbumModel = models.Album

// ביצוע בקשת get המביאה את כל האלבומים, ובכך למעשה אנו מביאים את כל הנתונים הקשורים לאלבומים
router.get('/', function(req, res) {
    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) מלבד ה- attributes בשם album_description, ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאות ונבדוק שאם כמות התוצאות היא 0, נשלח הודעת סטטוס עם הקוד 204 (No Content) האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת, כלומר כמות התוצאות שקיבלנו היא לא 0, נקבל תשובת json עם התוצאות
    AlbumModel.findAll({ attributes: { exclude: ['album_description'] } }).then(results => {
        if ( results.length === 0 )
            res.status(204).send()
        else
            res.json( results )
    })
})

// ביצוע בקשת get לפי המספר id של האלבום, ובכך למעשה מתאפשר להביא נתונים של אלבום ספציפי לפי המספר id שלו
router.get('/:album_id', function( req, res ) {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

    // בבקשה אנחנו מחפשים את כל המידע הקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models) לפי המספר id של האלבום, ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס על promise, נפעיל promise על התוצאה שקיבלנו ונבדוק שאם התוצאה שקיבלנו היא ריקה מתוכן נשלח הודעת סטטוס עם הקוד 204 (No Content) האומרת שהשרת עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, אחרת כלומר התוצאה שקיבלנו מכילה מידע נקבל תשובת json עם התוצאה
    AlbumModel.findById( album_id ).then(result => {
        if ( result === null )
            res.status(204).send()
        else
            res.json( result )
    })
})

// ביצוע בקשת post המאפשרת ליצור אלבום חדש
router.post('/', function( req, res ) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body

    // בבקשה אנחנו יוצרים מידע חדש לפי הסכימה של האלבום המצוי במשתנה AlbumModel (המכיל את המודל של Album שמצוי תחת המשתנה models), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס של promise, נפעיל promise על התוצאה שקיבלנו ששולחת הודעת סטטוס עם הקוד 201 (Created) האומרת שהמידע המבוקש נוצר עם תשובת json המכילה את המספר id  של האלבום שנוצר ונתפוס את השגיאות במידה וקיבלנו הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר והמספר id של האלבום כבר קיים תוצג הודעת שגיאה מתאימה
    AlbumModel.create( album )
        .then(result => res.status(201).json({ album_id: result.album_id }))
        .catch(err => {
            let errors = err.errors[0]
            res.status(422).json({
                error: 'Unable to create album',
                reason: {
                    message: errors.message,
                    error: `${errors.path} '${errors.value}' already exists`
                }
            })
        })
})

// ביצוע בקשת delete לפי המספר id של האלבום, ובכך מתאפשר למעשה למחוק אלבום ספציפי לפי המספר id שלו
router.delete('/:album_id', function( req, res ) {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

    // בבקשה אנחנו מבצעים את פעולת המחיקה לפי המספר id של האלבום בהתאם למידע שקיים במשתנה AlbumModel (המכיל את המודל של Album המצוי תחת המשתנה models), ואז מאחר ואנו משתמשים ב- sequelize שהוא מודול המבוסס של promise, נפעיל promise על התוצאה שקיבלנו בהתאם למספר השורות שהושפעו מפעולת המחיקה, אם התוצאה שקיבלנו היא 0, זאת אומרת שלא הושפעו שורות ונשלח תשובת json המכילה הודעה האומרת שהאלבום עם המספר id שביקשנו למחוק לא קיים, אם התוצאה היא אחרת, כלומר 1, כי זה המספר המקסימלי של השורות שיכולות להיות מושפעות מאחר ואנו מבקשים למחוק אלבום לפי המספר id שלו ויכול להיות רק אלבום אחד שמכיל את אותו מספר id, אז נשלח תשובת json עם המספר id של האלבום שנמחק
    AlbumModel.destroy({ where: { album_id } }).then(affected_rows => {
        if ( affected_rows === 0 )
            res.json({ message: `Album id ${album_id} not found` })
        else
            res.json({ album_id })
    })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router