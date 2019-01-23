// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumGenres יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט AlbumGenres מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול השדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
// הגדרת האובייקט AlbumGenres כקבוע
const AlbumGenres = {
    // באמצעות הפונקציה removeTag המקבלת את המשתנה e (המסמל event) מתאפשר להסיר תג עם שם הז'אנר מה- DOM
    removeTag: function ( e ) {
        // האלמנט שהפעיל את ה- event מחפש את ההורה של האלמנט שיש לו class בשם tag ומסיר את האלמנט מה- DOM, כך שלמעשה אנו מסירים תג עם שם הז'אנר מה- DOM
        $( e.target ).parents('.tag').remove()
    },

    // באמצעות הפונקציה addTag המקבלת את המשתנה tagName מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
    addTag: function ( tagName ) {
        // המשתנה html מכיל תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את התג עם שם הז'אנר של האלבום
        let html = `<span class="tag">  
                        ${tagName}<a>×</a>
                        <input name="tags" type="hidden" value="${tagName}">
                    </span>`

        // הכנסת המשתנה html (המכיל את האלמנטים המאפשרים להציג ב- DOM את התג עם השם של הז'אנר של האלבום) לתוך האלמנט שיש לו class בשם tags-container, ובכך אנו מאפשרים למעשה למשתמש להוסיף תג עם שם של ז'אנר ל- DOM
        $('.tags-container').append( html )
        // הכנסת נתונים ריקים לאלמנט ה- input שיש לו מזהה ייחודי בשם search-genres
        $('#search-genres').val('')
    },

    // באמצעות הפונקציה searchGenre המקבלת את המשתנה term מתאפשר לבצע חיפוש של ז'אנרים הקיימים במסד הנתונים
    searchGenre: function ( term ) {

    },

    // באמצעות הפונקציה detectEvent המקבלת את המשתנה e (המסמל event) מתאפשר לזהות את האירוע שמתרחש
    detectEvent: function ( e ) {
        // המשתנה $input_value מכיל את הערך המצוי באלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו, כך שלמעשה המשתנה מכיל את הערך של התג עם שם הז'אנר של האלבום שיתווסף ל- DOM
        let $input_value = $( e.target ).val()

        // נבדוק אם בוצעה הקשה על מקש ה- Enter במקלדת
        if ( e.keyCode == 13 ) {
            // אם כן, אז נפעיל את הפונקציה addTag המקבלת את המשתנה $input_value שמכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
            this.addTag( $input_value )
            return
        }

        // הפעלה של הפונקציה searchGenre המקבלת את המשתנה $input_value שמכיל את הערך של התג עם שם הז'אנר שיתווסף ל- DOM ושבאמצעותה מתאפשר לבצע חיפוש של ז'אנרים הקיימים במסד הנתונים
        this.searchGenre( $input_value )
    },

    // באמצעות הפונקציה setGenreValue המקבלת את המשתנה e (המסמל event) מתאפשר לשים ב- DOM את הערך של שם הז'אנר
    setGenreValue: function( e ) {
        // הוצאת הטקסט המצוי בערך של האלמנט שהפעיל את ה- event ושמאפשר לנו לבצע פעולות עליו ושהוא מצוי בתוך האלמנט input שיש לו מזהה ייחודי בשם search-genres
        $('#search-genres').val( $( e.target ).text() )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בשדה של הוספת Genres בטופס הוספת אלבום חדש/עדכון אלבום קיים
    bindEvents: function () {
        // כאשר לוחצים על האלמנט a שמצוי תחת אלמנט שיש לו class בשם tag שמצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם tags נפעיל את הפונקציה removeTag המאפשרת להסיר תג עם שם של ז'אנר מה- DOM, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeTag יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שמצוי תחת אלמנט שיש לו class בשם tag) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה removeTag יתייחס בכל מקרה לאובייקט AlbumGenres
        $('#tags').on('click', '.tag a', $.proxy( this.removeTag, this ))
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