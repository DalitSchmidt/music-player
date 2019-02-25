// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplates על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט SearchBar מכיל את כל הפונקציות הקשורות לתיבת החיפוש
// הגדרה של האובייקט SearchBar כקבוע
const SearchBar = {
    // באמצעות הפונקציה getTerm מתאפשר להביא את הערך המצוי בתיבת החיפוש
    getTerm: function () {
        // הפונקציה מחזירה את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם search-term
        return $('#search-term').val()
    },

    // באמצעות הפונקציה searchTerm (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע חיפוש של הערך המצוי בתיבת החיפוש
    searchTerm: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג submit של האלמנט form שיש לו מזהה ייחודי בשם search-form
        e.preventDefault()

        // המשתנה term מפעיל את הפונקציה getTerm שבאמצעותה מתאפשר להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()

        // הפרופרטי window.location.href מכיל את כתובת ה- URL של הנתיב המבצע חיפוש
        window.location.href = 'http://localhost:8080/#search/' + term
        // הפעלה של הפונקציה clearResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות של תוצאות החיפוש מהתוצאות המצויות בה
        this.clearResults()

        // הפונקציה מחזירה את הערך הבוליאני false
        return false
    },

    // באמצעות הפונקציה getSuggestions מתאפשר לקבל את ההצעות האפשריות של תוצאות החיפוש
    getSuggestions: function () {
        // המשתנה term מפעיל את הפונקציה getTerm שבאמצעותה מתאפשר להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()

        // נבדוק את אורך הערך המצוי במשתנה term ואם הערך קטן מ- 2, אז נבצע מספר פעולות
        if ( term.length < 2 ) {
            // הפעלה של הפונקציה clearResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות של תוצאות החיפוש מהתוצאות המצויות בה
            this.clearResults()

            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        }

        // הפעלה של הפונקציה suggestions (שמקבלת את המשתנה term המפעיל את הפונקציה getTerm שבאמצעותה מתאפשר להביא את הערך המצוי בתיבת החיפוש) המצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה response המכיל את התשובה שקיבלנו, את המשתנה status_text המכיל את הודעת הסטטוס שקיבלנו ואת המשתנה xhr המכיל אובייקט המבצע אינטרקציה עם השרת ושבאמצעותו מתאפשר לאחזר נתונים מכתובת האתר מבלי לבצע רענון מלא של העמוד ולהפריע לפעולות המשתמש ובכך לעדכן רק את החלק הרלוונטי בעמוד ומבצעת מספר פעולות
        SearchAPIService.suggestions( term ).then(( response, status_text, xhr ) => {
            // הצהרה על משתנה גלובלי שנבצע בו שימוש בפונקציה
            let html

            // נבדוק אם הפרופרטי status המצוי במשתנה xhr מכיל את הודעת השגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, מאחר ואין תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            if ( xhr.status === 204 )
                // המשתנה html מפעיל את הפונקציה noSuggestions המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
                html = SearchResultsTemplates.noSuggestions()
            // אחרת, כלומר יש תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            else
                // המשתנה html מפעיל את הפונקציה suggestions (שמקבלת את הפרופרטי results המצוי בתוך המשתנה response המכיל את תוצאות החיפוש) המצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של תוצאות החיפוש
                html = SearchResultsTemplates.suggestions( response.results )

            // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results-list והוספה של ה- class בשם has-suggestions לאלמנט הקרוב ביותר לאלמנט div שיש לו מזהה ייחודי בשם search-area, ובכך מתאפשר להציג למשתמש ב- DOM את ההצעות האפשריות של תוצאות החיפוש
            $('#results-list').html( html ).closest('#search-area').addClass('has-suggestions')
        })
    },

    // באמצעות הפונקציה clearResults מתאפשר לנקות את תיבת ההצעות האפשריות של תוצאות החיפוש מהתוצאות המצויות בה
    clearResults: function () {
        // הפעלה של הפונקציה hide שבאמצעותה מתאפשר להסתיר את הערך המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם results-list לאחר 8 מאיות השנייה ושפונקציית ה- callback שלה מבצעת מספר פעולות
        $('#results-list').hide(800, function () {
            // הכנסה של ערך ריק ל- DOM לתוך אלמנט div שיש לו מזהה ייחודי בשם results-list
            $(this).html('')
            // הכנסה של ערך ריק לתוך אלמנט מסוג input שיש לו מזהה ייחודי בשם search-term
            $('#search-term').val('')
            // הסרה של ה- class בשם has-suggestions מהאלמנט div שיש לו מזהה ייחודי בשם search-area
            $('#search-area').removeClass('has-suggestions')
            // הפעלה של הפונקציית CSS של jQuery על האלמנט div שיש לו מזהה ייחודי בשם results-list, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם display שהערך שלה הוא block
            $(this).css('display', 'block')
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים באובייקט SearchBar
    bindEvents: function () {
        // כאשר מתבצעת שליחה של האלמנט form שיש לו מזהה ייחודי בשם search-form, נפעיל את הפונקציה searchTerm שבאמצעותה מתאפשר לבצע חיפוש של הערך המצוי בתיבת החיפוש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchTerm יתייחס לאלמנט עצמו (במקרה זה לאלמנט form שיש לו מזהה ייחודי בשם search-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchTerm יתייחס בכל מקרה לאובייקט SearchBar
        $('#search-form').on('submit', $.proxy( this.searchTerm, this ))
        // כאשר מתבצעת הקלדה באלמנט מסוג input שיש לו מזהה ייחודי בשם search-term, נפעיל את הפונקציה debounce המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע השהייה של פעולה מסוימת, במקרה זה מדובר בפונקציה getSuggestions שבאמצעותה מתאפשר לקבל את ההצעות האפשריות של תוצאות החיפוש ונשהה את הפעולה שלה למשך חצי שנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם getSuggestions יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם search-term), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה getSuggestions יתייחס בכל מקרה לאובייקט SearchBar
        $('#search-term').on('keyup', Utils.debounce( $.proxy( this.getSuggestions, this ), 500))
        // כאשר מתבצעת לחיצה על האלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך אלמנט header, נפעיל את הפונקציה clearResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות של תוצאות החיפוש מהתוצאות המצויות בה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך אלמנט header), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה clearResults יתייחס בכל מקרה לאובייקט SearchBar
        $('header').on('click', '#search-area.has-suggestions li', $.proxy( this.clearResults, this ))
        // כאשר מתבצעת יציאה של המשתמש עם העכבר מהאלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך אלמנט header, נפעיל את הפונקציה clearResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות של תוצאות החיפוש מהתוצאות המצויות בה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך אלמנט header), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה clearResults יתייחס בכל מקרה לאובייקט SearchBar
        $('header').on('mouseleave', '#search-area.has-suggestions', $.proxy( this.clearResults, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים באובייקט SearchBar
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SearchBar החוצה
export default SearchBar