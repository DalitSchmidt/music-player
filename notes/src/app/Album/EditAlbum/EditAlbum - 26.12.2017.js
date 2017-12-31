// ייבוא היכולות של jQuery על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Validator על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Validator from '../Validator'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Utils from '../Utils'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Router from '../Router'
// ייבוא היכולות של האובייקט Player על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Player from "../Player"
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumForm from './AlbumForm'

// האובייקט EditAlbum מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס עריכת אלבום
// הגדרת האובייקט EditAlbum כקבוע
const EditAlbum = {
    // הפרופרטי album_id מוגדר כברירת מחדל כ- null
    album_id: null,

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
    getAlbumID: function () {
        // המשתנה id מכיל את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים לצערך לאחר שאנו מורידים ממנו את הסימן '/' כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        let id = location.hash.substring(1).split('/')[1]
        // הפונקציה מחזירה את המשתנה id של האלבום המצוי ב- URL
        return id
    },

    // באמצעות הפונקציה setValues מתאפשר לשים את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
    setValues: function ( album ) {
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ותיבת הטקסט שיש להם את ה- attribute בשם required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        // כדי לקבל את הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת each שפונקציית ה- callback שלה מקבלת את המשתנים index ו- input
        $.each(inputs, ( index, input ) => {
           // הבאת הנתונים של האלבום המצויים באלמנטים מסוג input שיש להם את ה- attribute מסוג name והכנסת הערכים שלהם לתוך השדות של האלמנטים מסוג input
           input.value = album [ input.name ]
        })
        // הפעלה של הפונקציה changeCoverImage המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
        AlbumForm.changeCoverImage()
        // הפעלה של הפונקציה addSongsInputs המקבלת את המשתנה album.songs.length המכיל את אורך המערך של השירים ואת המשתנה album.songs המכיל את המערך של השירים המצויים בתוך האלבום שמצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להוסיף ל- DOM שורה עם השדות להוספת שירים
        AlbumForm.addSongsInputs( album.songs.length, album.songs )
    },

    // באמצעות הפונקציה saveChanges המקבלת את המשתנה e (המסמל event) מתאפשר לשמור את השינויים שבוצעו בעריכת האלבום
    saveChanges: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ל- event מסוג submit של אלמנט form שיש לו מזהה ייחודי בשם add-new-album
        e.preventDefault()
        // המשתנה album מכיל את הפונקציה validateAlbum המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לשדות הנתונים של האלבום
        const album = AlbumForm.validateAlbum()
        // הפעלה של הפונקציה updateAlbum המקבלת את המשתנה this.album_id המכיל את המספר id של האלבום ואת המשתנה album המכיל את הפרטים של האלבום שמצוי תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לעדכן נתונים באלבום לפי המספר id שלו, ולאחר מכן נפעיל promise המפעיל את הפונקציה setSuccessMessage המציגה הודעת הצלחה עם עדכון הנתונים של האלבום
        AlbumAPIService.updateAlbum( this.album_id, album ).then( this.setSuccessMessage )
    },

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם עדכון הנתונים של האלבום
    setSuccessMessage: function() {
        alert('Album has been updated :)')
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס עריכת אלבום
    bindEvents: function () {
        // כאשר מתבצעת שליחה של הטופס שיש לו מזהה ייחודי בשם add-new-album, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveChanges יתייחס לאלמנט עצמו (במקרה זה לאלמנט form שיש לו מזהה ייחודי בשם add-new-album), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveChanges יתייחס בכל מקרה לאובייקט EditAlbum
        $('#add-new-album').on('submit', $.proxy( this.saveChanges, this ))
    },

    // באמצעות הפונקציה getAlbum מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function () {
        // הפעלה של הפונקציה getAlbumById המקבלת את המשתנה id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת 2 משתנים
        AlbumAPIService.getAlbumById( this.album_id ).then(
            // המשתנה album מפעיל פונקציות שונות הקשורות להבאת הערכים של השדות לעריכת אלבום
            album => {
                // הצגת המשתנה album בחלון ה- console
                console.log( album )
                // הפעלה של הפונקציה setValues המקבלת את המשתנה album שבאמצעותה מתאפשר לשים את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
                this.setValues( album )
            // המשתנה error מכיל את השגיאות האפשריות
            }, error => {
                // הפעלה של הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
                Router.redirect()
                return
            })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט EditAlbum
    init: function () {
        // הפרופקטי album_id מפעיל את הפונקציה getAlbumID המאפשרת לקבל את המספר id של האלבום המצוי ב- URL
        this.album_id = this.getAlbumID()

        // נבדוק אם המספר id של האלבום לא קיים
        if ( !this.album_id ) {
            // אז נפעיל את הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
            Router.redirect()
            return
        }

        // הפעלה של הפונקציה getAlbum שבאמצעותה מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים בטופס עריכת אלבום
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט EditAlbum החוצה
export default EditAlbum