// ייבוא היכולות של jQuery על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של האובייקט AlbumGenres על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumGenres from './AlbumGenres'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט AlbumFormTemplates על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
// ייבוא היכולות של האובייקט EditAlbumTemplates על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import EditAlbumTemplates from '../Templates/EditAlbumTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Router from '../Router'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט EditAlbum מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הטופס עריכת אלבום
// הגדרת האובייקט EditAlbum כקבוע
const EditAlbum = {
    // הפרופרטי album_id מוגדר כברירת מחדל כ- null
    album_id: null,

    // באמצעות הפונקציה setTitleEditAlbum מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
    setTitleEditAlbum: function () {
        // המשתנה html מכיל את התבנית html המכילה את הכותרת של העמוד בו אנו נמצאים באמצעות הפעלה של הפונקציה titleEditAlbum המצויה תחת האובייקט EditAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
        let html = EditAlbumTemplates.titleEditAlbum()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-title, ובכך למעשה מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        $('#add-new-album-title').html( html )
    },

    // באמצעות הפונקציה setTitleEditAlbumPlaylist מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    setTitleEditAlbumPlaylist: function () {
        // המשתנה html מכיל את התבנית html המכילה את הכותרת של החלק בו אנו נמצאים בעמוד באמצעות הפעלה של הפונקציה titleEditAlbumPlaylist המצויה תחת האובייקט EditAlbumTemplates שבאמצעותה אנו יוצרים תבנית html המכילה כותרת של החלק בו אנו נמצאים בעמוד
        let html = EditAlbumTemplates.titleEditAlbumPlaylist()
        // הכנסת המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-title, ובכך למעשה מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        $('#add-album-playlist-title').html( html )
    },

    // באמצעות הפונקציה setValues מתאפשר לשים את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
    setValues: function ( album ) {
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ותיבת הטקסט שיש להם את ה- attribute בשם required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        // כדי לקבל את הערכים המצויים בשדות של המשתנה inputs נעבור עליהם באמצעות לולאת each שפונקציית ה- callback שלה מקבלת את המשתנים index ו- input
        $.each(inputs, ( index, input ) => {
            // הבאת הנתונים של האלבום המצויים באלמנטים מסוג input שיש להם את ה- attribute מסוג name והכנסת הערכים שלהם לתוך השדות של האלמנטים מסוג input
            input.value = album [ input.name ]
        })

        // הפעלה של הפונקציה changeCoverImage המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להחליף את התצוגה של התמונה המוצגת בתמונת Cover של האלבום
        AlbumForm.changeCoverImage()
        // הפעלה של הפונקציה addSongsInputs המקבלת את המשתנה album.songs.length המכיל את אורך המערך של השירים ואת המשתנה album.songs המכיל את המערך של השירים המצויים בתוך האלבום שמצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להוסיף ל- DOM שורה עם השדות להוספת שירים
        AlbumForm.addSongsInputs( album.songs.length, album.songs )

        // כדי לקבל את הערכים המצויים במערך של genres המצוי בתוך album נעבור עליהם באמצעות לולאת each שפונקציית ה- callback שלה מקבלת את המשתנים index ו- genre
        $.each(album.genres, ( index, genre ) => {
            // הפעלה של הפונקציה addGenreTag המקבלת את המשתנים genre.genre_name המכיל את השם של הז'אנר ואת genre.genre_id המכיל את המספר id של הז'אנר המצוי תחת האובייקט AlbumGenres ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום ל- DOM
            AlbumGenres.addGenreTag( genre.genre_name, genre.genre_id )
        })
    },

    // באמצעות הפונקציה getAlbum מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function () {
        // הפעלה של הפונקציה getAlbumById המקבלת את המשתנה id שמצויה תחת האובייקט AlbumAPIService ושבאמצעותה אנו מבצעים בקשת get לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת 2 משתנים
        AlbumAPIService.getAlbumById( this.album_id ).then(
            // המשתנה album מפעיל פונקציות שונות הקשורות להבאת הערכים של השדות לעריכת אלבום
            album => {
                // הפעלה של הפונקציה setValues המקבלת את המשתנה album שבאמצעותה מתאפשר לשים את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
                this.setValues( album )
            }, () => {
                // הפעלה של הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
                Router.redirect()
                return
            })
    },

    // באמצעות הפונקציה deleteSongMessage המקבלת את המשתנה e (המסמל event) מתאפשר להציג הודעת מחיקה כאשר אנו מעוניינים למחוק שיר
    deleteSongMessage: function ( e ) {
        // הצהרה על המשתנים שנבצע בהם שימוש בפונקציה
        let song_id, html

        // המשתנה song_id מכיל את האלמנט הקרוב ביותר שיש לו את ה- attribute בשם data-song-id ושמכיל את ה- data בשם song-id, כך שלמעשה המשתנה song_id מכיל את האלמנט עם המספר id של השיר
        song_id = $( e.target ).closest('[data-song-id]').data('song-id')

        // המשתנה html מפעיל את הפונקציה deleteSongDialog המקבלת את המשתנה song_id המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת השיר הרלוונטי
        html = EditAlbumTemplates.deleteSongDialog( song_id )
        // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה מתאימה בדבר מחיקת השיר הרלוונטי לתוך האלמנט שיש לו class בשם modal-dialog, ובכך למעשה אנו מאפשרים להציג למשתמש הודעה מתאימה בדבר מחיקת השיר הרלוונטי בטרם ביצוע פעולת המחיקה
        $('.modal-dialog').html( html )

        // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.modalOpen()
    },

    // באמצעות הפונקציה confirmDeleteSong המקבלת את המשתנה e (המסמל event) מתאפשר לבצע פעולות עם אישור מחיקת השיר
    confirmDeleteSong: function ( e ) {
        // המשתנה song_id מכיל את האלמנט הקרוב ביותר שמכיל את ה- data בשם song-id, כך שלמעשה המשתנה song_id מכיל את האלמנט הקרוב ביותר עם המספר id של השיר
        let song_id = $( e.target ).data('song-id')

        // האלמנט שיש לו class בשם modal-dialog מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומפעיל פונקציית callback (המסומנת כפונקציית חץ)
        $('.modal-dialog').fadeOut('slow', () => {
            // הסרת האלמנט שיש לו class בשם song-item ושיש לו את ה- attribute בשם data-song-id עם המספר הייחודי של השיר
            $(`.song-item[data-song-id=${song_id}]`).remove()
            // המשתנה html מפעיל את הפונקציה deleteSongSuccessDialog המקבלת את המשתנה song_id המכיל את האלמנט הקרוב ביותר עם המספר id של השיר, שמצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהשיר נמחק
            let html = EditAlbumTemplates.deleteSongSuccessDialog( song_id )
            // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג הודעה המאשרת שהשיר נמחק לתוך האלמנט שיש לו class בשם modal-dialog המבצע fadeIn (הצגה איטית של האלמנט), ובכך למעשה אנו מאפשרים להציג למשתמש הודעה המאשרת שהשיר המבוקש נמחק
            $('.modal-dialog').html( html ).fadeIn('slow')
        })
    },

    // באמצעות הפונקציה setSuccessMessage אנו מציגים הודעת הצלחה עם עדכון הנתונים של האלבום
    setSuccessMessageEditAlbum: function () {
        // המשתנה html מפעיל את הפונקציה successMessageEditAlbum המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום
        let html = EditAlbumTemplates.successMessageEditAlbum()
        // הכנסת המשתנה html המכיל את התבנית html המאפשרת להציג ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום לתוך האלמנט שיש לו class בשם modal-dialog, ובכך למעשה אנו מאפשרים להציג למשתמש הודעה מתאימה בדבר עדכון הנתונים של האלבום
        $('.modal-dialog').html( html )

        // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.modalOpen()
    },

    // באמצעות הפונקציה saveChanges המקבלת את המשתנה e (המסמל event) מתאפשר לשמור את השינויים שבוצעו בעריכת האלבום
    saveChanges: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה ל- event מסוג submit של אלמנט form שיש לו מזהה ייחודי בשם add-new-album
        e.preventDefault()

        // המשתנה album מפעיל את הפונקציה validateAlbum המצויה תחת האובייקט AlbumForm שבאמצעותה אנו מבצעים בדיקת ולידציה לערכים המצויים בשדות ה- input לפני עדכון האלבום במסד הנתונים והצגתו ב- DOM
        let album = AlbumForm.validateAlbum()

        // אם יש שגיאות במשתנה album המפעיל את הפונקציה validateAlbum המצויה תחת האובייקט AlbumForm שבאמצעותה אנו מבצעים בדיקת ולידציה לערכים המצויים בשדות ה- input לפני עדכון האלבום במסד הנתונים והצגתו ב- DOM, כך שלמעשה יש שגיאות המונעות מאיתנו לבצע שליחה של הטופס ולעדכן את האלבום במסד הנתונים ולהציגו ב- DOM, אז נבצע חזרה ולא נבצע עדכון של הנתונים כל עוד יש שגיאות
        if ( !album )
            return

        // המשתנה input$ מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרת האלמנט מה- DOM שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        $input.siblings('.error-message').remove()
        // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$ שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        $input.removeClass('error')

        // הפעלה של הפונקציה updateAlbum המקבלת את המשתנה this.album_id המכיל את המספר id של האלבום ואת המשתנה album המכיל את הפרטים של האלבום שמצוי תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לעדכן נתונים באלבום ששמור במסד הנתונים לפי המספר id שלו, ולאחר מכן נפעיל promise
        AlbumAPIService.updateAlbum( this.album_id, album ).then(
            // הפעלה של הפונקציה setSuccessMessageEditAlbum המציגה הודעת הצלחה עם עדכון הנתונים באלבום ששמור במסד הנתונים
            this.setSuccessMessageEditAlbum,
            // הפעלה של פונקציית ה- callback (המסומנת כפונקציית חץ) שמקבלת את המשתנה error ומבצעת מספר פעולות ככל ויש שגיאות המונעות מאיתנו לעדכן את האלבום ששמור במסד הנתונים
            ( error ) => {
                // הצהרה על המשתנים שאנו הולכים לבצע בהם שימוש בפונקציה
                let input, error_message, html
                // המשתנה input_name מכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                let input_name = error.responseJSON.reason.message.split(' ')[0]

                // נבצע בדיקה בה נבדוק מה מכיל המשתנה input_name המכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                switch ( input_name ) {
                    // המקרה של 'Validation' מבצע בדיקה אם יש שגיאה מהשרת בשדה של שנת יצירת האלבום
                    case 'Validation':
                        // המשתנה album_year מכיל את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        let album_year = error.responseJSON.reason.error.split(' ')[0]
                        // המשתנה input מכיל את האלמנט input שיש לו את ה- attribute מסוג name בשם album_year
                        input = $('input[name=album_year]')

                        // הסרת ה- class בשם success מהאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name בשם album_year
                        input.removeClass('success')
                        // הוספת ה- class בשם error לאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name בשם album_year
                        input.addClass('error')
                        // המשתנה error_message מכיל את הודעת השגיאה המצויה במשתנה album_year וכאשר תוצג נחליף את הסימן '_' לסימן ' ', כך שלמעשה נציג את השם של השדה בהודעת השגיאה
                        error_message = `Validation max or min on ${( album_year.replace('_', ' ') )} failed`

                        // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
                        html = AlbumFormTemplates.errorMessage( error_message )
                        // המשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name בשם album_year של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0) מכניס את המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group
                        input.parent('.form-group').prepend( html )
                        // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ומבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
                        Utils.scrollTop( $('#main-container') )
                        break

                    // המקרה של 'song_youtube' מבצע בדיקה אם השיר שאנו רוצים להוסיף כבר קיים במסד הנתונים
                    case 'song_youtube':
                        // המשתנה youtube_code מכיל את השגיאה המפורטת שקיבלנו ומפצל אותה למערך שממנו אנו לוקחים את התוצאה השנייה (מאחר והאינדקס שלה במערך הוא 1) ונסיר מהתשובה שקיבלנו את הסימן '\'
                        let youtube_code = error.responseJSON.reason.error.split(' ')[1].replace(/['\']+/g, '')

                        // המשתנה input מכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        input = $('input[name=song_youtube]').filter(function () {
                            return this.value === youtube_code
                        })

                        // הסרת ה- class בשם success מהאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        input.removeClass('success')
                        // הוספת ה- class בשם error לאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code
                        input.addClass('error')
                        // המשתנה error_message מכיל את הודעת השגיאה שתוצג
                        error_message = 'Song already exist in app'
                        // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
                        html = AlbumFormTemplates.errorMessage( error_message )
                        // המשתנה input המכיל את האלמנט input שיש לו attribute מסוג name בשם song_youtube ומבצע סינון באמצעות השוואה של הערך המצוי ב- input לבין הערך המצוי במשתנה youtube_code מכניס את המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group
                        input.parent('.form-group').prepend( html )
                        // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ומבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-details
                        Utils.scrollTop( $('#add-album-playlist-details') )
                        break

                    // מצב של ברירת מחדל, כלומר שהמשתנה input_name המכיל את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0), אכן מכיל שגיאה הקשורה לנתונים המצויים בשדה של האלבום, אז נבצע מספר פעולות במצב זה
                    default:
                        //
                        // המשתנה input מכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        input = $(`input[name=${input_name}]`)

                        // הסרת ה- class בשם success מהאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        input.removeClass('success')
                        // הוספת ה- class בשם error לאלמנט המצוי במשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0)
                        input.addClass('error')
                        // המשתנה error_message מכיל את הודעת השגיאה שתוצג כאשר נהפוך את האות הראשונה של הערך המצוי במשתנה input_name לאות גדולה ונחליף את הסימן '_' לסימן ' ', כך שלמעשה נציג את השם של השדה בהודעת השגיאה
                        error_message = `${Utils.capitalize( input_name.replace('_', ' ') )} must be unique`
                        // המשתנה html מפעיל את הפונקציה errorMessage שמקבלת את המשתנה error_message המכיל את הודעת השגיאה המצויה תחת האובייקט AlbumFormTemplates ושבאמצעותה אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה, וכך למעשה מתאפשר להציג ב- DOM את הודעת השגיאה
                        html = AlbumFormTemplates.errorMessage( error_message )
                        // המשתנה input המכיל את האלמנט input שיש לו את ה- attribute מסוג name של האלמנט input שיש לו את הודעת השגיאה שקיבלנו לאחר שפיצלנו את התוצאה שקיבלנו למערך ולקחנו את התוצאה הראשונה (מאחר והאינדקס שלה במערך הוא 0) מכניס את המשתנה html לפני ההורה של האלמנט שיש לו class בשם form-group
                        input.parent('.form-group').prepend( html )
                        // הפעלה של הפונקציה scrollTop המצויה תחת האובייקט Utils ומבצעת גלילה של העמוד חזרה למעלה עד לתחילת האלמנט div שיש לו מזהה ייחודי בשם main-container
                        Utils.scrollTop( $('#main-container') )
                        break
                }
            }
        )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס עריכת אלבום
    bindEvents: function () {
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה deleteSongMessage המאפשרת להציג הודעת מחיקה כאשר אנו מעוניינים למחוק שיר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteSongMessage יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם remove-icon), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteSongMessage יתייחס בכל מקרה לאובייקט EditAlbum
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteSongMessage, this ))
        // בעת ביצוע לחיצה על אלמנט button שיש לו מזהה ייחודי בשם edit-album-approve-delete שמצוי בתוך האלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה confirmDeleteSong שבאמצעותה מתאפשר לבצע פעולות עם אישור מחיקת השיר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmDeleteSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם edit-album-approve-delete), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmDeleteSong יתייחס בכל מקרה לאובייקט EditAlbum
        $('.modal-dialog').on('click', '#edit-album-approve-delete', $.proxy( this.confirmDeleteSong, this ))
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם cancel שמצוי בתוך האלמנט שיש לו class בשם modal-dialog נפעיל את הפונקציה cancelDelete שמצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לחזור לעמוד שבו היינו, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם cancelDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם cancel), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה cancelDelete יתייחס בכל מקרה לאובייקט EditAlbum
        $('.modal-dialog').on('click', '.cancel', $.proxy( Utils.cancelDelete, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveChanges יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveChanges יתייחס בכל מקרה לאובייקט EditAlbum
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט EditAlbum
    init: function () {
        // הפרופקטי album_id מפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושמאפשרת לקבל את המספר id של האלבום המצוי ב- URL
        this.album_id = Utils.getAlbumID()

        // נבדוק אם המספר id של האלבום לא קיים
        if ( !this.album_id ) {
            // אז נפעיל את הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה אנו מבצעים הפניה מחדש לנתיב
            Router.redirect()
            return
        }

        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המצויים בטופס עריכת אלבום
        this.bindEvents()
        // הפעלה של הפונקציה setTitleEditAlbum שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        this.setTitleEditAlbum()
        // הפעלה של הפונקציה setTitleEditAlbumPlaylist שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        this.setTitleEditAlbumPlaylist()
        // הפעלה של הפונקציה getAlbum שבאמצעותה מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum()
    }
}

// ייצוא היכולות של האובייקט EditAlbum החוצה
export default EditAlbum