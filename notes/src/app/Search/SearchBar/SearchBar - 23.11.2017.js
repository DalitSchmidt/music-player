// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplate על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchResultsTemplate from '../Templates/SearchResultsTemplate'

// האובייקט SearchBar מכיל את כל הפונקציות הקשורות לתיבת החיפוש
// הגדרת האובייקט SearchBar כקבוע
const SearchBar = {
    // באמצעות הפונקציה searchAlbum המקבלת את המשתנה e (המסמל event) מתאפשר לבצע חיפוש של אלבום
    searchAlbum: function ( e ) {
        // ביטול ברירת המחדל של האלמנט form (שליחת הטופס בעת ביצוע חיפוש)
        e.preventDefault()
        // המשתנה term מפעיל את הפונקציה getTerm המאפשרת להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()
        // הפרופרטי window.location.href מחזיר את הכתובת URL של הדף המבצע חיפוש
        window.location.href = 'http://localhost:8080/#search/' + term

        // הפונקציה מחזירה את הערך הבוליאני false
        return false
    },

    // באמצעות הפונקציה getTerm מתאפשר להביא את הערך המצוי בתיבת החיפוש
    getTerm: function () {
        // הפונקציה מחזירה את הערך המצוי בתיבת ה- input שיש לה מזהה ייחודי בשם search-term
        return $('#search-term').val()
    },

    // באמצעות הפונקציה clearResults מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה
    clearResults: function() {
        // הכנסת נתונים ריקים ל- DOM היכן שיש אלמנט div שיש לו מזהה ייחודי בשם results-list
        $('#results-list').html('')
        // איפוס הערכים המצויים באלמנט input שיש לו מזהה ייחודי בשם search-term
        $('#search-term').val('')
    },

    // באמצעות הפונקציה getSuggestions מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש
    getSuggestions: function() {
        // המשתנה term מפעיל את הפונקציה getTerm המאפשרת להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()

        // אם אורך התווים המצויים במשתנה term הוא קטן מ- 2, אז נפעיל את הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה ונבצע חזרה להמשך ביצוע הפעולות של הפונקציה getSuggestions
        if ( term.length < 2 ) {
            this.clearResults()
            return
        }

        // הפעלה של הפונקציה suggestions המקבלת את המשתנה term ומצויה תחת האובייקט SearchAPIService שבאמצעותה מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים ולאחר מכן נפעיל promise על התגובה שקיבלנו
        SearchAPIService.suggestions( term ).then(response => {
            // המשתנה html מפעיל את הפונקציה suggestions המקבלת את המשתנה response.results ומצויה תחת האובייקט SearchResultsTemplate ושבאמצעותה מתאפשר ליצור תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
            let html = SearchResultsTemplate.suggestions( response.results )
            // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results-list, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות לתוצאות החיפוש
            $('#results-list').html( html )
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים באובייקט SearchBar
    bindEvents: function() {
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם search, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchAlbum יתייחס לאלמנט עצמו (במקרה זה כפתור החיפוש), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchAlbum יתייחס בכל מקרה לאובייקט searchAlbum
        $('#search').on('click', $.proxy( this.searchAlbum, this ))
        // כאשר מתבצעת הקלדה באלמנט input שיש לו מזהה ייחודי בשם search-term נפעיל את הפונקציה getSuggestions, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם getSuggestions יתייחס לאלמנט עצמו (במקרה זה לאלמנט input) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה getSuggestions יתייחס בכל מקרה לאובייקט SearchBar, וכשתבוצע יציאה של המשתמש מאלמנט ה- input שיש לו מזהה ייחודי בשם search-term נפעיל את הפןונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה
        $('#search-term').on('keyup', $.proxy( this.getSuggestions, this )).on('blur', this.clearResults)
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
    init: function() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים באובייקט SearchBar
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SearchBar החוצה
export default SearchBar