// בקובץ זה מוגדרות הגדרות שונות על-מנת שיתאפשר לבצע שימוש ב- sequelize שהוא מודול שבאמצעותו מתאפשר לתקשר אל מול מסד הנתונים
// המשתנה fs מכיל את כל היכולות של המודול באמצעות חיבורו
const fs        = require('fs')
// המשתנה path מכיל את כל היכולות של המודול באמצעות חיבורו
const path      = require('path')
// המשתנה Sequelize מכיל את כל היכולות של המודול sequelize באמצעות חיבורו
const Sequelize = require('sequelize')
// המשתנה basename מפעיל את הפונקציה basename (שמקבלת את המשתנה filename המצוי בתוך המשתנה module) המצויה תחת המשתנה path
const basename  = path.basename( module.filename )
// המשתנה env מכיל הגדרה של סביבת העבודה בה אנו נמצאים בהתאם להגדרות המצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const env       = process.env.NODE_ENV || 'development'
// המשתנה config מחבר את הקובץ config.json שנוצר עם ההתקנה של sequelize ומכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
const config    = require('./../config/config.json')[env]
// המשתנה db מכיל אובייקט ריק
const db        = {}

// הצהרה על משתנה גלובלי שנבצע בו שימוש בקובץ זה
let sequelize
// נבדוק את החיבור לסביבת העבודה בהתאם לסביבת העבודה שבה אנו נמצאים באמצעות יצירת אינסטנס חדש של Sequelize שיודע להתחבר לסביבת העבודה בהתאם להגדרות של סביבת העבודה שמצויות בקובץ config.json המכיל הגדרות של חיבור לסביבות עבודה שונות (פיתוח, בדיקות ועלייה לאוויר)
if ( config.use_env_variable )
    sequelize = new Sequelize( process.env[ config.use_env_variable ] )
else
    sequelize = new Sequelize( config.database, config.username, config.password, config )

// הפעלה של הפונקציה readdirSync (שמקבלת את המשתנה dirname__) שהיא פונקציה מובנית של Node.js שבאמצעותה מתאפשר לקדד את התווים לשימוש עבור שמות הקבצים שהועברו לקריאה חוזרת, ולאחר מכן נפעיל את הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה file המכיל את הקובץ ומחזירה את המודל הרלוונטי המתבצע בו שימוש ושהוא לא index.js
fs.readdirSync( __dirname ).filter(( file ) => {
        return ( file.indexOf('.') !== 0 ) && ( file !== basename ) && ( file.slice(-3) === '.js' )
    })
    // הפעלה של לולאת forEach שבאמצעותה מתאפשר לעבור על איבר-איבר במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה file המכיל את הקובץ ומבצעת מספר פעולות
    .forEach(( file ) => {
        // המשתנה model מכיל את המודל שיובא על-ידי sequelize
        let model = sequelize['import']( path.join( __dirname, file ) )
        // הכנסה של שם המודל לתוך המערך באובייקט המצוי במשתנה db
        db[ model.name ] = model
    })

// מעבר על המפתחות המצויים בתוך האובייקט המצוי במשתנה db עם לולאת forEach שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) בודקת שהמפתח associate נמצא בתוך המערך של modelName המצוי במשתנה db המכיל אובייקט
Object.keys( db ).forEach(( modelName ) => {
    if ( db[ modelName ].associate )
        db[ modelName ].associate( db )
})

// המשתנה sequelize המצוי תחת המשתנה db מכיל את היכולות המצויות בתוך המשתנה sequelize
db.sequelize = sequelize
// המשתנה Sequelize המצוי תחת המשתנה db מכיל את היכולות המצויות בתוך המשתנה Sequelize
db.Sequelize = Sequelize

// ייצוא היכולות של המודול db החוצה
module.exports = db