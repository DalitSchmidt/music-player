// ייבוא היכולות של jQuery על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט SingleAlbumTemplates על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import SingleAlbumTemplates from '../Templates/SingleAlbumTemplates'
// ייבוא היכולות של האובייקט Player על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import Player from '../Player'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import Router from '../Router'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט SingleAlbum מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול האלבום שמתנגן בנגן המוסיקה
// הגדרת האובייקט SingleAlbum כקבוע
const SingleAlbum = {
    // באמצעות הפונקציה setAlbumInfoMenu מתאפשר להציג ב- DOM את התפריט שליטה על המידע של האלבום
    setAlbumInfoMenu: function () {
        // המשתנה html מכיל את התבנית html המכילה את התפריט שליטה על המידע של האלבום באמצעות הפעלה של הפונקציה albumInfoMenu המצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את התפריט שליטה על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoMenu()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, ובכך למעשה מתאפשר להציג ב- DOM את התפריט שליטה על המידע של האלבום
        $('#album-info-menu').html( html )
    },

    // באמצעות הפונקציה setAlbumInfoControls המקבלת את המשתנה album_id מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
    setAlbumInfoControls: function ( album_id ) {
        // המשתנה html מכיל את התבנית html המכילה את המקשים השולטים על המידע של האלבום באמצעות הפעלה של הפונקציה albumInfoControls המקבלת את המשתנה album_id ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את המקשים השולטים על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoControls( album_id )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-controls, ובכך למעשה מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
        $('#album-info-controls').html( html )
    },

    // באמצעות הפונקציה switchDetails המקבלת את הפרמטר e המסמל event, אנו מחליפים בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ב- playlist
    switchDetails: function ( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )

        // מחיקת ה- class בשם active מהאלמנט שיש לו class זה ומצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu
        $('#album-info-menu .active').removeClass('active')
        // הוספת ה- class בשם active למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('active')

        // מציאת האלמנט span המצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-info-image והוספת ה- attribute מסוג id בשם album-info-image-circle לאלמנט span
        $('#album-info-image').find('span').attr('id', 'album-info-image-circle')
        // ביצוע הצגה או החלפה בין הנתונים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-description ו/או לבין הנתונים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם player-controls ו/או לבין האלמנט span שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-info-image, באמצעות הפעלת הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#album-info-description, #player-controls, #album-info-image span').toggle()
        // ביצוע הצגה או החלפה בין הנתונים המצויים בתןך אלמנט div שיש לו מזהה ייחודי בשם song-youtube לבין הנתונים המצויים באלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image, באמצעות הפעלת הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#song-youtube, #album-info-image img').toggle()
    },

    // באמצעות הפונקציה setAlbumInfoImage המקבלת את המשתנה img מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
    setAlbumInfoImage: function ( img ) {
        // המשתנה html מכיל את התבנית html המכילה את התמונת cover של האלבום המוצג באמצעות הפעלה של הפונקציה albumInfoImage המקבלת את המשתנה img ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
        let html = SingleAlbumTemplates.albumInfoImage( img )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image, ובכך למעשה מתאפשר להציג ב- DOM את התמונת cover של האלבום המוצג
        $('#album-info-image').html( html )
    },

    // באמצעות הפונקציה setAlbumInfo המקבלת את הפרמטר album מתאפשר להציג ב- DOM את כל המידע הקשור לאלבום המוצג
    setAlbumInfo: function ( album ) {
        // המשתנה html מכיל את התבנית html המכילה את כל המידע של האלבום המוצג באמצעות הפעלה של הפונקציה albumInfo המקבלת את המשתנה album ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
        let html = SingleAlbumTemplates.albumInfo( album )
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info, ובכך למעשה מתאפשר להציג ב- DOM את כל המידע של האלבום המוצג
        $('#album-info').html( html )
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

    // באמצעות הפונקציה setAlbumPlaylist המקבלת את המשתנה playlist מתאפשר להציג ב- DOM את רשימת השירים של האלבום המוצג
    setAlbumPlaylist: function ( playlist ) {
        // המשתנה html מכיל את התבנית html המכילה את רשימת השירים באמצעות הפעלה של הפונקציה albumPlaylist המקבלת את המשתנה playlist ומצויה תחת האובייקט SingleAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        // הכנסת המשתה html לתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, ובכך למעשה מתאפשר להציג ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        $('#player-playlist').html( html )
    },

    // באמצעות הפונקציה getAlbum המקבלת את המשתנה id מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function ( album_id ) {
        // הפעלה של הפונקציה getAlbumById המקבלת את המשתנה id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album ופונקציית callback נוספת (המסומנת כפונקציית חץ)
        AlbumAPIService.getAlbumById( album_id ).then(album => {
                // הפעלה של הפונקציה setAlbumInfoMenu המאפשרת להציג ב- DOM את כל התפריט שליטה על המידע של האלבום
                this.setAlbumInfoMenu()
                // הפעלה של הפונקציה setAlbumInfoControls המקבלת את המספר id של האלבום ושמאפשרת להציג ב- DOM את המקשים השולטים על המידע של האלבום
                this.setAlbumInfoControls( album.album_id )
                // הפעלה של הפונקציה setAlbumInfoImage (המאפשרת להציג ב- DOM את התמונת cover של האלבום המוצג) המקבלת את התמונה של האלבום
                this.setAlbumInfoImage( album.album_image )
                // הפעלה של הפונקציה setAlbumInfo (המאפשרת להציג ב- DOM את כל המידע הקשור לאלבום המוצג) המקבלת את המשתנה album המכיל את המכיל את הפרטים של האלבום
                this.setAlbumInfo( album )
                // הפעלה של הפונקציה setNowPlayingSong המאפשרת להציג ב- DOM את השם של השיר שמתנגן כעת בנגן
                this.setNowPlayingSong()
                // הפעלה של הפונקציה setAlbumControls המאפשרת להציג ב- DOM את המקשים השולטים על ההפעלה של הנגן
                this.setAlbumControls()
                // הפעלה של הפונקציה setAlbumPlaylist (המאפשרת להציג ב- DOM את רשימת השירים של האלבום המוצג) המקבלת את השירים של האלבום
                this.setAlbumPlaylist( album.songs )
                // הפעלת הפונקציה playSong שמצויה תחת האובייקט Player על האלמנט li הראשון שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist
                Player.setSong( $('#player-playlist li').first() )
                // הפעלת פונקציית callback נוספת (המסומנת כפונקציית חץ)
            }, () => {
                // הפעלה של הפונקציה redirect שמקבלת את הערך של הנתיב 'all-albums' המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
                Router.redirect('all-albums')
            })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט SingleAlbum
    bindEvents: function () {
        // כאשר מתבצעת לחיצה על אלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, נשתמש ב- proxy מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu) וכדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט SingleAlbum
        $('#album-info-menu').on('click', '.album-info-links', $.proxy( this.switchDetails, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SingleAlbum
    init: function () {
        // המשתנה id מפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
        let album_id = Utils.getAlbumID()

        // נבדוק אם המספר id של האלבום לא קיים
        if ( !album_id ) {
            // אז נפעיל את הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
            Router.redirect()
            return
        }

        // הפעלה של הפונקציה getAlbum המקבלת את המשתנה id (שמפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL) המאפשרת לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum( album_id )
        // הפעלה של הפונקציה initYouTube המצויה תחת האובייקט Player ושבאמצעותה מתאפשר לאתחל את הטעינה של נגן ה- Youtube עם הטעינה על הדף
        Player.initYouTube()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט SingleAlbum
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SingleAlbum החוצה
export default SingleAlbum