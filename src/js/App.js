// ייבוא היכולות של jQuery על-מנת שה- class App יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class AlbumForm על-מנת שה- class App יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של ה- class AlbumBoard על-מנת שה- class App יוכל להשתמש בהן
import AlbumsBoard from './AlbumsBoard'
// ייבוא היכולות של ה- class Player על-מנת שה- class App יוכל להשתמש בהן
import Player from './Player'
// ייבוא היכולות של ה- class Search על-מנת שה- class App יוכל להשתמש בהן
import Search from './Search'

// ה- class App המתפקד "כמעין" מחלקת שירות מכיל את כל היכולות של האפליקציה
// הגדרת ה- class בשם App
class App {
    // אנו משתמשים בפונקציית הבנאי במחלקה כדי להעביר ערכים ליצירת אינסטנס חדש, כך שלמעשה פונקציית הבנאי במחלקה מכילה ומפעילה את כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
    constructor() {
        // המשתנה player יוצר אינסטנס חדש של ה- class Player המכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול נגן המוסיקה
        let player = new Player()
        // יצירת אינסטנס חדש של ה- class AlbumsBoard המכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הלוח של האלבומים
        new AlbumsBoard()
        // יצירת אינסטנס חדש של ה- class AlbumForm המכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס הוספת אלבום חדש
        new AlbumForm()
        // יצירת אינסטנס חדש של ה- class Search המכיל את כל הפונקציות המאפשרות לנו לבצע את הפעולה של חיפוש הנתונים
        new Search()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
$(document).ready(function() {
    // יצירת אינסטנס חדש של ה- class App המכיל את כל היכולות של האפליקציה
    new App()
})