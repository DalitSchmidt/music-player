// האובייקט Utils מכיל פונקציות עזר שישמשו אותנו במידת הצורך
// הגדרת האוביביקט Utils כקבוע
const Utils = {
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

    // באמצעות הפונקציה calculateTime המקבלת את המשתנה seconds המכיל את אורך השיר בשניות, אנו מבצעים חישוב של זמן השיר
    calculateTime: function( seconds ) {
        // הפונקציה מחזירה את החישוב שמתבצע לגבי זמן השיר
        return Math.floor( seconds / 60 ) + ':' + seconds % 60
    },

    // באמצעות הפונקציה isInArrayOfObjects המקבלת את המשתנים arr_to_check, key_to_check ו- value_to_check מתאפשר לבדוק אם המערך הוא מערך של אובייקטים
    isInArrayOfObjects: function ( arr_to_check, key_to_check, value_to_check ) {
        // המשתנה new_arr מכיל את המשתנה arr_to_check שמפעיל את הפונקציה filter שבאמצעותה מתאפשר לבצע סינון, והיא מבצעת סינון על המשתנה item ופונקציית ה- callback שלה (המסומנת כפונקציית חץ) בודקת אם המערך של המערך של ה- item מכיל key ו- value זהים
        let new_arr = arr_to_check.filter( item => item[ key_to_check ] === value_to_check )
        // הפונקציה מחזירה את אורך המשתנה new_arr שגדול מ- 0
        return new_arr.length > 0
    }
}

// ייצוא היכולות של האובייקט Utils החוצה
export default Utils