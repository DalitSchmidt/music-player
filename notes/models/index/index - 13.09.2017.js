'use strict'

// בקובץ זה אנו מגדירים הגדרות שונות על-מנת שנוכל לבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
// הגדרת המשתנה fs כקבוע וטעינה של כל היכולות של המודול fs באמצעות חיבורו
const fs = require('fs')
// הגדרת המשתנה path כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const path = require('path')
// הגדרת המשתנה Sequelize כקבוע המכיל את כל היכולות של המודול 'sequelize' באמצעות חיבורו
const Sequelize = require('sequelize')
// הגדרת המשתנה env כקבוע המכיל הגדרה של סביבת העבודה בה אנו נמצאים בהתאם להגדרות המצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const env = process.env.NODE_ENV || 'development'
// הגדרת המשתנה config המחבר את הקובץ config.json שנוצר עם ההתקנה של sequelize ומכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]
// נבצע בדיקה בנוגע לחיבור לסביבת העבודה בהתאם לסביבת העבודה שבה אנו נמצאים באמצעות יצירת אינסטנס חדש של Sequelize שיודע להתחבר לסביבת העבודה בהתאם להגדרת של שמצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
if (process.env.DATABASE_URL) {
    var sequelize = new Sequelize(process.env.DATABASE_URL, config)
} else {
    var sequelize = new Sequelize(config.database, config.username,
        config.password, config)
}
// המשתנה db מכיל אובייקט ריק
const db = {}

// למעשה אנו טוענים את המודל הרלוונטי בו אנו עושים שימוש ושהוא לא index.js ואז אנו עוברים עם לולאת forEach המוציאה איבר-איבר של file ומביאה לנו את המודל שיובא על-ידי sequelize והיא מכניסה את השם של המודל לתוך מערך באובייקט שמצוי במשתנה db
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
}).forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

// אנו עוברים על המפתחות שמצויים בתוך האובייקט המצוי במשתנה db עם לולאת forEach ובודקים שהמפתח associate נמצא בתוך המערך של modelName שמצוי במשתנה db המכיל למעשה אובייקט
Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

// sequelize שמצוי תחת המשתנה db מכיל את היכולות שמצויות בתוך המשתנה sequelize
db.sequelize = sequelize
// Sequelize שמצוי תחת המשתנה db מכיל את היכולות שמצויות בתוך המשתנה Sequelize
db.Sequelize = Sequelize

// ייצוא היכולות של המודול db החוצה
module.exports = db