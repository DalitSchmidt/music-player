// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט DataService על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import DataService from './../APIServices/DataService'
// ייבוא היכולות של האובייקט Templates על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import Templates from '../Templates/Templates'

// האובייקט SearchBar מכיל את כל הפונקציות הקשורות לתיבת החיפוש
// הגדרת האובייקט SearchBar כקבוע
const SearchBar = {
    // באמצעות הפונקציה searchAlbum מתאפשר לבצע חיפוש של אלבום
    searchAlbum: function () {
        // המשתנה term מפעיל את הפונקציה getTerm המאפשרת להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()
        // הפרופרטי window.location.href מחזיר את הכתובת URL של הדף המבצע חיפוש
        window.location.href = 'http://localhost:8080/#search/' + term
    },

    // באמצעות הפונקציה getTerm מתאפשר להביא את הערך המצוי בתיבת החיפוש
    getTerm: function () {
        // הפונקציה מחזירה את הערך המצוי בתיבת ה- input שיש לה מזהה ייחודי בשם search-term
        return $('#search-term').val()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים באובייקט SearchBar
    bindEvents: function() {
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם search, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchAlbum יתייחס לאלמנט עצמו (במקרה זה כפתור החיפוש), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchAlbum יתייחס בכל מקרה לאובייקט searchAlbum
        $('#search').on('click', $.proxy( this.searchAlbum, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
    init: function() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים באובייקט SearchBar
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SearchBar החוצה
export default SearchBar