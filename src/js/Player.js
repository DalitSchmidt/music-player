// ייבוא היכולות של jQuery על-מנת שה- class AlbumForm יוכל להשתמש בהן
import $ from 'jquery'

// ה- class Player מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול נגן המוסיקה
// הגדרת ה- class בשם Player וייצוא היכולות שלו
export default class Player {
    // אנו משתמשים בפונקציית הבנאי במחלקה כדי להעביר ערכים ליצירת אינסטנס חדש, ולמעשה פונקציית הבנאי במחלקה מכילה ומפעילה את כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
    constructor() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקשורים למחלקה
        this.bindEvents()
    }

    // באמצעות הפונקציה playAlbum המקבלת את הפרמטר album אנו מפעילים את הנגן מוסיקה
    playAlbum( album ) {
        alert('Playing')
    }

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בנגן המוסיקה
    bindEvents() {

    }
}