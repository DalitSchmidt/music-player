// ייבוא היכולות של jQuery על-מנת שהאובייקט DataService יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט DataService המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו לבצע בקשות שונות אל מול ה- API
// הגדרת האובייקט DataService כקבוע
const DataService = {
    // באמצעות הפונקציה getAllAlbums אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums', ובכך מתאפשר למעשה לקבל את כל האלבומים
    getAllAlbums: function() {
        return $.getJSON('http://localhost:3000/api/albums')
    },

    /**
     * @param album_id
     * @returns {Promise}
     */
    // באמצעות הפונקציה getAlbumById אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל את אלבום ספציפי לפי המספר id שלו
    getAlbumById: function( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id)
    },

    // באמצעות הפונקציה saveAlbum אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג POST לנתיב 'http://localhost:3000/api/albums', שה- contentType שהבקשה שולחת הוא מסוג application/json והנתונים שמתקבלים בבקשה מבצעים JSON.stringify לנתונים ש- album מכיל, ובכך מתאפשר למעשה ליצור אלבום בלוח ולשמור אותו
    saveAlbum: function() {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        })
    },

    // באמצעות הפונקציה updateAlbum המקבלת את הפרמטר album_id אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג PUT לנתיב 'http://localhost:3000/api/albums/' + album_id, שה- contentType שהבקשה שולחת הוא מסוג application/json, ובכך מתאפשר למעשה לעדכן נתונים באלבום לפי המספר id שלו
    updateAlbum: function( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'PUT'
        })
    },

    // באמצעות הפונקציה deleteAlbum המקבלת את הפרמטר album_id אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג DELETE לנתיב 'http://localhost:3000/api/albums/' + album_id, שה- contentType שהבקשה שולחת הוא מסוג application/json, ובכך מתאפשר למעשה למחוק אלבום לפי המספר id שלו
    deleteAlbum: function( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        })
    },

    // באמצעות הפונקציה searchAlbum המקבלת את הפרמטר term אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/search/' + term, ובכך מתאפשר למעשה לבצע חיפוש של נתונים הקשורים לאלבום
    searchAlbums: function( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    }
}

// ייצוא היכולות של האובייקט DataService החוצה
export default DataService