// ייבוא היכולות של jQuery על-מנת שה- class AlbumForm יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שה- class AlbumForm יוכל להשתמש בהן
import DataService from './DataService'
// ייבוא היכולות של ה- class Templates על-מנת שה- class AlbumForm יוכל להשתמש בהן
import Templates from './Templates/Templates'

// ה- class AlbumForm מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס הוספת אלבום חדש
// הגדרת ה- class בשם AlbumForm
class AlbumForm {
    // אנו משתמשים בפונקציית הבנאי במחלקה כדי להעביר ערכים ליצירת אינסטנס חדש, כך שלמעשה פונקציית הבנאי במחלקה מכילה ומפעילה את כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף
    constructor() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקשורים למחלקה
        this.bindEvents()
        // יצירת אינסטנס חדש של ה- class DataService המכיל את כל הפונקציות המאפשרות לנו לבצע בקשות שונות אל מול ה- API
        this.dataService = new DataService()
    }

    // באמצעות הפונקציה collectValues אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
    collectValues() {
        // האובייקט regexes מכיל פרופרטיס המבצעים ולידציה לשדות ה- inputים של האלבום
        let regexes = {
            name: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            artist: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            img: new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            year: new RegExp("^[0-9]{4}$"),
            description: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
        }

        // המשתנה errors מכיל את הערך הבוליאני false, כך שלמעשה אנו מאפסים את שדות ה- input משגיאות
        let errors = false
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ותיבת הטקסט המצויים תחת div שיש לו מזהה ייחודי בשם album-form
        let inputs = $('#add-new-album-form input, #add-new-album-form textarea')
        // המשתנה album מכיל אובייקט ריק
        let album = {}
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let i, input, input_name, input_value

        // ככל ויש שגיאות ולידציה בנתונים שמכיל המשתנה inputs נמחק מהם את ה- class בשם error-value לפני ביצוע הלולאה
        inputs.removeClass('error-value')

        // כדי לקבל את כל הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת for ונבצע בדיקת ולידציה
        for ( i = 0; i < inputs.length; i++ ) {
            // Collect the element
            input = inputs [ i ]

            // Convert the element from native JS element to a jQuery element
            input = $( input )
            // המשתנה input_name מכיל את כל ה- inputים שה- attribute שלהם הוא name
            input_name = input.attr('name')
            // המשתנה input_value מכיל את כל הערכים המצויים במשתנה input
            input_value = input.val()

            // נבדוק אם הערכים המצויים במשתנה input_value לא עומדים לפי המשתנה input_name בתבניות המוגדרות בפרופרטיס של האובייקט regexes, כך שלמעשה הם מכילים שגיאות כלשהן שלא עומדות בולידאציות המוגדרות
            // Get the matched regex from the regexes object
            // Test the value of the input
            if ( !regexes[ input_name ].test( input_value ) ) {
                // המשתנה errors מכיל את הערך הבוליאני true, כך שלמעשה הוא מכיל שגיאות כלשהן שלא עמדו בולידאציות המוגדרות
                // If there is an error with the regex, set errors to be true, mean we have errors in the validation
                errors = true
                // הוספת class בשם error-value הצובע באדום את הגבולות של התיבות המצויות במשתנה input ומכילות שגיאות
                // Add class of error
                input.addClass('error-value')
            }

            // המשתנה album, שהוא למעשה אובייקט המכיל מערך של כל ה- inputים שה- attribute שלהם הוא name, מכניס לתוך האובייקט את כל הערכים המצויים במשתנה input_value
            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        // אם יש שגיאות הפונקציה מחזירה את הערך הבוליאני false
        if ( errors )
            return false

        // אם אין שגיאות, הפונקציה מחזירה את האובייקט album שלמעשה מכיל מערך עם כל הערכים המצויים בשדות
        return album
    }

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם יצירת האלבום
    setSuccessMessage() {
        alert('Album has been created :)')
    }

    // באמצעות הפונקציה collectSongs אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
    collectSongs() {
        // המשתנה songs_container מכיל באמצעות jQuery את כל ה- inputים שיש להם class בשם song והמצויים תחת div שיש לו מזהה ייחודי בשם songs-form
        let songs_container = $('#add-album-playlist-form .song')
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let songs_inputs, i, songs = []

        // כדי לקבל את כל הערכים המצויים בשדות של המשתנה songs_container נעבור עליהם באמצעות לולאת for
        for ( i = 0; i < songs_container.length; i++ ) {
            // המשתנה songs_inputs מוצא באמצעות שימוש ב- jQuery את ה- inputים המכילים את הערכים המצויים במשתנה songs_container בהתאם למיקום שמתקבל מהלולאה
            songs_inputs = $( songs_container[ i ] ).find('input')
            // הכנסת האובייקט החדש המכיל את שם השיר וה- url של השיר לתוך המערך של songs, כאשר אנחנו יודעים שה- input הראשון במערך הוא שם השיר והשני הוא ה- url של השיר
            songs.push({
                name: $(songs_inputs[0]).val(),
                url: $(songs_inputs[1]).val()
            })
        }

        // הפונקציה מחזירה את המשתנה songs המכיל מערך עם אובייקטים של השירים שבתוכו מצויים הערכים של שם וה- url של השיר
        return songs
    }

    // באמצעות הפונקציה saveAlbum המקבלת את הפרמטר e (המסמל event) אנו שומרים ומציגים ב- DOM את האלבום עם השירים שיצרנו
    saveAlbum( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור save
        e.preventDefault()
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את האירוע
        let el = $(e.target),

            // המשתנה album מכיל את הפונקציה collectValues שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום ומפעיל אותה
            album = this.collectValues(),
            // המשתנה songs מכיל את הפונקציה collectSongs שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים ומפעיל אותה
            songs = this.collectSongs()

        // אם יש שגיאה במשתנה album או במשתנה songs שהגדרנו לעיל נחזיר את השגיאה
        if ( !album || !songs )
            return

        // הכנסת השירים לתוך האלבום
        album.songs = songs
        // הפעלה של הפונקציה saveAlbum המצויה תחת הערך של dataService ומקבלת את המשתנה album המכיל מערך של כל ה- inputים (הערכים) המצויים בפונקציה collectValues, ולאחר מכן נפעיל פרומיס המפעיל את הפונקציה setSuccessMessage המציגה הודעת הצלחה עם יצירת האלבום
        this.dataService.saveAlbum( album ).then( this.setSuccessMessage )
    }

    // באמצעות הפונקציה addSong המקבלת את הפרמטר e (המסמל event) מתאפשר להוסיף שדות להוספת שיר בטופס כאשר לוחצים על הכפתור הוספת שיר
    addSong( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור Add
        e.preventDefault()
        // המשתנה html מכיל את הפונקציה songItem המצויה תחת ה- class Templates ומפעיל אותה
        let html = Templates.songItem()

        // הכנסת המשתנה html שהגדרנו לעיל לתוך ה- div המצוי ב- DOM ומכיל מזהה ייחודי בשם songs-form, ובכך אנו מאפשרים להוסיף שירים לאלבום על-ידי המשתמש במידת הצורך
        $('#songs-form').append( html )
    }

    // באמצעות הפונקציה setCoverImage המקבלת את המשתנה img מתאפשר להביא את ה- attribute בשם src של התגית img המצויה תחת תגית div המכילה את ה- class בשם cover-preview
    setCoverImage( img ) {
        // הבאת ה- attribute בשם src של התגית img המצויה תחת תגית div המכילה את ה- class בשם cover-preview
        $('.cover-preview img').attr('src', img)
    }

    // באמצעות הפונקציה changeCoverImage מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
    changeCoverImage() {
        // המשתנה img מכיל את הערך המצוי בשדה ה- input שיש לו מזהה ייחודי בשם image-url
        let img = $('#image-url').val()
        // המשתנה regex יוצר אינסטנס חדש של תבנית המבצעת תיקוף לנתונים המצויים בשדה ה- input
        let regex = new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$")

        // נבצע בדיקה אם הנתונים המצויים במשתנה img עומדים בתבנית שמצויה במשתנה regex, אם אכן הנתונים עומדים בתבנית ומכילים קישור לתמונה)
        if ( regex.test( img ) )
            // אז נפעיל את הפונקציה setCoverImage המקבלת את המשתנה img, ומאפשרת להביא את ה- attribute בשם src של התגית img המצויה תחת התגית div המכילה את ה- class בשם cover-preview, כך שלמעשה בפועל אנו מחליפים את התמונה המוצגת בתמונה שהכתובת URL שלה הוזנה בתיבת ה- input המכילה מזהה ייחודי בשם image-url כאשר תבוצע יציאה מהאלמנט על-ידי המשתמש
            this.setCoverImage( img )
    }

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס הוספת אלבום
    bindEvents() {
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם save-album, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveAlbum יתייחס בכל מקרה ל- class AlbumForm
        $('#save-album').on('click', $.proxy( this.saveAlbum, this ))
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם add-song תופעל הפונקציה addSong
        $('#add-song').on('click', this.addSong)
        // כאשר מבוצעת יציאה מהאלמנט על-ידי המשתמש (במקרה זה מתיבת ה- input המכילה מזהה ייחודי בשם image-url), ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCoverImage יתייחס לאלמנט עצמו (במקרה זה לאלמנט input המכיל מזהה ייחודי בשם image-url), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCoverImage יתייחס בכל מקרה ל- class AlbumForm
        $('#image-url').on('blur', $.proxy( this.changeCoverImage, this ))
    }
}

// ייצוא היכולות של ה- class AlbumForm החוצה
export default AlbumForm