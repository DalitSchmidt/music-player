// ייבוא היכולות של jQuery על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של ה- class Templates על-מנת שה- class AlbumsBoard יוכל להשתמש בהן
import Templates from './Templates/Templates'

// ה- class AlbumsBoard מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
// הגדרת ה- class בשם AlbumsBoard וייצוא היכולות שלו
export default class AlbumsBoard {
    // אנו משתמשים בפונקציית הבנאי במחלקה כדי להעביר ערכים ליצירת אינסטנס חדש, כך שלמעשה פונקציית הבנאי במחלקה מכילה ומפעילה את כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
    constructor() {
        // הפעלה של הפונקציה applyAlbums המאפשרת להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
        this.applyAlbums()
    }

    // באמצעות הפונקציה removeLoader אנו מוחקים את ה- loader כאשר יש מידע להצגה ב- DOM
    removeLoader() {
        // מחיקת ה- class בשם loading מה- div המכיל מזהה ייחודי בשם album-list כאשר יש מידע להצגה ב- DOM
        $('#album-list').removeClass('loading')
    }

    // באמצעות הפונקציה appendAlbums המקבלת את הפרמטר albums אנו מכניסים אלבומים ל- DOM
    appendAlbums( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''
        // כדי להציג את כל האלבומים ב- DOM נעבור על המשתנה albums באמצעות לולאת for
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album המצויה תחת ה- class Templates בהתאם למיקום של albums המתקבל מהלולאה
            html += Templates.album( albums[ i ] )

        // הכנסת המשתנה html שהגדרנו לעיל היכן שיש class בשם row המצוי תחת div המכיל מזהה ייחודי בשם album-list, ובכך אנו מציגים למעשה ב- DOM את האלבומים הקיימים
        $('#album-list .row').append( html )
    }

    // באמצעות הפונקציה getAllAlbums מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
    getAllAlbums() {
        // הפונקציה מחזירה את הפונקציה getAllAlbums המצויה תחת ה- class DataService ושבאמצעותה מתאפשר לקבל את כל האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums'
        return DataService.getAllAlbums()
    }

    // באמצעות הפונקציה applyAlbums מתאפשר להביא את כל האלבומים שמצויים בשרת ולהציג אותם ב- DOM
    applyAlbums() {
        // הפעלה של הפונקציה getAllAlbums המאפשרת לקבל את האלבומים על-ידי ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums', ולאחר מכן נחזיר promise המפעיל את הפונקציה appendAlbums המאפשרת להכניס אלבומים ל- DOM
        this.getAllAlbums().then(albums => {
            this.appendAlbums( albums )
        })
    }
}