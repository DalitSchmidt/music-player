// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט Player על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import Player from './../Player'
// ייבוא היכולות של האובייקט Templates על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import Templates from '../Templates/Templates'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'

// המשתנה PREVIEW_IMG מכיל כתובת URL קבועה של תמונת התצוגה
const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

// האובייקט AlbumForm מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס הוספת אלבום חדש
// הגדרת האובייקט AlbumForm כקבוע
const AlbumForm = {
    // באמצעות הפונקציה collectValues אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
    collectValues: function() {
        // האובייקט regexes מכיל פרופרטיס המבצעים ולידציה לשדות ה- inputים של האלבום
        let regexes = {
            'album-name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            'album-artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            'album-image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            'album-year': new RegExp("^[0-9]{4}$"),
            'album-description': new RegExp("^[A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
        }

        // המשתנה errors מכיל את הערך הבוליאני false, כך שלמעשה אנו מאפסים את שדות ה- input משגיאות
        let errors = false
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ותיבת הטקסט המצויים בתוך תגית div שיש לה מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input, #add-new-album-form textarea')
        // המשתנה album מכיל אובייקט ריק
        let album = {}
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let i, input, input_name, input_value

        // ככל ויש שגיאות ולידציה בנתונים שמכיל המשתנה inputs נמחק מהם את ה- class בשם error לפני ביצוע הלולאה
        inputs.removeClass('error')

        // כדי לקבל את כל הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת for ונבצע בדיקת ולידציה
        for ( i = 0; i < inputs.length; i++ ) {
            // המשתנה input אוסף את האלמנט המצוי במשתנה inputs (המכיל את כל ה- inputים ותיבת הטקסט המצויים בתוך תגית div שיש לה מזהה ייחודי בשם add-new-album-form) בהתאם למיקום שלו בלולאה
            // Collect the element
            input = inputs [ i ]

            // המשתנה input מכיל את המשתנה input אשר אוסף את האלמנט המצוי במשתנה inputs, כך שלמעשה הוא מכיל ערך מהשדה המצוי במשתנה inputs
            // Convert the element from native JS element to a jQuery element
            input = $( input )
            // נבדוק אם לנתון המצוי במשתנה input יש attribute מסוג type שיש לו ערך בשם checkbox, ככל וכן נמשיך בביצוע הפעולות של הפונקציה
            if ( input.attr('type') === 'checkbox' )
                continue

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
                // הוספת class בשם error הצובע באדום את הגבולות של התיבות המצויות במשתנה input ומכילות שגיאות
                // Add class of error
                input.addClass('error')
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
    },

    // באמצעות הפונקציה scrollTop אנו מבצעים גלילה של העמוד חזרה למעלה
    scrollTop: function () {
        // הפעלת הפונקציה animate על האלמנטים html ו- body המבצעת גלילה של העמוד חזרה למעלה
        $("html, body").animate({ scrollTop: 0 }, 1200)
    },

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם יצירת האלבום
    setSuccessMessage: function() {
        alert('Album has been created :)')
    },

    // באמצעות הפונקציה collectSongs אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
    collectSongs: function() {
        // המשתנה songs_container מכיל באמצעות jQuery את כל הנתונים המצויים בתגית div שיש לה class בשם song המצויים בתוך תגית div שיש לה class בשם col-md-12 שמצויים בתוך תגית div שיש לה מזהה ייחודי בשם add-album-playlist-form
        let songs_container = $('#add-album-playlist-form .col-md-12 .song')
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
    },

    // באמצעות הפונקציה collectGenres אנו מביאים את כל הערכים המצויים ב- inputים שיש להם ערכים של הז'אנרים
    collectGenres: function () {
        // המשתנה inputs מכיל באמצעות jQuery את ה- inputים מסוג checkbox שיש להם attribute מסוג checked (כלומר ה- inputים המסומנים) ושמצויים בתוך אלמנט div שמצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-genres
        let inputs = $('#album-genres div input[type=checkbox]:checked')
        // המשתנה ids מכיל מערך ריק שלתוכו ייכנסו הערכים של הז'אנרים
        let ids = []

        // הלולאת each עוברת איבר-איבר על הנתונים במשתנה inputs (המכיל מערך של כל ה- inputים המסומנים מסוג checkbox) ומוציאה ממנו את ה- index ואת ה- input
        $.each(inputs, ( i, input ) => {
            // הכנסת הערך שמצוי במשתנה input לתוך המשתנה ids המכיל מערך עם כל הערכים של הז'אנרים
            ids.push( $( input ).val() )
        })

        // הפונקציה מחזירה את המשתנה ids המכיל מערך עם כל הערכים של הז'אנרים
        return ids
    },

    // באמצעות הפונקציה saveAlbum המקבלת את הפרמטר e (המסמל event) אנו שומרים ומציגים ב- DOM את האלבום עם השירים שיצרנו
    saveAlbum: function( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור save
        e.preventDefault()
        // המשתנה album מכיל את הפונקציה collectValues שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום ומפעיל אותה
        let album = this.collectValues()

        // אם יש שגיאה בשדות המצויים במשתנה album שלמעשה מכיל את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
        if ( !album ) {
            // הפעלה של הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה
            this.scrollTop()
            return
        }

        // הפרופרטי genres שמצוי במשתנה album (המפעיל את הפונקציה collectValues המכילה את כל הערכים של האלבום) מפעיל את הפונקציה collectGenres שבאמצעותה אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של הז'אנרים
        album.genres = this.collectGenres()
        // הצגת הנתונים המצויים במשתנה album בחלון ה- console
        console.log( album )
        return

        // let songs = this.collectSongs()
        //
        // if ( !album || !songs )
        //     return
        //
        // album.songs = songs
        AlbumAPIService.saveAlbum( album ).then( this.setSuccessMessage )
    },

    // באמצעות הפונקציה addSong המקבלת את הפרמטר e (המסמל event) מתאפשר להוסיף שדות להוספת שיר בטופס כאשר לוחצים על הכפתור הוספת שיר
    addSong: function( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור Add
        e.preventDefault()
        // המשתנה html מפעיל את הפונקציה songItem המצויה תחת האובייקט AlbumFormTemplates שבאמצעותה אנו יוצרים תבנית html של השדות להוספת שיר לאלבום, כך שלמעשה הוא מכיל את התבנית html של השדות להוספת שיר לאלבום
        let html = AlbumFormTemplates.songItem()

        // הכנסת המשתנה html (המכיל את התבנית html של השדות להוספת שיר לאלבום באמצעות הפעלת הפונקציה songItem המצויה תחת האובייקט AlbumFormTemplates) לתוך האלמנט div המצוי ב- DOM שיש לו מזהה ייחודי בשם add-new-song, ובכך אנו מאפשרים למשתמש להוסיף שירים לאלבום במידת הצורך
        $('#add-new-song').append( html )
    },

    // באמצעות הפונקציה setCoverImage המקבלת את המשתנה img מתאפשר להביא את ה- attribute בשם src של התגית img המצויה בתוך תגית div שיש לה מזהה ייחודי בשם image-cover-preview
    setCoverImage: function( img ) {
        // הבאת ה- attribute בשם src של התגית img המצויה בתוך תגית div שיש לה מזהה ייחודי בשם image-cover-preview
        $('#image-cover-preview img').attr('src', img)
    },

    // באמצעות הפונקציה changeCoverImage מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
    changeCoverImage: function() {
        // המשתנה img מכיל את הערך המצוי בשדה ה- input שיש לו מזהה ייחודי בשם image-url
        let img = $('#image-url').val()
        // המשתנה regex יוצר אינסטנס חדש של תבנית המבצעת תיקוף לנתונים המצויים בשדה ה- input
        let regex = new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$")

        // אם המשתנה img הוא ריק מנתונים, אז נפעיל את הפונקציה setCoverImage (המביאה את ה- attribute בשם src של התגית img) שמקבלת את המשתנה PREVIEW_IMG (המכיל כתובת URL קבועה של התמונת התצוגה), ובכך למעשה אנו מחזירים את התמונה המוצגת לתמונת ברירת המחדל כאשר אין נתונים בשדה ה- input, ולאחר מכן מבצעים חזרה להמשך ביצוע הפונקציה
        if ( img === '' ) {
            this.setCoverImage( PREVIEW_IMG )
            return
        }

        // נבצע בדיקה אם הנתונים המצויים במשתנה img עומדים בתבנית שמצויה במשתנה regex, אם אכן הנתונים עומדים בתבנית ומכילים קישור לתמונה)
        if ( regex.test( img ) )
            // אז נפעיל את הפונקציה setCoverImage המקבלת את המשתנה img, ומאפשרת להביא את ה- attribute בשם src של התגית img המצויה בתוך התגית div שיש לה את ה- class בשם image-cover-preview, כך שלמעשה בפועל אנו מחליפים את התמונה המוצגת בתמונה שהכתובת URL שלה הוזנה בתיבת ה- input המכילה מזהה ייחודי בשם image-url כאשר תבוצע יציאה מהאלמנט על-ידי המשתמש
            this.setCoverImage( img )
    },

    // באמצעות הפונקציה setGenres מתאפשר להציג ב- DOM את הז'אנרים המצויים במסד הנתונים
    setGenres: function() {
        // הפעלה של הפונקציה getGenres המצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/genres' ובכך מתאפשר למעשה לקבל את כל הז'אנרים המצויים במסד הנתונים, ולאחר מכן נפעיל promise שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genres המכיל מערך עם הפרטים של כל הז'אנרים
        AlbumAPIService.getGenres().then(genres => {
            // המשתנה html מפעיל את הפונקציה genres המקבלת את המשתנה genres המכיל מערך עם הפרטים של כל הז'אנרים ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המאפשרת להציג ב- DOM את כל הז'אנרים המצויים במערך
            let html = AlbumFormTemplates.genres( genres )
            // הכנסת המשתנה html (המכיל תבנית html המאפשרת להציג ב- DOM את כל הז'אנרים המצויים במערך) לתוך האלמנט div שמצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם album-genres, ובכך מתאפשר למעשה להציג ב- DOM את כל הז'אנרים המצויים במסד הנתונים
            $('#album-genres div').html( html )
        })
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס הוספת אלבום
    bindEvents: function() {
        // כאשר לוחצים על האלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveAlbum יתייחס בכל מקרה לאובייקט AlbumForm
        $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם add-another-song תופעל הפונקציה addSong
        $('#add-another-song').on('click', this.addSong)
        // כאשר מבוצעת יציאה מהאלמנט על-ידי המשתמש (במקרה זה מתיבת ה- input המכילה מזהה ייחודי בשם image-url), ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCoverImage יתייחס לאלמנט עצמו (במקרה זה לאלמנט input המכיל מזהה ייחודי בשם image-url), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCoverImage יתייחס בכל מקרה לאובייקט AlbumForm
        $('#image-url').on('blur', $.proxy( this.changeCoverImage, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm
    init: function() {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumForm
        this.bindEvents()
        // הפעלה של הפונקציה setGenres המאפשרת להציג ב- DOM את הז'אנרים המצויים במסד הנתונים
        this.setGenres()
    }
}

// ייצוא היכולות של האובייקט AlbumForm החוצה
export default AlbumForm