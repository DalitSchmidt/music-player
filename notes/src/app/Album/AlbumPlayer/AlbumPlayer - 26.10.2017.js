// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import AlbumTemplates from './Templates/AlbumTemplates'

// האובייקט AlbumPlayer מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול האלבום שמתנגן בנגן המוסיקה
// הגדרת האובייקט AlbumPlayer כקבוע
const AlbumPlayer = {
    // באמצעות הפונקציה switchDetails המקבלת את הפרמטר e המסמל event, אנו מחליפים בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ב- playlist
    switchDetails: function( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // מחיקת ה- class בשם active מהאלמנט שיש לו class זה ומצוי בתוך תגית div המכילה מזהה ייחודי בשם album-info-menu
        $('#album-info-menu .active').removeClass('active')
        // הוספת ה- class בשם active למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('active')

        // ביצוע הצגה או החלפה בין הנתונים המצויים בתוך תגית div שיש לה מזהה ייחודי בשם album-info-description לבין הנתונים המצויים בתוך תגית div שיש לה מזהה ייחודי בשם player-controls, באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#album-info-description, #player-controls').toggle()
        // ביצוע הצגה או החלפה בין הנתונים המצויים בתןך תגית div שיש לה מזהה ייחודי בשם song-youtube לבין הנתונים המצויים באלמנט img המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-image, באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#song-youtube, #album-info-image img').toggle()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
    bindEvents: function() {
        // כאשר מתבצעת לחיצה על אלמנט שיש לו class בשם album-info-links המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-menu, נשתמש ב- proxy מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם album-info-links המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-menu) וכדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#album-info-menu .album-info-links').on('click', $.proxy( this.switchDetails, this ))
    },

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
    getAlbumID: function () {
        // המשתנה id מכיל את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים למערך לאחר שאנו מורידים ממנו את הסימן '/', כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        let id = location.hash.substring(1).split('/')[1]
        // הפונקציה מחזירה את המשתנה id המכיל את המספר id של האלבום המצוי ב- URL
        return id
    },

    // באמצעות הפונקציה setPlaylist המקבלת את המשתנה playlist מתאפשר להציג ב- DOM את רשימת השירים של האלבום המוצג
    setPlaylist: function( playlist ) {
        // המשתנה html מכיל את התבנית html המכילה את רשימת השירים באמצעות הפעלה של הפונקציה albumPlaylist המקבלת את המשתנה playlist ומצויה תחת האובייקט AlbumTemplate שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        let html = AlbumTemplates.albumPlaylist( playlist )
        // הכנסת המשתה html לתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, ובכך למעשה מתאפשר להציג ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        $('#player-playlist').html( html )
    },

    // באמצעות הפונקציה setAlbumInfo המקבלת את הפרמטר album מתאפשר להציג ב- DOM את כל המידע הקשור לאלבום המוצג
    setAlbumInfo: function ( album ) {
        // המשתנה html מכיל את התבנית html המכילה את כל המידע של האלבום המוצג באמצעות הפעלה של הפונקציה albumInfo המקבלת את המשתנה album ומצויה תחת האובייקט AlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
        let html = AlbumTemplates.albumInfo( album )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info, ובכך למעשה מתאפשר להציג ב- DOM את כל המידע של האלבום המוצג
        $('#album-info').html( html )
    },

    // באמצעות הפונקציה setAlbumImage המקבלת את המשתנה img מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
    setAlbumImage: function( img ) {
        // המשתנה html מכיל את התבנית html המכילה את התמונת cover של האלבום המוצג באמצעות הפעלה של הפונקציה albumImage המקבלת את המשתנה img ומצויה תחת האובייקט AlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
        let html = AlbumTemplates.albumImage( img )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image, ובכך למעשה מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
        $('#album-info-image').html( html )
    },

    // באמצעות הפונקציה getAlbum מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function () {
        // המשתנה id מפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
        let id = this.getAlbumID()
        // הפעלה של הפונקציה getAlbumById (המבצעת בקשת getJSON לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו) ושמצויה תחת ה- class בשם DataService אשר מקבלת את המשתנה id (המפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL), ולאחר מכן נפעיל promise המקבל את המשתנה album ומפעיל פונקציות שונות הקשורות להצגה של האלבום ב- DOM
        DataService.getAlbumById( id ).then(album => {
            // הפעלה של הפונקציה setPlaylist (המאפשרת להציג ב- DOM את רשימת השירים של האלבום המוצג) המקבלת את השירים של האלבום
            this.setPlaylist( album.songs )
            // הפעלה של הפונקציה setAlbumInfo (המאפשרת להציג ב- DOM את כל המידע הקשור לאלבום המוצג) המקבלת את המשתנה album המכיל את המכיל את הפרטים של האלבום
            this.setAlbumInfo( album )
            // הפעלה של הפונקציה setAlbumImage (המאפשרת להציג ב- DOM את התמונת cover של האלבום המוצג) המקבלת את התמונה של האלבום
            this.setAlbumImage( album.album_image )
        })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumPlayer
    init: function () {
        // הפעלה של הפונקציה getAlbum המאפשר לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumPlayer החוצה
export default AlbumPlayer