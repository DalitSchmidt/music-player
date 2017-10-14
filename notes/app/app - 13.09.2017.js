// קובץ ה- app מכיל את כל החיבורים והיכולות של האפליקציה
// הגדרת המשתנה express כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// הגדרת המשתנה path כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const path = require('path')
// הגדרת המשתנה favicon כקבוע המכיל את כל היכולות של המודול 'serve-favicon' באמצעות חיבורו
const favicon = require('serve-favicon')
// הגדרת המשתנה logger כקבוע המכיל את כל היכולות של המודול 'morgan' באמצעות חיבורו
const logger = require('morgan')
// הגדרת המשתנה cookieParser כקבוע המכיל את כל היכולות של המודול 'cookie-parser' באמצעות חיבורו
const cookieParser = require('cookie-parser')
// הגדרת המשתנה bodyParser כקבוע המכיל את כל היכולות של המודול 'body-parser' באמצעות חיבורו
const bodyParser = require('body-parser')

// הגדרת המשתנה routes כקבוע המכיל את הקובץ index שמצוי תחת התיקייה routes באמצעות חיבורו
const routes = require('./routes/index')
// הגדרת המשתנה users כקבוע המכיל את הקובץ users שמצוי תחת התיקייה routes באמצעות חיבורו
const users = require('./routes/users')
// הגדרת המשתנה albums כקבוע המכיל את הקובץ albums שמצוי תחת התיקייה routes באמצעות חיבורו
const albums = require('./routes/albums')

// הגדרת המשתנה app כקבוע המכיל את המודול express ומפעיל אותו
const app = express()

// הגדרה של jade כמנוע התצוגה הראשי
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// המשתנה app (המכיל את המודול express) מבצע שימוש במודולים שהגדרנו לעיל ולמעשה מפעיל אותם
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// המשתנה app (המכיל את המודול express) מבצע שימוש בנתיבים שהגדרנו לעיל ולמעשה מאפשר לנו להפעיל אותם
app.use('/', routes)
app.use('/users', users)
app.use('/api/albums', albums)

// המשתנה app (המכיל את המודול express) מבצע שימוש בפונקציית callback המקבלת 3 פרמטרים (req, res, next) ושבאמצעותה אנו זורקים הודעת שגיאה (במידה ויש) האומרת שהקובץ לא זמין, ככל ותפסנו הודעת שגיאה שהסטטוס קוד שלה הוא 404 (Not Found)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// המשתנה app (המכיל את המודול express) מבצע שימוש בפונקציית callback המקבלת 4 פרמטרים (err, req, res, next) ושבאמצעותה אנו מטפלים בשגיאות המתקבלות (ככל ומתקבלות) או שהודעת השגיאה שקיבלנו מכילה את שגיאה שהסטטוס קוד שלה הוא 500 (Internal Server Error) האומרת שיש שגיאה בשרת
// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
    })
})

// ייצוא היכולות של המודול app החוצה
module.exports = app