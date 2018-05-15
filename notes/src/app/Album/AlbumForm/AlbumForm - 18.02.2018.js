// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumGenres על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumGenres from './AlbumGenres'
// ייבוא היכולות של האובייקט AlbumValidator על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumValidator from './AlbumValidator'
// ייבוא היכולות של האובייקט EditAlbum על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import EditAlbum from './EditAlbum'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט SearchAPIService על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import SearchAPIService from '../APIServices/SearchAPIService'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumForm יוכל להשתמש בהן
import Utils from '../Utils'

// המשתנה PREVIEW_IMG מכיל כתובת URL קבועה של תמונת התצוגה
const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

// האובייקט AlbumForm מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס הוספת אלבום חדש
// הגדרת האובייקט AlbumForm כקבוע
const AlbumForm = {
    // באמצעות הפונקציה setTitleAddNewAlbum מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
    setTitleAddNewAlbum: function () {
        // המשתנה html מכיל את התבנית html המכילה את הכותרת של העמוד בו אנו נמצאים באמצעות הפעלה של הפונקציה titleAddNewAlbum המצויה תחת האובייקט AlbumFormTemplate שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
        let html = AlbumFormTemplates.titleAddNewAlbum()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-title, ובכך למעשה מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        $('#add-new-album-title').html( html )
    },

    // באמצעות הפונקציה setTitleAddAlbumPlaylist מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    setTitleAddAlbumPlaylist: function () {
        // המשתנה html מכיל את התבנית html המכילה את הכותרת של החלק בו אנו נמצאים בעמוד באמצעות הפעלה של הפונקציה titleAddAlbumPlaylist המצויה תחת האובייקט AlbumFormTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        let html = AlbumFormTemplates.titleAddAlbumPlaylist()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-title, ובכך למעשה מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        $('#add-album-playlist-title').html( html )
    },

    // באמצעות הפונקציה searchArtist מתאפשר לבצע חיפוש של שמות האמנים השמורים במסד הנתונים
    searchArtist: function () {
        // המשתנה term מכיל את הערך המצוי ב- input שיש לו מזהה ייחודי בשם album-artist
        let term = $('#album-artist').val()

        // נבדוק אם אורך הנתונים המצויים במשתנה term הוא קטן מ- 2, אז נבצע חזרה להמשך ביצוע הפעולות של הפונקציה searchAlbum
        if ( term.length < 2 ) {
            return
        }

        // הפעלה של הפונקציה searchArtist המקבלת את המשתנה term (המכיל את מכיל את הערך המצוי ב- input שיש לו מזהה ייחודי בשם album-artist) ושמצוי תחת האובייקט SearchAPIService המאפשרת לבצע חיפוש של נתונים באמצעות ביצוע בקשת get לנתיב 'http://localhost:3000/api/albums/suggestions/artist/' + term'', כאשר לאחר הפעלת הפונקציה נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנים results, status_text ו- xhr
        SearchAPIService.searchArtist( term ).then(( results, text_status, xhr ) => {
            // הצהרה על המשתנים שנבצע בהם שימוש בפונקציה
            let html

            // נבדוק אם המשתנה xhr מכיל את הסטטוס קוד 204 (No content), האומר שאין תוכן, כלומר שאין תוצאות העונות לחיפוש המתבצע
            if ( xhr.status === 204 )
                // המשתנה html מפעיל את הפונקציה noSuggestions שמצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר להציג בתוצאות החיפוש כאשר אין הצעות העונות לחיפוש המבוקש הצעה מתאימה
                html = AlbumFormTemplates.noSuggestions()
            // אחרת, כלומר יש תוצאות העונות לחיפוש המתבצע
            else
                // המשתנה html מפעיל את הפונקציה artistSuggestions המקבלת את המשתנה results.album_artist ומצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
                html = AlbumFormTemplates.artistSuggestions( results.album_artist )

            // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results, ובכך אנו למעשה מציגים ב- DOM את ההצעות האפשריות לתוצאות החיפוש
            $('#artist-results').html( html )
        })
    },

    // באמצעות הפונקציה clearArtistResult מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של שם האמן מהתוצאות המצויות בה
    clearArtistResult: function () {
        // הסרת האלמנטים ul ו- li שמצויים בתוך האלמנט div שיש לו מזהה ייחודי בשם artist-results
        $('#artist-results').find('ul, li').remove()
    },

    // באמצעות הפונקציה setCoverImage המקבלת את המשתנה img מתאפשר להביא את ה- attribute בשם src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview
    setCoverImage: function ( img ) {
        // הבאת ה- attribute בשם src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview
        $('#image-cover-preview img').attr('src', img)
        // הבאת ה- attribute בשם src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview
        // $('#image-cover-preview').find('img').attr('src', img)
    },

    // באמצעות הפונקציה changeCoverImage מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
    changeCoverImage: function () {
        // המשתנה img מכיל את הערך המצוי בשדה ה- input שיש לו מזהה ייחודי בשם album-image
        let img = $('#album-image').val()
        // המשתנה regex יוצר אינסטנס חדש של תבנית המבצעת תיקוף לנתונים המצויים בשדה ה- input
        let regex = new RegExp("(^http)?s?:?(\\/\\/[^\"']*\\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$")

        // אם המשתנה img ריק מנתונים, אז נפעיל את הפונקציה setCoverImage (המביאה את ה- attribute בשם src של האלמנט img) שמקבלת את המשתנה PREVIEW_IMG (המכיל כתובת URL קבועה של התמונת תצוגה), ובכך למעשה אנו מחזירים את התמונה המוצגת לתמונת ברירת המחדל כאשר אין נתונים בשדה ה- input, ולאחר מכן מבצעים חזרה להמשך ביצוע הפונקציה
        if ( img === '' ) {
            this.setCoverImage( PREVIEW_IMG )
            return
        }

        // נבצע בדיקה אם הנתונים המצויים במשתנה img עומדים בתבנית שמצויה במשתנה regex, אם אכן הנתונים עומדים בתבנית ומכילים קישור לתמונה)
        if ( regex.test( img ) )
            // אז נפעיל את הפונקציה setCoverImage המקבלת את המשתנה img, ומאפשרת להביא את ה- attribute בשם src של האלמנט img המצוי בתוך האלמנט div שיש לו את המזהה הייחודי בשם image-cover-preview, כך שלמעשה בפועל אנו מחליפים את התמונה המוצגת בתמונה שהכתובת URL שלה הוזנה בתיבת ה- input שיש לה מזהה ייחודי בשם album-image כאשר תבוצע יציאה מהאלמנט על-ידי המשתמש
            this.setCoverImage( img )
    },

    // באמצעות הפונקציה addSongsInputs המקבלת את המשתנה items ואת המשתנה songs המכיל מערך ריק מתאפשר להוסיף שורות ל- DOM עם השדות להוספת שירים
    addSongsInputs: function ( items = 5, songs = [] ) {
        // הלולאת for עוברת על המשתנה items מקסימום 5 פעמים
        for ( let i = 0; i < items; i++ )
            // הפעלה של הפונקציה addSong המקבלת את הערך הבוליאני false ואת המערך של השירים ושבאמצעותה מתאפשר להוסיף שדות להוספת שיר בטופס הוספת אלבום חדש
            this.addSong( false, songs[ i ] )
    },

    // באמצעות הפונקציה searchYoutubeVideo המקבלת את המשתנה e (המסמל event) מתאפשר לחפש את הסרטון וידאו של YouTube
    searchYoutubeVideo: function ( e ) {
        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה youtube_id מכיל את הערך המצוי במשתנה input$ (המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event)
        let youtube_id = $input.val()

        // המשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מוצא את ההורה של האלמנט שיש לו class בשם error-messsage ומסיר אותו מה- DOM
        $input.parent().find('.error-message').remove()
        // המשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מוצא את האבות של כל אלמנט שיש לו class בשם song-item ומסיר ממנו את ה- class בשם error
        $input.parents('.song-item').removeClass('error')

        // הפעלה של הפונקציה getYoutubeID המקבלת את המשתנה youtube_id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/youtube/' + youtube_id, ובכך מתאפשר למעשה לבצע חיפוש ולקבל את המזהה הייחודי של סרטון ה- YouTube, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת 2 משתנים
        AlbumAPIService.getYoutubeID( youtube_id ).then(
            // המשתנה video מכיל אובייקט עם פרופרטיס שונים עם נתונים הקשורים לסרטון
            video => {
                // המשתנה input$ מכיל את האלמנט הקרוב ביותר שיש לו class בשם song-item ומוצא בתוך האלמנט את ה- input שיש לו attribute מסוג name בשם song_time ומביא את הערך של duration המצוי באובייקט video
                $input.closest('.song-item').find('input[name=song_time]').val( video.duration )
                // המשתנה input$ מכיל את האלמנט הקרוב ביותר שיש לו class בשם song-item ומוצא בתוך האלמנט את האלמנט שיש לו class בשם song-time ומציג את הנתונים המצויים בפרופרטי duration המצוי באובייקט video ב- DOM באמצעות ההפעלה של הפונקציה calculateTime המצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים חישוב של זמן השיר
                $input.closest('.song-item').find('.song-time').html( Utils.calculateTime( video.duration ) )
            },
            // המשתנה error מכיל את השגיאות האפשריות
            error => {
                // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error.responseJSON.error המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, ובכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה הרלוונטית המתקבלת ישירות בעת ביצוע הבקשת get לנתיב של 'youtube_id' בהתאם לתשובה שקיבלנו
                let html = AlbumFormTemplates.errorMessage( error.responseJSON.error )

                // המשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event מכניס את המשתנה html לפני ההורה של האלמנט
                $input.parent().prepend( html )
            })
    },

    // באמצעות הפונקציה removeSongItem המקבלת את המשתנה e (המסמל event) מתאפשר למחוק שורה המעילה את השדות להוספת שיר
    removeSongItem: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ה- event מתייחס לכפתור המחיקה
        e.preventDefault()

        // המשתנה item מכיל את האלמנט הקרוב ביותר לאלמנט div שיש לו class בשם song-item
        let item = $(this).closest('.song-item')

        // המשתנה item (המכיל את האלמנט הקרוב ביותר לאלמנט div שיש לו class בשם song-item) מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומסיר את האלמנט שנלחץ מה- DOM
        item.fadeOut('slow', () => item.remove())
    },

    // באמצעות הפונקציה addSong המקבלת את המשתנה e (המסמל event) ואת המשתנה song המכיל את הערך הבוליאני false מתאפשר להוסיף שדות להוספת שיר בטופס הוספת אלבום חדש כאשר לוחצים על הכפתור הוספת שיר
    addSong: function ( e, song = false ) {
        // נמנע את פעולת ברירת המחדל של ה- event רק אם אין אפשרות לקרוא את המאפיין preventDefault של undefined
        if ( e )
            e.preventDefault()

        // המשתנה html מפעיל את הפונקציה songItem המקבלת את המשתנה song שמצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html של השדות להוספת שיר לאלבום, כך שלמעשה הוא מכיל את התבנית html של השדות להוספת שיר לאלבום
        let html = AlbumFormTemplates.songItem( song )

        // הכנסת המשתנה html (המכיל את התבנית html של השדות להוספת שיר לאלבום באמצעות הפעלת הפונקציה songItem המצויה תחת האובייקט AlbumFormTemplates) לתוך האלמנט div המצוי ב- DOM שיש לו מזהה ייחודי בשם add-album-playlist-form, ובכך אנו מאפשרים למשתמש להוסיף שירים לאלבום במידת הצורך
        $('#add-album-playlist-form').append( html )
    },

    // באמצעות הפונקציה collectValues אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
    collectValues: function () {
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
        // הסרת האלמנט שיש לו class בשם error-message ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form .error-message').remove()
        // הסרת האלמנט span שיש לו class בשם error ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form span.error').remove()

        // הסרת האלמנט שיש לו class בשם error-message ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        // $('#add-new-album-form').find('.error-message').remove()
        // הסרת האלמנט span שיש לו class בשם error ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        // $('#add-new-album-form').find('span.error').remove()

        // כדי לקבל את כל הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת for ונבצע בדיקת ולידציה
        for ( i = 0; i < inputs.length; i++ ) {
            // המשתנה input אוסף את האלמנט המצוי במשתנה inputs (המכיל את כל ה- inputים ותיבת הטקסט המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form) בהתאם למיקום שלו בלולאה
            // Collect the element
            input = inputs [ i ]

            // המשתנה input מכיל את המשתנה input אשר אוסף את האלמנט המצוי במשתנה inputs, כך שלמעשה הוא מכיל ערך מהשדה המצוי במשתנה inputs
            // Convert the element from native JS element to a jQuery element
            input = $( input )

            // המשתנה input_name מכיל את כל ה- inputים שה- attribute שלהם הוא name
            input_name = input.attr('name')
            // המשתנה input_value מכיל את כל הערכים המצויים במשתנה input
            input_value = input.val()

            // המשתנה errors מכיל את הערך הבוליאני true, כך שלמעשה הוא מכיל שגיאות כלשהן שלא עמדו בולידאציות המוגדרות
            // If there is an error with the regex, set errors to be true, mean we have errors in the validation
            if ( !AlbumValidator.validateField( input ) )
                errors = true

            // המשתנה album, שהוא למעשה אובייקט המכיל מערך של כל ה- inputים שה- attribute שלהם הוא name, מכניס לתוך האובייקט את כל הערכים המצויים במשתנה input_value
            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        // הפרופרטי genres שמצוי בתוך המשתנה album מפעיל את הפונקציה collectGenres שבאמצעותה אנו מביאים את כל הערכים המצויים ב- input הקשור לשדה של הז'אנרים
        album.genres = this.collectGenres()

        // נבדוק אם אין ז'אנרים לאלבום באמצעות הפעלה של הפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים album.genres, 1, 'genres' ואת האלמנט div שיש לו מזהה ייחודי בשם album-genres
        if ( !AlbumValidator.validateInputs( album.genres, 1, 'genres', $('#album-genres') ) ) {
            // הוספת ה- class בשם error לאלמנט div שיש לו מזהה ייחודי בשם tags
            $('#tags').addClass('error')
            // המשתנה errors מכיל את הערך הבוליאני true, כך שלמעשה הוא מכיל שגיאות כלשהן שלא עמדו בולידאציות המוגדרות
            errors = true
        }

        // אם יש שגיאות הפונקציה מחזירה את הערך הבוליאני false
        if ( errors )
            return false

        // אם אין שגיאות, הפונקציה מחזירה את האובייקט album שלמעשה מכיל מערך עם כל הערכים המצויים בשדות
        return album
    },

    // באמצעות הפונקציה collectGenres אנו מביאים את כל הערכים המצויים ב- input הקשור לשדה של הז'אנרים
    collectGenres: function () {
        // המשתנה input מכיל באמצעות jQuery את ה- input שיש לו attribute מסוג hidden שמצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם tags
        let input = $('#tags input[type=hidden]')
        // המשתנה input מכיל באמצעות jQuery את ה- input שיש לו attribute מסוג hidden שמצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם tags
        // let input = $('#tags').find('input[type=hidden]')
        // המשתנה genres מכיל מערך ריק שלתוכו ייכנסו הערכים של הז'אנרים
        let genres = []

        // הלולאת each עוברת על הנתונים במשתנה input (המכיל את ה- input שיש לו attribute מסוג hidden שמצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם tags) ומוציאה ממנו את ה- index ואת ה- input
        $.each(input, ( i, input ) => {
            // הכנסת הערך שמצוי במשתנה input לתוך המשתנה genres המכיל מערך עם כל הערכים של הז'אנרים
            genres.push( $( input ).val() )
        })

        // הפונקציה מחזירה את המשתנה ids המכיל מערך עם כל הערכים של הז'אנרים
        return genres
    },

    // באמצעות הפונקציה collectSongs אנו מביאים את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
    collectSongs: function () {
        // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
        let has_duplications = false, songs = [] // has_errors = false,

        // הסרת ה- class בשם error מאלמנט שיש לו class בשם song-item ומכל אלמנט שיש לו את ה- class בשם error ומצוי בתוך אלמנט שיש לו class בשם song-item
        $('.song-item, .song-item *').removeClass('error')
        // הסרת האלמנט שיש לו class בשם error-message ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form מה- DOM
        $('#add-album-playlist-form .error-message').remove()
        // הסרת האלמנט שיש לו class בשם error-message ושמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form מה- DOM
        // $('#add-album-playlist-form').find('.error-message').remove()

        // הלולאת each עוברת איבר-איבר על אלמנט div שיש לו class בשם song-item (שלמעשה מכיל מערך של כל האלמנטים מסוג div שיש להם class בשם song-item) ומוציאה ממנו את ה- index ואת ה- item
        $.each( $('.song-item'), ( index, item ) => {
            // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בלולאה
            let song, song_youtube, song_name, song_time

            // המשתנה song מכיל באמצעות שימוש ב- jQuery את ה- item שמצוי במערך של song-item
            song = $( item )
            // המשתנה song_youtube מכיל את הערך המצוי בתיבת ה- input של המזהה הייחודי של YouTube, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_youtube ומביא את הערך שמצוי ב- input
            song_youtube = song.find('input[name=song_youtube]').val()
            // המשתנה song_name מכיל את הערך המצוי בתיבת ה- input של שם השיר, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_name ומביא את הערך שמצוי ב- input
            song_name = song.find('input[name=song_name]').val()
            // המשתנה song_time מכיל את הערך המצוי בתיבת ה- input של זמן השיר, באמצעות מציאת הנתונים המצויים במשתנה song (המכיל את ה- item שמצוי במערך של song-item) את ה- input שיש לו attribute מסוג name בשם song_time ומביא את הערך שמצוי ב- input
            song_time = song.find('input[name=song_time]').val()

            // נבדוק אם יש ערכים במשתנים song_youtube ו- song_time, כלומר שהם לא ריקים מתוכן
            if ( song_youtube !== '' && song_time !== '' ) {
                // נבדוק אם אורך המערך המצוי במשתנה songs הוא לא 0
                if ( songs.length === 0 ) {
                    // נבדוק אם הפונקציה validateField המקבלת את המשתנה input המכיל את ה- input שיש לו את ה- attribute מסוג name בשם song_name שאותו מצא המשתנה song המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לשדות אינה מכילה שגיאות, כך שלמעשה אנו בודקים שאין שגיאה בשדה ה- input שיש לו את ה- attribute מסוג name בשם song_name
                    if ( AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                        // נכניס לתוך המערך של songs אובייקט המכיל את הפרופרטיס song_name, song_youtube ו- song_time
                        songs.push({ song_youtube, song_name, song_time })
                    }

                    return
                }

                // המשתנה has_duplications מפעיל את הפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים songs, 'song_youtube', song_youtube, 'duplicate_song' ו- $( item ) לא מכילה נתונים כפולים
                has_duplications = AlbumValidator.validateDuplications( songs, 'song_youtube', song_youtube, 'duplicate_song', $( item ) )

                // נבדוק אם המשתנה has_duplications מפעיל את הפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים songs, 'song_youtube', song_youtube, 'duplicate_song' ו- $( item ) לא מכילה נתונים כפולים וגם אם הפונקציה validateField המקבלת את המשתנה input המכיל את ה- input שיש לו את ה- attribute מסוג name בשם song_name שאותו מצא המשתנה song המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לשדות אינה מכילה שגיאות, כך שלמעשה אנו בודקים שאין שגיאה בשדה ה- input שיש לו את ה- attribute מסוג name בשם song_name
                if ( !has_duplications && AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                    // נכניס לתוך המערך של songs אובייקט המכיל את הפרופרטיס song_name, song_youtube ו- song_time
                    songs.push({ song_youtube, song_name, song_time })

                    return
                }
            }
        })

        // נבדוק אם המשתנה has_duplications מפעיל את הפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים songs, 'song_youtube', song_youtube, 'duplicate_song' ו- $( item ) לא מכילה נתונים כפולים או שהפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים songs, 5, 'song_youtube_id' ואת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form
        if ( has_duplications || !AlbumValidator.validateInputs( songs, 5, 'song_youtube_id', $('#add-album-playlist-form') ) )
            // אז נחזיר את הערך הבוליאני false
            return false

        // אז נחזיר את המשתנה songs המכיל מערך עם האובייקטים של השירים
        return songs
    },

    // באמצעות הפונקציה scrollTop המקבלת את המשתנה $el אנו מבצעים גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט
    scrollTop: function ( $el ) {
        // הפעלה הפונקציה animate על האלמנטים html ו- body המבצעת גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט במשך 8 מאיות השנייה
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    },

    // באמצעות הפונקציה validateAlbum אנו מבצעים בדיקת ולידציה לערכים המצויים בשדות ה- input לפני יצירת האלבום במסד הנתונים והצגתו ב- DOM
    validateAlbum: function () {
        // המשתנה album מכיל את הפונקציה collectValues שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום ומפעיל אותה
        let album = this.collectValues()
        // המשתנה songs מכיל את הפונקציה collectSongs שלמעשה היא מכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים ומפעיל אותה
        let songs = this.collectSongs()

        // אם יש שגיאה בשדות המצויים במשתנה album שלמעשה מכיל את כל הערכים המצויים ב- inputים הקשורים לשדות של האלבום
        if ( !album ) {
            // נפעיל את הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container ונחזיר את הערך הבוליאני false
            this.scrollTop( $('#main-container') )
            return false
        }

        // אם יש שגיאה בשדות של המשתנה songs שלמעשה הוא מכיל את הפונקציה collectSongs המכילה את כל הערכים המצויים ב- inputים הקשורים לשדות של השירים
        if ( !songs ) {
            // נפעיל את הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details ונחזיר את הערך הבוליאני false
            this.scrollTop( $('#add-album-playlist-details') )
            return false
        }

        // הכנסת השירים לתוך האלבום
        album.songs = songs

        // הפונקציה מחזירה את המשתנה album המכיל את כל הערכים המצויים בשדות ה- input של האלבום
        return album
    },

    // באמצעות הפונקציה validateField המקבלת את המשתנה e (המסמל event) אנו מבצעים בדיקת תיקוף לנתונים המצויים באלמנט ה- input
    validateField: function ( e ) {
        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרת האלמנט מה- DOM שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        $input.siblings('.error-message').remove()

        // נבדוק אם בפונקציה validateField המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת תיקוף לשדות, יש ערך שמצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event ושעבר בהצלחה את בדיקת התיקוף, ואם אכן אין שגיאות נבצע מספר פעולות נוספות
        if ( AlbumValidator.validateField( $input ) ) {
            // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event והוספה של ה- class בשם success לאותו אלמנט שהסרנו ממנו את ה- class בשם error
            $input.removeClass('error').addClass('success')
            // הסרת האלמנט מה- DOM שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
            $input.siblings('.error-message').remove()
        }
    },

    // באמצעות הפונקציה validateGenres אנו מבצעים בדיקת תיקוף לנתונים המצויים בשדה של הז'אנרים
    validateGenres: function () {
        // המשתנה input$ מכיל את האלמנט div שיש לו מזהה ייחודי בשם album-genres
        let $input = $('#album-genres')

        // נבדוק אם אין שגיאות בשדה של הז'אנרים באמצעות הפעלה של הפונקציה validateInputs המצויה תחת האובייקט AlbumValidator ושבאמצעותה אנו מבצעים בדיקת ולידציה לנתונים ב- inputים שהם למעשה מערך כגון שירים, ז'אנרים וכו' ולצורך כך היא מקבלת את המשתנים this.collectGenres, 1, 'genres' ואת המשתנה input$ המכיל את האלמנט div שיש לו מזהה ייחודי בשם album-genres
        if ( AlbumValidator.validateInputs( this.collectGenres(), 1, 'genres', $input ) ) {
            // המשתנה input$ המכיל את האלמנט div שיש לו מזהה ייחודי בשם album-genres מוצא בתוכו אלמנט div שיש לו מזהה ייחודי בשם tags ומסיר ממנו את ה- class בשם error ומוסיף לו את ה- class בשם success
            $input.find('#tags').removeClass('error').addClass('success')
            // המשתנה input$ המכיל את האלמנט div שיש לו מזהה ייחודי בשם album_genres מוצא בתוכו אלמנט שיש לו class בשם error-message ומסיר אותו
            $input.find('.error-message').remove()
        }
    },

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם יצירת האלבום
    setSuccessMessage: function () {
        // המשתנה html מכיל את התבנית html המכילה את ההודעת הצלחה עם יצירת האלבום באמצעות הפעלה של הפונקציה successMessage המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר להציג ב- DOM הודעת הצלחה עם יצירת האלבום
        let html = AlbumFormTemplates.successMessage()

        // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעת הצלחה עם יצירת האלבום לתוך האלמנט שיש לו class בשם modal-dialog, ובכך למעשה אנו מאפשרים להציג למשתמש הודעת הצלחה עם יצירת האלבום
        $('.modal-dialog').html( html )
        // הוספת ה- class בשם modal-open עם תכונת ה- css בשם padding-right שהערך שלה הוא 17px לאלמנט body
        $('body').addClass('modal-open').css('padding-right', '17px')
        // הוספת ה- class בשם in עם תכונות ה- css בשם display שהערך שלה הוא block, padding-right שהערך שלה הוא 17px ו- overflow-y שהערך שלה הוא scroll לאלמנט div שיש לו מזהה ייחודי בשם modal
        $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px', 'overflow-y': 'scroll'} )
    },

    // באמצעות הפונקציה resetFields מתאפשר לרוקן מערכים את האלמנטים בטופס הוספת אלבום חדש שהם לא מסוג input
    resetFields: function () {
        // הכנסת טקסט ריק לאלמנט span שמצוי בתוך אלמנט שיש לו class בשם form-group
        $('.form-group span').text('')
        // הפעלת הפונקציה setCoverImage (המביאה את ה- attribute בשם src של האלמנט img) שמקבלת את המשתנה PREVIEW_IMG (המכיל כתובת URL קבועה של התמונת תצוגה), ובכך למעשה אנו מחזירים את התמונה המוצגת לתמונת ברירת המחדל כאשר אין נתונים בשדה ה- input
        this.setCoverImage( PREVIEW_IMG )
        // הסרת האלמנט שיש לו class בשם tag שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם tags-container
        $('#tags-container').find('.tag').remove()
        // הסרת ה- class בשם error מהאלמנטים input, div, textarea ו- span שיש להם את ה- class בשם error
        $('input.error, div.error, textarea.error, span.error').removeClass('error')
        // הסרת ה- class בשם success מהאלמנטים input, div, textarea ו- span שיש להם את ה- class בשם success
        $('input.success, div.success, textarea.success, span.success').removeClass('success')
        // הסרת האלמנט שיש לו class בשם error-message מהאלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        $('#add-new-album-form').find('.error-message').remove()
        // הסרת האלמנט שיש לו class בשם error-message מהאלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form
        $('#add-album-playlist-form').find('.error-message').remove()

        // הפונקציה מחזירה את הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
        return this.scrollTop( $('#main-container') )
    },

    // באמצעות הפונקציה saveAlbum המקבלת את הפרמטר e (המסמל event) אנו שומרים את האלבום שנוצר במסד הנתונים ומציגים אותו ב- DOM
    saveAlbum: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ל- event מסוג submit של אלמנט form שיש לו מזהה ייחודי בשם add-new-album
        e.preventDefault()

        // המשתנה album מפעיל את הפונקציה validateAlbum שבאמצעותה אנו מבצעים בדיקת ולידציה לערכים המצויים בשדות ה- input לפני יצירת האלבום במסד הנתונים והצגתו ב- DOM
        let album = this.validateAlbum()

        // אם יש שגיאות במשתנה album המפעיל את הפונקציה validateAlbum שבאמצעותה אנו מבצעים בדיקת ולידציה לערכים המצויים בשדות ה- input לפני יצירת האלבום במסד הנתונים והצגתו ב- DOM, כך שלמעשה יש שגיאות המונעות מאיתנו לבצע שליחה של הטופס וליצור אלבום חדש במסד הנתונים ולהציגו ב- DOM, אז נבצע חזרה ולא נשמור את האלבום החדש כל עוד יש שגיאות
        if ( !album )
            return

        // הפעלה של הפונקציה saveAlbum המקבלת את המשתנה album ומצויה תחת האובייקט AlbumAPIService שבאמצעותה מתאפשר לשמור אלבום במסד הנתונים, ולאחר מכן נפעיל promise
        AlbumAPIService.saveAlbum( album ).then(
            // המפעיל את הפונקציה setSuccessMessage המציגה הודעת הצלחה עם יצירת האלבום
            this.setSuccessMessage,
            // ושפונקציית ה- calbback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה error ומבצעת מספר פעולות ככל ויש שגיאות המונעות מאיתנו לשמור את האלבום
            ( error ) => {
                // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
                let input, error_message, html
                // המשתנה input_name מכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                let input_name = error.responseJSON.reason.message.split(' ')[0]

                // נבצע בדיקה בה נבדוק מה מכיל המשתנה input_name המכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                switch ( input_name ) {
                    // אם המשתנה input_name מכיל את ה- input שיש לו attribute מסוג name בשם 'song_youtube' נבצע מספר פעולות
                    case 'song_youtube':
                        // המשתנה youtube_code מכיל את השגיאה המפורטת שקיבלנו ומפצל אותה למערך שממנו אנו לוקחים את התוצאה השנייה (מאחר והאינדקס שלה במערך הוא 1) ונסיר מהתשובה שקיבלנו את הסימן '\'
                        let youtube_code = error.responseJSON.reason.error.split(' ')[1].replace(/['\']+/g, '')

                        // המשתנה input מכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        // input = $('input[name=song_youtube]').filter(function () {
                        // המשתנה input מכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        input = $('input[name=song_youtube]').filter(() => {
                            return this.value === youtube_code
                        })

                        // הוספת ה- class בשם error לאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        input.addClass('error')
                        // המשתנה error_message מכיל את הודעת השגיאה שתוצג
                        error_message = 'Song already exist in app'
                        // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
                        html = AlbumFormTemplates.errorMessage( error_message )
                        // המשתנה input המכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code מכניס את המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group
                        input.parent('.form-group').prepend( html )
                        // הפעלה של הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details
                        this.scrollTop( $('#add-album-playlist-details') )
                        break

                    // מצב של ברירת מחדל, כלומר שהמשתנה input_name המכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס של במערך הוא 0), אכן מכיל שגיאה הקשורה לנתונים המצויים בשדה של האלבום, אז נבצע מספר פעולות במצב זה
                    default:
                        // המשתנה input מכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        input = $(`input[name=${input_name}`)

                        // הוספת ה- class בשם error לאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        input.addClass('error')
                        // המשתנה error_message מכיל את הודעת השגיאה שתוצג כאשר נהפוך את האות הראשונה של הערך המצוי במשתנה input_name לאות גדולה ונחליף את הסימן '_' לסימן ' ', כך שלמעשה נציג את השם של השדה בהודעת השגיאה
                        error_message = `${Utils.capitalize( input_name.replace('_', ' ') )} must be unique`
                        // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
                        html = AlbumFormTemplates.errorMessage( error_message )
                        // המשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0) מכניס את המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group
                        input.parent('.form-group').prepend( html )
                        // הפעלה של הפונקציה scrollTop המבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
                        this.scrollTop( $('#main-container') )
                        break
                }
            }
        )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס הוספת אלבום
    bindEvents: function () {
        // כאשר מתבצעת הקלדה באלמנט input שיש לו מזהה ייחודי בשם album-artist נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils שבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה searchArtist המאפשרת לבצע חיפוש של שמות האמנים השמורים במסד הנתונים ונשהה את הפעולה שלה למשך 5 מאיות השנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchArtist יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם album-artist) נשתמש ב- proxy, כדי שההקשר של this יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-artist').on('keyup', Utils.debounce( $.proxy( this.searchArtist, this ), 500) )
        // כאשר תבוצע יציאה של המשתמש מהאלמנט input שיש לו מזהה ייחודי בשם album-artist נפעיל את הפונקציה clearArtistResult המאפשרת לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של שם האמן מהתוצאות המצויות בה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearArtistResult יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם album-artist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה clearArtistResult יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-artist').on('blur', $.proxy( this.clearArtistResult, this ))
        // כאשר מבוצעת יציאה מהאלמנט על-ידי המשתמש (במקרה זה מתיבת ה- input שיש לה מזהה ייחודי בשם album-image), ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCoverImage יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם album-image), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCoverImage יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-image').on('blur', $.proxy( this.changeCoverImage, this ))
        // כאשר מתבצעת הקלדה באלמנט input שיש לו את ה- attribute מסוג name בשם song_youtube שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils ושבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה searchYoutubeVideo המאפשרת לחפש את הסרטון וידאו של YouTube ונשהה את הפעולה שלה למשך חצי שנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchYouTubeVideo יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו את ה- attribute מסוג name בשם song_youtube) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה searchYouTubeVideo יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', Utils.debounce( $.proxy( this.searchYoutubeVideo, this ), 500) )
        // כאשר לוחצים על הכתפור שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form נפעיל את הפונקציה removeSongItem המאפשרת למחוק שורה המכילה את השדות להוספת שיר לאלבום
        $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם add-another-song-button, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם addSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם add-another-song-button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה addSong יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-another-song-button').on('click', $.proxy( this.addSong, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם reset-fields-button, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם resetFields יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם reset-fields-button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה resetFields יתייחס בכל מקרה לאובייקט AlbumForm
        $('#reset-fields-button').on('click', $.proxy( this.resetFields, this ))

        // נבדוק אם הערך של הפרופרטי hasAlbum לא קיים, אם הוא אכן לא קיים, אז נבצע את הפעולה של שמירת האלבום
        if ( !this.hasAlbum )
            // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveAlbum יתייחס בכל מקרה לאובייקט AlbumForm
            $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))

        // כאשר מתבצעת יציאה של המשתמש מהאלמנט input שיש לו class בשם error ו/או מהאלמנט textarea שיש לו class בשם error ושהוא מצוי בתוך אלמנט שיש לו class בשם form-group שאלמנט האב שלו הוא div שיש לו מזהה ייחודי בשם add-new-album-form, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם validateField יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו class בשם error ו/או מהאלמנט textarea שיש לו class בשם error), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה validateField יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-new-album-form .form-group').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
        // כאשר מתבצעת יציאה של המשתמש מהאלמנט input שיש לו class בשם error ו/או מהאלמנט span שיש לו class בשם error ושהוא מצוי בתוך אלמנט שיש לו class בשם form-group שאלמנט האב שלו הוא div שיש לו מזהה ייחודי בשם add-album-playlist-form, מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם validateField יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו class בשם error ו/או מהאלמנט span שיש לו class בשם error), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה validateField יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-album-playlist-form .form-group').on('blur', 'input.error, span.error', $.proxy( this.validateField, this ))
    },

    // הפונקציה init שמקבלת את המשתנה getAlbum המכיל את הערך בוליאני false, מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm
    init: function ( getAlbum = false ) {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumForm
        this.bindEvents()
        // הפעלה של הפונקציה setTitleAddNewAlbum המאפשרת להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        this.setTitleAddNewAlbum()
        // הפעלה של הפונקציה setTitleAddAlbumPlaylist המאפשרת להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        this.setTitleAddAlbumPlaylist()
        // הפרופרטי hasAlbum מכיל את המשתנה getAlbum
        this.hasAlbum = getAlbum

        // נבדוק אם הערך של הפרופרטי hasAlbum כבר קיים
        if ( this.hasAlbum )
            // אם הוא קיים, אז נפעיל את הפונקציה init שמצויה התחת האובייקט EditAlbum ושבאמצעותה מתאפשר לבצע את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט EditAlbum
            EditAlbum.init()
        else
            // אחרת, כלומר הערך של הפרופרטי hasAlbum לא קיים, אז נפעיל את הפונקציה addSongsInputs שבאמצעותה מתאפשר להוסיף שורות ל- DOM עם השדות להוספת שירים
            this.addSongsInputs()

        // הפעלה של הפונקציה init שמצויה תחת האובייקט AlbumGenres ושבאמצעותה מתאפשר לבצע את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumGenres
        AlbumGenres.init()
    }
}

// ייצוא היכולות של האובייקט AlbumForm החוצה
export default AlbumForm