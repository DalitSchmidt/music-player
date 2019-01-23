// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של jquery-ui/themes/base/core.css על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
// import 'jquery-ui/themes/base/core.css'
// ייבוא היכולות של jquery-ui/themes/base/theme.css על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
// import 'jquery-ui/themes/base/theme.css'
// ייבוא היכולות של jquery-ui/themes/base/selectable.css על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
// import 'jquery-ui/themes/base/selectable.css'
// ייבוא היכולות של jquery-ui/ui/core על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
// import 'jquery-ui/ui/core'
// ייבוא היכולות של jquery-ui/ui/widgets/autocomplete על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
// import * as ui from 'jquery-ui/ui/widgets/autocomplete'
// ייבוא היכולות של jquery-ui-browserify על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import ui from 'jquery-ui-browserify'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Validator על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import Validator from '../Validator'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import Utils from '../Utils'

// המשתנה PREVIEW_IMG מכיל כתובת URL קבועה של תמונת התצוגה
const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

// האובייקט AlbumForm מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס הוספת אלבום חדש
// הגדרת האובייקט AlbumForm כקבוע
const AlbumForm = {
    // באמצעות הפונקציה collectValues אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
    collectValues: function() {
        // המשתנה errors מכיל את הערך הבוליאני false, כך שלמעשה אנו מאפסים את שדות ה- input משגיאות
        let errors = false
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ותיבת הטקסט שיש להם את ה- attribute בשם required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')
        // המשתנה album מכיל אובייקט ריק
        let album = {}
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let i, input, input_name, input_value

        // ככל ויש שגיאות ולידציה בנתונים שמכיל המשתנה inputs נמחק מהם את ה- class בשם error לפני ביצוע הלולאה
        inputs.removeClass('error')
        // הסרת האלמנט span שיש לו class בשם error ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form span.error').remove()

        // כדי לקבל את כל הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת for ונבצע בדיקת ולידציה
        for ( i = 0; i < inputs.length; i++ ) {
            // המשתנה input אוסף את האלמנט המצוי במשתנה inputs (המכיל את כל ה- inputים ותיבת הטקסט המצויים בתוך תגית div שיש לה מזהה ייחודי בשם add-new-album-form) בהתאם למיקום שלו בלולאה
            // Collect the element
            input = inputs [ i ]

            // המשתנה input מכיל את המשתנה input אשר אוסף את האלמנט המצוי במשתנה inputs, כך שלמעשה הוא מכיל ערך מהשדה המצוי במשתנה inputs
            // Convert the element from native JS element to a jQuery element
            input = $( input )

            // המשתנה input_name מכיל את כל ה- inputים שה- attribute שלהם הוא name
            input_name = input.attr('name')
            // המשתנה input_value מכיל את כל הערכים המצויים במשתנה input
            input_value = input.val()

            // נבדוק אם בפונקציה validateField המצויה תחת האובייקט Validator ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לשדות, יש ערך שמצוי במשתנה input המכיל ערך מהשדה המצוי במשתנה inputs עם נתונים שגויים
            if ( !Validator.validateField( input ) )
                // המשתנה errors מכיל את הערך הבוליאני true, כך שלמעשה הוא מכיל שגיאות כלשהן שלא עמדו בולידאציות המוגדרות
                // If there is an error with the regex, set errors to be true, mean we have errors in the validation
                errors = true

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

    // באמצעות הפונקציה scrollTop המקבלת את המשתנה $el אנו מבצעים גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט
    scrollTop: function ( $el ) {
        // הפעלה הפונקציה animate על האלמנטים html ו- body המבצעת גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט במשך 8 מאיות השנייה
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    },

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם יצירת האלבום
    setSuccessMessage: function() {
        alert('Album has been created :)')
    },

    // באמצעות הפונקציה collectSongs אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
    collectSongs: function() {
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let has_duplications = false, songs = [], song, id, name, duration

        // הלולאת each עוברת איבר-איבר על אלמנט div שיש לו class בשם song-item (שלמעשה מכיל מערך של כל האלמנטים מסוג div שיש להם class בשם song-item) ומוציאה ממנו את ה- index ואת ה- item
        $.each( $('.song-item'), ( index, item ) => {
            // המשתנה song מכיל באמצעות שימוש ב- jQuery את ה- item שמצוי במערך של song-item
            song = $( item )
            // המשתנה id מכיל את הערך המצוי בתיבת ה- input של המזהה הייחודי של YouTube, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_youtube ומביא את הערך שמצוי ב- input
            id = song.find('input[name=song_youtube]').val()
            // המשתנה name מכיל את הערך המצוי בתיבת ה- input של שם השיר, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_name ומביא את הערך שמצוי ב- input
            name = song.find('input[name=song_name]').val()
            // המשתנה duration מכיל את הערך המצוי בתיבת ה- input של זמן השיר, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_time ומביא את הערך שמצוי ב- input
            duration = song.find('input[name=song_time]').val()

            // אם יש ערכים במשתנים name, id ו- duration, כלומר שהם לא ריקים מתוכן
            if ( id !== '' && name !== '' && duration !== '' ) {
                // אם אורך המערך המצוי במשתנה songs הוא 0
                if ( songs.length === 0 ) {
                    // נכניס לתוך המערך של songs אובייקט המכיל את הפרופרטיס name, id ו- duration
                    songs.push({ id, name, duration })
                    return
                }

                // המשתנה has_duplications מפעיל את הפונקציה isInArrayOfObjects המצויה תחת האובייקט Utils ושבאמצעותה אנו בודקים אם המערך הוא מערך של אובייקטים ולצורך כך היא מקבלת את המשתנים songs, 'id', id, 'duplicate_song' ו- $( item )
                has_duplications = Validator.validateDuplications(songs, 'id', id, 'duplicate_song', $( item ) )

                // נבדוק אם המשתנה has_duplications שמפעיל את הפונקציה isInArrayOfObjects המצויה תחת האובייקט Utils ושבאמצעותה אנו בודקים אם המערך הוא מערך של אובייקטים ולצורך כך היא מקבלת את המשתנים songs, 'id', id, 'duplicate_song' ו- $( item ) לא מכיל נתונים כפולים
                if ( !has_duplications ) {
                    // נכניס לתוך המערך של songs אובייקט המכיל את הפרופרטיס name, id ו- duration
                    songs.push({ id, name, duration })
                }
            }
        })

        // הפעלת הפונקציה validateInputs המצויה תחת האובייקט Validator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים songs, 5, 'song_youtube_id' ואת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form
        Validator.validateInputs( songs, 5, 'song_youtube_id', $('#add-album-playlist-form') )

        // נבדוק אם יש נתונים במשתנה songs המכיל מערך עם אובייקטים של השירים שבתוכו הפרופרטיס youtube, name ו- duration וגם שהמשתנה has_duplications לא מכיל נתונים כפולים
        if ( songs.length && !has_duplications ) {
            // אז נחזיר את המשתנה songs המכיל מערך עם האובייקטים של השירים
            return songs
        } else {
            // אחרת, כלומר אין נתונים במשתנה songs המכיל מערך עם אובייקטים של השירים שבתוכו הפרופרטיס youtube, name ו- duration וגם שהמשתנה has_duplications מכיל נתונים כפולים, אז הפונקציה מחזירה את הערך הבוליאני false
            return false
        }
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
            // הפעלה של הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
            this.scrollTop( $('#main-container') )
            return
        }

        // המשתנה songs מכיל את הפונקציה collectSongs שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים ומפעיל אותה
        let songs = this.collectSongs()
        // אם יש שגיאה בשדות של המשתנה songs שלמעשה הוא מכיל את הפונקציה collectSongs המכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
        if ( !songs ) {
            // הפעלה של הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details
            this.scrollTop( $('#add-album-playlist-details') )
            return
        }

        // הפרופרטי genres שמצוי במשתנה album (המפעיל את הפונקציה collectValues המכילה את כל הערכים של האלבום) מפעיל את הפונקציה collectGenres שבאמצעותה אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של הז'אנרים
        album.genres = this.collectGenres()

        // הכנסת השירים לתוך האלבום
        album.songs = songs
        // הכנסת הז'אנר פופ לתוך האלבום
        // Temporary!!!
        album.genres = ['Pop']
        // הצגת המשתנה album בחלון ה- console וביצוע JSON.stringify לנתונים המתקבלים
        console.log( JSON.stringify(album) )
        // הפעלה של הפונקציה saveAlbum המקבלת את המשתנה abum ומצויה תחת האובייקט AlbumAPIService שבאמצעותה מתאפשר לשמור אלבום במסד הנתונים, ולאחר מכן נפעיל promise המפעיל את הפונקציה setSuccessMessage המציגה הודעת הצלחה עם יצירת האלבום
        AlbumAPIService.saveAlbum( album ).then( this.setSuccessMessage )
    },

    // באמצעות הפונקציה addSong המקבלת את הפרמטר e (המסמל event) מתאפשר להוסיף שדות להוספת שיר בטופס כאשר לוחצים על הכפתור הוספת שיר
    addSong: function( e ) {
        // נמנע את פעולת ברירת המחדל של ה- event רק אם אין אפשרות לקרוא את המאפיין preventDefault של undefined
        if ( e )
            e.preventDefault()
        // המשתנה html מפעיל את הפונקציה songItem המצויה תחת האובייקט AlbumFormTemplates שבאמצעותה אנו יוצרים תבנית html של השדות להוספת שיר לאלבום, כך שלמעשה הוא מכיל את התבנית html של השדות להוספת שיר לאלבום
        let html = AlbumFormTemplates.songItem()

        // הכנסת המשתנה html (המכיל את התבנית html של השדות להוספת שיר לאלבום באמצעות הפעלת הפונקציה songItem המצויה תחת האובייקט AlbumFormTemplates) לתוך האלמנט div המצוי ב- DOM שיש לו מזהה ייחודי בשם add-album-playlist-form, ובכך אנו מאפשרים למשתמש להוסיף שירים לאלבום במידת הצורך
        $('#add-album-playlist-form').append( html )
    },

    // באמצעות הפונקציה removeSongItem המקבלת את המשתנה e (המסמל event) מתאפשר למחוק שורה המעילה את השדות להוספת שיר
    removeSongItem: function( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור המחיקה
        e.preventDefault()
        // המשתנה item מכיל את האלמנט הקרוב ביותר לאלמנט div שיש לו class בשם song-item
        let item = $(this).closest('.song-item')
        // המשתנה item (המכיל את האלמנט הקרוב ביותר לאלמנט div שיש לו class בשם song-item) מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומסיר את האלמנט שנלחץ מה- DOM
        item.fadeOut('slow', () => item.remove())
    },

    // באמצעות הפונקציה addSongsInputs המקבלת את המשתנה items מתאפשר להוסיף 5 שורות ל- DOM עם השדות להוספת שירים
    addSongsInputs: function ( items = 5 ) {
        // הלולאת for עוברת על המשתנה items מקסימום 5 פעמים
        for ( let i = 1; i <= items; i++ ) {
            // הפעלה של הפונקציה addSong המאפשרת להוסיף את התבנית html של השדות להוספת שיר לאלבום
            this.addSong()
        }
    },

    // באמצעות הפונקציה setCoverImage המקבלת את המשתנה img מתאפשר להביא את ה- attribute בשם src של התגית img המצויה בתוך תגית div שיש לה מזהה ייחודי בשם image-cover-preview
    setCoverImage: function( img ) {
        // הבאת ה- attribute בשם src של התגית img המצויה בתוך תגית div שיש לה מזהה ייחודי בשם image-cover-preview
        $('#image-cover-preview img').attr('src', img)
    },

    // באמצעות הפונקציה changeCoverImage מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
    changeCoverImage: function() {
        // המשתנה img מכיל את הערך המצוי בשדה ה- input שיש לו מזהה ייחודי בשם album-image
        let img = $('#album-image').val()
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

    // באמצעות הפונקציה searchYoutubeVideo המקבלת את המשתנה e (המסמל event) מתאפשר לחפש את הסרטון וידאו של YouTube
    searchYoutubeVideo: function( e ) {
        // המשתנה input מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה $input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מוצא את ההורה של האלמנט שיש לו class בשם error-messsage ומסיר אותו מה- DOM
        $input.parent().find('.error-message').remove()

        // המשתנה youtube_id מכיל את הערך המצוי במשתנה input (המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event)
        let youtube_id = $input.val()

        // הפעלה של הפונקציה searchYoutubeID המקבלת את המשתנה youtube_id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/youtube/' + youtube_id, ובכך מתאפשר למעשה לבצע חיפוש ולקבל את המזהה הייחודי של סרטון ה- YouTube, ולאחר מכן נפעיל promise שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת 2 משתנים
        AlbumAPIService.searchYoutubeID( youtube_id ).then(
            // המשתנה video מכיל אובייקט עם פרופרטיס שונים עם נתונים הקשורים לסרטון
            video => {
                // המשתנה input מכיל את האלמנט הקרוב ביותר שיש לו class בשם song-item ומוצא בתוך האלמנט את ה- input שיש לו attribute מסוג name בשם song_name ומביא את הערך של title המצוי באובייקט video
                $input.closest('.song-item').find('input[name=song_name]').val( video.title )
                // המשתנה input מכיל את האלמנט הקרוב ביותר שיש לו class בשם song-item ומוצא בתוך האלמנט את ה- input שיש לו attribute מסוג name בשם song_time ומביא את הערך של duration המצוי באובייקט video
                $input.closest('.song-item').find('input[name=song_time]').val( video.duration )
            },
            // המשתנה error מכיל את השגיאות האפשריות
            error => {
                // המשתנה html מפעיל את הפונקציה validateInput את המשתנה error.respopnseJSON.error המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html שהמציגה ב- DOM את הודעת השגיאה, ובכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה הרלוונטית המתקבלת ישירות בעת ביצוע הבקשת get לנתיב של 'youtube_id' בהתאם לתשובה שקיבלנו
                let html = AlbumFormTemplates.validateInput( error.responseJSON.error )
                // המשתנה $input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מכניס את המשתנה html לפני ההורה של האלמנט
                $input.parent().prepend( html )
            })
    },

    // באמצעות הפונקציה validateField המקבלת את המשתנה e (המסמל event) אנו מבצעים בדיקת תיקוף לנתונים המצויים באלמנט ה- input
    validateField: function ( e ) {
        // המשתנה input מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // הצגה בחלון ה- console של הנתונים המצויים במשתנה input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        console.log( $input )
        // נבדוק אם בפונקציה validateField המצויה תחת האובייקט Validator ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לשדות, יש ערך שמצוי במשתנה input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event ושעבר בהצלחה את בדיקת התיקוף, ואם אכן אין שגיאות נבצע מספר פעולות נוספות
        if ( Validator.validateField( $input ) ){
            // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
            $input.removeClass('error')
            // הסרה של ה- class בשם error-message מהאחים של האלמנט המצוי במשתנה input שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
            $input.siblings('.error-message').remove()
        }
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס הוספת אלבום
    bindEvents: function() {
        // כאשר מתבצעת שליחה של הטופס שיש לו מזהה ייחודי בשם add-new-album, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט form שיש לו מזהה ייחודי בשם add-new-album), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveAlbum יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-new-album').on('submit', $.proxy( this.saveAlbum, this ))
        // כאשר לוחצים על הכפתור שיש לו מזהה ייחודי בשם add-another-song תופעל הפונקציה addSong
        $('#add-another-song').on('click', this.addSong)
        // כאשר מבוצעת יציאה מהאלמנט על-ידי המשתמש (במקרה זה מתיבת ה- input שיש לה מזהה ייחודי בשם album-image), ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCoverImage יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם album-image), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCoverImage יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-image').on('blur', $.proxy( this.changeCoverImage, this ))
        // כאשר לוחצים על הכתפור שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form נפעיל את הפונקציה removeSongItem המאפשרת למחוק שורה המכילה את השדות להוספת שיר לאלבום
        $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        // כאשר מתבצעת הקלדה באלמנט input שיש לו את ה- attribute מסוג name בשם song_youtube נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה searchYoutubeVideo המאפשרת לחפש את הסרטון וידאו של YouTube ונשהה את הפעולה שלה למשך שנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchYouTubeVideo יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו את ה- attribute מסוג name בשם song_youtube) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה searchYouTubeVideo יתייחס בכל מקרה לאובייקט AlbumForm
        $('input[name=song_youtube]').on('keyup', Utils.debounce( $.proxy( this.searchYoutubeVideo, this ), 1000) )
        // כאשר מתבצעת הקלדה בתיבת ה- input שיש לה את ה- attribute המאפשרת מסוג name בשם youtube-url נפעיל את הפונקציה searchYoutubeVideo המאפשרת לחפש את הסרטון וידאו של YouTube, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchYoutubeVideo יתייחס לאלמנט עצמו (הקלדה בתיבת ה- input) ולא לאובייקט AlbumForm, לכן אנו משתמשים ב- proxy כדי שההקשר של this בתוך הפונקציה searchYoutubeVideo יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-new-album-form .form-group').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
    },

    // הפונקציה init שמקבלת את המשתנה getAlbum המכיל את הערך בוליאני false, מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm
    init: function( getAlbum = false ) {
        // הפעלה של הפונקציה addSongsInputs המאפשרת להוסיף 5 שורות ל- DOM עם השדות להוספת שירים
        this.addSongsInputs()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumForm
        this.bindEvents()
        // הפעלה של הפונקציה setGenres המאפשרת להציג ב- DOM את הז'אנרים המצויים במסד הנתונים
        this.setGenres()
    }
}

// ייצוא היכולות של האובייקט AlbumForm החוצה
export default AlbumForm