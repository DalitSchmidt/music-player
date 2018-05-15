// ייבוא היכולות של jQuery על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import AlbumTemplates from './../Templates/AlbumTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט DeleteAlbum יוכל להשתמש בהן
import Router from '../Router'

// האובייקט DeleteAlbum מכיל את כל הפונקציות המאפשרות לנו לבצע פעולות שונות בעת מחיקת האלבום
// הגדרת האובייקט DeleteAlbum כקבוע
const DeleteAlbum = {
    // הפרופרטי currentPage מוגדר כברירת מחדל בערך הבוליאני false
    currentPage: false,

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
            // הוספת ה- class בשם modal-open עם תכונת ה- css בשם padding-right שהערך שלה הוא 17px לאלמנט body
            $('body').addClass('modal-open').css('padding-right', '17px')
            // הוספת ה- class בשם in עם תכונות ה- css בשם display שהערך שלה הוא block ו- padding-right שהערך שלה הוא 17px לאלמנט div שיש לו מזהה ייחודי בשם modal
            $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px'} )
        })
    },

    // באמצעות הפונקציה confirmAlbumDelete מתאפשר לבצע פעולות עם אישור מחיקת האלבום
    confirmAlbumDelete: function ( e ) {
        // המשתנה album_id מכיל את האלמנט הקרוב ביותר שמכיל את ה- data בשם album-id, כך שלמעשה המשתנה album_id מכיל את האלמנט הקרוב ביותר עם המספר id של האלבום
        const album_id = $( e.target ).data('album-id')
        // הפעלה של הפונקציה deleteAlbum המקבלת את המשתנה album_id המכיל את האלמנט הקרוב ביותר עם המספר id של האלבום ומצויה תחת האובייקט AlbumAPIService שבאמצעותה מתאפשר למחוק אלבום לפי המספר id שלו, ולאחר מכן נפעיל promise המקבלת את המשתנה album
        AlbumAPIService.deleteAlbum( album_id ).then( album => {
            // האלמנט שיש לו class בשם model-dialog מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומפעיל פונקציית callback (המסומנת כפונקציית חץ)
            $('.modal-dialog').fadeOut('slow', () => {
                // המשתנה html מפעיל את הפונקציה deleteSuccessDialog המקבלת 2 משתנים, המשתנה הראשון הוא this.currentPage המכיל את העמוד בו אנו נמצאים והמשתנה השני הוא album_id המכיל את האלמנט הקרוב ביותר עם המספר id של האלבום, שמצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום נמחק
                let html = AlbumTemplates.deleteSuccessDialog( this.currentPage, album_id )
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

    // באמצעות הפונקציה cancelDelete מתאפשר לחזור לעמוד שבו היינו בעת לחיצה על אלמנט שיש לו את ה- class בשם cancel, ולמעשה לבטל את פעולת המחיקה
    cancelDelete: function () {
        // הסרת ה- class בשם modal-open ואיפוס תכונת ה- css בשם padding-right מהאלמנט body
        $('body').removeClass('modal-open').css('padding-right', '0')
        // הסרת ה- class בשם in ושינוי פקודת ה- css בשם display לערך none ואיפוס תכונת ה- css בשם padding-right מהאלמנט div שיש לו מזהה ייחודי בשם modal
        $('#modal').removeClass('in').css( {'display': 'none', 'padding-right': '0'} )
    },

    // באמצעות פונקציה updateCurrentPage מתאפשר לעדכן את העמוד בו אנו נמצאים
    updateCurrentPage: function () {
        // הפרופרטי currentPage מכיל את הפונקציה getRoute המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את הנתיב
        this.currentPage = Router.getRoute()
    },

    // באמצעות הפונקציה handleDelete המקבלת את המשתנה e (המסמל event) מתאפשר לטעון מחדש את העמוד בו אנו נמצאים
    handleDelete: function ( e ) {
        // באמצעות הפונקציה location.reload אנו טוענים מחדש את העמוד בו אנו נמצאים
        location.reload()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים בעת מחיקת האלבום
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שהוא למעשה ה- DOM) נפעיל את הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם updateCurrentPage יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים ב- window) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה updateCurrentPage יתייחס בכל מקרה לאובייקט DeleteAlbum
        $(window).bind('hashchange',$.proxy( this.updateCurrentPage, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-info-controls או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם record או על האלמנט שיש לו class בשם remove-icon שמצוי בתוך אלמנט שיש לו class בשם search-results-record שמצויים בתוך האלמנט div שיש לו מזהה ייחודי בשם main-container נפעיל את הפונקציה deleteMessage המאפשרת להציג הודעת מחיקה כאשר אנו מעוניינים למחוק אלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteMessage יתייחס לאלמנט עצמו (האלמנט שעליו בוצעה פעולת הלחיצה) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteMessage יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        // בעת ביצוע לחיצה על אלמנט button שיש לו מזהה ייחודי בשם approve-delete שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה confirmAlbumDelete שבאמצעותה מתאפשר לבצע פעולות עם אישור מחיקת האלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmAlbumDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם approve-delete) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmAlbumDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmAlbumDelete, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם cancel שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה cancelDelete שבאמצעותה מתאפשר לחזור לעמוד שבו היינו, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם cancelDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם cancel) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה cancelDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelDelete, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו attribute מסוג date-action בשם handle-delete שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה handleDelete שבאמצעותה מתאפשר לטעון מחדש את העמוד בו אנו נמצאים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם handleDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו attribute מסוג data-action בשם handle-delete) ולא לאובייקט DeleteAlbum, לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה handleDelete יתייחס בכל מקרה לאובייקט DeleteAlbum
        $('.modal-dialog').on('click', '[data-action=handle-delete]', $.proxy( this.handleDelete, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט DeleteAlbum
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים בעת מחיקת האלבום
        this.bindEvents()
        // הפעלה של הפונקציה updateCurrentPage שבאמצעותה מתאפשר לעדכן את העמוד בו אנו נמצאים
        this.updateCurrentPage()

    }
}

// ייצוא היכולות של האובייקט DeleteAlbum החוצה
export default DeleteAlbum