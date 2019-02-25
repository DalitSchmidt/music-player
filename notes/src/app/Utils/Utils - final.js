// ייבוא היכולות של jQuery על-מנת שהאובייקט Utils יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט Utils המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות עזר לשימוש במידת הצורך
// הגדרה של האובייקט Utils כקבוע
const Utils = {
    // באמצעות הפונקציה calculateTime (שמקבלת את המשתנה seconds המכיל את אורך השיר בשניות) מתאפשר לבצע חישוב של זמן השיר
    calculateTime: function ( seconds ) {
        // המשתנה minutes מכיל את הדקות של השיר באמצעות ביצוע חישוב מתמטי המחלק את הערך המצוי במשתנה seconds ב- 60
        let minutes = Math.floor( seconds / 60 )
        // המשתנה seconds_to_display מכיל את השניות של השיר להצגה ב- DOM באמצעות ביצוע מודולו 60 לערך המצוי במשתנה seconds
        let seconds_to_display = seconds % 60

        // המשתנה minutes בודק אם הערך המצוי במשתנה minutes הוא קטן מ- 10, אם כן, אז נוסיף לפני את הספרה 0, אחרת, כלומר הוא גדול מ- 10, אז נחזיר את הערך כפי שהוא
        minutes = minutes < 10 ? '0' + minutes : minutes
        // המשתנה seconds_to_display בודק אם הערך המצוי במשתנה seconds_to_display הוא קטן מ- 10, אם כן, אז נוסיף לפני את הספרה 0, אחרת, כלומר הוא גדול מ- 10, אז נחזיר את הערך כפי שהוא
        seconds_to_display = seconds_to_display < 10 ? '0' + seconds_to_display : seconds_to_display

        // הפונקציה מחזירה תבנית המציגה את זמן השיר, כאשר בחלק השמאלי של התבנית מוצגות הדקות, בחלק הימני של התבנית מוצגות השניות ובין החלקים מפריד הסימן ':', ובכך מתאפשר להציג למשתמש ב- DOM את חישוב זמן השיר בפורמט של 4 תווים (XX:XX)
        return minutes + ':' + seconds_to_display
    },

    // באמצעות הפונקציה cancelDelete מתאפשר לחזור לעמוד שבו היינו ולבטל את הפעולה של המחיקה
    cancelDelete: function () {
        // הסרה של ה- class בשם modal-open מהאלמנט body והפעלה של הפונקציית CSS של jQuery על האלמנט body, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם padding-right שהערך שלה הוא 0
        $('body').removeClass('modal-open').css('padding-right', '0')
        // הסרה של ה- class בשם in מהאלמנט div שיש לו מזהה ייחודי בשם modal והפעלה של הפונקציית CSS של jQuery על האלמנט div שיש לו מזהה ייחודי בשם modal, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם display שהערך שלה הוא none ואת תכונת ה- CSS בשם padding-right שהערך שלה הוא 0
        $('#modal').removeClass('in').css({'display': 'none', 'padding-right': '0'})
    },

    // באמצעות הפונקציה capitalize (שמקבלת את המשתנה capital_letter המכיל את האות הגדולה) מתאפשר להפוך את האות הראשונה לאות גדולה
    capitalize: function ( capital_letter ) {
        // הפונקציה מחזירה את האות הראשונה שהוחלפה לאות גדולה
        return capital_letter && capital_letter[0].toUpperCase() + capital_letter.slice(1)
    },

    // באמצעות הפונקציה debounce (שמקבלת את המשתנה func המכיל את הפונקציה שבאמצעותה מתאפשר לבצע את ההשהייה של הפעולה, את המשתנה wait המכיל את זמן ההמתנה שהפונקציה מבצעת ואת המשתנה immediate המכיל את הפעולה המיידית לביצוע) מתאפשר לבצע השהייה של פעולה מסוימת (לדוגמה, השהייה של ה- event מסוג keyup)
    debounce: function ( func, wait, immediate ) {
        // הצהרה על משתנה גלובלי שנבצע בו שימוש בפונקציה
        let timeout

        // הפונקציה מחזירה פונקציית callback שבאמצעותה מתאפשר לבצע השהייה של פעולה מסוימת
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

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המזהה הייחודי של האלבום המצוי ב- URL
    getAlbumID: function () {
        // הפונקציה מחזירה את המזהה הייחודי של האלבום המצוי ב- URL, מאחר ובאמצעות הפעלה של הפונקציה (1)location.hash.substring מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה מפצלים למערך לאחר שמורידים ממנו את הסימן '/', כאשר אנו יודעים שהאינדקס 1 במערך מכיל את המזהה הייחודי של האלבום המצוי ב- URL
        return location.hash.substring(1).split('/')[1]
    },

    // באמצעות הפונקציה isInArrayOfObjects (שמקבלת את המשתנה arr_to_check המכיל את המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה key_to_check המכיל את המפתח של המערך שלגביו מתבצעת בדיקת הוולידציה ואת המשתנה value_to_check המכיל את הערך של המערך שלגביו מתבצעת בדיקת הוולידציה) מתאפשר לבדוק אם המערך הוא מערך עם אובייקטים
    isInArrayOfObjects: function ( arr_to_check, key_to_check, value_to_check ) {
        // נבדוק אם אורך הערך המצוי במשתנה arr_to_check הוא 0, אז נבצע מספר פעולות
        if ( arr_to_check.length === 0 )
            // החזרה של הערך הבוליאני false
            return false

        // המשתנה new_arr מכיל את המשתנה arr_to_check המפעיל את הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה item המכיל את הפריט ושבאמצעותה מתאפשר לבדוק שה- item במערך המכיל את המשתנה key_to_check זהה לערך המצוי במשתנה value_to_check
        let new_arr = arr_to_check.filter(item => item[ key_to_check ] === value_to_check)

        // הפונקציה מחזירה את אורך המשתנה new_arr שגדול מ- 0
        return new_arr.length > 0
    },

    // באמצעות הפונקציה modalOpen מתאפשר לפתוח את המודל ולהציגו ב- DOM
    modalOpen: function () {
        // הוספה של ה- class בשם modal-open לאלמנט body והפעלה של הפונקציית CSS של jQuery על האלמנט body, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם padding-right שהערך שלה הוא 17px
        $('body').addClass('modal-open').css('padding-right', '17px')
        // הוספה של ה- class בשם in לאלמנט div שיש לו מזהה ייחודי בשם modal והפעלה של הפונקציית CSS של jQuery על האלמנט div שיש לו מזהה ייחודי בשם modal, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם display שהערך שלה הוא block, את תכונת ה- CSS בשם padding-right שהערך שלה הוא 0 ואת תכונת ה- CSS בשם overflow-y שהערך שלה הוא scroll
        $('#modal').addClass('in').css({'display': 'block', 'padding-right': '0', 'overflow-y': 'scroll'})
    },

    // באמצעות הפונקציה scrollTop (שמקבלת את המשתנה el$ המסמל אלמנט) מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט
    scrollTop: function ( $el ) {
        // הפעלה של הפונקציה animate על האלמנטים html ו- body שבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט במשך 8 מאיות השנייה
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    }
}

// ייצוא היכולות של האובייקט Utils החוצה
export default Utils