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
        'album-description': 'The description of album must begin with a big letter',
        'songs_youtube_id': 'The album must contain at least 5 songs'
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
            // המשתנה errorMessage מכיל את הודעת השגיאה המפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name
            let errorMessage = this.error_messages[ input_name ]
            // המשתנה html מפעיל את הפונקציה validateInput המקבלת את המשתנה errorMessage המכיל את הודעת השגיאה המפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.validateInput( errorMessage )
            // הכנסת המשתנה html לתחילת אלמנט האב שיש לו class בשם form-group של המשתנה input
            input.parent('.form-group').prepend( html )
            // הפונקציה מחזירה את הערך הבוליאני false אם יש שגיאות
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true אם אין שגיאות
        return true
    },

    // באמצעות הפונקציה validateInputs המקבלת את המשתנים inputs_arr, min_length, error_key ו- error_container אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו'
    validateInputs: function ( inputs_arr, min_length, error_key, error_container ) {
        // המשתנה error_container מוצא אלמנטים שיש להם class בשם error-message ומסיר אותם מה- DOM
        error_container.find('.error-message').remove()
        // נבצע בדיקה אם אורך המערך של inputs_arr הוא קטן מהנתונים המצויים במשתנה min_length
        if ( inputs_arr.length < min_length ) {
            // המשתנה html מפעיל את הפונקציה validateInput המקבלת את הפרופטי error_message במקום של המשתנה error_key במערך ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.validateInput( this.error_messages[ error_key ] )
            // המשתנה error_container מכניס לתחילת האלמנט את המשתנה html
            error_container.prepend( html )
        }
    }
}

// ייצוא היכולות של האובייקט Validator החוצה
export default Validator