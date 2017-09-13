// ייבוא היכולות של jQuery על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של ה- class Templates על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import Templates from './Templates'
// ייבוא היכולות של ה- class Player על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import Player from './Player'

// ה- class AlbumsBoard מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
// הגדרת ה- class בשם AlbumsBoard וייצוא היכולות שלו
export default class AlbumsBoard {
    // אנו משתמשים בפונקציית הבנאי במחלקה כדי להעביר ערכים ליצירת אינסטנס חדש, ולמעשה פונקציית הבנאי במחלקה מכילה ומפעילה את כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
    constructor() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקשורים למחלקה
        this.bindEvents()
        // הפעלה של הפונקציה getAllAlbums המאפשרת לקבל את כל הנתונים של האלבומים ולהציגם ב- DOM
        this.getAllAlbums()
        // יצירת אינסטנס חדש של Player
        this.player = new Player()
    }

    // באמצעות הפונקציה removeLoader אנו מוחקים את ה- loader כאשר יש מידע להצגה ב- DOM
    removeLoader() {
        // מחיקת ה- class בשם loading מה- div המכיל מזהה ייחודי בשם album-list כאשר יש מידע להצגה ב- DOM
        $('#album-list').removeClass('loading')
    }

    // באמצעות הפונקציה appendAlbums המקבלת את הפרמטר albums אנו מכניסים אלבומים ל- DOM
    appendAlbums( albums ) {
        // הפעלה של הפונקציה removeLoader המוחקת את ה- loader כאשר יש מידע להצגה ב- DOM
        this.removeLoader()
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''
        // כדי להציג את כל האלבומים ב- DOM נעבור על המשתנה albums באמצעות לולאת for
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album המצויה תחת ה- class Templates בהתאם למיקום של albums המתקבל מהלולאה
            html += Templates.album( albums[ i ] )

        // הכנסת המשתנה html שהגדרנו לעיל היכן שיש class בשם row המצוי תחת div המכיל מזהה ייחודי בשם album-list, ובכך אנו מציגים למעשה ב- DOM את האלבומים הקיימים
        $('#album-list .row').append( html )
    }

    // באמצעות הפונקציה getAllAlbums מתאפשר לקבל את כל הנתונים של האלבומים לצורך הצגתם ב- DOM
    getAllAlbums() {
        // הפעלה של הפונקציה getAllAlbums המצויה תחת ה- class DataService ולאחר מכן נפעיל פרומיס המפעיל את הפונקציה appendAlbums המאפשרת להכניס אלבומים ל- DOM ונשתמש ב- proxy מאחר ואנו רוצים שההקשר של this בתוך הפונקציה appendAlbums יתייחס בכל מקרה ל- class AlbumsBoard
        DataService.getAllAlbums().then( $.proxy(this.appendAlbums, this) )
    }

    // באמצעות הפונקציה saveAlbum המקבלת את הפרמטר e (המסמל event) מתאפשר לשמור ולהציג ב- DOM אלבום ספציפי לפי המספר id שלו
    displayAlbum( e ) {
        // מניעת פעולת ברירת המחדל של ___
        e.preventDefault()
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את האירוע
        let el = $(e.target)
        // המשתנה album_id מכיל את המספר id של האלבום
        let album_id = el.data('album-id')
        // הפעלה של הפונקציה getAlbumById המצויה תחת DataService ומקבלת את המשתנה album_id המכיל את המספר id של האלבום ולאחר מכן נפעיל פרומיס המפעיל את הפונקציה playAlbum המצויה תחת הערך של player המפעילה את נגן המוסיקה
        DataService.getAlbumById( album_id ).then( this.player.playAlbum )
    }

    // באמצעות הפונקציה editAlbum מתאפשר לערוך נתונים באלבום
    editAlbum() {

    }

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בלוח של האלבומים
    bindEvents() {
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם album-list המכיל את ה- class בשם record ואת תגית h4, אנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם displayAlbum יתייחס לאלמנט עצמו (button) ולא ל- class AlbumsBoard, לכן אנו משתמשים ב- proxy כדי שההקשר של this בתוך הפונקציה displayAlbum יתייחס בכל מקרה ל- class AlbumsBoard
        $('#album-list').on('click', '.record h4', $.proxy( this.displayAlbum, this ))
        // כאשר לוחצים על הכפתור שיש לו class בשם edit-icon, אנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם editAlbum יתייחס לאלמנט עצמו (button) ולא ל- class AlbumsBoard, לכן אנו משתמשים ב- proxy כדי שההקשר של this בתוך הפונקציה editAlbum יתייחס בכל מקרה ל- class AlbumsBoard
        $('.edit-icon').on('click', $.proxy( this.editAlbum, this ))
    }
}