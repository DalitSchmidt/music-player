// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumValidator יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumValidator יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט AlbumValidator מכיל את כל הפונקציות הקשורות לביצוע התיקוף לנתונים המצויים בשדות של הטופס הוספת אלבום
// הגדרת האובייקט AlbumValidator כקבוע
const AlbumValidator = {
    // הפרופרטיס regexes מכיל פרופרטיס שונים המבצעים ולידציה לשדות ה- inputים של האלבום
    regexes: {
        'album_name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album_artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album_image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp|tif?f)$"),
        'album_year': new RegExp("^[0-9]{4}$"),
        'album_description': new RegExp("^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']"),
        'song_name': new RegExp("^[A-Z0-9][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$"),
        // 'album_description': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
    },

    // הפרופרטיס error_messages מכיל הודעות שגיאה האפשריות להיות מוצגות ככל ויש שגיאה בנתונים המצויים באלמנט input
    error_messages: {
        'album_name': 'The name of album must begin with a capital letter',
        'album_artist': 'The name of album artist must begin with a capital letter',
        'album_image': 'The image of album cover must be a URL that ends with .JPG, .JPEG, .GIF or .PNG',
        'album_year': 'The year of album must be 4 characters',
        'album_description': 'The description of album must begin with a capital letter',
        'song_youtube_id': 'The album must contain at least 5 songs',
        'song_name': 'Not valid name',
        'duplicate_song': 'Song is already in list',
        'genres': 'At least 1 genre'
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
            // המשתנה error_message מכיל את הודעת השגיאה המפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name
            let error_message = this.error_messages[ input_name ]
            // המשתנה html מפעיל את הפונקציה errorMessage המקבלת את המשתנה error_message המכיל את הודעת השגיאה המפורטת בהתאם לשדה שמצוי במשתנה input_name שמכיל את כל ה- inputים שיש להם attribute בשם name ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( error_message )
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
        // המשתנה error_container מוצא את האלמנט הראשון שהוא ילד ישיר של האלמנט שיש לו class בשם error-message ומסיר אותו מה- DOM
        error_container.find('>.error-message:first-of-type').remove()
        // הצגת אורך המערך המצוי במשתנה inputs_arr שקטן מהנתונים המצויים במשתנה min_length בחלון ה- console
        console.log( inputs_arr.length < min_length )

        // נבצע בדיקה אם אורך המערך של inputs_arr הוא קטן מהנתונים המצויים במשתנה min_length
        if ( inputs_arr.length < min_length ) {
            // המשתנה html מפעיל את הפונקציה errorMessage המקבלת את הפרופטי error_message במקום של המשתנה error_key במערך ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            // המשתנה error_container מכניס לתחילת האלמנט את המשתנה html
            error_container.prepend( html )
            // הפונקציה מחזירה את הערך הבוליאני false אם יש שגיאות
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true אם אין שגיאות
        return true
    },

    // באמצעות הפונקציה validateDuplications המקבלת את המשתנים arr_to_check, key_to_check, value_to_check, error_key ו- error_container אנו מבצעים בדיקת ולידציה הבודקת אם הנתונים כבר קיימים, כך שלמעשה לא יתאפשר שיהיו נתונים כפולים
    validateDuplications: function ( arr_to_check, key_to_check, value_to_check, error_key, error_container ) {
        // המשתנה error_container מוצא אלמנטים שיש להם class בשם error-message ומסיר אותם מה- DOM
        error_container.find('.error-message').remove()

        // המשתנה has_duplications מפעיל את הפונקציה isInArrayOfObjects המקבלת את המשתנים arr_to_check, key_to_check ו- value_to_check המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבדוק אם המערך הוא מערך של אובייקטים
        let has_duplications = Utils.isInArrayOfObjects( arr_to_check, key_to_check, value_to_check)

        // נבצע בדיקה אם המשתנה has_duplictions שמפעיל את הפונקציה isInArrayOfObjects המקבלת את המשתנים arr_to_check, key_to_check ו- value_to_check המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבדוק אם המערך הוא מערך של אובייקטים, אכן מכיל מערך של אובייקטים
        if ( has_duplications ) {
            // המשתנה html מפעיל את הפונקציה errorMessage המקבלת את הפרופטי error_message במקום של המשתנה error_key במערך ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, כך שלמעשה המשתנה html מאפשר להציג ב- DOM את הודעת השגיאה הרלוונטית
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            // הכנסת המשתנה html לתחילת האלמנט המצוי במשתנה error_container והסרת ה- class בשם success מהאלמנט והוספת ה- class בשם error לאותו אלמנט
            error_container.removeClass('success').addClass('error').prepend( html )
        }

        //הפונקציה מחזירה את המשתנה has_duplications שמפעיל את הפונקציה isInArrayOfObjects המקבלת את המשתנים arr_to_check, key_to_check ו- value_to_check המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבדוק אם המערך הוא מערך של אובייקטים
        return has_duplications
    }
}

// ייצוא היכולות של האובייקט AlbumValidator החוצה
export default AlbumValidator