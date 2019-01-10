// ייבוא היכולות של jQuery על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumTemplates from './../Templates/AlbumTemplates'

// האובייקט DeleteAlbum מכיל את כל הפונקציות המאפשרות לנו לבצע פעולות שונות בעת מחיקת האלבום
// הגדרת האובייקט DeleteAlbum כקבוע
const DeleteAlbum = {
    // באמצעות הפונקציה deleteMessage המקבלת את המשתנה e (המסמל event) מתאפשר להציג הודעת מחיקה כאשר אנו מעוניינים למחוק אלבום
    deleteMessage: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שיש לו את ה- attribute בשם data-album-id ושמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט עם המספר id של האלבום
        const album_id = $( e.target ).closest('[data-album-id]').data('album-id')
        // הפעלה של הפונקציה getAlbumById (המבצעת בקשת getJSON לנתיב 'http://localhost:3000/api/albums' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספיציפי לפי המספר id שלו) ושמצויה תחת האובייקט בשם AlbumAPIService אשר מקבלת את המשתנה album_id המכיל את האלמנט עם המספר id של האלבום, ולאחר מכן נפעיל promise המקבל את המשתנה album
        AlbumAPIService.getAlbumById( album_id ).then(album => {
            // המשתנה html מפעיל את הפונקציה deleteDialog המקבלת את המשתנה album המצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת האלבום הרלוונטי
            let html = AlbumTemplates.deleteDialog( album )
            // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה מתאימה בדבר מחיקת האלבום הרלוונטי לתוך האלמנט שיש לו class בשם modal-dialog, ובכך למעשה אנו מאפשרים להציג למשתמש הודעה מתאימה בדבר מחיקת האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
            $('.modal-dialog').html( html )
        })
    },

    // באמצעות הפונקציה confirmAlbumDelete מתאפשר לבצע פעולות עם אישור מחיקת האלבום
    confirmAlbumDelete: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט הקרוב ביותר עם המספר id של האלבום
        const album_id = $( e.target ).data('album-id')
        // הפעלה של הפונקציה deleteAlbum המקבלת את המשתנה album_id המכיל את האלמנט הקרוב ביותר עם המספר id של האלבום ומצויה תחת האובייקט AlbumAPIService שבאמצעותה מתאפשר למחוק אלבום לפי המספר id שלו, ולאחר מכן נפעיל promise המקבלת את המשתנה album
        AlbumAPIService.deleteAlbum( album_id ).then( album => {
            // האלמנט שיש לו class בשם model-dialog מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומפעיל פונקציית callback
            $('.modal-dialog').fadeOut('slow', function () {
                // המשתנה html מפעיל את הפונקציה deleteSuccessDialog המצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום נמחק
                let html = AlbumTemplates.deleteSuccessDialog()
                // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה המאשרת שהאלבום נמחק לתוך האלמנט שיש לו class בשם model-dialog המבצע fadeIn (הצגה איטית של האלמנט), ובכך למעשה אנו מאפשרים להציג למשתמש הודעה המאשרת שהאלבום נמחק
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    // באמצעות הפונקציה removeAlbumFromArray מתאפשר למחוק את האלבום מהמערך בעת ביצוע פעולת המחיקה
    removeAlbumFromArray: function ( e, album ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שיש לו את ה- attribute בשם data-album-id ושמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט עם המספר id של האלבום
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        // הלולאת for עוברת על המערך של האלבומים
        for ( let i = 0; i < album.length; i++ ) {
            // אם המספר id של האלבום במערך זהה למספר id של המשתנה album_id המכיל את האלמנט עם המספר id של האלבום, אז נבצע הסרה של האלבום מהמערך
            if ( album[ i ].id === album_id ) {
                album.splice( i, 1 )
                break
            }
        }

        // הצגה של המשתנה album בחלון ה- console
        console.log( album )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים בעת מחיקת האלבום
    bindEvents: function () {
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-info-controls או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם record או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם search-results-record שמצויים בתוך האלמנט div שיש לו מזהה ייחודי בשם main-container נפעיל את הפונקציה deleteMessage המאפשרת להציג הודעת מחיקה כאשר אנו מעוניינים למחוק אלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteMessage יתייחס לאלמנט עצמו (האלמנט שעליו בוצעה פעולת הלחיצה) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteMessage יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        // בעת ביצוע לחיצה על אלמנט button שיש לו מזהה ייחודי בשם approve-delete שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה confirmAlbumDelete שבאמצעותה מתאפשר לבצע פעולות עם אישור מחיקת האלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmAlbumDelete יתייחס לאלמנט עצמו (אלמנט button שיש לו מזהה ייחודי בשם approve-delete) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmAlbumDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmAlbumDelete, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט DeleteAlbum
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים בעת מחיקת האלבום
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט DeleteAlbum החוצה
export default DeleteAlbum