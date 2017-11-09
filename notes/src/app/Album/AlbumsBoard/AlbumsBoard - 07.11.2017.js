// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט Templates על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import Templates from '../Templates/Templates'

// האובייקט AlbumsBoard מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
// הגדרת האובייקט AlbumsBoard כקבוע
const AlbumsBoard = {
    // באמצעות הפונקציה removeLoader אנו מוחקים את ה- loader כאשר יש מידע להצגה ב- DOM
    removeLoader: function() {
        // מחיקת ה- class בשם loading מה- div המכיל מזהה ייחודי בשם album-list כאשר יש מידע להצגה ב- DOM
        $('#album-list').removeClass('loading')
    },

    // באמצעות הפונקציה appendAlbums המקבלת את הפרמטר albums אנו מכניסים אלבומים ל- DOM
    appendAlbums: function( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // כדי להציג את כל האלבומים ב- DOM נעבור על המשתנה albums באמצעות לולאת for
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album המצויה תחת האובייקט Templates בהתאם למיקום של albums המתקבל מהלולאה
            html += Templates.album( albums[ i ] )

        // הכנסת המשתנה html שהגדרנו לעיל היכן שיש class בשם row המצוי תחת div המכיל מזהה ייחודי בשם album-list, ובכך אנו מציגים למעשה ב- DOM את האלבומים הקיימים
        $('#album-list .row').html( html )
    },

    // באמצעות הפונקציה getAllAlbums מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
    getAllAlbums: function() {
        // הפונקציה מחזירה את הפונקציה getAllAlbums המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
        return AlbumAPIService.getAllAlbums()
    },

    // באמצעות הפונקציה applyAlbums מתאפשר להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
    applyAlbums: function() {
        // הפעלה של הפונקציה getAllAlbums המאפשרת לקבל את האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums', ולאחר מכן נחזיר promise המפעיל את הפונקציה appendAlbums המאפשרת להכניס אלבומים ל- DOM
        this.getAllAlbums().then(albums => {
            this.appendAlbums( albums )
        })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard
    init: function() {
        // הפעלה של הפונקציה applyAlbums המאפשרת להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
        this.applyAlbums()
    }
}

// ייצוא היכולות של האובייקט AlbumsBoard החוצה
export default AlbumsBoard