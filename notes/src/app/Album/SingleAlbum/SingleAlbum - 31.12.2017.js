// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט SingleAlbumTemplates על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import SingleAlbumTemplates from '../Templates/SingleAlbumTemplates'
// ייבוא היכולות של האובייקט SingleAlbumTemplates על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import Player from '../Player'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import Router from '../Router'

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
        // כאשר מתבצעת לחיצה על אלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, נשתמש ב- proxy מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu) וכדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#album-info-menu').on('click', '.album-info-links', $.proxy( this.switchDetails, this ))
    },

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
    getAlbumID: function () {
        // המשתנה id מכיל את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים למערך לאחר שאנו מורידים ממנו את הסימן '/', כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        let id = location.hash.substring(1).split('/')[1]
        // הפונקציה מחזירה את המשתנה id המכיל את המספר id של האלבום המצוי ב- URL
        return id
    },

    // באמצעות הפונקציה setAlbumPlaylist המקבלת את המשתנה playlist מתאפשר להציג ב- DOM את רשימת השירים של האלבום המוצג
    setAlbumPlaylist: function( playlist ) {
        // המשתנה html מכיל את התבנית html המכילה את רשימת השירים באמצעות הפעלה של הפונקציה albumPlaylist המקבלת את המשתנה playlist ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        // הכנסת המשתה html לתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, ובכך למעשה מתאפשר להציג ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        $('#player-playlist').html( html )
    },

    // באמצעות הפונקציה setAlbumInfo המקבלת את הפרמטר album מתאפשר להציג ב- DOM את כל המידע הקשור לאלבום המוצג
    setAlbumInfo: function ( album ) {
        // המשתנה html מכיל את התבנית html המכילה את כל המידע של האלבום המוצג באמצעות הפעלה של הפונקציה albumInfo המקבלת את המשתנה album ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
        let html = SingleAlbumTemplates.albumInfo( album )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info, ובכך למעשה מתאפשר להציג ב- DOM את כל המידע של האלבום המוצג
        $('#album-info').html( html )
    },

    // באמצעות הפונקציה setAlbumInfoControls המקבלת את המשתנה album_id מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
    setAlbumInfoControls: function ( album_id ) {
        // המשתנה html מכיל את התבנית html המכילה את המקשים השולטים על המידע של האלבום באמצעות הפעלה של הפונקציה albumInfoControls המקבלת את המשתנה album_id ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את המקשים השולטים על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoControls( album_id )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-controls, ובכך למעשה מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
        $('#album-info-controls').html( html )
    },

    // באמצעות הפונקציה setAlbumInfoMenu מתאפשר להציג ב- DOM את התפריט שליטה על המידע של האלבום
    setAlbumInfoMenu: function () {
        // המשתנה html מכיל את התבנית html המכילה את התפריט שליטה על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoMenu()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, ובכך למעשה מתאפשר להציג ב- DOM את התפריט שליטה של המידע של האלבום
        $('#album-info-menu').html( html )
    },

    // באמצעות הפונקציה setAlbumImage המקבלת את המשתנה img מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
    setAlbumImage: function( img ) {
        // המשתנה html מכיל את התבנית html המכילה את התמונת cover של האלבום המוצג באמצעות הפעלה של הפונקציה albumImage המקבלת את המשתנה img ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
        let html = SingleAlbumTemplates.albumImage( img )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image, ובכך למעשה מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
        $('#album-info-image').html( html )
    },

    // באמצעות הפונקציה setNowPlayingSong מתאפשר להציג ב- DOM את השם של השיר שמתנגן כעת בנגן
    setNowPlayingSong: function () {
        // המשתנה html מפעיל את הפונקציה nowPlayingSong המצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את השם של השיר שמתנגן כעת בנגן
        let html = SingleAlbumTemplates.nowPlayingSong()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם now-playing-song, ובכך למעשה מתאפשר להציג ב- DOM את השם של השיר שמתנגן כעת בנגן
        $('#now-playing-song').html( html )
    },

    // באמצעות הפונקציה setAlbumControls מתאפשר להציג ב- DOM את המקשים השולטים על ההפעלה של הנגן
    setAlbumControls: function () {
        // המשתנה html מפעיל את הפונקציה albumControls המצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את המקשים השולטים על ההפעלה של הנגן
        let html = SingleAlbumTemplates.albumControls()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם controls, ובכך למעשה מתאפשר להציג ב- DOM את המקשים השולטים על ההפעלה של הנגן
        $('#controls').html( html )
    },

    // באמצעות הפונקציה getAlbum המקבלת את המשתנה id מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function ( id ) {
        // הפעלה של הפונקציה getAlbumById המקבלת את המשתנה id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת 2 משתנים
        AlbumAPIService.getAlbumById(id).then(
            // המשתנה album מפעיל פונקציות שונות הקשורות להצגה של האלבום ב- DOM
            album => {
                // הפעלה של הפונקציה setAlbumPlaylist (המאפשרת להציג ב- DOM את רשימת השירים של האלבום המוצג) המקבלת את השירים של האלבום
                this.setAlbumPlaylist(album.songs)
                // הפעלה של הפונקציה setAlbumInfo (המאפשרת להציג ב- DOM את כל המידע הקשור לאלבום המוצג) המקבלת את המשתנה album המכיל את המכיל את הפרטים של האלבום
                this.setAlbumInfo(album)
                // הפעלה של הפונקציה setAlbumInfoControls המקבלת את המספר id של האלבום ושמאפשרת להציג ב- DOM את המקשים השולטים על המידע של האלבום
                this.setAlbumInfoControls(album.album_id)
                // הפעלה של הפונקציה setAlbumInfoMenu המאפשרת להציג ב- DOM את כל התפריט שליטה על המידע של האלבום
                this.setAlbumInfoMenu()
                // הפעלה של הפונקציה setAlbumImage (המאפשרת להציג ב- DOM את התמונת cover של האלבום המוצג) המקבלת את התמונה של האלבום
                this.setAlbumImage(album.album_image)
                // הפעלה של הפונקציה setNowPlayingSong המאפשרת להציג ב- DOM את השם של השיר שמתנגן כעת בנגן
                this.setNowPlayingSong()
                // הפעלה של הפונקציה setAlbumControls המאפשרת להציג ב- DOM את המקשים השולטים על ההפעלה של הנגן
                this.setAlbumControls()
                // הפעלת הפונקציה playSong שמצויה תחת האובייקט Player על האלמנט li הראשון שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist
                Player.setSong($('#player-playlist li').first())
            // המשתנה error מכיל את השגיאות האפשריות
            }, error => {
                // הפעלה של הפונקציה redirect שמקבלת את הערך של הנתיב 'all-albums' המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
                Router.redirect('all-albums')
            })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumPlayer
    init: function () {
        // המשתנה id מפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
        let id = this.getAlbumID()

        // נבדוק אם המספר id של האלבום לא קיים
        if ( !id ) {
            // אז נפעיל את הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
            Router.redirect()
            return
        }

        // הפעלה של הפונקציה getAlbum המקבלת את המשתנה id (שמפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL) המאפשרת לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum( id )
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
        this.bindEvents()
        // הפעלת הפונקציה init שמצויה תחת האובייקט Player
        Player.init()
    }
}

// ייצוא היכולות של האובייקט AlbumPlayer החוצה
export default AlbumPlayer