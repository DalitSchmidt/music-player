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

            let callNow = immediate && !timeout
            clearTimeout( timeout )
            timeout = setTimeout( later, wait )

            if ( callNow )
                func.apply( context, args )
        }
    },

    // באמצעות הפונקציה calculateTime המקבלת את המשתנה seconds המכיל את אורך השיר בשניות, אנו מבצעים חישוב של זמן השיר
    calculateTime: function( seconds ) {
        // הפונקציה מחזירה את החישוב שמתבצע לגבי זמן השיר
        return Math.floor( seconds / 60 ) + ':' + seconds % 60
    }
}

// ייצוא היכולות של האובייקט Utils החוצה
export default Utils