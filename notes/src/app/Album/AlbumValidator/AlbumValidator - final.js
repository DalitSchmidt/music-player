// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumValidator יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumValidator יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט AlbumValidator מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום או בטופס עריכת אלבום
// הגדרה של האובייקט AlbumValidator כקבוע
const AlbumValidator = {
    // הפרופרטי regexes מכיל תבניות Regex שונות שבאמצעותן מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום
    regexes: {
        'album_name': new RegExp(/^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/),
        'album_artist': new RegExp(/^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/),
        'album_image': new RegExp(/^http?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$/),
        'album_year': new RegExp(/^[0-9]{4}$/),
        'album_description': new RegExp(/^[A-Z]/),
        'song_youtube': new RegExp(/([A-Za-z0-9\\-_]{11})/),
        'song_name': new RegExp(/^[A-Z0-9][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/)
    },

    // הפרופרטי error_messages מכיל את הודעות השגיאה האפשריות שיכולות להיות מוצגות ככל ויש שגיאה בערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום
    error_messages: {
        'album_name': 'The name of album must begin with a capital letter',
        'album_artist': 'The name of album artist must begin with a capital letter',
        'album_image': 'The image of album cover must be a URL that ends with .JPG, .JPEG, .GIF, .PNG, .BMP, .TIF, .TIFF or .SVG',
        'album_year': 'The year of album must be 4 characters',
        'genres': 'The album must contain at least 1 genre',
        'album_description': 'The description of album must begin with a capital letter',
        'song_youtube_id': 'The album must contain at least 5 songs',
        'song_name': 'The name of song must begin with a capital letter or with a numbers',
        'duplicate_song': 'The song is already in list',
        'song_youtube': 'The field cannot be empty'
    },

    // באמצעות הפונקציה validateField (שמקבלת את המשתנה input המכיל את האלמנט מסוג input) מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום
    validateField: function ( input ) {
        // המשתנה input_name מכיל את כל האלמנטים מסוג input שיש להם attribute מסוג name
        let input_name = input.attr('name')
        // המשתנה input_value מכיל את כל הערכים המצויים באלמנטים מסוג input
        let input_value = input.val()

        // נבדוק אם הערכים המצויים במשתנה input_value לא עומדים לפי המשתנה input_name בתבניות Regex המוגדרות בפרופרטי regexes, ולמעשה הערכים מכילים שגיאות כלשהן שלא עומדות בוולידציות המוגדרות, אז נבצע מספר פעולות
        // Get the matched regex from the regexes object
        // Test the value of the input
        if ( !this.regexes[ input_name ].test( input_value ) ) {
            // הוספה של ה- class בשם error לאלמנט מסוג input המכיל את הודעת השגיאה
            // Add class of error
            input.addClass('error')

            // המשתנה error_message מכיל את הודעת השגיאה המפורטת המצויה בפרופרטי error_messages בהתאם לשדה המצוי במשתנה input_name
            let error_message = this.error_messages[ input_name ]
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המפורטת בהתאם לשדה המצוי במשתנה input_name) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( error_message )

            // נבדוק את אורך האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט שלהורים שלו יש class בשם song-item, אז נבצע מספר פעולות
            if ( !input.parents('.song-item').find('.error-message').length ) {
                // הכנסה של המשתנה html לתחילת אלמנט האב שיש לו class בשם form-group, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
                input.parent('.form-group').prepend( html )
                // הכנסה של המשתנה html לתחילת האלמנט שלהורים שלו יש את ה- class בשם error-message המצוי בתוך אלמנט שיש לו class בשם song-item, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
                input.find('.song-item').parents('.error-message').prepend( html )
            }

            // החזרה של הערך הבוליאני false
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true
        return true
    },

    // באמצעות הפונקציה validateInputs (שמקבלת את המשתנה inputs_arr המכיל את המערך עם האלמנטים מסוג input, את המשתנה min_length המכיל את האורך המינימלי שהמערך עם האלמנטים יכול להכיל, את המשתנה error_key המכיל את המפתח של הודעת השגיאה שתוצג ואת המשתנה error_container המכיל את האלמנט שתוצג בו הודעת השגיאה) מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input שהם מערך כגון שירים, ז'אנרים וכו'
    validateInputs: function ( inputs_arr, min_length, error_key, error_container ) {
        // הסרה של האלמנט הראשון שהוא ילד ישיר של האלמנט שיש לו class בשם error-message המצוי במשתנה error_container מה- DOM
        error_container.find('>.error-message:first-of-type').remove()

        // נבדוק את אורך המערך של inputs_arr ואם המערך קטן מהערך המצוי במשתנה min_length, אז נבצע מספר פעולות
        if ( inputs_arr.length < min_length ) {
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את הפרופרטי error_message המכיל את הודעות השגיאה האפשריות שיכולות להיות מוצגות ככל ויש שגיאה בערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום במקום של המשתנה error_key במערך המכיל את המפתח של הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            // הכנסה של המשתנה html לתחילת האלמנט המצוי במשתנה error_container, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
            error_container.prepend( html )

            // החזרה של הערך הבוליאני false
            return false
        }

        // הפונקציה מחזירה את הערך הבוליאני true
        return true
    },

    // באמצעות הפונקציה validateDuplications (שמקבלת את המשתנה arr_to_check המכיל את המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה key_to_check המכיל את המפתח של המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה value_to_check המכיל את הערך של המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה error_key המכיל את המפתח של הודעת השגיאה שתוצג ואת המשתנה error_container המכיל את האלמנט שתוצג בו הודעת השגיאה) מתאפשר לבצע בדיקת ולידציה הבודקת אם הערך כבר שמור במסד הנתונים על-מנת שלא יתאפשר שיהיה שמור ערך כפול
    validateDuplications: function ( arr_to_check, key_to_check, value_to_check, error_key, error_container ) {
        // הסרה של האלמנטים שיש להם class בשם error-message המצויים במשתנה error_container מה- DOM
        error_container.find('.error-message').remove()

        // המשתנה has_duplications מפעיל את הפונקציה isInArrayOfObjects (שמקבלת את המשתנה arr_to_check המכיל את המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה key_to_check המכיל את המפתח של המערך שלגביו מתבצעת בדיקת הוולידציה ואת המשתנה value_to_check המכיל את הערך של המערך שלגביו מתבצעת בדיקת הוולידציה) המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבדוק אם המערך הוא מערך עם אובייקטים
        let has_duplications = Utils.isInArrayOfObjects( arr_to_check, key_to_check, value_to_check)

        // נבדוק אם המשתנה has_duplications אכן מכיל מערך עם אובייקטים, אז נבצע מספר פעולות
        if ( has_duplications ) {
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את הפרופרטי error_messages המכיל את הודעות השגיאה האפשריות שיכולות להיות מוצגות ככל ויש שגיאה בערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום במקום של המשתנה error_key במערך המכיל את המפתח של הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            // הכנסה של המשתנה html לתחילת האלמנט המצוי במשתנה error_container והסרה של ה- class בשם success מהאלמנט והוספה של ה- class בשם error לאותו אלמנט שהוסר ממנו ה- class בשם success, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
            error_container.removeClass('success').addClass('error').prepend( html )
        }

        // הפונקציה מחזירה את המשתנה has_duplications המפעיל את הפונקציה isInArrayOfObjects (שמקבלת את המשתנה arr_to_check המכיל את המערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה key_to_check המכיל את המפתח של המערך שלגביו מתבצעת בדיקת הוולידציה ואת המשתנה value_to_check המכיל את הערך של המערך שלגביו מתבצעת בדיקת הוולידציה) המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבדוק אם המערך הוא מערך עם אובייקטים
        return has_duplications
    }
}

// ייצוא היכולות של האובייקט AlbumValidator החוצה
export default AlbumValidator