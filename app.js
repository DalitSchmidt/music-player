// קובץ זה מכיל את כל החיבורים והיכולות של האפליקציה
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה app מכיל את המשתנה express ומפעיל אותו
const app = express()
// המשתנה path מכיל את כל היכולות של המודול באמצעות חיבורו
const path = require('path')
//המשתנה favicon מכיל את כל היכולות של המודול serve-favicon באמצעות חיבורו
const favicon = require('serve-favicon')
// המשתנה logger מכיל את כל היכולות של המודול morgan באמצעות חיבורו
const logger = require('morgan')
// המשתנה cookieParser מכיל את כל היכולות של המודול cookie-parser באמצעות חיבורו
const cookieParser = require('cookie-parser')
// המשתנה bodyParser מכיל את כל היכולות של המודול body-parser באמצעות חיבורו
const bodyParser = require('body-parser')

// המשתנה app (המכיל את המשתנה express ומפעיל אותו) מאפשר לבצע שימושים שונים במשתנים שהגדרנו לעיל (המכילים מודולים שונים) ומפעיל אותם
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// המשתנה app (המכיל את המשתנה express ומפעיל אותו) מאפשר לבצע שימוש בנתיב של '/api/albums', באמצעות חיבור הקובץ albums המצוי תחת התיקייה routes
app.use('/api/albums', require('./routes/albums'))
// המשתנה app (המכיל את המשתנה express ומפעיל אותו) מאפשר לבצע שימוש בנתיב של '/api/genres', באמצעות חיבור הקובץ genres המצוי תחת התיקייה routes
app.use('/api/genres', require('./routes/genres'))

// המשתנה app (המכיל את המשתנה express ומפעיל אותו) מאפשר לבצע שימוש בפונקציית callback המקבלת 3 פרמטרים (req, res ו- next) ושבאמצעותה תיזרק הודעת שגיאה המכילה את הסטטוס קוד שמספרו 404 (Not Found) האומרת שהקובץ לא זמין
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// המשתנה app (המכיל את המשתנה express ומפעיל אותו) מאפשר לבצע שימוש בפונקציית callback המקבלת 4 פרמטרים (err, req, res ו- next) ושבאמצעותה תיזרק הודעת שגיאה המכילה את הסטטוס קוד שמספרו 404 (Not Found) האומרת שהקובץ לא זמין או שקיבלנו הודעת שגיאה המכילה את הסטטוס קוד שמספרו 500 (Internal Server Error) האומרת שיש שגיאה בשרת ונציג הודעה המפרטת את השגיאה שקיבלנו (ככל וקיבלנו)
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
    })
})

// ייצוא היכולות של המודול app החוצה
module.exports = app