// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט SearchResultsTemplates על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט SearchBar יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט SearchBar מכיל את כל הפונקציות הקשורות לתיבת החיפוש
// הגדרת האובייקט SearchBar כקבוע
const SearchBar = {
    // באמצעות הפונקציה getTerm מתאפשר להביא את הערך המצוי בתיבת החיפוש
    getTerm: function () {
        // הפונקציה מחזירה את הערך המצוי בתיבת ה- input שיש לה מזהה ייחודי בשם search-term
        return $('#search-term').val()
    },

    // באמצעות הפונקציה searchAlbum המקבלת את המשתנה e (המסמל event) מתאפשר לבצע חיפוש של אלבום
    searchAlbum: function ( e ) {
        // ביטול ברירת המחדל של האלמנט form (שליחת הטופס בעת ביצוע חיפוש)
        e.preventDefault()

        // המשתנה term מפעיל את הפונקציה getTerm המאפשרת להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()

        // הפרופרטי window.location.href מחזיר את כתובת ה- URL של הדף המבצע חיפוש
        window.location.href = 'http://localhost:8080/#search/' + term
        // הפעלה של הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה
        this.clearResults()

        // הפונקציה מחזירה את הערך הבוליאני false
        return false
    },

    // באמצעות הפונקציה getSuggestions מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש
    getSuggestions: function () {
        // המשתנה term מפעיל את הפונקציה getTerm המאפשרת להביא את הערך המצוי בתיבת החיפוש
        let term = this.getTerm()

        // אם אורך התווים המצויים במשתנה term הוא קטן מ- 2, אז נפעיל את הפונקציה debounce המצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים השהיה למשך שנייה של הפעלת הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה ונבצע חזרה להמשך ביצוע הפעולות של הפונקציה getSuggestions
        if ( term.length < 2 ) {
            // הפעלה של הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה
            this.clearResults()
            return
        }

        // הפעלה של הפונקציה suggestions המקבלת את המשתנה term ומצויה תחת האובייקט SearchAPIService שבאמצעותה מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים ולאחר מכן נפעיל promise המכיל את התגובה שקיבלנו, את הסטטוס קוד שנקבל ואת xhr
        SearchAPIService.suggestions( term ).then(( response, status_text, xhr ) => {
            // הצהרה על המשתנים שנבצע בהם שימוש בפונקציה
            let html

            // אם המשתנה xhr מכיל את הסטטוס קוד 204 (No content), האומר שאין תוכן, כלומר שאין תוצאות העונות לחיפוש המתבצע
            if ( xhr.status === 204 )
            // המשתנה html מפעיל את הפונקציה noSuggestions שמצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר להציג בתוצאות החיפוש כאשר אין הצעות העונות לחיפוש המבוקש הצעה מתאימה
                html = SearchResultsTemplates.noSuggestions()
            // אחרת, כלומר יש תוצאות העונות לחיפוש המתבצע
            else
                // המשתנה html מפעיל את הפונקציה suggestions המקבלת את המשתנה response.results ומצויה תחת האובייקט SearchResultsTemplates ושבאמצעותה מתאפשר ליצור תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
                html = SearchResultsTemplates.suggestions( response.results )

            // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם results-list, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות לתוצאות החיפוש ונוסיף לאלמנט הקרוב ביותר לאלמנט div שיש לו מזהה ייחודי בשם search-area את ה- class בשם has-suggestions
            $('#results-list').html( html ).closest('#search-area').addClass('has-suggestions')
        })
    },

    // באמצעות הפונקציה clearResults מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש מהתוצאות המצויות בה
    clearResults: function () {
        // הסתרת הנתונים המצויים באלמנט div שיש לו מזהה ייחודי בשם results-list לאחר 8 מאיות השנייה כשפונקציית ה- callback שלה מבצעת מספר פעולות שונות
        $('#results-list').hide(800, function () {
            // הכנסת נתונים ריקים ל- DOM היכן שיש אלמנט div שיש לו מזהה ייחודי בשם results-list
            $(this).html('')
            // הכנסת נתונים ריקים לאלמנט ה- input שיש לו מזהה ייחודי בשם search-term
            $('#search-term').val('')
            // הסרת ה- class בשם has-suggestions מהאלמנט div שיש לו מזהה ייחודי בשם search-area
            $('#search-area').removeClass('has-suggestions')
            // הוספת תכונה של css הנוגעת לאופן התצוגה של אלמנט ה- div שיש לו מזהה ייחודי בשם results-list שהערך שלו הוא block
            $(this).css('display', 'block')
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים באובייקט SearchBar
    bindEvents: function () {
        // כאשר מתבצעת שליחה של הטופס שיש לו מזהה ייחודי בשם search-form, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט form שישי לו מזהה ייחודי בשם search-form), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchAlbum יתייחס בכל מקרה לאובייקט SearchBar
        $('#search-form').on('submit', $.proxy( this.searchAlbum, this ))
        // כאשר מתתבצעת הקלדה באלמנט input שיש לו מזהה ייחודי בשם search-term נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils שבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה getSuggestions המאפשרת לקבל את ההצעות האפשריות לתוצאות החיפוש ונשהה את הפעולה שלה למשך 5 מאיות השנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם getSuggestions יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם search-term) נשתמש ב- proxy, כדי שההקשר של this יתייחס בכל מקרה לאובייקט SearchBar
        $('#search-term').on('keyup', Utils.debounce( $.proxy( this.getSuggestions, this ), 500) )
        // בעת ביצוע לחיצה על האלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך האלמנט header, נפעיל את הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך האלמנט header) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה clearResults יתייחס בכל מקרה לאובייקט SearchBar
        $('header').on('click', '#search-area.has-suggestions li', $.proxy( this.clearResults, this ))
        // כאשר תבוצע יציאה של המשתמש עם העכבר מהאלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך האלמנט header, נפעיל את הפונקציה clearResults המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט div שיש לו מזהה ייחודי בשם search-area ויש לו class בשם has-suggestions המצוי בתוך האלמנט header) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה clearResults יתייחס בכל מקרה לאובייקט SearchBar
        $('header').on('mouseleave', '#search-area.has-suggestions', $.proxy( this.clearResults, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים באובייקט SearchBar
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט SearchBar החוצה
export default SearchBar