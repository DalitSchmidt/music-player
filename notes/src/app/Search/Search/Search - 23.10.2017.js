// ייבוא היכולות של jQuery על-מנת שהאובייקט Search יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שהאובייקט Search יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של ה- class Templates על-מנת שהאובייקט Search יוכל להשתמש בהן
import Templates from './Templates/Templates'

// האובייקט Search מכיל את כל הפונקציות המאפשרות לנו לבצע את פעולת החיפוש
// הגדרת האובייקט Search כקבוע
const Search = {
    // באמצעות הפונקציה displayResults המקבלת את הפרמטר results אנו מציגים ב- DOM את תוצאות החיפוש
    displayResults: function( results ) {
        // המשתנה html מכיל את הפונקציה searchResults המצויה תחת ה- class Templates שמקבלת את הפרמטר results ומפעיל אותה
        let html = Templates.searchResults( results )
        // הצגת התוצאה של החיפוש המצויה במשתנה html בחלון ה- console
        console.log( html )
        // הכנסת המשתנה html שהגדרנו לעיל היכן שיש div המכיל מזהה ייחודי בשם results-list, ובכך אנו מציגים למעשה ב- DOM את תוצאות החיפוש
        $('#results-list').html( html )
    },

    // באמצעות הפונקציה searchAlbum המקבלת את הפרמטר e (המסמל event) מתאפשר לבצע את פעולת חיפוש הנתונים של האלבום
    searchAlbum: function( e ) {
        // המשתנה $input מאפשר לנו לבצע פעולות על האלמנט שהפעיל את האירוע
        let $input = $(e.target)
        // המשתנה term מכיל את הערכים של החיפוש המצויים במשתנה $input
        let term = $input.val()

        // נבדוק אם אורך התווים במשתנה term הוא גדול או שווה ל- 3 תווים
        if ( term.length >= 3 )
            // אם המשתנה term אכן גדול, אז נפעיל את הפונקציה searchAlbum המצויה תחת ה- class DataService ומקבלת את המשתנה term המכיל את הערכים של החיפוש, ולאחר מכן נפעיל פרומיס המפעיל את הפונקציה displayResults המציגה ב- DOM את תוצאות החיפוש, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם displayResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט של הצגת תוצאות החיפוש ב- DOM), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה displayResults יתייחס בכל מקרה לאובייקט Search
            DataService.searchAlbum( term ).then( $.proxy( this.displayResults, this ) )

        // Check if the length is smaller than 3, we have to remove all the results
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בחיפוש
    bindEvents: function() {
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם search, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchAlbum יתייחס לאלמנט עצמו (במקרה זה הקלדה בתיבת חיפוש), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchAlbum יתייחס בכל מקרה לאובייקט Search
        $('#search').on('keyup', $.proxy( this.searchAlbum, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search
    init: function() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקשורים לאובייקט Search
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט Search החוצה
export default Search