// האובייקט Validator מכיל את כל הפונקציות הקשורות לביצוע התיקוף לנתונים המצויים בשדות של הטופס הוספת אלבום
// הגדרת האובייקט Validator כקבוע
const Validator = {
    // הפרופרטיס regexes מכיל פרופרטיס שונים המבצעים ולידציה לשדות ה- inputים של האלבום
    regexes: {
        'album-name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
        'album-year': new RegExp("^[0-9]{4}$"),
        'album-description': new RegExp("^[A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
    },

    // הפרופרטיס error_messages מכיל הודעות שגיאה האפשריות להיות מוצגות ככל ויש שגיאה בנתונים המצויים באלמנט input
    error_messages: {
        'album-name': 'error 1',
        'album-artist': 'error 2',
        'album-image': 'error 3',
        'album-year': 'error 4',
        'album-description': 'error 5'
    },

    // באמצעות הפונקציה validateField המקבלת את המשתנה input מתאפשר לבצע בדיקת תיקוף לערכים המצויים בשדות ה- input
    validateField: function ( input ) {
        // המשתנה input_name מכיל את כל ה- inputים שיש להם attribute בשם name
        let input_name = input.attr('name')
        // המשתנה input_value מכיל את כל הערכים המצויים במשתנה input
        let input_value = input.val()

        // נבדוק אם הערכים המצויים במשתנה input_value לא עומדים לפי המשתנה input_name בתבניות המוגדרות בפרופרטיס של הפרופרטיס regexes, כך שלמעשה הם מכילים שגיאות כלשהן שלא עומדות בולידאציות המוגדרות
        // Get the matched regex from the regexes object
        // Test the value of the input
        if ( !this.regexes[ input_name ].test( input_value ) ) {
            // If there is an error with the regex, set errors to be true, mean we have errors in the validation
            // הוספת class בשם error הצובע באדום את הגבולות של התיבות המצויות במשתנה input ומכילות שגיאות
            // Add class of error
            input.addClass('error')
            // הוספת אלמנט span עם הודעת שגיאה מפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name לתחילת אלמנט האב של המשתנה input
            input.parent().prepend(`<span class="error">${this.error_messages[input_name]}</span>`)
            // הפונקציה מחזירה את הערך הבוליאני false אם יש שגיאות
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true אם אין שגיאות
        return true
    }


}

// ייצוא היכולות של האובייקט Validator החוצה
export default Validator