// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import Utils from '../Utils'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import AlbumAPIService from "../APIServices/AlbumAPIService"

// האובייקט AlbumGenres מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול השדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
// הגדרת האובייקט AlbumGenres כקבוע
const AlbumGenres = {
    // באמצעות הפונקציה addGenreTag המקבלת את המשתנים tagName ו- genre_id המוגדר כברירת מחדל בערך הבוליאני false מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
    addGenreTag: function ( tagName, genre_id = false ) {
        // נבדוק אם התג עם השם של הז'אנר שהוזן לא קיים כבר
        if ( !tagName )
            return

        // המשתנה html מכיל את התבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הז'אנרים של האלבום באמצעות הפעלה של הפונקציה GenreTag המקבלת את המשתנים tagName ו- genre_id ומצויה תחת האובייקט AlbumFormTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הז'אנרים של האלבום
        let html = AlbumFormTemplates.genreTag( tagName, genre_id )

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
        // הפעלה של הפונקציה searchGenres המקבלת את המשתנה term שמצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לקבל את ההצעות האפשריות לתוצאות החיפוש ממסד הנתונים הקשורים לז'אנרים של האלבום באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/genres/suggestions/' + term, ולאחר מכן נפעיל promise על התוצאות שנקבל
        SearchAPIService.searchGenres( term ).then(results => {
            // נבדוק אם יש תוצאות העונות לפעולת החיפוש
            if ( results ) {
                // המשתנה html מכיל את התבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים באמצעות הפעלה של הפונקציה genreSuggestions המקבלת את המשתנה results.results שמצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
                let html = AlbumFormTemplates.genreSuggestions( results.results )
                // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
                $('#genres-results').html( html )
            // אחרת, כלומר אין תוצאות העונות לפעולת החיפוש
            } else
                // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
                $('#genres-results').html('')
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
            return
        }

        // נבדוק אם בוצעה פעולת לחיצה עם העכבר של המשתמש על אחת ההצעות האפשריות של הז'אנרים ושגם אורך התווים המצויים במשתנה input_value$ גדולים מ- 0
        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 )
            // אז נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה searchGenre המקבלת את המשתנה input_value$ שמכיל את הערך של הג עם שם הז'אנר שיתווסף ל- DOM ושבאמצעותה מתאפשר לבצע חיפוש של ז'אנרים הקיימים במסד הנתונים ונשהה את הפעולה שלה למשך חצי שנייה
            Utils.debounce( this.searchGenre, 500 )( $input_value )
    },

    // באמצעות הפונקציה setGenreValue המקבלת את המשתנה e (המסמל event) מתאפשר לשים ב- DOM את הערך של שם הז'אנר
    setGenreValue: function( e ) {
        // המשתנה genre_name מכיל את הטקסט המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את השם של הז'אנר
        // let genre_name = $( e.target ).text()
        // המשתנה genre_id מכיל את ה- attribute מסוג data בשם genre_id המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את המספר id של הז'אנר
        // let genre_id = $( e.target ).data('genre-id')
        //
        // הפעלה של הפונקציה addGenreTag המקבלת את המשתנים genre_id המכיל את המספר id של הז'אנר ואת genre_name המכיל את השם של הז'אנר ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
        // this.addGenreTag( genre_name, genre_id )
        // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
        // $('#genres-results').html('')

        // המשתנה genre_name מכיל את הטקסט המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את השם של הז'אנר
        let genre_name = $( e.target ).text()
        // המשתנה genre_id מכיל את ה- attribute מסוג data בשם genre_id המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה הוא מכיל את המספר id של הז'אנר
        let genre_id = $( e.target ).data('genre-id')

        // הפעלה של הפונקציה getGenres המצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/genres' ובכך מתאפשר למעשה לקבל את כל הז'אנרים המצויים במסד הנתונים, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מבצעת מספר פעולות
        AlbumAPIService.getGenres().then( () => {
            // הפעלה של הפונקציה addGenreTag המקבלת את המשתנים genre_id המכיל את המספר id של הז'אנר ואת genre_name המכיל את השם של הז'אנר ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
            this.addGenreTag( genre_name, genre_id )
            // נכניס לתוך אלמנט div שיש לו מזהה ייחודי בשם genres-results ערך ריק
            $('#genres-results').html('')
        })
    },

    // באמצעות הפונקציה removeGenreTag המקבלת את המשתנה e (המסמל event) מתאפשר להסיר תג עם שם הז'אנר מה- DOM
    removeGenreTag: function ( e ) {
        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מחפש את ההורה של האלמנט שיש לו class בשם tag ומסיר את האלמנט מה- DOM, כך שלמעשה אנו מסירים תג עם שם הז'אנר מה- DOM
        $input.parents('.tag').remove()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בשדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
    bindEvents: function () {
        // כאשר לוחצים על האלמנט a שמצוי תחת אלמנט שיש לו class בשם tag שמצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם tags נפעיל את הפונקציה removeGenreTag המאפשרת להסיר תג עם שם של ז'אנר מה- DOM, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeGenreTag יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שמצוי תחת אלמנט שיש לו class בשם tag) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה removeGenreTag יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
        // כאשר מתבצעת הקלדה באלמנט input שיש לו מזהה ייחודי בשם search-genres נפעיל את הפונקציה detectEvent המאפשרת לזהות את האירוע שמתרחש, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם detectEvent יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם search-genres) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה detectEvent יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        // כאשר לוחצים על האלמנט li המצוי בתוך האלמנט ul שיש לו מזהה ייחודי בשם genres-results, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setGenreValue יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך האלמנט ul שיש לו מזהה ייחודי בשם genres-results) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה setGenreValue יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#genres-results').on('click', 'li' ,$.proxy( this.setGenreValue, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumGenres
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים בשדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumGenres החוצה
export default AlbumGenres