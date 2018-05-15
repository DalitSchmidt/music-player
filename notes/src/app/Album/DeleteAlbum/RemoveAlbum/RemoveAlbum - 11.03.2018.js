// ייבוא היכולות של jQuery על-מנת שהאובייקט RemoveAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט RemoveAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט RemoveAlbum יוכל להשתמש בהן
import AlbumTemplates from './../Templates/AlbumTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט RemoveAlbum יוכל להשתמש בהן
import Router from '../Router'

// האובייקט RemoveAlbum מכיל את כל הפונקציות המאפשרות לנו לבצע פעולות שונות בעת הסרת האלבום
// הגדרת האובייקט RemoveAlbum כקבוע
const RemoveAlbum = {
    // הפרופרטי currentPage מוגדר כברירת מחדל בערך הבוליאני false
    currentPage: false,

    // באמצעות הפונקציה removeMessage המקבלת את המשתנה e (המסמל event) מתאפשר להציג הודעת הסרה כאשר אנו מעוניינים להסיר אלבום
    removeMessage: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שיש לו את ה- attribute בשם data-album-id ושמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט עם המספר id של האלבום
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        // הפעלה של הפונקציה getAlbumById (המבצעת בקשת getJSON לנתיב 'http://localhost:3000/api/albums' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספיציפי לפי המספר id שלו) ושמצויה תחת האובייקט בשם AlbumAPIService אשר מקבלת את המשתנה album_id המכיל את האלמנט עם המספר id של האלבום, ולאחר מכן נפעיל promise המקבל את המשתנה album
        AlbumAPIService.getAlbumById( album_id ).then(album => {
            // המשתנה html מפעיל את הפונקציה removeDialog המקבלת את המשתנה album המצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר הסרת האלבום הרלוונטי
            let html = AlbumTemplates.removeDialog( album )

            // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה מתאימה בדבר הסרת האלבום הרלוונטי לתוך האלמנט שיש לו class בשם modal-dialog, ובכך למעשה אנו מאפשרים להציג למשתמש הודעה מתאימה בדבר הסרת האלבום הרלוונטי בטרם ביצוע פעולת ההסרה
            $('.modal-dialog').html( html )
            // הוספת ה- class בשם modal-open עם תכונת ה- css בשם padding-right שהערך שלה הוא 17px לאלמנט body
            $('body').addClass('modal-open').css('padding-right', '17px')
            // הוספת ה- class בשם in עם תכונות ה- css בשם display שהערך שלה הוא block, padding-right שהערך שלה הוא 0 ו- overflow-y שהערך שלה הוא scroll לאלמנט div שיש לו מזהה ייחודי בשם modal
            $('#modal').addClass('in').css({'display': 'block', 'padding-right': '0', 'overflow-y': 'scroll'})
        })
    },

    // באמצעות הפונקציה confirmRemoveAlbum המקבלת את המשתנה e (המסמל event) מתאפשר לבצע פעולות עם אישור הסרת האלבום
    confirmRemoveAlbum: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט הקרוב ביותר עם המספר id של האלבום
        let album_id = $( e.target ).data('album-id')

        // הפעלה של הפונקציה deleteAlbum המקבלת את המשתנה album_id המכיל את האלמנט הקרוב ביותר עם המספר id של האלבום ומצויה תחת האובייקט AlbumAPIService שבאמצעותה מתאפשר למחוק אלבום לפי המספר id שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
        AlbumAPIService.deleteAlbum( album_id ).then(() => {
            // האלמנט שיש לו class בשם modal-dialog מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומפעיל פונקציית callback (המסומנת כפונקציית חץ)
            $('.modal-dialog').fadeOut('slow', () => {
                // המשתנה html מפעיל את הפונקציה removeSuccessDialog המקבלת 2 משתנים, המשתנה הראשון הוא this.currentPage המכיל את העמוד בו אנו נמצאים והמשתנה השני הוא album_id המכיל את האלמנט הקרוב ביותר עם המספר id של האלבום, שמצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום הוסר
                let html = AlbumTemplates.removeSuccessDialog( this.currentPage, album_id )
                // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה המאשרת שהאלבום הוסר לתוך האלמנט שיש לו class בשם modal-dialog המבצע fadeIn (הצגה איטית של האלמנט), ובכך למעשה אנו מאפשרים להציג למשתמש הודעה המאשרת שהאלבום הוסר
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    // באמצעות הפונקציה cancelRemove מתאפשר לחזור לעמוד שבו היינו בעת לחיצה על אלמנט שיש לו את ה- class בשם cancel, ולמעשה לבטל את פעולת ההסרה
    cancelRemove: function () {
        // הסרת ה- class בשם modal-open ואיפוס תכונת ה- css בשם padding-right מהאלמנט body
        $('body').removeClass('modal-open').css('padding-right', '0')
        // הסרת ה- class בשם in ושינוי פקודת ה- css בשם display לערך none ואיפוס תכונת ה- css בשם padding-right מהאלמנט div שיש לו מזהה ייחודי בשם modal
        $('#modal').removeClass('in').css({'display': 'none', 'padding-right': '0'})
    },

    // באמצעות פונקציה updateCurrentPage מתאפשר לעדכן את העמוד בו אנו נמצאים
    updateCurrentPage: function () {
        // הפרופרטי currentPage מכיל את הפונקציה getRoute המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את הנתיב
        this.currentPage = Router.getRoute()
    },

    // באמצעות הפונקציה handleRemove מתאפשר לטעון מחדש את העמוד בו אנו נמצאים
    handleRemove: function () {
        // באמצעות הפונקציה location.reload אנו טוענים מחדש את העמוד בו אנו נמצאים
        location.reload()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים בעת הסרת האלבום
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שהוא למעשה ה- DOM) נפעיל את הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם updateCurrentPage יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים ב- window) ולא לאובייקט RemoveAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה updateCurrentPage יתייחס בכל מקרה לאובייקט RemoveAlbum
        $(window).bind('hashchange',$.proxy( this.updateCurrentPage, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-info-controls או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם record או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם search-results-record שמצויים בתוך האלמנט div שיש לו מזהה ייחודי בשם main-container נפעיל את הפונקציה removeMessage המאפשרת להציג הודעת הסרה כאשר אנו מעוניינים להסיר אלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeMessage יתייחס לאלמנט עצמו (האלמנט שעליו בוצעה פעולת הלחיצה) ולא לאובייקט RemoveAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה removeMessage יתייחס בכל מקרה לאובייקט RemoveAlbum
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.removeMessage, this ))
        // בעת ביצוע לחיצה על אלמנט button שיש לו מזהה ייחודי בשם approve-remove שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה confirmRemoveAlbum שבאמצעותה מתאפשר לבצע פעולות עם אישור הסרת האלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmRemoveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם approve-remove) ולא לאובייקט RemoveAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmRemoveAlbum יתייחס בכל מקרה לאובייקט RemoveAlbum
        $('.modal-dialog').on('click', '#approve-remove', $.proxy( this.confirmRemoveAlbum, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם cancel שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה cancelRemove שבאמצעותה מתאפשר לחזור לעמוד שבו היינו, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם cancelRemove יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם cancel) ולא לאובייקט RemoveAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה cancelRemove יתייחס בכל מקרה לאובייקט RemoveAlbum
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelRemove, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו attribute מסוג date-action בשם handle-remove שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה handleRemove שבאמצעותה מתאפשר לטעון מחדש את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם handleRemove יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו attribute מסוג data-action בשם handle-remove) ולא לאובייקט RemoveAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה handleRemove יתייחס בכל מקרה לאובייקט RemoveAlbum
        $('.modal-dialog').on('click', '[data-action=handle-remove]', $.proxy( this.handleRemove, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט RemoveAlbum
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים בעת הסרת האלבום
        this.bindEvents()
        // הפעלה של הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים
        this.updateCurrentPage()
    }
}

// ייצוא היכולות של האובייקט RemoveAlbum החוצה
export default RemoveAlbum