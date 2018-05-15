// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchAPIService יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט SearchAPIService המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו לבצע בקשות שונות אל מול ה- API הקשורות לחיפוש
// הגדרת האובייקט SearchAPIService כקבוע
const SearchAPIService = {
    // באמצעות הפונקציה searchAlbum המקבלת את המשתנה term אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/search/' + term, ובכך מתאפשר למעשה לבצע חיפוש של נתונים הקשורים לאלבום ולקבל תוצאות מתאימות
    searchAlbums: function ( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    },

    // באמצעות הפונקציה suggestions המקבלת את המשתנה term אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/suggestions/' + term, ובכך מתאפשר למעשה לקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים
    suggestions: function ( term ) {
        return $.getJSON('http://localhost:3000/api/albums/suggestions/' + term)
    },

    // באמצעות הפונקציה searchArtist המקבלת את המשתנה term אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/suggestions/artist/' + term, ובכך מתאפשר למעשה לבצע חיפוש של נתונים הקשורים לשם האמן ולקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים הקשורים לשם האמן של האלבום
    searchArtist: function ( term ) {
        return $.getJSON('http://localhost:3000/api/albums/suggestions/artist/' + term)
    },

    // באמצעות הפונקציה searchGenres המקבלת את המשתנה term אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/genres/suggestions/' + term, ובכך מתאפשר למעשה לבצע חיפוש של נתונים הקשורים לז'אנרים ולקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום
    searchGenres: function ( term ) {
        return $.getJSON('http://localhost:3000/api/genres/suggestions/' + term)
    }
}

// ייצוא היכולות של האובייקט SearchAPIService
export default SearchAPIService