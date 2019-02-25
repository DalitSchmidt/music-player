// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumAPIService יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט AlbumAPIService המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע בקשות שונות אל מול ה- API הקשורות לאלבומים
// הגדרה של האובייקט AlbumAPIService כקבוע
const AlbumAPIService = {
    // באמצעות הפונקציה getAllAlbums מתאפשר לקבל את כל האלבומים השמורים במסד הנתונים
    getAllAlbums: function () {
        // הפונקציה מחזירה בקשת getJSON לנתיב 'http://localhost:3000/api/albums' על-מנת שניתן יהיה לקבל את כל האלבומים השמורים במסד הנתונים
        return $.getJSON('http://localhost:3000/api/albums')
    },

    // באמצעות הפונקציה getAlbumById (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) מתאפשר לקבל אלבום ספציפי השמור במסד הנתונים לפי המזהה הייחודי שלו
    getAlbumById: function ( album_id ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/albums/' + album_id' על-מנת שניתן יהיה לקבל אלבום ספציפי השמור במסד הנתונים לפי המזהה הייחודי שלו
        return $.getJSON('http://localhost:3000/api/albums/' + album_id)
    },

    // באמצעות הפונקציה getYouTubeID (שמקבלת את המשתנה youtube_id המכיל את המזהה הייחודי של סרטון ה- YouTube) מתאפשר לבצע חיפוש ב- API של YouTube ולקבל את המזהה הייחודי של סרטון ה- YouTube
    getYouTubeID: function ( youtube_id ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/youtube/' + youtube_id' על-מנת שניתן יהיה לבצע חיפוש ב- API של YouTube ולקבל את המזהה הייחודי של סרטון ה- YouTube
        return $.getJSON('http://localhost:3000/api/youtube/' + youtube_id)
    },

    // באמצעות הפונקציה saveAlbum (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר ליצור אלבום חדש ולשמור אותו במסד הנתונים
    saveAlbum: function ( album ) {
        // הפונקציה מחזירה בקשת ajax שהמתוד שלה הוא מסוג POST לנתיב 'http://localhost:3000/api/albums', שה- contentType שהבקשה שולחת הוא מסוג application/json והנתונים שמתקבלים בבקשה מבצעים JSON.stringify לנתונים המצויים במשתנה album על-מנת שניתן יהיה ליצור אלבום חדש ולשמור אותו במסד הנתונים
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        })
    },

    // באמצעות הפונקציה updateAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום ואת המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר לעדכן נתונים באלבום השמור במסד הנתונים לפי המזהה הייחודי שלו
    updateAlbum: function ( album_id, album ) {
        // הפונקציה מחזירה בקשת ajax שהמתוד שלה הוא מסוג PUT לנתיב http://localhost:3000/api/albums/' + album_id', שה- contentType שהבקשה שולחת הוא מסוג application/json והנתונים שמתקבלים בבקשה מבצעים JSON.stringify לנתונים המצויים במשתנה album על-מנת שניתן יהיה לעדכן נתונים באלבום השמור במסד הנתונים לפי המזהה הייחודי שלו
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify( album )
        })
    },

    // באמצעות הפונקציה deleteAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) מתאפשר למחוק אלבום השמור במסד הנתונים לפי המזהה הייחודי שלו
    deleteAlbum: function ( album_id ) {
        // הפונקציה מחזירה בקשת ajax שהמתוד שלה הוא מסוג DELETE לנתיב http://localhost:3000/api/albums/' + album_id', שה- contentType שהבקשה שולחת הוא מסוג application/json על-מנת שניתן יהיה למחוק אלבום השמור במסד הנתונים לפי המזהה הייחודי שלו
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        })
    }
}

// ייצוא היכולות של האובייקט AlbumAPIService החוצה
export default AlbumAPIService