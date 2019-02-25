// קובץ זה מכיל את כל החיבורים והיכולות של האפליקציה
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה app מכיל את המשתנה express ומפעיל אותו
const app = express()
// המשתנה path מכיל את כל היכולות של המודול באמצעות חיבורו
const path = require('path')
// המשתנה logger מכיל את כל היכולות של המודול morgan באמצעות חיבורו
const logger = require('morgan')
// המשתנה bodyParser מכיל את כל היכולות של המודול body-parser באמצעות חיבורו
const bodyParser = require('body-parser')
// המשתנה cookieParser מכיל את כל היכולות של המודול cookie-parser באמצעות חיבורו
const cookieParser = require('cookie-parser')

// המשתנה app מאפשר לבצע שימוש בנתונים באמצעות הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנים req, res ו- next ומבצעת מספר פעולות
app.use(( req, res, next ) => {
    // כאשר נשלחת בקשה חדשה, התגובה תכיל ב- header בשדה Access-Control-Allow-Origin את כל הערכים (לאור השימוש בסימן *), כדי למנוע מצב שיש "התנגשות" במידע המתקבל מהשרת (לדוגמה, במידה והמידע נשלח מכמה שרתים שונים, אז צריך לקבל את כל המידע)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    next()
})

// המשתנה app מאפשר לבצע שימושים שונים במשתנים שהגדרנו לעיל (המכילים מודולים שונים) ומפעיל אותם
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// המשתנה app מאפשר לבצע שימוש בנתיב של 'api/albums/' באמצעות חיבור הקובץ albums המצוי תחת התיקייה routes
app.use('/api/albums', require('./routes/albums'))
// המשתנה app מאפשר לבצע שימוש בנתיב של 'api/genres/' באמצעות חיבור הקובץ genres המצוי תחת התיקייה routes
app.use('/api/genres', require('./routes/genres'))
// המשתנה app מאפשר לבצע שימוש בנתיב של 'api/youtube/' באמצעות חיבור הקובץ youtube המצוי תחת התיקייה routes
app.use('/api/youtube', require('./routes/youtube'))

// המשתנה app מאפשר לבצע שימוש בנתונים באמצעות הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנים req, res ו- next ומבצעת מספר פעולות
app.use(( req, res, next ) => {
    // המשתנה err מכיל את הודעת השגיאה עם הסטטוס קוד 404 (Not Found) האומרת שהקובץ לא זמין ובאמצעותו תיזרק הודעת שגיאה במידת הצורך
    const err = new Error('Not Found')
    err.status = 404
})

// המשתנה app מאפשר לבצע שימוש בנתונים באמצעות הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנים err, req, res ו- next ומבצעת מספר פעולות
app.use(( err, req, res, next ) => {
    // זריקה של הודעת שגיאה עם הסטטוס קוד 404 (Not Found) האומרת שהקובץ לא זמין או שקיבלנו הודעת שגיאה עם הסטטוס קוד 500 (Internal Server Error) האומרת שיש שגיאה בשרת ונציג הודעה המפרטת את השגיאה שקיבלנו (ככל וקיבלנו)
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: ( app.get('env') === 'development' ) ? err : {},
    })
})

// ייצוא היכולות של המודול app החוצה
module.exports = app