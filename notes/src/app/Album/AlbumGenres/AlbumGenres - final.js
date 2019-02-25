// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט AlbumGenres מכיל את כל הפונקציות שבאמצעותן מתאפשר לתקשר אל מול השדה של הז'אנרים בטופס הוספת אלבום חדש או בטופס עריכת אלבום
// הגדרה של האובייקט AlbumGenres כקבוע
const AlbumGenres = {
    // הפרופרטי searchResults מכיל כברירת מחדל ערך ריק
    searchResults: '',

    // באמצעות הפונקציה addGenreTag (שמקבלת את המשתנה tag_name המכיל את שם הז'אנר ואת המשתנה genre_id המכיל כברירת מחדל את הערך הבוליאני false) מתאפשר להוסיף תג עם שם הז'אנר של האלבום לשדה של הז'אנרים ב- DOM
    addGenreTag: function ( tag_name, genre_id = false ) {
        // נבדוק אם המשתנה tag_name או אם הפונקציה validateGenres (שמקבלת את המשתנה tag_name המכיל את שם הז'אנר) שבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי בשדה של הז'אנרים אינם מכילים שגיאה כלשהי, אז נבצע מספר פעולות
        if ( !tag_name || !this.validateGenres( tag_name ) )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return

        // המשתנה html מפעיל את הפונקציה genreTag (שמקבלת את המשתנה tag_name המכיל את שם הז'אנר ואת המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הז'אנרים של האלבום
        let html = AlbumFormTemplates.genreTag( tag_name, genre_id )
        // הכנסה של המשתנה html לפני האלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres, ובכך מתאפשר להציג למשתמש ב- DOM את הז'אנרים של האלבום
        $( html ).insertBefore('#search-genres')

        // הכנסה של ערך ריק לתוך אלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres
        $('#search-genres').val('')

        // נבדוק את אורך האלמנט div שיש לו מזהה ייחודי בשם genres-tags ואם יש לו את ה- class בשם error, אז נבצע מספר פעולות
        if ( $('#genres-tags.error').length )
            // הפעלה של הפונקציה validateGenres המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לכמות הערכים המצויים בשדה של הז'אנרים
            AlbumForm.validateGenres()
    },

    // באמצעות הפונקציה searchGenre (שמקבלת את המשתנה term המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres) מתאפשר לבצע חיפוש של הז'אנרים השמורים במסד הנתונים
    searchGenre: function ( term ) {
        // הצהרה על משתנה גלובלי שנבצע בו שימוש בפונקציה
        let html

        // הפעלה של הפונקציה searchGenres (שמקבלת את המשתנה term המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres) המצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לבצע חיפוש של נתונים הקשורים לז'אנרים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו ומבצעת מספר פעולות
        SearchAPIService.searchGenres( term ).then(results => {
            // נבדוק אם המשתנה results מכיל תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            if ( results ) {
                // הפרופרטי searchResults מכיל את הפרופרטי results המצוי בתוך המשתנה results
                this.searchResults = results.results

                // המשתנה html מפעיל את הפונקציה genreSuggestions (שמקבלת את הפרופרטי searchResults המכיל את הפרופרטי results המצוי בתוך המשתנה results) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
                html = AlbumFormTemplates.genreSuggestions( this.searchResults )
            // אחרת, כלומר אין תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            } else {
                // הפרופרטי searchResults מכיל מערך ריק
                this.searchResults = []

                // המשתנה html מפעיל את הפונקציה noSuggestions המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
                html = AlbumFormTemplates.noSuggestions()
                // הפעלה של הפונקציה clearGenresResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של הז'אנרים מהתוצאות המצויות בה
                this.clearGenresResults()
            }

            // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results, ובכך מתאפשר להציג למשתמש ב- DOM את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
            $('#genres-results').html( html )

            // המשתנה el מכיל את האלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres
            let el = $('#search-genres')
            // המשתנה position מכיל את המיקום של המשתנה el
            let position = $( el ).position()
            // המשתנה width מכיל את הרוחב של האלמנט המצוי במשתנה el
            let width = $( el ).outerWidth()

            // הפעלה של הפונקציית CSS של jQuery על האלמנט div שיש לו מזהה ייחודי בשם genres-results, ובכך מתאפשר להוסיף לאלמנט זה תכונות CSS שונות כגון התכונה בשם position שהערך שלה הוא absolute, את התכונה בשם top שהערך שלה הוא 22 + position.top + 'px' ואת התכונה בשם left שהערך שלה הוא (position.left - 158 + width) + 'px' על-מנת שתוצאות החיפוש של הז'אנרים יוצגו בהתאם למיקום של האלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres
            $('#genres-results').css({
                position: 'absolute',
                top: 22 + position.top + 'px',
                left: (position.left - 158 + width) + 'px'
            })
        })
    },

    // באמצעות הפונקציה clearGenresResults מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של הז'אנרים מהתוצאות המצויות בה
    clearGenresResults: function () {
        // הסרה של האלמנטים ul ו- li המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results מה- DOM
        $('#genres-results').find('ul, li').remove()
    },

    // באמצעות הפונקציה detectEvent (שמקבלת את המשתנה e המסמל event) מתאפשר לזהות את האירוע המתרחש
    detectEvent: function ( e ) {
        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה input_value$ מכיל את הערך המצוי במשתנה input$, ולמעשה המשתנה input_value$ מכיל את הערך של התג עם שם הז'אנר של האלבום שיתווסף ל- DOM
        let $input_value = $input.val()

        // נבדוק אם בוצעה הקשה על מקש ה- Enter במקלדת, אז נבצע מספר פעולות
        if ( e.keyCode == 13 ) {
            // המשתנה is_in_search_results מכיל את הפרופרטי searchResults המפעיל את הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש של ז'אנר במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה item המכיל את הפריט ושבאמצעותה מתאפשר לבדוק את שם הז'אנר החדש במערך המפעיל את הפונקציה toLowerCase המאפשרת לבצע המרה של הטקסט לאותיות קטנות זהה לערך המצוי במשתנה input_value$ המפעיל את הפונקציה toLowerCase המאפשרת לבצע המרה של הטקסט לאותיות קטנות, ולמעשה המשתנה is_in_search_results מכיל את הערך החדש של התג עם שם הז'אנר שהוספנו באמצעות הקשה על מקש ה- Enter במקלדת
            let is_in_search_results = this.searchResults.filter( item => item.genre_name.toLowerCase() === $input_value.toLowerCase() )
            // המשתנה existing_genre_id בודק את אורך הערך המצוי במשתנה is_in_search_results, אם מצוי ערך נוסיף לערך המצוי במערך של ה- itemים באינדקס שמספרו 0 את המזהה הייחודי של הז'אנר, אחרת, כלומר אין ערך במשתנה is_in_search_results נחזיר את הערך הבוליאני false, ולמעשה המשתנה existing_genre_id מכיל את המזהה הייחודי של הז'אנר שהוספנו באמצעות הקשה על מקש ה- Enter במקלדת
            let existing_genre_id = is_in_search_results.length ? is_in_search_results[0].genre_id : false

            // הפעלה של הפונקציה addGenreTag (שמקבלת את המשתנה input_value$ המכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM ואת המשתנה existing_genre_id המכיל את המזהה הייחודי של הז'אנר שהוספנו באמצעות הקשה על מקש ה- Enter במקלדת) שבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום לשדה של הז'אנרים ב- DOM
            this.addGenreTag( $input_value, existing_genre_id )
            // הכנסה של ערך ריק לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results
            $('#genres-results').html('')
            // הפרופרטי searchResults מכיל מערך ריק
            this.searchResults = []

            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        }

        // נבדוק אם בוצעה פעולת לחיצה עם העכבר של המשתמש על אחת ההצעות האפשריות של הז'אנרים ושגם אורך הערך המצוי במשתנה input_value$ המכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM גדולים מ- 0, אז נבצע מספר פעולות
        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 ) {
            // הפעלה של הפונקציה debounce המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע השהייה של פעולה מסוימת, במקרה זה מדובר בפונקציהsearchGenre  (שמקבלת את המשתנה input_value$ המכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM) שבאמצעותה מתאפשר לבצע חיפוש של הז'אנרים השמורים במסד הנתונים ונשהה את הפעולה שלה למשך חצי שנייה, ומאחר ואנו רוצים לשמור על ההקשר של this בעת ההפעלה של הפונקציה searchGenre נשתמש ב- proxy
            Utils.debounce($.proxy(this.searchGenre, this), 500)($input_value)
            // הכנסה של ערך ריק לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results
            $('#genres-results').html('')
        }

        // נבדוק את אורך הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres, אז נבצע מספר פעולות
        if ( $('#search-genres').length ) {
            // הכנסה של ערך ריק לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results
            $('#genres-results').html('')
            // הפרופרטי searchResults מכיל מערך ריק
            this.searchResults = []
        }
    },

    // באמצעות הפונקציה setGenreValue (שמקבלת את המשתנה e המסמל event) מתאפשר להציג ב- DOM את הערך של שם הז'אנר
    setGenreValue: function ( e ) {
        // המשתנה genre_name מכיל את הטקסט המצוי בערך של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let genre_name = $( e.target ).text()
        // המשתנה genre_id מכיל את ה- attribute מסוג data בשם genre_id של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let genre_id = $( e.target ).data('genre-id')

        // הכנסה של ערך ריק לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results
        $('#genres-results').html('')
        // הפרופרטי searchResults מכיל מערך ריק
        this.searchResults = []

        // הפעלה של הפונקציה addGenreTag (שמקבלת את המשתנה genre_id המכיל את המזהה הייחודי של הז'אנר ואת המשתנה genre_name המכיל את שם הז'אנר) שבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום לשדה של הז'אנרים ב- DOM
        this.addGenreTag( genre_name, genre_id )
    },

    // באמצעות הפונקציה removeGenreTag (שמקבלת את המשתנה e המסמל event) מתאפשר להסיר את התג עם שם הז'אנר מה- DOM
    removeGenreTag: function ( e ) {
        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרה של האלמנט שיש לו class בשם tag המצוי בהורים של האלמנט המצוי במשתנה input$ מה- DOM
        $input.parents('.tag').remove()
    },

    // באמצעות הפונקציה validateGenres (שמקבלת את המשתנה tag_name המכיל את שם הז'אנר) מתאפשר לבצע בדיקת ולידציה לערך המצוי בשדה של הז'אנרים
    validateGenres: function ( tag_name ) {
        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-genres מה- DOM
        $('#album-genres .error-message').remove()

        // הצהרה על משתנים גלובליים שנבצע בהם שימוש בפונקציה כאשר המשתנה tag_names מכיל מערך ריק
        let tag_names = [], error_message, html

        // כדי לקבל את כל הערכים המצויים במערך של האלמנט שיש לו class בשם tag, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- item ומבצעת מספר פעולות
        $.each( $('.tag'), ( index, item ) => {
            // הכנסה של האלמנט המצוי במשתנה item שיש לו attribute מסוג title המכיל את הפריט לתוך המערך המצוי במשתנה tag_names
            tag_names.push( $( item ).attr('title') )
        })

        // נבדוק אם האינדקס של המשתנה tag_name המצוי במערך של tag_names הוא לא 1-, אז נבצע מספר פעולות
        if ( tag_names.indexOf( tag_name ) !== -1 ) {
            // המשתנה error_message מכיל את הודעת השגיאה שתוצג
            error_message = 'The genre is already in list'
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            html = AlbumFormTemplates.errorMessage( error_message )

            // הכנסה של המשתנה html לפני ההורה של האלמנט div שיש לו מזהה ייחודי בשם album-genres, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
            $('#album-genres').prepend( html )
            // הכנסה של ערך ריק לתוך אלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres
            $('#search-genres').val('')

            // החזרה של הערך הבוליאני false
            return false
        }

        // נבדוק את אורך האלמנט שיש לו class בשם tag ואם הוא לא ארוך מ- 5, אז נבצע מספר פעולות
        if ( $('.tag').length === 5 ) {
            // המשתנה error_message מכיל את הודעת השגיאה הרלוונטית שתוצג
            error_message = 'The album can contain a maximum of 5 genres'
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            html = AlbumFormTemplates.errorMessage( error_message )

            // הכנסה של המשתנה html לפני ההורה של האלמנט div שיש לו מזהה ייחודי בשם album-genres, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
            $('#album-genres').prepend( html )
            // הכנסה של ערך ריק לתוך אלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres
            $('#search-genres').val('')

            // החזרה של הערך הבוליאני false
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true
        return true
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים בשדה של הז'אנרים בטופס הוספת אלבום חדש או בטופס עריכת אלבום
    bindEvents: function () {
        // כאשר מתבצעת הקלדה באלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres, נפעיל את הפונקציה detectEvent שבאמצעותה מתאפשר לזהות את האירוע המתרחש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם detectEvent יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם search-genres), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה detectEvent יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        // כאשר מתבצעת לחיצה על האלמנט li המצוי בתוך אלמנט ul שיש לו מזהה ייחודי בשם genres-results, נפעיל את הפונקציה setGenreValue שבאמצעותה מתאפשר להציג ב- DOM את הערך של שם הז'אנר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setGenreValue יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך אלמנט ul שיש לו מזהה ייחודי בשם genres-results), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה setGenreValue יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#genres-results').on('click', 'li', $.proxy( this.setGenreValue, this ))
        // כאשר מתבצעת לחיצה על האלמנט a המצוי בתוך אלמנט שיש לו class בשם tag המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags, נפעיל את הפונקציה removeGenreTag שבאמצעותה מתאפשר להסיר את התג עם שם הז'אנר מה- DOM, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeGenreTag יתייחס לאלמנט עצמו (במקרה זה לאלמנט a המצוי בתוך אלמנט שיש לו class בשם tag המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה removeGenreTag יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#genres-tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumGenres
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים בשדה של הז'אנרים בטופס הוספת אלבום חדש או בטופס עריכת אלבום
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumGenres החוצה
export default AlbumGenres