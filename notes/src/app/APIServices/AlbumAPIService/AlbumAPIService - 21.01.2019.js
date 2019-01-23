// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumAPIService יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט AlbumAPIService המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו לבצע בקשות שונות אל מול ה- API הקשורות לאלבומים
// הגדרת האובייקט AlbumAPIService כקבוע
const AlbumAPIService = {
    // באמצעות הפונקציה getAllAlbums אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums', ובכך מתאפשר למעשה לקבל את כל האלבומים
    getAllAlbums: function () {
        return $.getJSON('http://localhost:3000/api/albums')
    },

    // באמצעות הפונקציה getAlbumById אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל את אלבום ספציפי לפי המספר id שלו
    getAlbumById: function ( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id)
    },

    // באמצעות הפונקציה getYoutubeID המקבלת את המשתנה youtube_id אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/youtube/' + youtube_id, ובכך מתאפשר למעשה לבצע חיפוש ולקבל את המזהה הייחודי של סרטון ה- YouTube
    getYouTubeID: function ( youtube_id ) {
        return $.getJSON('http://localhost:3000/api/youtube/' + youtube_id)
    },

    // באמצעות הפונקציה saveAlbum המקבלת את המשתנה album אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג POST לנתיב 'http://localhost:3000/api/albums', שה- contentType שהבקשה שולחת הוא מסוג application/json והנתונים שמתקבלים בבקשה מבצעים JSON.stringify לנתונים ש- album מכיל, ובכך מתאפשר למעשה ליצור אלבום בלוח ולשמור אותו
    saveAlbum: function ( album ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        })
    },

    // באמצעות הפונקציה updateAlbum המקבלת את הפרמטרים album_id ו- album אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג PUT לנתיב 'http://localhost:3000/api/albums/' + album_id, שה- contentType שהבקשה שולחת הוא מסוג application/json והנתונים שמתקבלים בבקשה מבצעים JSON.stringify לנתונים ש- album מכיל, ובכך מתאפשר למעשה לעדכן נתונים באלבום לפי המספר id שלו
    updateAlbum: function ( album_id, album ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify( album )
        })
    },

    // באמצעות הפונקציה deleteAlbum המקבלת את הפרמטר album_id אנו מבצעים בקשת ajax שהמתוד שלה הוא מסוג DELETE לנתיב 'http://localhost:3000/api/albums/' + album_id, שה- contentType שהבקשה שולחת הוא מסוג application/json, ובכך מתאפשר למעשה למחוק אלבום לפי המספר id שלו
    deleteAlbum: function ( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        })
    }
}

// ייצוא היכולות של האובייקט AlbumAPIService החוצה
export default AlbumAPIService