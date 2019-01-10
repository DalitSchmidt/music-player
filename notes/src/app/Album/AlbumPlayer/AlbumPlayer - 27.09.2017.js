// ייבוא היכולות של jQuery על-מנת שה- class AlbumForm יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של האובייקט AlbumTemplates המצוי בתיקיית Templates על-מנת שהאובייקט AlbumPlayer יוכל להשתמש בהן
import AlbumTemplate from './Templates/AlbumTemplate'

// האובייקט AlbumPlayer מכיל את כל הפונקציות המאפשרות לנו לתקשר אל המול נגן המוסיקה
// הגדרת האובייקט בשם AlbumPlayer כקבוע
const AlbumPlayer = {
    // באמצעות הפונקציה fetchAlbum מתאפשר להביא אלבום מסוים לפי המספר id שלו
    fetchAlbum: function () {
        // הפעלה של הפונקציה getAlbumById המקבלת את המשתנה album_id המכיל את המספר id של האלבום ושמצויה תחת ה- class DataService ושבאמצעותה אנו שולחים בקשת get המביאה אלבום ספציפי לפי המספר id שלו, ולאחר מכן נפעיל promise עם המשתנה album המכיל את כל הפרטים של האלבום
        DataService.getAlbumById( 1 ).then(album => {
            // המשתנה html מפעיל את הפונקציה getTemplate המצויה תחת האובייקט AlbumTemplate ושבאמצעותה אנו מציגים ב- DOM את כל התבנית של האלבום
            let html = AlbumTemplate.getTemplate( album )
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בנגן המוסיקה
    bindEvents: function() {

    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים בנגן המוסיקה
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumPlayer החוצה
export default AlbumPlayer