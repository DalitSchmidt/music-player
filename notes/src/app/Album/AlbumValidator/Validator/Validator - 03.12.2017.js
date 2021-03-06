// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט Validator יוכל להשתמש בהן
import AlbumFormTemplates from './Templates/AlbumFormTemplates'

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
        'album-name': 'The name of album must begin with a big letter',
        'album-artist': 'The name of album artist must begin with a big letter',
        'album-image': 'The image of album cover must be a URL that ends with .JPG, .JPEG, .GIF or .PNG',
        'album-year': 'The year of album must be 4 characters',
        'album-description': 'The description of album must begin with a big letter'
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
            // הוספת class בשם error הצובע באדום את הגבולות של התיבות המצויות במשתנה input ומכילות שגיאות
            // Add class of error
            input.addClass('error')
            // המשתנה html מפעיל את הפונקציה validateInput המצויה תחת האובייקט AlbumFormTemplates שמכילה תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.validateInput()
            // הכנסת המשתנה html לתוך אלמנט div שיש לו class בשם error-message
            $('.error-message').html( html )

            // המשתנה errorMessage מכיל את הודעת השגיאה המפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name
            let errorMessage = this.error_messages[input_name]

            // הכנסת הנתונים המצויים במשתנים html ו- errorMessage לתחילת אלמנט האב של המשתנה input
            input.parent().prepend( html + `${errorMessage}` )
            // הפונקציה מחזירה את הערך הבוליאני false אם יש שגיאות
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true אם אין שגיאות
        return true
    }
}

// ייצוא היכולות של האובייקט Validator החוצה
export default Validator