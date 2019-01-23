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

    // באמצעות הפונקציה searchAlbum מתאפשר לבצע חיפוש של אלבום המצוי במסד הנתונים
    searchAlbum: function() {
        // המשתנה term מכיל את הטקסט שהוזן בתיבת החיפוש, שהוא למעשה מצוי ב- URL לאחר הסימן #, כאשר את הנתונים המצויים ב- URL אנו מפצלים למערך שהאיברים בו מופרדים באמצעות הסימן '/' שמהם אנו צריכים את הנתון המצוי ב- index שמספרו 1 במערך
        let term = location.hash.substring(1).split('/')[1]
        // הפעלה של הפונקציה searchAlbum המקבלת את המשתנה term (המכיל את הטקסט שהוזן בתיבת החיפוש) ושמצוי ב- class DataService המאפשרת לבצע חיפוש של נתונים הקשורים לאלבום באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums/search' + term, כאשר לאחר הפעלת הפונקציה נפעיל promise על התוצאות המתקבלות
        DataService.searchAlbum( term ).then( results => {
            // אם מספר התוצאות שהתקבלו הוא גדול מ- 0, אז נציג בחלון ה- console את תוצאות החיפוש של האלבומים
            if ( results.count > 0 ) {
                console.log( results.albums )
            }
        })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search
    init: function() {
        // הפעלה של הפונקציה searchAlbum המאפשרת לבצע חיפוש של אלבום המצוי במסד הנתונים
        this.searchAlbum()
    }
}

    // ייצוא היכולות של האובייקט Search החוצה
export default Search