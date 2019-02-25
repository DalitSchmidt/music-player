// המשתנה models מכיל את כל היכולות המצויות בקבצים המצויים בתיקיית models באמצעות חיבורה
const models = require('../models')

// האובייקט AlbumsController מכיל פונקציות שבאמצעותן מתאפשר לבצע בקרה על האלבומים
// הגדרה של האובייקט AlbumsController כקבוע
const AlbumsController = {
    // באמצעות הפונקציה deleteAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) מתאפשר לבצע בקרה על המחיקה של האלבום
    deleteAlbum: function ( album_id ) {
        // הפונקציה מחזירה מספר שאילתות מחוברות שבאמצעותן מתאפשר למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו וכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו המצויים בטבלאות שונות במסד הנתונים
        return models.sequelize.Promise.join(
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה של האלבומים בהתאם למזהה הייחודי של האלבום והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר ומתבצעת מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג DELETE
            models.sequelize.query(`DELETE FROM albums WHERE album_id = '${album_id}'`, { type: models.sequelize.QueryTypes.DELETE }),
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה של השירים בהתאם למזהה הייחודי של האלבום והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר ומתבצעת מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג DELETE
            models.sequelize.query(`DELETE FROM songs WHERE album_id = '${album_id}'`, { type: models.sequelize.QueryTypes.DELETE }),
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה המקשרת של albums_to_genres בהתאם למזהה הייחודי של האלבום והגדרה של סוג השאילתא המתבצעת, במקרה זה מאחר ומתבצעת מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המזהה הייחודי שלו, השאילתא המתבצעת היא מסוג DELETE
            models.sequelize.query(`DELETE FROM albums_to_genres WHERE album_id = '${album_id}'`, { type: models.sequelize.QueryTypes.DELETE })
        )
    }
}

// ייצוא היכולות של המודול AlbumsController החוצה
module.exports = AlbumsController