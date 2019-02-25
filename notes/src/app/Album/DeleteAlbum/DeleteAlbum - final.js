// ייבוא היכולות של jQuery על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumTemplates from './../Templates/AlbumTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import Router from '../Router'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט DeleteAlbum מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע פעולות שונות בעת ביצוע פעולת המחיקה של האלבום
// הגדרה של האובייקט DeleteAlbum כקבוע
const DeleteAlbum = {
    // הפרופרטי currentPage מכיל כברירת מחדל את הערך הבוליאני false
    currentPage: false,

    // באמצעות הפונקציה deleteMessage (שמקבלת את המשתנה e המסמל event) מתאפשר להציג הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
    deleteMessage: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שיש לו attribute מסוג data-album-id המכיל את ה- data בשם album-id של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        // הפעלה של הפונקציה getAlbumById (שמקבלת את המשתנה album_id המכיל את האלמנט עם המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לקבל אלבום ספציפי השמור במסד הנתונים לפי המזהה הייחודי שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album המכיל את כל הפרטים של האלבום ומבצעת מספר פעולות
        AlbumAPIService.getAlbumById( album_id ).then(album => {
            // המשתנה html מפעיל את הפונקציה deleteDialog (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) המצויה תחת האובייקט AlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
            let html = AlbumTemplates.deleteDialog( album )
            // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
            $('.modal-dialog').html( html )

            // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
            Utils.modalOpen()
        })
    },

    // באמצעות הפונקציה confirmDeleteAlbum (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע פעולות עם אישור המחיקה של האלבום
    confirmDeleteAlbum: function ( e ) {
        // המשתנה album_id מכיל את ה- attribute מסוג data בשם album-id של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let album_id = $( e.target ).data('album-id')

        // הפעלה של הפונקציה deleteAlbum (שמקבלת את המשתנה album_id המכיל את האלמנט עם המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר למחוק אלבום השמור במסד הנתונים לפי המזהה הייחודי שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
        AlbumAPIService.deleteAlbum( album_id ).then(() => {
            // הפעלה של הפונקציה fadeOut שבאמצעותה מתאפשר לבצע דהייה איטית של האלמנט שיש לו class בשם modal-dialog ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת מספר פעולות
            $('.modal-dialog').fadeOut('slow', () => {
                // המשתנה html מפעיל את הפונקציה deleteSuccessDialog (שמקבלת את הפרופרטי currentPage המכיל את כל הפרטים של העמוד בו אנו נמצאים ואת המשתנה album_id המכיל את האלמנט עם המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום נמחק
                let html = AlbumTemplates.deleteSuccessDialog( this.currentPage, album_id )
                // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog והפעלה של הפונקציה fadeIn שבאמצעותה מתאפשר לבצע הצגה איטית של האלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעה המאשרת שהאלבום המבוקש נמחק
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    // באמצעות הפונקציה updateCurrentPage מתאפשר לעדכן את העמוד בו אנו נמצאים
    updateCurrentPage: function () {
        // הפרופרטי currentPage מפעיל את הפונקציה getRoute המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את הנתיב
        this.currentPage = Router.getRoute()
    },

    // באמצעות הפונקציה handleDelete מתאפשר לטעון מחדש את העמוד בו אנו נמצאים
    handleDelete: function () {
        // הפעלה של הפונקציה location.reload שבאמצעותה מתאפשר לטעון מחדש את העמוד בו אנו נמצאים
        location.reload()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים בעת ביצוע פעולת המחיקה של האלבום
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שהוא למעשה ה- DOM), נפעיל את הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם updateCurrentPage יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים ב- window), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה updateCurrentPage יתייחס בכל מקרה לאובייקט DeleteAlbum
        $(window).bind('hashchange', $.proxy( this.updateCurrentPage, this ))
        // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-controls או על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט שיש לו class בשם record או על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט שיש לו class בשם search-results-record ומצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם main-container, נפעיל את הפונקציה deleteMessage שבאמצעותה מתאפשר להציג הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteMessage יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-info-controls או על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט שיש לו class בשם record או על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט שיש לו class בשם search-results-record ומצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם main-container), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteMessage יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם approve-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה confirmDeleteAlbum שבאמצעותה מתאפשר לבצע פעולות עם אישור המחיקה של האלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmDeleteAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם approve-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmDeleteAlbum יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmDeleteAlbum, this ))
        // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם cancel המצוי בתוך אלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה cancelDelete המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לחזור לעמוד שבו היינו ולבטל את הפעולה של המחיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם cancelDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם cancel המצוי בתוך אלמנט שיש לו class בשם modal-dialog), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה cancelDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '.cancel', $.proxy( Utils.cancelDelete, this ))
        // כאשר מתבצעת לחיצה על האלמנט שיש לו attribute מסוג date-action בשם handle-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה handleDelete שבאמצעותה מתאפשר לטעון מחדש את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם handleDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו attribute מסוג data-action בשם handle-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה handleDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '[data-action=handle-delete]', $.proxy( this.handleDelete, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט DeleteAlbum
    init: function () {
        // הפעלה של הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים
        this.updateCurrentPage()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים בעת ביצוע פעולת המחיקה של האלבום
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט DeleteAlbum החוצה
export default DeleteAlbum