// ייבוא היכולות של jQuery על-מנת שהאובייקט Search יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplates על-מנת שהאובייקט Search יוכל להשתמש בהן
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Search יוכל להשתמש בהן
import Router from '../Router'

// האובייקט Search מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע את הפעולה של החיפוש
// הגדרה של האובייקט Search כקבוע
const Search = {
    // באמצעות הפונקציה searchAlbum מתאפשר לבצע חיפוש של אלבום השמור במסד הנתונים ולהציג ב- DOM את תוצאות החיפוש
    searchAlbum: function () {
        // המשתנה term מפעיל את הפונקציה getParams המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את שם הנתיב המצוי ב- index במיקום 0 במערך
        let term = Router.getParams()[0]

        // הפעלה של הפונקציה searchAlbums (שמקבלת את המשתנה term המפעיל את הפונקציה getParams המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את שם הנתיב המצוי ב- index במיקום 0 במערך) המצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לבצע חיפוש של נתונים הקשורים לאלבום במסד הנתונים ולקבל תוצאות מתאימות, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו, את המשתנה status_text המכיל את הודעת הסטטוס שקיבלנו ואת המשתנה xhr המכיל אובייקט המבצע אינטרקציה עם השרת ושבאמצעותו מתאפשר לאחזר נתונים מכתובת האתר מבלי לבצע רענון מלא של העמוד ולהפריע לפעולות המשתמש ובכך לעדכן רק את החלק הרלוונטי בעמוד ומבצעת מספר פעולות
        SearchAPIService.searchAlbums( term ).then(( results, status_text, xhr ) => {
            // הפעלה של הפונקציה displayResults (שמקבלת את המשתנה term המפעיל את הפונקציה getParams המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את שם הנתיב המצוי ב- index במיקום 0 במערך, את המשתנה results המכיל את התוצאות שקיבלנו ואת הפרופרטי status המצוי בתוך המשתנה xhr המכיל את הודעת הסטטוס שקיבלנו) שבאמצעותה מתאפשר להציג ב- DOM את תוצאות החיפוש
            this.displayResults( term, results, xhr.status )
        })

        // נבדוק אם כתובת ה- URL שקיבלנו לאחר ביצוע החיפוש מכילה את הערך 'http://localhost:8080/#search/', אז נבצע מספר פעולות
        if ( window.location.href === 'http://localhost:8080/#search/' ) {
            // המשתנה title מפעיל את הפונקציה emptyResults (שמקבלת את המשתנה term המפעיל את הפונקציה getParams המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לקבל את שם הנתיב המצוי ב- index במיקום 0 במערך) המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
            let title = SearchResultsTemplates.emptyResults( term )
            // הכנסה של המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך מתאפשר להציג למשתמש ב- DOM תבנית html המכילה כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
            $('#search-results-title').html( title )
        }
    },

    // באמצעות הפונקציה displayResults (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ושלגביו מתקבלות ההצעות האפשריות של תוצאות החיפוש, את המשתנה results המכיל את התוצאות שקיבלנו ואת המשתנה status המכיל את הודעת הסטטוס שקיבלנו) מתאפשר להציג ב- DOM את תוצאות החיפוש
    displayResults: function ( term, results, status ) {
        // הצהרה על משתנה גלובלי שנבצע בו שימוש בפונקציה
        let title

        // נבדוק אם המשתנה status מכיל את הודעת השגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, מאחר ואין תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
        if ( status === 204 ) {
            // המשתנה title מפעיל את הפונקציה emptyResults (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ושלגביו מתקבלות ההצעות האפשריות של תוצאות החיפוש) המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
            title = SearchResultsTemplates.emptyResults( term )
            // הכנסה של המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך מתאפשר להציג למשתמש ב- DOM תבנית html המכילה כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
            $('#search-results-title').html( title )
        // אחרת, כלומר יש תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
        } else {
            // המשתנה title מפעיל את הפונקציה title (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ושלגביו מתקבלות ההצעות האפשריות של תוצאות החיפוש ואת הפרופרטי count המצוי בתוך המשתנה results המכיל את הספירה של התוצאות) המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM כותרת המציינת את כמות התוצאות שנמצאו לגבי הערך שבוצע חיפוש לגביו
            title = SearchResultsTemplates.title( term, results.count )
            // המשתנה html מפעיל את הפונקציה results (שמקבלת את הפרופרטי albums המצוי בתוך המשתנה results המכיל את תוצאות החיפוש של האלבומים) המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר להכניס ל- DOM את התבנית html של תוצאות החיפוש
            let html = SearchResultsTemplates.results( results.albums )

            // הכנסה של המשתנה title לתוך אלמנט div שיש לו מזהה ייחודי בשם search-results-title, ובכך מתאפשר להציג למשתמש ב- DOM תבנית html המכילה כותרת המציינת את כמות התוצאות שנמצאו לגבי הערך שבוצע חיפוש לגביו
            $('#search-results-title').html( title )
            // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results, ובכך מתאפשר להציג למשתמש ב- DOM תבנית html המציגה את תוצאות החיפוש
            $('#results').html( html )
        }
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search
    init: function () {
        // הפעלה של הפונקציה searchAlbum שבאמצעותה מתאפשר לבצע חיפוש של אלבום השמור במסד הנתונים ולהציג ב- DOM את תוצאות החיפוש
        this.searchAlbum()
    }
}

// ייצוא היכולות של האובייקט Search החוצה
export default Search