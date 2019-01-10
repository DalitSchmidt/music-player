// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט Templates על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import Templates from '../Templates/Templates'

// האובייקט AlbumsBoard מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
// הגדרת האובייקט AlbumsBoard כקבוע
const AlbumsBoard = {
    // באמצעות הפונקציה appendAlbums המקבלת את הפרמטר albums אנו מכניסים אלבומים ל- DOM
    appendAlbums: function( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // כדי להציג את כל האלבומים ב- DOM נעבור על המשתנה albums באמצעות לולאת for
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album המצויה תחת האובייקט Templates בהתאם למיקום של albums המתקבל מהלולאה
            html += Templates.album( albums[ i ] )

        // ביצוע דהייה איטית היכן שיש אלמנט div שיש לו מזהה ייחודי בשם album-list
        $('#album-list').fadeTo('slow', 1.5, function()  {
            // בסיום הדהייה נבצע מחיקה של ה- class בשם loading מהאלמנט div שיש לו מזהה ייחודי album-list, כך שלמעשה התאפשר לנו להציג ב- DOM את ה- loader שטוען את האלבומים
            $('#album-list').removeClass('loading')
        // ביצוע השהייה של שנייה לפני הכנסת המשתנה html הצכחך תבנית html של האלבום לתוך אלמנט div שיש לו מזהה ייחודי בשם album-list, ובכך מתאפשר להציג ב- DOM את כל האלבומים הקיימים לאחר שה- loader הוסר מה- DOM
        }).delay(1000, function(){
            $('#album-list').html( html )
        });
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