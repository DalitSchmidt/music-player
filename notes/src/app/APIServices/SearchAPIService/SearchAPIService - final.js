// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchAPIService יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט SearchAPIService המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע בקשות שונות אל מול ה- API הקשורות לפעולה של החיפוש
// הגדרה של האובייקט SearchAPIService כקבוע
const SearchAPIService = {
    // באמצעות הפונקציה searchAlbums (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ושלגביו מתקבלות ההצעות האפשריות של תוצאות החיפוש) מתאפשר לבצע חיפוש של נתונים הקשורים לאלבום במסד הנתונים ולקבל תוצאות מתאימות
    searchAlbums: function ( term ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/albums/search' + term' על-מנת שניתן יהיה לבצע חיפוש של נתונים הקשורים לאלבום במסד הנתונים ולקבל תוצאות מתאימות
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    },

    // באמצעות הפונקציה suggestions (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ושלגביו מתקבלות ההצעות האפשריות של תוצאות החיפוש) מתאפשר לקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים
    suggestions: function ( term ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/albums/suggestions/' + term' על-מנת שניתן יהיה לקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים
        return $.getJSON('http://localhost:3000/api/albums/suggestions/' + term)
    },

    // באמצעות הפונקציה searchArtist (שמקבלת את המשתנה term המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist) מתאפשר לבצע חיפוש של נתונים הקשורים לשמות האמנים השמורים במסד הנתונים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לשם האמן של האלבום
    searchArtist: function ( term ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/albums/suggestions/artist/' + term' על-מנת שניתן יהיה לבצע חיפוש של נתונים הקשורים לשמות האמנים השמורים במסד הנתונים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לשם האמן של האלבום
        return $.getJSON('http://localhost:3000/api/albums/suggestions/artist/' + term)
    },

    // באמצעות הפונקציה searchGenres (שמקבלת את המשתנה term המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres) מתאפשר לבצע חיפוש של נתונים הקשורים לז'אנרים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום
    searchGenres: function ( term ) {
        // הפונקציה מחזירה בקשת getJSON לנתיב http://localhost:3000/api/genres/suggestions/' + term' על-מנת שניתן יהיה לבצע חיפוש של נתונים הקשורים לז'אנרים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום
        return $.getJSON('http://localhost:3000/api/genres/suggestions/' + term)
    }
}

// ייצוא היכולות של האובייקט SearchAPIService
export default SearchAPIService