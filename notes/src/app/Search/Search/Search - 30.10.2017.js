// ייבוא היכולות של jQuery על-מנת שהאובייקט Search יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplate על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchResultsTemplate from '../Templates/SearchResultsTemplate'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Search יוכל להשתמש בהן
import Router from '../Router'

// האובייקט Search מכיל את כל הפונקציות המאפשרות לנו לבצע את פעולת החיפוש
// הגדרת האובייקט Search כקבוע
const Search = {
    // באמצעות הפונקציה displayResults המקבלת את המשתנים term ו- results מתאפשר להציג ב- DOM את תוצאות החיפוש
    displayResults: function( term, results ) {
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let title

        // אם כמות התוצאות היא 0, כלומר, שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
        if ( results.count === 0 ) {
            // המשתנה title מפעיל את הפונקציה emptyResults המאפשרת להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM עותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            title = SearchResultsTemplate.emptyResults()
            // הכנסת המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            $('#search-results-title').html( title )
        // אחרת, אם כמות התוצאות היא גדולה מ- 0, כלומר שנמצאו תוצאות לנתונים שבוצע חיפוש לגביהם
        } else {
            // המשתנה html מכיל את התבנית html המכילה את כל תואות החיפוש באמצעות הפעלה של הפונקציה results המקבלת את המשתנה results.albums ומצויה תחת האובייקט SearchResultsTemplate שבאמצעותה אנו יוצרים תבנית html המציגה את תוצאות החיפוש ב- DOM
            let html = SearchResultsTemplate.results( results.albums )
            // המשתנה title מכיל את התבנית html המכילה את הכותרת של תוצאות החיפוש באמצעות הפעלה של הפונקציה title המקבלת את המשתנים term ו- results.count ומצויה תחת האובייקט SearchResultsTemplate שבאמצעותה מתאפשר להציג ב- DOM תבנית html המכילה את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
            title = SearchResultsTemplate.title( term, results.count )

            // הכנסת המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המכילה את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
            $('#search-results-title').html( title )
            // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המציגה את תוצאות החיפוש
            $('#results').html( html )
        }
    },

    // באמצעות הפונקציה searchAlbum מתאפשר לבצע חיפוש של אלבום המצוי במסד הנתונים
    searchAlbum: function() {
        // המשתנה term מכיל את הנתון המצוי ב- index במיקום 0 במערך המצוי בפונקציה getParams המצויה תחת האובייקט Router ושמאפשרת לקבל את השם של הנתיב
        let term = Router.getParams()[0]

        // הפעלה של הפונקציה searchAlbums המקבלת את המשתנה term (המכיל את הטקסט שהוזן בתיבת החיפוש) ושמצוי תחת האובייקט SearchAPIService המאפשרת לבצע חיפוש של נתונים באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums/search' + term, כאשר לאחר הפעלה הפונקציה נפעיל promise על התוצאות המתקבלות באמצעות הפעלה של הפונקציה displayResults המקבלת את המשתנים term ו- results שבאמצעותה מתאפשר להציג ב- DOM את תוצאות החיפוש
        SearchAPIService.searchAlbums( term ).then(results => this.displayResults( term, results ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search
    init: function() {
        // הפעלה של הפונקציה searchAlbum המאפשרת לבצע חיפוש של אלבום המצוי במסד הנתונים
        this.searchAlbum()
    }
}

// ייצוא היכולות של האובייקט Search החוצה
export default Search