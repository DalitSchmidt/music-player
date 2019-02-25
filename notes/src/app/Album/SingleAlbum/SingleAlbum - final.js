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
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט SingleAlbum יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט SingleAlbum מכיל את כל הפונקציות שבאמצעותן מתאפשר לתקשר אל מול האלבום המתנגן בנגן המוסיקה
// הגדרה של האובייקט SingleAlbum כקבוע
const SingleAlbum = {
    // באמצעות הפונקציה setAlbumInfoMenu מתאפשר להציג ב- DOM את התפריט שליטה על המידע של האלבום
    setAlbumInfoMenu: function () {
        // המשתנה html מפעיל את הפונקציה albumInfoMenu המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את התפריט שליטה על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoMenu()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, ובכך מתאפשר להציג למשתמש ב- DOM את התפריט שליטה על המידע של האלבום
        $('#album-info-menu').html( html )
    },

    // באמצעות הפונקציה setAlbumInfoControls (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
    setAlbumInfoControls: function ( album_id ) {
        // המשתנה html מפעיל את הפונקציה albumInfoControls (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את המקשים השולטים על המידע של האלבום
        let html = SingleAlbumTemplates.albumInfoControls( album_id )
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-controls, ובכך מתאפשר להציג למשתמש ב- DOM את המקשים השולטים על המידע של האלבום
        $('#album-info-controls').html( html )
    },

    // באמצעות הפונקציה switchDetails (שמקבלת את המשתנה e המסמל event) מתאפשר להחליף בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ברשימת ההשמעה
    switchDetails: function ( e ) {
        // המשתנה el מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )

        // הסרה של ה- class בשם active מהאלמנט שיש לו class בשם active המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu
        $('#album-info-menu .active').removeClass('active')
        // הוספה של ה- class בשם active לאלמנט המצוי במשתנה el המאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('active')

        // הוספה של ה- attribute מסוג id בשם album-info-image-circle לאלמנט span המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image
        $('#album-info-image').find('span').attr('id', 'album-info-image-circle')
        // הפעלה של הפונקציה toggle שבאמצעותה מתאפשר לבצע הצגה או החלפה בין האלמנט div שיש לו מזהה ייחודי בשם album-info-description ו/או לבין האלמנט div שיש לו מזהה ייחודי בשם player-controls ו/או לבין אלמנט span המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image בהתאם לכפתור שנלחץ בתפריט
        $('#album-info-description, #player-controls, #album-info-image span').toggle()
        // הפעלה של הפונקציה toggle שבאמצעותה מתאפשר לבצע הצגה או החלפה בין האלמנט div שיש לו מזהה ייחודי בשם song-youtube לבין האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image בהתאם לכפתור שנלחץ בתפריט
        $('#song-youtube, #album-info-image img').toggle()
    },

    // באמצעות הפונקציה setAlbumInfoImage (שמקבלת את המשתנה img המכיל את התמונת Cover של האלבום) מתאפשר להציג ב- DOM את התמונת Cover של האלבום
    setAlbumInfoImage: function ( img ) {
        // המשתנה html מפעיל את הפונקציה albumInfoImage (שמקבלת את המשתנה img המכיל את התמונת Cover של האלבום) המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את התמונת Cover של האלבום
        let html = SingleAlbumTemplates.albumInfoImage( img )
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-image, ובכך מתאפשר להציג למשתמש ב- DOM את התמונת Cover של האלבום
        $('#album-info-image').html( html )
    },

    // באמצעות הפונקציה setAlbumInfo (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר להציג ב- DOM את כל המידע הקשור לאלבום
    setAlbumInfo: function ( album ) {
        // המשתנה html מפעיל את הפונקציה albumInfo (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את כל המידע של האלבום
        let html = SingleAlbumTemplates.albumInfo( album )
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם album-info, ובכך מתאפשר להציג למשתמש ב- DOM את כל המידע הקשור לאלבום
        $('#album-info').html( html )
    },

    // באמצעות הפונקציה setNowPlayingSong מתאפשר להציג ב- DOM את שם השיר המתנגן בנגן המוסיקה
    setNowPlayingSong: function () {
        // המשתנה html מפעיל את הפונקציה nowPlayingSong המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את שם השיר המתנגן בנגן המוסיקה
        let html = SingleAlbumTemplates.nowPlayingSong()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם now-playing-song, ובכך מתאפשר להציג למשתמש ב- DOM את שם השיר המתנגן בנגן המוסיקה
        $('#now-playing-song').html( html )
    },

    // באמצעות הפונקציה setAlbumControls מתאפשר להציג ב- DOM את המקשים השולטים על ההפעלה של נגן המוסיקה
    setAlbumControls: function () {
        // המשתנה html מפעיל את הפונקציה albumControls המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את המקשים השולטים על ההפעלה של נגן המוסיקה
        let html = SingleAlbumTemplates.albumControls()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם controls, ובכך מתאפשר להציג למשתמש ב- DOM את המקשים השולטים על ההפעלה של נגן המוסיקה
        $('#controls').html( html )
    },

    // באמצעות הפונקציה setAlbumPlaylist (שמקבלת את המשתנה playlist המכיל את רשימת ההשמעה) מתאפשר להציג ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
    setAlbumPlaylist: function ( playlist ) {
        // המשתנה html מפעיל את הפונקציה albumPlaylist (שמקבלת את המשתנה playlist המכיל את רשימת ההשמעה) המצויה תחת האובייקט SingleAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        // הכנסה של המשתנה html לתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, ובכך מתאפשר להציג למשתמש ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
        $('#player-playlist').html( html )
    },

    // באמצעות הפונקציה getAlbum (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של אלבום) מתאפשר לקבל אלבום ספציפי לפי המזהה הייחודי שלו
    getAlbum: function ( album_id ) {
        // הפעלה של הפונקציה getAlbumById (שמקבלת את המשתנה album_id המכיל את המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לקבל אלבום ספציפי השמור במסד הנתונים לפי המזהה הייחודי שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album המכיל את כל הפרטים של האלבום ומבצעת מספר פעולות
        AlbumAPIService.getAlbumById( album_id ).then(album => {
            // הפעלה של הפונקציה setAlbumInfoMenu שבאמצעותה מתאפשר להציג ב- DOM את התפריט שליטה על המידע של האלבום
            this.setAlbumInfoMenu()
            // הפעלה של הפונקציה setAlbumInfoControls (שמקבלת את הפרופרטי album_id המצוי בתוך המשתנה album המכיל את המזהה הייחודי של האלבום) שבאמצעותה מתאפשר להציג ב- DOM את המקשים השולטים על המידע של האלבום
            this.setAlbumInfoControls( album.album_id )
            // הפעלה של הפונקציה setAlbumInfoImage (שמקבלת את הפרופרטי album_image המצוי בתוך המשתנה album המכיל את התמונה של האלבום) שבאמצעותה מתאפשר להציג ב- DOM את התמונת Cover של האלבום
            this.setAlbumInfoImage( album.album_image )
            // הפעלה של הפונקציה setAlbumInfo (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) שבאמצעותה מתאפשר להציג ב- DOM את כל המידע הקשור לאלבום
            this.setAlbumInfo( album )
            // הפעלה של הפונקציה setNowPlayingSong שבאמצעותה מתאפשר להציג ב- DOM את שם השיר המתנגן בנגן המוסיקה
            this.setNowPlayingSong()
            // הפעלה של הפונקציה setAlbumControls שבאמצעותה מתאפשר להציג ב- DOM את המקשים השולטים על ההפעלה של נגן המוסיקה
            this.setAlbumControls()
            // הפעלה של הפונקציה setAlbumPlaylist (שמקבלת את הפרופרטי songs המצוי בתוך המשתנה album המכיל את כל השירים של האלבום) שבאמצעותה מתאפשר להציג ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
            this.setAlbumPlaylist( album.songs )
            // הפעלה של הפונקציה setSong המצויה תחת האובייקט Player ושבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו' על האלמנט li הראשון המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
            Player.setSong( $('#player-playlist li').first() )
        // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) המבצעת מספר פעולות
        }, () => {
            // הפעלה של הפונקציה redirect (שמקבלת את הערך של הנתיב all-albums) המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע הפניה מחדש לנתיב
            Router.redirect('all-albums')
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים באובייקט SingleAlbum
    bindEvents: function () {
        // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu, נפעיל את הפונקציה switchDetails שבאמצעותה מתאפשר להחליף בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ברשימת ההשמעה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה-callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם album-info-links המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-menu), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט SingleAlbum
        $('#album-info-menu').on('click', '.album-info-links', $.proxy( this.switchDetails, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SingleAlbum
    init: function () {
        // המשתנה album_id מפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של האלבום המצוי ב- URL
        let album_id = Utils.getAlbumID()

        // נבדוק אם המשתנה album_id מכיל את המזהה הייחודי של אלבום לא קיים, אז נבצע מספר פעולות
        if ( !album_id ) {
            // הפעלה של הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע הפניה מחדש לנתיב
            Router.redirect()

            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        }

        // הפעלה של הפונקציה getAlbum (שמקבלת את המשתנה album_id המפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של האלבום המצוי ב- URL) שבאמצעותה מתאפשר לקבל אלבום ספציפי לפי המזהה הייחודי שלו
        this.getAlbum( album_id )
        // הפעלה של הפונקציה initYouTube המצויה תחת האובייקט Player ושבאמצעותה מתאפשר לאתחל את הטעינה של נגן ה- YouTube עם הטעינה של העמוד
        Player.initYouTube()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים באובייקט SingleAlbum
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SingleAlbum החוצה
export default SingleAlbum