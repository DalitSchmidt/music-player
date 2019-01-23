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

// האובייקט AlbumGenres מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול השדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
// הגדרת האובייקט AlbumGenres כקבוע
const AlbumGenres = {
    // באמצעות הפונקציה addGenreTag המקבלת את המשתנים tag_name ו- genre_id המוגדר כברירת מחדל בערך הבוליאני false מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
    addGenreTag: function ( tag_name, genre_id = false ) {
        // נבדוק אם אין שגיאה במשתנה tag_name או אם אין שגיאה בפונקציה validateGenres המקבלת את המשתנה tag_name ושבאמצעותה אנו מבצעים בדיקת תיקוף לנתונים המצויים בשדה של הז'אנרים
        if ( !tag_name || !this.validateGenres( tag_name ) )
            return

        // המשתנה html מכיל את התבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הז'אנרים של האלבום באמצעות הפעלה של הפונקציה genreTag המקבלת את המשתנים tag_name ו- genre_id ומצויה תחת האובייקט AlbumFormTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הז'אנרים של האלבום
        let html = AlbumFormTemplates.genreTag( tag_name, genre_id )

        // הכנסת המשתנה html המכיל את האלמנטים המאפשרים להציג ב- DOM את התג עם השם של הז'אנר של האלבום לתוך אלמנט div שיש לו מזהה ייחודי בשם tags-container, ובכך אנו מאפשרים למעשה למשתמש להוסיף תג עם שם של ז'אנר ל- DOM
        $('#tags-container').append( html )
        // הכנסת נתונים ריקים לאלמנט ה- input שיש לו מזהה ייחודי בשם search-genres
        $('#search-genres').val('')

        // נבדוק אם בתוך האלמנט div שיש לו מזהה ייחודי בשם tags יש אלמנטים שיש להם את ה- class בשם error
        if ( $('#tags.error').length )
            // אם כן, אז נפעיל את הפונקציה validateGenres המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לנתונים המצויים בשדה של הז'אנרים
            AlbumForm.validateGenres()
    },

    // באמצעות הפונקציה searchGenre המקבלת את המשתנה term מתאפשר לבצע חיפוש של ז'אנרים הקיימים במסד הנתונים
    searchGenre: function ( term ) {
        // הצהרה על המשתנים שנבצע בהם שימוש בפונקציה
        let html

        // הפעלה של הפונקציה searchGenres המקבלת את המשתנה term שמצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/genres/suggestions/' + term, ולאחר מכן נפעיל promise על התוצאות שנקבל
        SearchAPIService.searchGenres( term ).then(results => {
            // נבדוק אם יש תוצאות העונות לפעולת החיפוש
            if ( results ) {
                // המשתנה html מכיל את התבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים באמצעות הפעלה של הפונקציה genreSuggestions המקבלת את המשתנה results.results שמצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
                html = AlbumFormTemplates.genreSuggestions( results.results )
                // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
                $('#genres-results').html( html )
            // אחרת, כלומר אין תוצאות העונות לפעולת החיפוש
            } else
                // המשתנה html מפעיל את הפונקציה noSuggestions שמצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר להציג בתוצאות החיפוש כאשר אין הצעות העונות לחיפוש המבוקש הצעה מתאימה
                html = AlbumFormTemplates.noSuggestions()
                // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
                $('#genres-results').html( html )
        })
    },

    // באמצעות הפונקציה detectEvent המקבלת את המשתנה e (המסמל event) מתאפשר לזהות את האירוע שמתרחש
    detectEvent: function ( e ) {
        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה input_value$ מכיל את הערך המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, כך שלמעשה המשתנה input_value$ מכיל את הערך של התג עם שם הז'אנר של האלבום שיתווסף ל- DOM
        let $input_value = $input.val()

        // נבדוק אם בוצעה הקשה על מקש ה- Enter במקלדת
        if ( e.keyCode == 13 ) {
            // אם כן, אז נפעיל את הפונקציה addGenreTag המקבלת את המשתנה input_value$ שמכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
            this.addGenreTag( $input_value )
            // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
            $('#genres-results').html('')

            return
        }

        // נבדוק אם בוצעה פעולת לחיצה עם העכבר של המשתמש על אחת ההצעות האפשריות של הז'אנרים ושגם אורך התווים המצויים במשתנה input_value$ גדולים מ- 0
        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 )
            // אז נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה searchGenre המקבלת את המשתנה input_value$ שמכיל את הערך של הג עם שם הז'אנר שיתווסף ל- DOM ושבאמצעותה מתאפשר לבצע חיפוש של ז'אנרים הקיימים במסד הנתונים ונשהה את הפעולה שלה למשך חצי שנייה
            Utils.debounce( this.searchGenre, 500 )( $input_value )

        // נבדוק אם יש אורך לנתונים המצויים באלמנט input שיש לו מזהה ייחודי בשם search-genres
        if ( $('#search-genres').length )
            // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
            $('#genres-results').html('')
    },

    // באמצעות הפונקציה setGenreValue המקבלת את המשתנה e (המסמל event) מתאפשר לשים ב- DOM את הערך של שם הז'אנר
    setGenreValue: function ( e ) {
        // המשתנה genre_name מכיל את הטקסט המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את השם של הז'אנר
        let genre_name = $( e.target ).text()
        // המשתנה genre_id מכיל את ה- attribute מסוג data בשם genre_id המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את המספר id של הז'אנר
        let genre_id = $( e.target ).data('genre-id')

        // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
        $('#genres-results').html('')

        // הפעלה של הפונקציה addGenreTag המקבלת את המשתנים genre_id המכיל את המספר id של הז'אנר ואת genre_name המכיל את השם של הז'אנר ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
        this.addGenreTag( genre_name, genre_id )
    },

    // באמצעות הפונקציה removeGenreTag המקבלת את המשתנה e (המסמל event) מתאפשר להסיר תג עם שם הז'אנר מה- DOM
    removeGenreTag: function ( e ) {
        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // המשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מחפש את ההורה של האלמנט שיש לו class בשם tag ומסיר את האלמנט מה- DOM, כך שלמעשה אנו מסירים תג עם שם הז'אנר מה- DOM
        $input.parents('.tag').remove()
    },

    // באמצעות הפונקציה validateGenres המקבלת את המשתנה tag_name אנו מבצעים בדיקת תיקוף לנתונים המצויים בשדה של הז'אנרים
    validateGenres: function ( tag_name ) {
        // הסרת האלמנט שיש לו class בשם error-message ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם album-genres מה- DOM
        $('#album-genres .error-message').remove()

        // המשתנה tag_names מכיל מערך ריק
        let tag_names = []

        // הלולאת each עוברת איבר-איבר על אלמנט div שיש לו class בשם tag (שלמעשה מכיל מערך של כל האלמנטים שיש להם class בשם tag) ומוציאה ממנו את ה- index ואת ה- item
        $.each( $('.tag'), function ( index, item ) {
            // נכניס לתוך המערך של tag_names את ה- attribute מסוג title של האלמנט המצוי במשתנה item
            tag_names.push( $( item ).attr('title') )
        })

        // נבדוק אם האינדקס של המשתנה tag_name המצוי במערך של tag_names הוא לא 1-
        if ( tag_names.indexOf( tag_name ) !== -1 ) {
            // המשתנה html מפעיל את הפונקציה errorMessage המצויה תחת האובייקט AlbumFormTemplates שמקבלת את הערך של הודעת השגיאה ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage('The genre is already in list')
            // הכנסת המשתנה html המפעיל את הפונקציה errorMessage המצויה תחת האובייקט AlbumFormTemplates שמקבלת את הערך של הודעת השגיאה ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה, לפני ההורה של האלמנט div שיש לו מזהה ייחודי בשם album-genres
            $('#album-genres').prepend( html )

            // נחזיר את הערך הבוליאני false אם יש שגיאות
            return false
        }

        // נבדוק אם האלמנט שיש לו class בשם tag הוא ארוך מ- 5, כלומר שיש מקסימום 5 ז'אנרים
        if ( $('.tag').length === 5 ) {
            // המשתנה html מפעיל את הפונקציה errorMessage המצויה תחת האובייקט AlbumFormTemplates שמקבלת את הערך של הודעת השגיאה ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage('The album can contain a maximum of 5 genres')
            // הכנסת המשתנה html המפעיל את הפונקציה errorMessage המצויה תחת האובייקט AlbumFormTemplates שמקבלת את הערך של הודעת השגיאה ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה, לפני ההורה של האלמנט div שיש לו מזהה ייחודי בשם album-genres
            $('#album-genres').prepend( html )

            // נבצע חזרה להמשך ביצוע הפונקציה
            return
        }

        // הפונקציה מחזירה את הערך הבוליאני true אם אין שגיאות
        return true
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בשדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
    bindEvents: function () {
        // כאשר מתבצעת הקלדה באלמנט input שיש לו מזהה ייחודי בשם search-genres נפעיל את הפונקציה detectEvent המאפשרת לזהות את האירוע שמתרחש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם detectEvent יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם search-genres) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה detectEvent יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        // כאשר לוחצים על האלמנט li המצוי בתוך האלמנט ul שיש לו מזהה ייחודי בשם genres-results, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setGenreValue יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך האלמנט ul שיש לו מזהה ייחודי בשם genres-results) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה setGenreValue יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#genres-results').on('click', 'li' ,$.proxy( this.setGenreValue, this ))
        // כאשר לוחצים על האלמנט a שמצוי תחת אלמנט שיש לו class בשם tag שמצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם tags נפעיל את הפונקציה removeGenreTag המאפשרת להסיר תג עם שם של ז'אנר מה- DOM, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeGenreTag יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שמצוי תחת אלמנט שיש לו class בשם tag) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה removeGenreTag יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumGenres
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים בשדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumGenres החוצה
export default AlbumGenres