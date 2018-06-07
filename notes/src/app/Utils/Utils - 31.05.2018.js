// ייבוא היכולות של jQuery על-מנת שהאובייקט Utils יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט Utils מכיל פונקציות עזר שישמשו אותנו במידת הצורך
// הגדרת האוביביקט Utils כקבוע
const Utils = {
    // באמצעות הפונקציה calculateTime המקבלת את המשתנה seconds המכיל את אורך השיר בשניות, אנו מבצעים חישוב של זמן השיר
    calculateTime: function ( seconds ) {
        // המשתנה minutes מכיל את הדקות של השיר באמצעות ביצוע חישוב מתמטי המחלק את הנתון המצוי במשתנה seconds ל- 60
        let minutes = Math.floor( seconds / 60 )
        // המשתנה seconds_to_display מכיל את השניות של השיר, באמצעות ביצוע מודולו 60 לנתון המצוי במשתנה seconds
        let seconds_to_display = seconds % 60

        // המשתנה minutes בודק אם הנתונים המצויים במשתנה minutes הם קטנים מ- 10, אם כן, אז נוסיף לפני את הספרה 0, אחרת, כלומר הם גדולים מ- 10, אז נחזיר את הנתונים כפי שהם
        minutes = minutes < 10 ? '0' + minutes : minutes
        // המשתנה seconds_to_display בודק אם הנתונים המצויים במשתנה seconds_to_display הם קטנים מ- 10, אם כן, אז נוסיף לפני את הספרה 0, אחרת, כלומר הם גדולים מ- 10, אז נחזיר את הנתונים כפי שהם
        seconds_to_display = seconds_to_display < 10 ? '0' + seconds_to_display : seconds_to_display

        // הפונקציה מחזירה תבנית המציגה את הזמן של השיר, כאשר בחלק השמאלי של התבנית מוצגות הדקות ובחלק הימני של התבנית מוצגות השניות כאשר בין החלקים מפריד הסימן ':', כך שלמעשה הפונקציה מאפשרת להציג ב- DOM את החישוב של הזמן בפורמט של 4 תווים (XX:XX)
        return minutes + ':' + seconds_to_display
    },

    // באמצעות הפונקציה cancelDelete מתאפשר לחזור לעמוד שבו היינו בעת לחיצה על האלמנט שיש לו את ה- class בשם cancel, ולמעשה לבטל את פעולת המחיקה
    cancelDelete: function () {
        // הסרת ה- class בשם modal-open ואיפוס תכונת ה- css בשם padding-right מהאלמנט body
        $('body').removeClass('modal-open').css('padding-right', '0')
        // הסרת ה- class בשם in ושינוי תכונת ה- css בשם display לערך none ואיפוס תכונת ה- css בשם padding-right מהאלמנט div שיש לו מזהה ייחודי בשם modal
        $('#modal').removeClass('in').css({'display': 'none', 'padding-right': '0'})
    },

    // באמצעות הפונקציה capitalize המקבלת את המשתנה s, אנו הופכים את האות הראשונה לאות גדולה
    capitalize: function ( s ) {
        return s && s[0].toUpperCase() + s.slice(1)
    },

    // הפונקציה debounce מאפשרת לנו לבצע השהייה של פעולה מסוימת (לדוגמה, השהיית של ה- event keyup)
    debounce: function ( func, wait, immediate ) {
        let timeout

        return function () {
            let context = this, args = arguments

            let later = function () {
                timeout = null
                if ( !immediate )
                    func.apply( context, args )
            }

            let call_now = immediate && !timeout

            clearTimeout( timeout )
            timeout = setTimeout( later, wait )

            if ( call_now )
                func.apply( context, args )
        }
    },

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
    getAlbumID: function () {
        // הפונקציה מחזירה את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים למערך לאחר שאנו מורידים ממנו את הסימן '/', כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        return location.hash.substring(1).split('/')[1]
    },

    // באמצעות הפונקציה isInArrayOfObjects המקבלת את המשתנים arr_to_check, key_to_check ו- value_to_check מתאפשר לבדוק אם המערך הוא מערך של אובייקטים
    isInArrayOfObjects: function ( arr_to_check, key_to_check, value_to_check ) {
        // אם אורך המשתנה arr_to_check הוא 0, נחזיר את הערך הבוליאני false
        if ( arr_to_check.length === 0 )
            return false

        // המשתנה new_arr מכיל את המשתנה arr_to_check שמפעיל את הפונקציה filter שבאמצעותה מתאפשר לבצע סינון, והיא מבצעת סינון על המשתנה item ופונקציית ה- callback שלה (המסומנת כפונקציית חץ) בודקת אם המערך של המערך של ה- item מכיל key ו- value זהים
        let new_arr = arr_to_check.filter(item => item[ key_to_check ] === value_to_check)

        // הפונקציה מחזירה את אורך המשתנה new_arr שגדול מ- 0
        return new_arr.length > 0
    },

    // באמצעות הפונקציה modalOpen מתאפשר לפתוח את המודל ולהציגו ב- DOM
    modalOpen: function () {
        // הוספת ה- class בשם modal-open עם תכונת ה- css בשם padding-right שהערך שלה הוא 17px לאלמנט body
        $('body').addClass('modal-open').css('padding-right', '17px')
        // הוספת ה- class בשם in עם תכונות ה- css בשם display שהערך שלה הוא block, padding-right שהערך שלה הוא 0 ו- overflow-y שהערך שלה הוא scroll לאלמנט div שיש לו מזהה ייחודי בשם modal
        $('#modal').addClass('in').css({'display': 'block', 'padding-right': '0', 'overflow-y': 'scroll'})
    },

    // באמצעות הפונקציה scrollTop המקבלת את המשתנה el$ אנו מבצעים גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט
    scrollTop: function ( $el ) {
        // הפעלה הפונקציה animate על האלמנטים html ו- body המבצעת גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט במשך 8 מאיות השנייה
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    }
}

// ייצוא היכולות של האובייקט Utils החוצה
export default Utils