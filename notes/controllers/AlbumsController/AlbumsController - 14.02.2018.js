// המשתנה models מכיל את כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')

// האובייקט AlbumsController מכיל פונקציות המאפשרות לנו לבצע בקרה על האלבומים
// הגדרת האובייקט AlbumsController כקבוע
const AlbumsController = {
    // באמצעות הפונקציה deleteAlbum המקבלת את המשתנה album_id מתאפשר לבצע בקרה על מחיקת האלבום
    deleteAlbum: function ( album_id ) {
        // הפונקציה מחזירה מספר שאילתות מחוברות המאפשרות למחוק את כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו וכוללים פרטים על האלבום, על השירים ועל הז'אנרים שלו המצויים בטבלאות שונות
        return models.sequelize.Promise.join(
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה של האלבומים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו צריכים לבצע מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
            models.sequelize.query(`DELETE FROM albums WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה של השירים בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו צריכים לבצע מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
            models.sequelize.query(`DELETE FROM songs WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
            // השאילתא מוחקת את כל הנתונים המצויים בטבלה של 'albums_to_genres' בהתאם למספר id של האלבום והגדרת הסוג של השאילתא שאנו מבצעים, במקרה זה מאחר ואנו צריכים לבצע מחיקה של כל הנתונים הקשורים לאלבום ספציפי לפי המספר id שלו, השאילתא שאנו מבצעים היא מסוג DELETE
            models.sequelize.query(`DELETE FROM albums_to_genres WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE})
        )
    }
}

// ייצוא היכולות של המודול AlbumsController החוצה
module.exports = AlbumsController