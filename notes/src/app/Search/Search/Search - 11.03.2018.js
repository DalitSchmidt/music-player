// ייבוא היכולות של jQuery על-מנת שהאובייקט Search יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplates על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Search יוכל להשתמש בהן
import Router from '../Router'

// האובייקט Search מכיל את כל הפונקציות המאפשרות לנו לבצע את פעולת החיפוש
// הגדרת האובייקט Search כקבוע
const Search = {
    // באמצעות הפונקציה searchAlbum מתאפשר לבצע חיפוש של אלבום המצוי במסד הנתונים
    searchAlbum: function () {
        // המשתנה term מכיל את הנתון המצוי ב- index במיקום 0 במערך המצוי בפונקציה getParams המצויה תחת האובייקט Router ושמאפשרת לקבל את השם של הנתיב
        let term = Router.getParams()[0]

        // הפעלה של הפונקציה searchAlbums המקבלת את המשתנה term (המכיל את הטקסט שהוזן בתיבת החיפוש) ושמצוי תחת האובייקט SearchAPIService המאפשרת לבצע חיפוש של נתונים באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums/search' + term, כאשר לאחר הפעלת הפונקציה נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנים results, status_text ו- xhr
        SearchAPIService.searchAlbums( term ).then(( results, status_text, xhr ) => {
            // הפעלה של הפונקציה displayResults המקבלת את המשתנים term, results ו- xhr.status שבאמצעותה מתאפשר להציג ב- DOM את תוצאות החיפוש
            this.displayResults( term, results, xhr.status )
        })

        // נבדוק אם כתובת ה- URL שקיבלנו לאחר ביצוע החיפוש היא 'http://localhost:8080/#search/', אם כן, אז נבצע מספר פעולות
        if ( window.location.href = 'http://localhost:8080/#search/' ) {
            // המשתנה title מפעיל את הפונקציה emptyResults המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            let title = SearchResultsTemplates.emptyResults( term )
            // הכנסת המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            $('#search-results-title').html( title )
        }
    },

    // באמצעות הפונקציה displayResults המקבלת את המשתנים term ,results ו- status מתאפשר להציג ב- DOM את תוצאות החיפוש
    displayResults: function ( term, results, status ) {
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let title

        // אם קיבלנו הודעת סטטוס עם הקוד 204 (No Content), כלומר, שאין תוצאות העונות לחיפוש שמתבצע
        if ( status === 204 ) {
            // המשתנה title מפעיל את הפונקציה emptyResults המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            title = SearchResultsTemplates.emptyResults( term )
            // הכנסת המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
            $('#search-results-title').html( title )
        } else {
            // המשתנה html מכיל את התבנית html המכילה את כל תואות החיפוש באמצעות הפעלה של הפונקציה results המקבלת את המשתנה results.albums ומצויה תחת האובייקט SearchResultsTemplates שבאמצעותה אנו יוצרים תבנית html המציגה את תוצאות החיפוש ב- DOM
            let html = SearchResultsTemplates.results( results.albums )
            // המשתנה title מכיל את התבנית html המכילה את הכותרת של תוצאות החיפוש באמצעות הפעלה של הפונקציה title המקבלת את המשתנים term ו- results.count ומצויה תחת האובייקט SearchResultsTemplates שבאמצעותה מתאפשר להציג ב- DOM תבנית html המכילה את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
            title = SearchResultsTemplates.title( term, results.count )

            // הכנסת המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המכילה את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
            $('#search-results-title').html( title )
            // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results, ובכך למעשה מתאפשר להציג ב- DOM תבנית html המציגה את תוצאות החיפוש
            $('#results').html( html )
        }
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search
    init: function () {
        // הפעלה של הפונקציה searchAlbum המאפשרת לבצע חיפוש של אלבום המצוי במסד הנתונים
        this.searchAlbum()
    }
}

// ייצוא היכולות של האובייקט Search החוצה
export default Search