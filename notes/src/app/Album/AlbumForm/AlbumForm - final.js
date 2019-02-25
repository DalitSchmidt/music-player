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

// האובייקט AlbumForm מכיל את כל הפונקציות שבאמצעותן מתאפשר לתקשר אל מול הטופס הוספת אלבום חדש
// הגדרה של האובייקט AlbumForm כקבוע
const AlbumForm = {
    // באמצעות הפונקציה setTitleAddNewAlbum מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
    setTitleAddNewAlbum: function () {
        // המשתנה html מפעיל את הפונקציה titleAddNewAlbum המצויה תחת האובייקט AlbumFormTemplate ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
        let html = AlbumFormTemplates.titleAddNewAlbum()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-title, ובכך מתאפשר להציג למשתמש ב- DOM את הכותרת של העמוד בו אנו נמצאים
        $('#add-new-album-title').html( html )
    },

    // באמצעות הפונקציה setTitleAddAlbumPlaylist מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    setTitleAddAlbumPlaylist: function () {
        // המשתנה html מפעיל את הפונקציה titleAddAlbumPlaylist המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        let html = AlbumFormTemplates.titleAddAlbumPlaylist()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-title, ובכך מתאפשר להציג למשתמש ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        $('#add-album-playlist-title').html( html )
    },

    // באמצעות הפונקציה searchArtist מתאפשר לבצע חיפוש של שמות האמנים השמורים במסד הנתונים
    searchArtist: function () {
        // המשתנה term מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist
        let term = $('#album-artist').val()

        // נבדוק את אורך הערך המצוי במשתנה term ואם הערך קטן מ- 2, אז נבצע מספר פעולות
        if ( term.length < 2 )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return

        // הפעלה של הפונקציה searchArtist (שמקבלת את המשתנה term המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist) המצויה תחת האובייקט SearchAPIService ושבאמצעותה מתאפשר לבצע חיפוש של נתונים הקשורים לשמות האמנים השמורים במסד הנתונים ולקבל את ההצעות האפשריות של תוצאות החיפוש ממסד הנתונים הקשורים לשם האמן של האלבום, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה results המכיל את התוצאות שקיבלנו, את המשתנה status_text המכיל את הודעת הסטטוס שקיבלנו ואת המשתנה xhr המכיל אובייקט המבצע אינטרקציה עם השרת ושבאמצעותו מתאפשר לאחזר נתונים מכתובת האתר מבלי לבצע רענון מלא של העמוד ולהפריע לפעולות המשתמש ובכך לעדכן רק את החלק הרלוונטי בעמוד ומבצעת מספר פעולות
        SearchAPIService.searchArtist( term ).then(( results, status_text, xhr ) => {
            // הצהרה על משתנה גלובלי שנבצע בו שימוש בפונקציה
            let html

            // נבדוק אם הפרופרטי status המצוי במשתנה xhr מכיל את הודעת השגיאה עם הסטטוס קוד 204 (No Content) האומרת שמסד הנתונים עיבד בהצלחה את הבקשה, אך אינו מחזיר תוכן, מאחר ואין תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            if ( xhr.status === 204 )
                // המשתנה html מפעיל את הפונקציה noSuggestions המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
                html = AlbumFormTemplates.noSuggestions()
            // אחרת, כלומר יש תוצאות העונות לחיפוש המתבצע, אז נבצע מספר פעולות
            else
                // המשתנה html מפעיל את הפונקציה artistSuggestions (שמקבלת את הפרופרטי results המצוי בתוך המשתנה results המכיל את תוצאות החיפוש) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
                html = AlbumFormTemplates.artistSuggestions( results.results )

            // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results, ובכך מתאפשר להציג למשתמש בתוצאות החיפוש ב- DOM את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
            $('#artist-results').html( html )
        })
    },

    // באמצעות הפונקציה setValueArtistResult (שמקבלת את המשתנה e המסמל event) מתאפשר להכניס את הטקסט המצוי בשם האמן שהתקבל בחיפוש לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist
    setValueArtistResult: function ( e ) {
        // המשתנה selected_artist מכיל את הטקסט המצוי בערך של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let selected_artist = $( e.target ).text()
        // הכנסה של הערך המצוי במשתנה selected_artist לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist, ובכך מתאפשר להוסיף את הערך של שם האמן שנבחר לאלמנט ולהציגו ב- DOM
        $('#album-artist').val( selected_artist )
    },

    // באמצעות הפונקציה clearArtistResults מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של שם האמן מהתוצאות המצויות בה
    clearArtistResults: function () {
        // הפעלה של הפונקציה setTimeout שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מעכבת את ביצוע ההסרה של האלמנטים ul ו- li המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results למשך חצי שנייה
        setTimeout(() => {
            // הסרה של האלמנטים ul ו- li המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results מה- DOM
            $('#artist-results').find('ul, li').remove()
        }, 500)
    },

    // באמצעות הפונקציה setCoverImage (שמקבלת את המשתנה img המכיל את התמונת Cover של האלבום) מתאפשר להביא את ה- attribute מסוג src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview
    setCoverImage: function ( img ) {
        // הוספה של ה- attribute מסוג src המכיל את הערך המצוי במשתנה img לאלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview
        $('#image-cover-preview img').attr('src', img)
    },

    // באמצעות הפונקציה changeCoverImage מתאפשר להחליף את התמונה המוצגת בתמונת Cover של האלבום
    changeCoverImage: function () {
        // המשתנה img מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image
        let img = $('#album-image').val()
        // המשתנה regex יוצר אינסטנס חדש של תבנית המבצעת ולידציה לערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image
        let regex = new RegExp(/^http?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$/)

        // נבדוק אם הערך המצוי במשתנה img עומד בתבנית Regex המצויה במשתנה regex ואכן מכיל קישור לתמונה, אז נבצע מספר פעולות
        if ( regex.test( img ) )
            // הפעלה של הפונקציה setCoverImage (שמקבלת את המשתנה img המכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image) שבאמצעותה מתאפשר להביא את ה- attribute מסוג src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview, ובכך מתאפשר להחליף את התמונת ברירת מחדל בתמונה שכתובת ה- URL שלה הוזנה באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image כאשר מתבצעת יציאה מהאלמנט על-ידי המשתמש
            this.setCoverImage( img )

        // נבדוק אם המשתנה img מכיל ערך ריק, אז נבצע מספר פעולות
        if ( img === '' ) {
            // הפעלה של הפונקציה setCoverImage (שמקבלת את המשתנה PREVIEW_IMG המכיל כתובת URL קבועה של תמונת התצוגה) שבאמצעותה מתאפשר להביא את ה- attribute מסוג src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview, ובכך מתאפשר להחליף את התמונה המוצגת לתמונת ברירת המחדל כאשר אין ערך באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image ומתבצעת יציאה מהאלמנט על-ידי המשתמש
            this.setCoverImage( PREVIEW_IMG )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        }
    },

    // באמצעות הפונקציה searchYouTubeVideo (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע חיפוש של סרטון ה- YouTube
    searchYouTubeVideo: function ( e ) {
        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )
        // המשתנה youtube_id מכיל את הערך המצוי במשתנה input$
        let youtube_id = $input.val()

        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט שלהורים שלו יש class בשם song-item מה- DOM
        $input.parents('.song-item').find('.error-message').remove()
        // הסרה של ה- class בשם error המצוי בתוך אלמנט שלהורים שלו יש class בשם song-item
        $input.parents('.song-item').removeClass('error')

        // הפעלה של הפונקציה getYouTubeID (שמקבלת את המשתנה youtube_id המכיל את הערך המצוי במשתנה input$) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לבצע חיפוש ב- API של YouTube ולקבל את המזהה הייחודי של סרטון ה- YouTube, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה video המכיל את הנתונים הקשורים לסרטון ה- YouTube ומבצעת מספר פעולות
        AlbumAPIService.getYouTubeID( youtube_id ).then(video => {
            // הכנסה של הערך המצוי בפרופרטי duration המצוי באובייקט video לתוך אלמנט מסוג input שיש לו attribute מסוג name בשם song_time הקרוב ביותר לאלמנט שיש לו class בשם song-item המצוי במשתנה input$
            $input.closest('.song-item').find('input[name=song_time]').val( video.duration )
            // הכנסה של הערך המצוי בפרופרטי duration המצוי באובייקט video ל- DOM והצגתו באמצעות ההפעלה של הפונקציה calculateTime המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר לתוך אלמנט שיש לו class בשם song-time הקרוב ביותר לאלמנט שיש לו class בשם song-item המצוי במשתנה input$
            $input.closest('.song-item').find('.song-time').html( Utils.calculateTime( video.duration ) )
        },
        // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנה error המכיל את השגיאה שקיבלנו ומבצעת מספר פעולות
        error => {
            // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error.responseJSON.error המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
            let html = AlbumFormTemplates.errorMessage( error.responseJSON.error )
            // הכנסה של המשתנה html לפני ההורה של האלמנט המצוי במשתנה input$, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה המתקבלת ישירות בעת ביצוע בקשת get לנתיב של youtube_id בהתאם לתשובה שמתקבלת
            $input.parent().prepend( html )
        })
    },

    // באמצעות הפונקציה removeSongItem (שמקבלת את המשתנה e המסמל event) מתאפשר להסיר שורה המכילה את השדות להוספת שיר
    removeSongItem: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג click של האלמנט שיש לו class בשם remove-icon
        e.preventDefault()

        // המשתנה item מכיל את האלמנט הקרוב ביותר לאלמנט שיש לו class בשם song-item
        let item = $(this).closest('.song-item')

        // הפעלה של הפונקציה fadeOut שבאמצעותה מתאפשר לבצע דהייה איטית של האלמנט המצוי במשתנה item ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מסירה את האלמנט שנלחץ המצוי במשתנה item מה- DOM
        item.fadeOut('slow', () => item.remove())
    },

    // באמצעות הפונקציה addSong (שמקבלת את המשתנה e המסמל event ואת המשתנה song המכיל כברירת מחדל את הערך הבוליאני false) מתאפשר להוסיף שדות להוספת שיר בטופס הוספת אלבום חדש או בטופס עריכת אלבום
    addSong: function ( e, song = false ) {
        // נבדוק אם המשתנה e המסמל event מונע את האפשרות לקריאת המאפיין preventDefault של undefined, אז נבצע מספר פעולות
        if ( e )
            // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג click של האלמנט button שיש לו מזהה ייחודי בשם add-another-song-button
            e.preventDefault()

        // המשתנה html מפעיל את הפונקציה songItem (שמקבלת את המשתנה song המכיל את כל הפרטים של השיר) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את השדות להוספת שיר
        let html = AlbumFormTemplates.songItem( song )
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, ובכך מתאפשר למשתמש להוסיף ל- DOM את השדות להוספת שיר
        $('#add-album-playlist-form').append( html )
    },

    // באמצעות הפונקציה addSongsInputs (שמקבלת את המשתנה items המכיל את הפריטים ומוגדר בערך המספרי 5 כברירת מחדל ואת המשתנה songs המכיל מערך ריק) מתאפשר להוסיף שורות ל- DOM עם השדות להוספת שירים
    addSongsInputs: function ( items = 5, songs = [] ) {
        // כדי לקבל את כל הערכים המצויים במשתנה items, נעבור עליהם באמצעות לולאת for מקסימום 5 פעמים, כך שב- DOM יוצגו כברירת מחדל מקסימום 5 שורות עם השדות להוספת שירים
        for ( let i = 0; i < items; i++ )
            // הפעלה של הפונקציה addSong (שמקבלת את הערך הבוליאני false ואת המשתנה songs המכיל מערך עם השירים) שבאמצעותה מתאפשר להוסיף שדות להוספת שיר בטופס הוספת אלבום חדש או בטופס עריכת אלבום
            this.addSong( false, songs[ i ] )
    },

    // באמצעות הפונקציה collectValues מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input ותיבת הטקסט הקשורים לשדות של האלבום
    collectValues: function () {
        // המשתנה errors מכיל את הערך הבוליאני false, ולמעשה המשתנה errors מאפס את האלמנטים מסוג input משגיאות
        let errors = false
        // המשתנה inputs מכיל את כל האלמנטים מסוג input ותיבת הטקסט שיש להם attribute מסוג required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')
        // המשתנה album מכיל אובייקט ריק
        let album = {}
        // הצהרה על משתנים גלובליים שנבצע בהם שימוש בפונקציה
        let i, input, input_name, input_value

        // הסרה של ה- class בשם error מהאלמנטים המצויים במשתנה inputs (ככל ויש שגיאות ולידציה לפני ביצוע הלולאה)
        inputs.removeClass('error')
        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form .error-message').remove()
        // הסרה של האלמנט span שיש לו class בשם error המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form span.error').remove()

        // כדי לקבל את כל הערכים המצויים באלמנטים של המשתנה inputs, נעבור עליהם באמצעות לולאת for ונבצע בדיקת ולידציה
        for ( i = 0; i < inputs.length; i++ ) {
            // המשתנה input אוסף את האלמנט המצוי במשתנה inputs בהתאם למיקום של האלמנט בלולאה
            // Collect the element
            input = inputs [ i ]

            // המשתנה input מכיל את המשתנה input אשר אוסף את האלמנט המצוי במשתנה inputs, ולמעשה המשתנה input מכיל ערך מהאלמנט המצוי במשתנה inputs
            // Convert the element from native JS element to a jQuery element
            input = $( input )

            // המשתנה input_name מכיל את כל האלמנטים מסוג input שיש להם attribute מסוג name
            input_name = input.attr('name')
            // המשתנה input_value מכיל את כל הערכים המצויים במשתנה input
            input_value = input.val()

            // נבדוק אם הפונקציה validateField (שמקבלת את המשתנה input המכיל ערך מהאלמנט המצוי במשתנה inputs) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום מכילה שגיאה כלשהי, אז נבצע מספר פעולות
            // If there is an error with the regex, set errors to be true, mean we have errors in the validation
            if ( !AlbumValidator.validateField( input ) )
                // המשתנה errors מכיל את הערך הבוליאני true, ולמעשה המשתנה errors מכיל שגיאות כלשהן שלא עומדות בוולידציות המוגדרות
                errors = true

            // המשתנה album מכניס לתוך האובייקט בהתאם למיקום של המשתנה input_name את כל הערכים המצויים במשתנה input_value
            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        // הפרופרטי genres המצוי בתוך המשתנה album מפעיל את הפונקציה collectGenres שבאמצעותה מתאפשר להביא את כל הערכים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags הקשור לשדה של הז'אנרים
        album.genres = this.collectGenres()

        // נבדוק אם הפונקציה validateInputs (שמקבלת את הפרופרטי genres המצוי בתוך המשתנה album המפעיל את הפונקציה collectGenres שבאמצעותה מתאפשר להביא את כל הערכים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags הקשור לשדה של הז'אנרים, את המשתנה 1 המכיל את האורך המינימלי של כמות התגים שהשדה של הז'אנרים יכול להכיל, את המשתנה genres המכיל את המפתח של הודעת השגיאה שתוצג ואת האלמנט div שיש לו מזהה ייחודי בשם album-genres) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input שהם מערך כגון שירים, ז'אנרים וכו' אינה מכילה שגיאה כלשהי, אז נבצע מספר פעולות
        if ( !AlbumValidator.validateInputs( album.genres, 1, 'genres', $('#album-genres') ) ) {
            // הוספה של ה- class בשם error לאלמנט div שיש לו מזהה ייחודי בשם genres-tags
            $('#genres-tags').addClass('error')
            // המשתנה errors מכיל את הערך הבוליאני true, ולמעשה המשתנה errors מכיל שגיאות כלשהן שלא עומדות בוולידציות המוגדרות
            errors = true
        }

        // נבדוק אם המשתנה errors מכיל שגיאות, אז נבצע מספר פעולות
        if ( errors )
            // החזרה של הערך הבוליאני false
            return false

        // הפונקציה מחזירה את המשתנה album המכיל אובייקט שבתוכו מערך עם כל הפרטים של האלבום
        return album
    },

    // באמצעות הפונקציה collectGenres מתאפשר להביא את כל הערכים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags הקשור לשדה של הז'אנרים
    collectGenres: function () {
        // המשתנה input מכיל את האלמנט מסוג input שיש לו attribute מסוג hidden המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags
        let input = $('#genres-tags input[type=hidden]')
        // המשתנה genres מכיל מערך ריק
        let genres = []

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה input, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- input ומבצעת מספר פעולות
        $.each(input, ( index, input ) => {
            // הכנסה של הערך המצוי במשתנה input לתוך המערך המצוי במשתנה genres
            genres.push( $( input ).val() )
        })

        // הפונקציה מחזירה את המשתנה genres המכיל מערך עם כל הערכים של הז'אנרים
        return genres
    },

    // באמצעות הפונקציה collectSongs מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input הקשורים לשדות של השירים
    collectSongs: function () {
        // הצהרה על משתנים גלובליים שנבצע בהם שימוש בפונקציה כאשר המשתנה has_duplications מכיל כברירת מחדל את הערך הבוליאני false והמשתנה songs מכיל מערך ריק
        let has_duplications = false, songs = []

        // הסרה של ה- class בשם error מאלמנט שיש לו class בשם song-item ומכל אלמנט שיש לו class בשם error המצוי בתוך אלמנט שיש לו class בשם song-item
        $('.song-item, .song-item *').removeClass('error')
        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form מה- DOM
        $('#add-album-playlist-form .error-message').remove()

        // כדי לקבל את כל הערכים המצויים במערך של האלמנט שיש לו class בשם song-item, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- item ומבצעת מספר פעולות
        $.each( $('.song-item'), ( index, item ) => {
            // הצהרה על משתנים גלובליים שנבצע בהם שימוש בלולאה
            let song, song_youtube, song_name, song_time

            // המשתנה song מכיל את ה- item המצוי במערך של song-item
            song = $( item )
            // המשתנה song_youtube מכיל את הערך המצוי באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי במשתנה song
            song_youtube = song.find('input[name=song_youtube]').val()
            // המשתנה song_name מכיל את הערך המצוי באלמנט מסוג input שיש לו attribute מסוג name בשם song_name המצוי במשתנה song
            song_name = song.find('input[name=song_name]').val()
            // המשתנה song_time מכיל את הערך המצוי באלמנט מסוג input שיש לו attribute מסוג name בשם song_time המצוי במשתנה song
            song_time = song.find('input[name=song_time]').val()

            // נבדוק אם מצוי ערך במשתנה song_youtube ובמשתנה song_time והמשתנים אינם מכילים ערך ריק, אז נבצע מספר פעולות
            if ( song_youtube !== '' && song_time !== '' ) {
                // נבדוק את אורך המערך המצוי במשתנה songs ואם המערך מכיל 0 ערכים, אז נבצע מספר פעולות
                if ( songs.length === 0 ) {
                    // נבדוק אם הפונקציה validateField (שמקבלת את המשתנה המכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם song_name המצוי במשתנה song) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום אינה מכילה שגיאה כלשהי, אז נבצע מספר פעולות
                    if ( AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                        // הכנסה של אובייקט המכיל את המשתנה song_youtube, את המשתנה song_name ואת המשתנה song_time לתוך המערך המצוי במשתנה songs
                        songs.push({ song_youtube, song_name, song_time })
                    }

                    // ביצוע חזרה להמשך פעולות הפונקציה
                    return
                }

                // המשתנה has_duplications מפעיל את הפונקציה validateDuplications (שמקבלת את המשתנה songs המכיל מערך עם כל הפרטים של השירים המצויים באלבום, את המשתנה 'song_youtube' המכיל את הערך המצוי באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי במשתנה song ולמעשה מכיל את המפתח שלגביו מתבצעת בדיקת הוולידציה, את המשתנה song_youtube המכיל את הערך המצוי באלמנט מסוג input של המזהה הייחודי של YouTube ולמעשה מכיל את הערך שלגביו מתבצעת בדיקת הוולידציה, את המשתנה 'duplicate_song' המכיל את המפתח של הודעת השגיאה ואת המשתנה song המכיל את ה- item המצוי במערך של song-item) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה הבודקת אם הערך כבר שמור במסד הנתונים על-מנת שלא יתאפשר שיהיה שמור ערך כפול
                has_duplications = AlbumValidator.validateDuplications( songs, 'song_youtube', song_youtube, 'duplicate_song', song )

                // נבדוק אם המשתנה has_duplications וגם אם הפונקציה validateField (שמקבלת את המשתנה המכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם song_name המצוי במשתנה song) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום אינם מכילים שגיאה כלשהי, אז נבצע מספר פעולות
                if ( !has_duplications && AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                    // הכנסה של אובייקט המכיל את המשתנה song_youtube, את המשתנה song_name ואת המשתנה song_time לתוך המערך המצוי במשתנה songs
                    songs.push({ song_youtube, song_name, song_time })

                    // ביצוע חזרה להמשך פעולות הפונקציה
                    return
                }
            // אחרת, כלומר אין ערך במשתנה song_youtube ובמשתנה song_time והמשתנים ריקים מערכים, אז נבצע מספר פעולות
            } else {
                // הפעלה של הפונקציה validateField (שמקבלת את המשתנה המכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי במשתנה song) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום אינה מכילה שגיאה כלשהי באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube
                AlbumValidator.validateField( song.find('input[name=song_youtube]') )
                // הפעלה של הפונקציה validateField (שמקבלת את המשתנה המכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם song_name המצוי במשתנה song) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום אינה מכילה שגיאה כלשהי באלמנט מסוג input שיש לו attribute מסוג name בשם song_name
                AlbumValidator.validateField( song.find('input[name=song_name]') )
            }
        })

        // נבדוק אם המשתנה has_duplications או שהפונקציה validateInputs (שמקבלת את המשתנה songs המכיל מערך עם כל הפרטים של השירים המצויים באלבום, את המספר 5 המכיל את האורך המינימלי של כמות השירים שהאלבום יכול להכיל, את המשתנה 'song_youtube_id' המכיל את המפתח של הודעת השגיאה שתוצג ואת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input שהם מערך כגון שירים, ז'אנרים וכו' אינם מכילים שגיאה כלשהי, אז נבצע מספר פעולות
        if ( has_duplications || !AlbumValidator.validateInputs( songs, 5, 'song_youtube_id', $('#add-album-playlist-form') ) )
            // החזרה של הערך הבוליאני false
            return false

        // הפונקציה מחזירה את המשתנה songs המכיל מערך עם כל הפרטים של השירים המצויים באלבום
        return songs
    },

    // באמצעות הפונקציה validateAlbum מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input לפני יצירה או עריכה של האלבום במסד הנתונים והצגתו ב- DOM
    validateAlbum: function () {
        // המשתנה album מפעיל את הפונקציה collectValues שבאמצעותה מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input ותיבת הטקסט הקשורים לשדות של האלבום
        let album = this.collectValues()
        // המשתנה songs מפעיל את הפונקציה collectSongs שבאמצעותה מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input הקשורים לשדות של השירים
        let songs = this.collectSongs()

        // נבדוק אם יש שגיאה במשתנה album, כך שאם יש שגיאה המונעת מאיתנו לבצע שליחה של הטופס וליצור אלבום חדש במסד הנתונים ולהציגו ב- DOM, אז נבצע מספר פעולות
        if ( !album ) {
            // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
            Utils.scrollTop( $('#main-container') )
            // החזרה של הערך הבוליאני false
            return false
        }

        // נבדוק אם יש שגיאה במשתנה songs, כך שאם יש שגיאה המונעת מאיתנו לבצע שליחה של הטופס וליצור אלבום חדש במסד הנתונים ולהציגו ב- DOM, אז נבצע מספר פעולות
        if ( !songs ) {
            // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details
            Utils.scrollTop( $('#add-album-playlist-details') )
            // החזרה של הערך הבוליאני false
            return false
        }

        // הפרופרטי songs המצוי בתוך המשתנה album מכיל את המשתנה songs המפעיל את הפונקציה collectSongs שבאמצעותה מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input הקשורים לשדות של השירים
        album.songs = songs

        // הפונקציה מחזירה את המשתנה album המפעיל את הפונקציה collectValues שבאמצעותה מתאפשר להביא את כל הערכים המצויים באלמנטים מסוג input ותיבת הטקסט הקשורים לשדות של האלבום
        return album
    },

    // באמצעות הפונקציה validateField (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנט מסוג input או תיבת הטקסט
    validateField: function ( e ) {
        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרה של האלמנט שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ מה- DOM
        $input.siblings('.error-message').remove()
        // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$
        $input.removeClass('error')

        // נבדוק אם הפונקציה validateField (שמקבלת את המשתנה input$ המאפשר לבצע פעולות על האלמנט שהפעיל את ה- event) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים של הטופס הוספת אלבום חדש או בטופס עריכת אלבום אינה מכילה שגיאה כלשהי, אז נבצע מספר פעולות
        if ( AlbumValidator.validateField( $input ) ) {
            // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$ והוספה של ה- class בשם success לאותו אלמנט שהוסר ממנו ה- class בשם error
            $input.removeClass('error').addClass('success')
            // הסרה של האלמנט שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ מה- DOM
            $input.siblings('.error-message').remove()
        }
    },

    // באמצעות הפונקציה validateGenres מתאפשר לבצע בדיקת ולידציה לכמות הערכים המצויים בשדה של הז'אנרים
    validateGenres: function () {
        // המשתנה input$ מכיל את האלמנט div שיש לו מזהה ייחודי בשם album-genres
        let $input = $('#album-genres')

        // נבדוק אם הפונקציה validateInputs (שמקבלת את הפונקציה collectGenres שבאמצעותה מתאפשר להביא את כל הערכים המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם genres-tags הקשור לשדה של הז'אנרים, את המשתנה 1 המכיל את האורך המינימלי של כמות התגים שהשדה של הז'אנרים יכול להכיל, את המשתנה genres המכיל את המפתח של הודעת השגיאה שתוצג ואת המשתנה input$ המכיל את האלמנט div שיש לו מזהה ייחודי בשם album-genres) המצויה תחת האובייקט AlbumValidator ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input שהם מערך כגון שירים, ז'אנרים וכו' מכילה שגיאה כלשהי, אז נבצע מספר פעולות
        if ( AlbumValidator.validateInputs( this.collectGenres(), 1, 'genres', $input ) ) {
            // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$ והוספה של ה- class בשם success לאותו אלמנט שהוסר ממנו ה- class בשם error
            $input.find('#genres-tags').removeClass('error').addClass('success')
            // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך המשתנה input$ מה- DOM
            $input.find('.error-message').remove()
        }
    },

    // באמצעות הפונקציה validateFieldFromDB (שמקבלת את המשתנה error המכיל את הודעת השגיאה שקיבלנו) מתאפשר לבצע בדיקת ולידציה לערך המצוי בשדות הטופס הוספת אלבום חדש או בטופס עריכת אלבום בהתאם לשגיאה המתקבלת ממסד הנתונים
    validateFieldFromDB: function ( error ) {
        // הצהרה על משתנים גלובליים שנבצע בהם שימוש בפונקציה
        let input, error_message, html
        // המשתנה input_name מכיל את שם השדה שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
        let input_name = error.responseJSON.reason.message.split(' ')[0]

        // נבדוק מה מכיל המשתנה input_name, אז נבצע מספר פעולות
        switch ( input_name ) {
            // המקרה של Validation מבצע בדיקה אם יש שגיאה במסד הנתונים בשדה של שנת יצירת האלבום, אז נבצע מספר פעולות
            case 'Validation':
                // המשתנה album_year מכיל את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                let album_year = error.responseJSON.reason.error.split(' ')[0]
                // המשתנה input מכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם album_year
                input = $('input[name=album_year]')

                // הסרה של ה- class בשם success מהאלמנט המצוי במשתנה input
                input.removeClass('success')
                // הוספה של ה- class בשם error לאלמנט המצוי במשתנה input
                input.addClass('error')
                // המשתנה error_message מכיל את הודעת השגיאה המצויה במשתנה album_year וכאשר תוצג נחליף את הסימן '_' לסימן ' ', ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה עם שם השדה
                error_message = `Validation max or min on ${( album_year.replace('_', ' ') )} failed`

                // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
                html = AlbumFormTemplates.errorMessage( error_message )
                // הכנסה של המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group, ובכך מתאפשר להציג למשתמש ב-  DOM את הודעת השגיאה
                input.parent('.form-group').prepend( html )
                // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
                Utils.scrollTop( $('#main-container') )
                // ביצוע הפסקה של בדיקת המקרה
                break

            // המקרה של song_youtube מבצע בדיקה אם השיר שאנו רוצים להוסיף כבר שמור במסד הנתונים, אז נבצע מספר פעולות
            case 'song_youtube':
                // המשתנה youtube_code מכיל את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה השנייה (מאחר והאינדקס שלה במערך הוא 1) ונחליף בתשובה שקיבלנו את הסימן '\' לסימן ''
                let youtube_code = error.responseJSON.reason.error.split(' ')[1].replace(/['\']+/g, '')

                // המשתנה input מכיל את האלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube ומפעיל את הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש במערך ושפונקציית ה- callback שלה מבצעת מספר פעולות
                input = $('input[name=song_youtube]').filter(function () {
                    // הפונקציה מחזירה את הערך המצוי באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube כאשר הערך המצוי באלמנט זהה לערך המצוי במשתנה youtube_code
                    return this.value === youtube_code
                })

                // הסרה של ה- class בשם success מהאלמנט המצוי במשתנה input
                input.removeClass('success')
                // הוספה של ה- class בשם error לאלמנט המצוי במשתנה input
                input.addClass('error')
                // המשתנה error_message מכיל את הודעת השגיאה שתוצג
                error_message = 'Song already exist in app'
                // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
                html = AlbumFormTemplates.errorMessage( error_message )
                // הכנסה של המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
                input.parent('.form-group').prepend( html )
                // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details
                Utils.scrollTop( $('#add-album-playlist-details') )
                // ביצוע הפסקה של בדיקת המקרה
                break

            // מצב של ברירת מחדל, כלומר המשתנה input_name מכיל שגיאה הקשורה לערך המצוי בשדה של האלבום, אז נבצע מספר פעולות
            default:
                // המשתנה input מכיל את האלמנט מסוג input שיש לו attribute מסוג name המכיל את שם הערך המצוי במשתנה input_name
                input = $(`input[name=${input_name}]`)

                // הסרה של ה- class בשם success מהאלמנט המצוי במשתנה input
                input.removeClass('success')
                // הוספה של ה- class בשם error לאלמנט המצוי במשתנה input
                input.addClass('error')
                // המשתנה error_message מכיל את הודעת השגיאה שתוצג כאשר נהפוך את האות הראשונה של הערך המצוי במשתנה input_name לאות גדולה באמצעות הפעלה של הפונקציה capitalize המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר להפוך את האות הראשונה לאות גדולה ונחליף את הסימן '_' לסימן ' ', ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה עם שם השדה
                error_message = `${Utils.capitalize( input_name.replace('_', ' ') )} must be unique`
                // המשתנה html מפעיל את הפונקציה errorMessage (שמקבלת את המשתנה error_message המכיל את הודעת השגיאה) המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
                html = AlbumFormTemplates.errorMessage( error_message )
                // הכנסה של המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group, ובכך מתאפשר להציג למשתמש ב- DOM את הודעת השגיאה
                input.parent('.form-group').prepend( html )
                // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
                Utils.scrollTop( $('#main-container') )
                // ביצוע הפסקה של בדיקת המקרה
                break
        }
    },

    // באמצעות הפונקציה setSuccessMessage מתאפשר להציג הודעת הצלחה עם היצירה של האלבום במסד הנתונים
    setSuccessMessage: function () {
        // המשתנה html מפעיל את הפונקציה successMessage המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעת הצלחה עם היצירה של האלבום במסד הנתונים
        let html = AlbumFormTemplates.successMessage()
        // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעת הצלחה עם היצירה של האלבום במסד הנתונים
        $('.modal-dialog').html( html )

        // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.modalOpen()
    },

    // באמצעות הפונקציה resetFields (שמקבלת את המשתנה e המסמל event) מתאפשר לאפס מערכים את האלמנטים המצויים בטופס הוספת אלבום חדש או בטופס עריכת אלבום
    resetFields: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג click של האלמנט button שיש לו מזהה ייחודי בשם reset-fields-button
        e.preventDefault()

        // הכנסה של ערך ריק לתוך אלמנט span המצוי בתוך אלמנט שיש לו class בשם form-group
        $('.form-group span').text('')
        // הפעלה של הפונקציה setCoverImage (שמקבלת את המשתנה PREVIEW_IMG המכיל כתובת URL קבועה של תמונת התצוגה) שבאמצעותה מתאפשר להביא את ה- attribute מסוג src של האלמנט img המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם image-cover-preview, ובכך מתאפשר להחליף את התמונה המוצגת לתמונת ברירת המחדל כאשר אין ערך באלמנט מסוג input שיש לו מזהה ייחודי בשם album-image ומתבצעת יציאה מהאלמנט על-ידי המשתמש
        this.setCoverImage( PREVIEW_IMG )
        // הסרה של האלמנט שיש לו class בשם tag המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם tags-container מה- DOM
        $('#tags-container').find('.tag').remove()
        // הסרה של ה- class בשם error מהאלמנטים input, div, textarea ו- span שיש להם class בשם error
        $('input.error, div.error, textarea.error, span.error').removeClass('error')
        // הסרה של ה- class בשם success מהאלמנטים input, div, textarea ו- span שיש להם class בשם success
        $('input.success, div.success, textarea.success, span.success').removeClass('success')
        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form מה- DOM
        $('#add-new-album-form').find('.error-message').remove()
        // הסרה של האלמנט שיש לו class בשם error-message המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form מה- DOM
        $('#add-album-playlist-form').find('.error-message').remove()

        // כדי לקבל את כל הערכים המצויים במערך של האלמנטים מסוג input ו- textarea, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- input ומבצעת מספר פעולות
        $.each( $('input, textarea'), ( index, input ) => {
            // הכנסה של ערך ריק לתוך אלמנטים מסוג input ותיבת הטקסט
            $(input).val('')
        })

        // הפונקציה מחזירה את הפונקציה scrollTop המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע גלילה של העמוד חזרה למעלה עד לנקודה מסוימת בהתאם להגדרה של האלמנט, כאשר במקרה זה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
        return Utils.scrollTop( $('#main-container') )
    },

    // באמצעות הפונקציה emptyValue (שמקבלת את המשתנה e המסמל event) מתאפשר להכניס ערך ריק לתוך אלמנט span כאשר אין ערך באלמנט מסוג input שה- attribute מסוג name שלו הוא song_youtube, כלומר אין ערך באלמנט מסוג input של המזהה הייחודי של YouTube
    emptyValue: function ( e ) {
        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // נבדוק אם האלמנט מסוג input שיש לו attribute מסוג name בשם song_time הקרוב ביותר לאלמנט שיש לו class בשם song-item המצוי במשתנה input$ מכיל ערך ריק, אז נבצע מספר פעולות
        if ( $input.closest('.song-item').find('input[name=song_time]').val('') )
            // הכנסה של ערך ריק לתוך אלמנט שיש לו class בשם song-time הקרוב ביותר לאלמנט שיש לו class בשם song-item המצוי במשתנה input$
            $input.closest('.song-item').find('.song-time').html('')
    },

    // באמצעות הפונקציה saveAlbum (שמקבלת את המשתנה e המסמל event) מתאפשר לשמור את האלבום שנוצר במסד הנתונים ולהציגו ב- DOM
    saveAlbum: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג submit של האלמנט form שיש לו מזהה ייחודי בשם add-new-album
        e.preventDefault()

        // המשתנה album מפעיל את הפונקציה validateAlbum שבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input לפני יצירה או עריכה של האלבום במסד הנתונים והצגתו ב- DOM
        let album = this.validateAlbum()

        // נבדוק אם יש שגיאה במשתנה album, כך שאם יש שגיאה המונעת מאיתנו לבצע שליחה של הטופס וליצור אלבום חדש במסד הנתונים ולהציגו ב- DOM, אז נבצע מספר פעולות
        if ( !album )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return

        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרה של האלמנט שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ מה- DOM
        $input.siblings('.error-message').remove()
        // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$
        $input.removeClass('error')

        // הפעלה של הפונקציה saveAlbum (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר ליצור אלבום חדש ולשמור אותו במסד הנתונים, ולאחר מכן נפעיל promise המבצע מספר פעולות
        AlbumAPIService.saveAlbum( album ).then(
            // הפעלה של הפונקציה setSuccessMessage שבאמצעותה מתאפשר להציג הודעת הצלחה עם היצירה של האלבום במסד הנתונים
            this.setSuccessMessage,
            // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנה error המכיל את השגיאה שקיבלנו ומבצעת מספר פעולות ככל ויש שגיאה המונעת מאיתנו לשמור את האלבום במסד הנתונים
            ( error ) => {
                // הפעלה של הפונקציה validateFieldFromDB (שמקבלת את המשתנה error המכיל את הודעת השגיאה שקיבלנו) שבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי בשדות הטופס הוספת אלבום חדש או בטופס עריכת אלבום בהתאם לשגיאה המתקבלת ממסד הנתונים
                this.validateFieldFromDB( error )
            }
        )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים בטופס הוספת אלבום חדש
    bindEvents: function () {
        // כאשר מתבצעת הקלדה באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist, נפעיל את הפונקציה debounce המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע השהייה של פעולה מסוימת, במקרה זה מדובר בפונקציה searchArtist שבאמצעותה מתאפשר לבצע חיפוש של שמות האמנים השמורים במסד הנתונים ונשהה את הפעולה שלה למשך חצי שנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchArtist יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist), נשתמש ב-proxy כדי שההקשר של this יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-artist').on('keyup', Utils.debounce( $.proxy( this.searchArtist, this ), 500) )
        // כאשר מתבצעת לחיצה על האלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results, נפעיל את הפונקציה setValueArtistResult שבאמצעותה מתאפשר להכניס את הטקסט המצוי בשם האמן שהתקבל בחיפוש לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setValueArtistResult יתייחס לאלמנט עצמו (במקרה זה לאלמנט li המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם artist-results), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה setValueArtistResult יתייחס בכל מקרה לאובייקט AlbumForm
        $('#artist-results').on('click', 'li', $.proxy( this.setValueArtistResult, this ))
        // כאשר מתבצעת יציאה על-ידי המשתמש מהאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist, נפעיל את הפונקציה clearArtistResults שבאמצעותה מתאפשר לנקות את תיבת ההצעות האפשריות לתוצאות החיפוש של שם האמן מהתוצאות המצויות בה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם clearArtistResults יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה clearArtistResults יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-artist').on('blur', $.proxy( this.clearArtistResults, this ))
        // כאשר מתבצעת יציאה על-ידי המשתמש מהאלמנט מסוג input שיש לו מזהה ייחודי בשם album-image, נפעיל את הפונקציה changeCoverImage שבאמצעותה מתאפשר להחליף את התמונה המוצגת בתמונת Cover של האלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCoverImage יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם album-image), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCoverImage יתייחס בכל מקרה לאובייקט AlbumForm
        $('#album-image').on('blur', $.proxy( this.changeCoverImage, this ))
        // כאשר מתבצעת הקלדה באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה debounce המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע השהייה של פעולה מסוימת, במקרה זה מדובר בפונקציה searchYouTubeVideo שבאמצעותה מתאפשר לבצע חיפוש של סרטון ה- YouTube ונשהה את הפעולה שלה למשך חצי שנייה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם searchYouTubeVideo יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה searchYouTubeVideo יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', Utils.debounce( $.proxy( this.searchYouTubeVideo, this ), 500) )
        // כאשר מתבצעת הקלדה באלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה emptyValue שבאמצעותה מתאפשר להכניס ערך ריק לתוך אלמנט span כאשר אין ערך באלמנט מסוג input שה- attribute מסוג name שלו הוא song_youtube, כלומר אין ערך באלמנט מסוג input של המזהה הייחודי של YouTube, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם emptyValue יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו attribute מסוג name בשם song_youtube המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה emptyValue יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', $.proxy( this.emptyValue, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם add-another-song-button, נפעיל את הפונקציה addSong שבאמצעותה מתאפשר להוסיף שדות להוספת שיר בטופס הוספת אלבום חדש או בטופס עריכת אלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם addSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם add-another-song-button), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה addSong יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-another-song-button').on('click', $.proxy( this.addSong, this ))
        // כאשר מתבצעת יציאה על-ידי המשתמש מהאלמנט מסוג input שיש לו class בשם error ו/או מהאלמנט textarea שיש לו class בשם error המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form, נפעיל את הפונקציה validateField שבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנט מסוג input או תיבת הטקסט, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם validateField יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו class בשם error ו/או מהאלמנט textarea שיש לו class בשם error המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה validateField יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-new-album-form').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
        // כאשר מתבצעת יציאה על-ידי המשתמש מהאלמנט מסוג input שיש לו class בשם error ו/או מהאלמנט שיש לו class בשם song-item שיש לו class בשם error המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה validateField שבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנט מסוג input או תיבת הטקסט, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם validateField יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו class בשם error ו/או מהאלמנט שיש לו class בשם song-item שיש לו class בשם error המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה validateField יתייחס בכל מקרה לאובייקט AlbumForm
        $('#add-album-playlist-form').on('blur', 'input.error, .song-item.error', $.proxy( this.validateField, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם reset-fields-button, נפעיל את הפונקציה resetFields שבאמצעותה מתאפשר לאפס מערכים את האלמנטים המצויים בטופס הוספת אלבום חדש או בטופס עריכת אלבום, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם resetFields יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם reset-fields-button), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה resetFields יתייחס בכל מקרה לאובייקט AlbumForm
        $('#reset-fields-button').on('click', $.proxy( this.resetFields, this ))

        // נבדוק אם הערך של הפרופרטי hasAlbum לא קיים, אז נבצע מספר פעולות
        if ( !this.hasAlbum ) {
            // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button, נפעיל את הפונקציה saveAlbum שבאמצעותה מתאפשר לשמור את האלבום שנוצר במסד הנתונים ולהציגו ב- DOM, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveAlbum יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveAlbum יתייחס בכל מקרה לאובייקט AlbumForm
            $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))
            // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה removeSongItem שבאמצעותה מתאפשר להסיר שורה המכילה את השדות להוספת שיר
            $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        }
    },

    // הפונקציה init (שמקבלת את המשתנה getAlbum המכיל כברירת מחדל את הערך הבוליאני false) מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm
    init: function ( getAlbum = false ) {
        // הפעלה של הפונקציה setTitleAddNewAlbum שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        this.setTitleAddNewAlbum()
        // הפעלה של הפונקציה setTitleAddAlbumPlaylist שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        this.setTitleAddAlbumPlaylist()
        // הפרופרטי hasAlbum מכיל את המשתנה getAlbum
        this.hasAlbum = getAlbum

        // נבדוק אם הערך של הפרופרטי hasAlbum כבר קיים, אז נבצע מספר פעולות
        if ( this.hasAlbum )
            // הפעלה של הפונקציה init המצויה תחת האובייקט EditAlbum המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט EditAlbum
            EditAlbum.init()
        // אחרת, כלומר הערך של הפרופרטי hasAlbum לא קיים, אז נבצע מספר פעולות
        else
            // הפעלה של הפונקציה addSongsInputs שבאמצעותה מתאפשר להוסיף שורות ל- DOM עם השדות להוספת שירים
            this.addSongsInputs()

        // הפעלה של הפונקציה init המצויה תחת האובייקט AlbumGenres המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumGenres
        AlbumGenres.init()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים בטופס הוספת אלבום חדש
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumForm החוצה
export default AlbumForm