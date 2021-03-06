// בקובץ זה אנו מגדירים הגדרות שונות על-מנת שנוכל לבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
// המשתנה fs מכיל את כל היכולות של המודול באמצעות חיבורו
const fs        = require('fs')
// המשתנה path מכיל את כל היכולות של המודול באמצעות חיבורו
const path      = require('path')
// המשתנה Sequelize מכיל את כל היכולות של המודול 'sequelize' באמצעות חיבורו
const Sequelize = require('sequelize')
// המשתנה basename מכיל את הפונקציה basename המצויה תחת המשתנה path ושמקבלת את המודול filename
const basename  = path.basename( module.filename )
// המשתנה env מכיל הגדרה של סביבת העבודה בה אנו נמצאים בהתאם להגדרות המצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const env       = process.env.NODE_ENV || 'development'
// המשתנה config מחבר את הקובץ config.json שנוצר עם ההתקנה של sequelize ומכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const config    = require('./../config/config.json')[env]
// המשתנה db מכיל אובייקט ריק
const db        = {}

// הצהרה על המשתנה שאנו הולכים לבצע בו שימוש
let sequelize
// נבצע בדיקה בנוגע לחיבור לסביבת העבודה בהתאם לסביבת העבודה שבה אנו נמצאים באמצעות יצירת אינסטנס חדש של Sequelize שיודע להתחבר לסביבת העבודה בהתאם להגדרות של סביבת העבודה שמצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
if ( config.use_env_variable )
    sequelize = new Sequelize( process.env[ config.use_env_variable ] )
else
    sequelize = new Sequelize( config.database, config.username, config.password, config )

// למעשה אנו טוענים את המודל הרלוונטי בו אנו עושים שימוש ושהוא לא index.js ואז אנו עוברים עם לולאת forEach המוציאה איבר-איבר של file ומביאה לנו את המודל שיובא על-ידי sequelize והיא מכניסה את השם של המודל לתוך מערך באובייקט שמצוי במשתנה db
fs.readdirSync( __dirname ).filter(( file ) => {
    return ( file.indexOf('.') !== 0 ) && ( file !== basename ) && ( file.slice(-3) === '.js' )
})
    .forEach(( file ) => {
        let model = sequelize['import']( path.join( __dirname, file ) )
        db[ model.name ] = model
    })

// אנו עוברים על המפתחות שמצויים בתוך האובייקט המצוי במשתנה db עם לולאת forEach ובודקים שהמפתח associate נמצא בתוך המערך של modelName שמצוי במשתנה db המכיל למעשה אובייקט
Object.keys( db ).forEach(( modelName ) => {
    if ( db[ modelName ].associate )
        db[ modelName ].associate( db )
})

// sequelize שמצוי תחת המשתנה db מכיל את היכולות שמצויות בתוך המשתנה sequelize
db.sequelize = sequelize
// Sequelize שמצוי תחת המשתנה db מכיל את היכולות שמצויות בתוך המשתנה Sequelize
db.Sequelize = Sequelize

// ייצוא היכולות של המודול db החוצה
module.exports = db