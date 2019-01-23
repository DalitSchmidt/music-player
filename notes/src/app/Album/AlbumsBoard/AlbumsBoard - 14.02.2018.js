// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumTemplates על-מנת שהאובייקט AlbumsBoard יוכל להשתמש בהן
import AlbumTemplates from '../Templates/AlbumTemplates'

// האובייקט AlbumsBoard מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
// הגדרת האובייקט AlbumsBoard כקבוע
const AlbumsBoard = {
    // באמצעות הפונקציה getAllAlbums מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
    getAllAlbums: function () {
        // הפונקציה מחזירה את הפונקציה getAllAlbums המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
        return AlbumAPIService.getAllAlbums()
    },

    // באמצעות הפונקציה appendAlbums המקבלת את הפרמטר albums אנו מכניסים אלבומים ל- DOM
    appendAlbums: function ( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // כדי להציג את כל האלבומים ב- DOM נעבור על המשתנה albums באמצעות לולאת for
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album המצויה תחת האובייקט AlbumTemplates בהתאם למיקום של albums המתקבל מהלולאה
            html += AlbumTemplates.album( albums[ i ] )

        // ביצוע דהייה איטית היכן שיש אלמנט div שיש לו מזהה ייחודי בשם album-list
        $('#album-list').fadeTo('slow', 1.5, () => {
            // בסיום הדהייה נבצע מחיקה של ה- class בשם loading מהאלמנט div שיש לו מזהה ייחודי album-list, כך שלמעשה התאפשר לנו להציג ב- DOM את ה- loader שטוען את האלבומים
            $('#album-list').removeClass('loading')
        // ביצוע השהייה של שנייה וחצי לפני הכנסת המשתנה html המכיל תבנית html של האלבום לתוך אלמנט div שיש לו מזהה ייחודי בשם album-list, ובכך מתאפשר להציג ב- DOM את כל האלבומים הקיימים לאחר שה- loader הוסר מה- DOM
        }).delay(1500, () => {
            $('#album-list').html( html )
        })
    },

    // באמצעות הפונקציה noAlbums מתאפשר להציג הודעה מתאימה ב- DOM כאשר אין אלבומים שמורים במסד הנתונים
    noAlbums: function () {
        // המשתנה html מכיל את הפונקציה noAlbums המצויה תחת האובייקט AlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המאפשרת להציג הודעה ב- DOM האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכתפור המתאים, כאשר אין אלבומים שמורים במסד הנתונים
        let html = AlbumTemplates.noAlbums()

        // ביצוע דהייה איטית היכן שיש אלמנט div שיש לו מזהה ייחודי בשם album-list
        $('#album-list').fadeTo('slow', 1.5, () => {
            // בסיום הדהייה נבצע מחיקה של ה- class בשם loading מהאלמנט div שיש לו מזהה ייחודי album-list, כך שלמעשה התאפשר לנו להציג ב- DOM את ה- loader שטוען את האלבומים
            $('#album-list').removeClass('loading')
        // ביצוע השהייה של שנייה וחצי לפני הכנסת המשתנה html המכיל תבנית html של האלבום לתוך אלמנט div שיש לו מזהה ייחודי בשם album-list, ובכך מתאפשר להציג ב- DOM את כל האלבומים הקיימים לאחר שה- loader הוסר מה- DOM
        }).delay(1500, () => {
            $('#album-list').html( html )
        })
    },

    // באמצעות הפונקציה applyAlbums מתאפשר להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
    applyAlbums: function () {
        // הפעלה של הפונקציה getAllAlbums המאפשרת לקבל את האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums', ולאחר מכן נפעיל promise שפונקציית ה- callback שלו מקבלת את המשתנים albums, status ו- xhr
        this.getAllAlbums().then(( albums, status, xhr ) => {
            // נבדוק אם הפרופרטי status המצוי במשתנה xhr הוא 204 או אם המשתנה albums הוא undefined, אם כן, אז נפעיל את הפונקציה noAlbums שבאמצעותה מתאפשר להציג הודעה מתאימה ב- DOM כאשר אין אלבומים שמורים במסד הנתונים
            if ( xhr.status === 204 || typeof albums === 'undefined' )
                this.noAlbums()
            else
                // אחרת, כלומר יש אלבומים שמורים במסד הנתונים, נפעיל את הפונקציה appendAlbums המקבלת את המשתנה albums ושבאמצעותה מתאפשר להכניס אלבומים ל- DOM
                this.appendAlbums( albums )
        })
    },

        // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard
        init: function () {
        // הפעלה של הפונקציה applyAlbums המאפשרת להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
        this.applyAlbums()
    }
}

// ייצוא היכולות של האובייקט AlbumsBoard החוצה
export default AlbumsBoard