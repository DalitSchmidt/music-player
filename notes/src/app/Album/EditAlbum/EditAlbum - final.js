// ייבוא היכולות של jQuery על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של האובייקט AlbumGenres על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumGenres from './AlbumGenres'
// ייבוא היכולות של האובייקט AlbumAPIService על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import AlbumAPIService from './../APIServices/AlbumAPIService'
// ייבוא היכולות של האובייקט EditAlbumTemplates על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import EditAlbumTemplates from '../Templates/EditAlbumTemplates'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Router from '../Router'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט EditAlbum יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט EditAlbum מכיל את כל הפונקציות שבאמצעותן מתאפשר לתקשר אל מול הטופס עריכת אלבום כדי לבצע פעולות שונות בעת ביצוע פעולת העריכה של הנתונים ועדכון האלבום במסד הנתונים
// הגדרה של האובייקט EditAlbum כקבוע
const EditAlbum = {
    // הפרופרטי album_id מכיל כברירת מחדל את הערך null
    album_id: null,

    // באמצעות הפונקציה setTitleEditAlbum מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
    setTitleEditAlbum: function () {
        // המשתנה html מפעיל את הפונקציה titleEditAlbum המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
        let html = EditAlbumTemplates.titleEditAlbum()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-title, ובכך מתאפשר להציג למשתמש ב- DOM את הכותרת של העמוד בו אנו נמצאים
        $('#add-new-album-title').html( html )
    },

    // באמצעות הפונקציה setTitleEditAlbumPlaylist מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    setTitleEditAlbumPlaylist: function () {
        // המשתנה html מפעיל את הפונקציה titleEditAlbumPlaylist המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        let html = EditAlbumTemplates.titleEditAlbumPlaylist()
        // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-title, ובכך מתאפשר להציג למשתמש ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        $('#add-album-playlist-title').html( html )
    },

    // באמצעות הפונקציה setValues (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר להכניס את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
    setValues: function ( album ) {
        // המשתנה inputs מכיל את כל האלמנטים מסוג input ותיבת הטקסט שיש להם attribute מסוג required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה inputs, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- input ומבצעת מספר פעולות
        $.each(inputs, ( index, input ) => {
            // הבאת הערכים של האלבום המצויים באלמנטים מסוג input שיש להם attribute מסוג name והכנסה שלהם לתוך השדות של הטופס עריכת אלבום
            input.value = album [ input.name ]
        })

        // הפעלה של הפונקציה changeCoverImage המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להחליף את התמונה המוצגת בתמונת Cover של האלבום
        AlbumForm.changeCoverImage()
        // הפעלה של הפונקציה addSongsInputs (שמקבלת את הפרופרטי songs המצוי בתוך המשתנה album המכיל את אורך המערך עם השירים המצויים באלבום ואת הפרופרטי songs המצוי בתוך המשתנה album המכיל את המערך עם השירים המצויים באלבום) המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר להוסיף שורות ל- DOM עם השדות להוספת שירים
        AlbumForm.addSongsInputs( album.songs.length, album.songs )

        // כדי לקבל את כל הערכים המצויים במערך של הפרופרטי genres המצוי בתוך המשתנה album, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- genre ומבצעת מספר פעולות
        $.each(album.genres, ( index, genre ) => {
            // הפעלה של הפונקציה addGenreTag (שמקבלת את הפרופרטי genre_name המצוי בתוך המשתנה genre המכיל את שם הז'אנר ואת הפרופרטי genre_id המצוי בתוך המשתנה genre המכיל את המזהה הייחודי של הז'אנר) המצויה תחת האובייקט AlbumGenres ושבאמצעותה מתאפשר להוסיף תג עם שם הז'אנר של האלבום לשדה של הז'אנרים ב- DOM
            AlbumGenres.addGenreTag( genre.genre_name, genre.genre_id )
        })
    },

    // באמצעות הפונקציה getAlbum מתאפשר לקבל אלבום ספציפי לפי המזהה הייחודי שלו
    getAlbum: function () {
        // הפעלה של הפונקציה getAlbumById (שמקבלת את הפרופרטי album_id המכיל את המזהה הייחודי של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לקבל אלבום ספציפי השמור במסד הנתונים לפי המזהה הייחודי שלו, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה album המכיל את כל הפרטים של האלבום ומבצעת מספר פעולות
        AlbumAPIService.getAlbumById( this.album_id ).then(album => {
            // הפעלה של הפונקציה setValues (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) שבאמצעותה מתאפשר להכניס את הערכים הרלוונטיים בשדות של הטופס עריכת אלבום
            this.setValues( album )
        // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) המבצעת מספר פעולות
        }, () => {
            // הפעלה של הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע הפניה מחדש לנתיב
            Router.redirect()

            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        })
    },

    // באמצעות הפונקציה deleteSongMessage (שמקבלת את המשתנה e המסמל event) מתאפשר להציג הודעה מתאימה בדבר המחיקה של השיר הרלוונטי בטרם ביצוע פעולת המחיקה
    deleteSongMessage: function ( e ) {
        // הצהרה על משתנים גלובליים שנבצע בהם שימוש בפונקציה
        let song_id, html

        // המשתנה song_id מכיל את האלמנט הקרוב ביותר שיש לו attribute מסוג data-song-id המכיל את ה- data בשם song-id של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        song_id = $( e.target ).closest('[data-song-id]').data('song-id')

        // המשתנה html מפעיל את הפונקציה deleteSongDialog (שמקבלת את המשתנה song_id המכיל את המזהה הייחודי של השיר) המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעה מתאימה בדבר המחיקה של השיר הרלוונטי בטרם ביצוע פעולת המחיקה
        html = EditAlbumTemplates.deleteSongDialog( song_id )
        // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעה מתאימה בדבר המחיקה של השיר הרלוונטי בטרם ביצוע פעולת המחיקה
        $('.modal-dialog').html( html )

        // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.modalOpen()
    },

    // באמצעות הפונקציה confirmDeleteSong (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע פעולות עם אישור המחיקה של השיר
    confirmDeleteSong: function ( e ) {
        // המשתנה song_id מכיל את ה- attribute מסוג data בשם song-id של האלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let song_id = $( e.target ).data('song-id')

        // הפעלה של הפונקציה fadeOut שבאמצעותה מתאפשר לבצע דהייה איטית של האלמנט שיש לו class בשם modal-dialog ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת מספר פעולות
        $('.modal-dialog').fadeOut('slow', () => {
            // הסרה של האלמנט שיש לו class בשם song-item ושיש לו attribute מסוג data-song-id עם המזהה הייחודי של השיר מה- DOM
            $(`.song-item[data-song-id=${song_id}]`).remove()

            // המשתנה html מפעיל את הפונקציה deleteSongSuccessDialog (שמקבלת את המשתנה song_id המכיל את האלמנט עם המזהה הייחודי של השיר) המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעה המאשרת שהשיר נמחק
            let html = EditAlbumTemplates.deleteSongSuccessDialog( song_id )
            // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog והפעלה של הפונקציה fadeIn שבאמצעותה מתאפשר לבצע הצגה איטית של האלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעה המאשרת שהשיר המבוקש נמחק
            $('.modal-dialog').html( html ).fadeIn('slow')
        })
    },

    // באמצעות הפונקציה setSuccessMessageEditAlbum מתאפשר להציג הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
    setSuccessMessageEditAlbum: function () {
        // המשתנה html מפעיל את הפונקציה successMessageEditAlbum המצויה תחת האובייקט EditAlbumTemplates ושבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
        let html = EditAlbumTemplates.successMessageEditAlbum()
        // הכנסה של המשתנה html לתוך אלמנט שיש לו class בשם modal-dialog, ובכך מתאפשר להציג למשתמש ב- DOM הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
        $('.modal-dialog').html( html )

        // הפעלה של הפונקציה modalOpen המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.modalOpen()
    },

    // באמצעות הפונקציה saveChanges (שמקבלת את המשתנה e המסמל event) מתאפשר לשמור את השינויים שבוצעו בטופס עריכת אלבום ולעדכן את האלבום במסד הנתונים
    saveChanges: function ( e ) {
        // מניעת פעולת ברירת המחדל של ה- event, במקרה זה של ה- event מסוג submit של האלמנט form שיש לו מזהה ייחודי בשם add-new-album
        e.preventDefault()

        // המשתנה album מפעיל את הפונקציה validateAlbum המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי באלמנטים מסוג input לפני יצירה או עריכה של האלבום במסד הנתונים והצגתו ב- DOM
        let album = AlbumForm.validateAlbum()

        // נבדוק אם יש שגיאה במשתנה album, כך שאם יש שגיאה המונעת מאיתנו לבצע שליחה של הטופס ולערוך את האלבום במסד הנתונים ולהציגו ב- DOM, אז נבצע מספר פעולות
        if ( !album )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return

        // המשתנה input$ מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let $input = $( e.target )

        // הסרה של האלמנט שיש לו class בשם error-message המצוי באחים של האלמנט המצוי במשתנה input$ מה- DOM
        $input.siblings('.error-message').remove()
        // הסרה של ה- class בשם error מהאלמנט המצוי במשתנה input$
        $input.removeClass('error')

        // הפעלה של הפונקציה updateAlbum (שמקבלת את הפרופרטי album_id המכיל את המזהה הייחודי של האלבום ואת המשתנה album המכיל את כל הפרטים של האלבום) המצויה תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לעדכן נתונים באלבום השמור במסד הנתונים לפי המזהה הייחודי שלו, ולאחר מכן נפעיל promise המבצע מספר פעולות
        AlbumAPIService.updateAlbum( this.album_id, album ).then(
            // הפעלה של הפונקציה setSuccessMessageEditAlbum שבאמצעותה מתאפשר להציג הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
            this.setSuccessMessageEditAlbum,
            // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) שמקבלת את המשתנה error המכיל את השגיאה שקיבלנו ומבצעת מספר פעולות ככל ויש שגיאה המונעת מאיתנו לערוך את האלבום ולעדכנו במסד הנתונים
            ( error ) => {
                // הפעלה של הפונקציה validateFieldFromDB (שמקבלת את המשתנה error המכיל את הודעת השגיאה שקיבלנו) המצויה תחת האובייקט AlbumForm ושבאמצעותה מתאפשר לבצע בדיקת ולידציה לערך המצוי בשדות הטופס הוספת אלבום חדש או בטופס עריכת אלבום בהתאם לשגיאה המתקבלת ממסד הנתונים
                AlbumForm.validateFieldFromDB( error )
            }
        )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים בטופס עריכת אלבום
    bindEvents: function () {
        // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה deleteSongMessage שבאמצעותה מתאפשר להציג הודעה מתאימה בדבר המחיקה של השיר הרלוונטי בטרם ביצוע פעולת המחיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteSongMessage יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם remove-icon המצוי בתוך אלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteSongMessage יתייחס בכל מקרה לאובייקט EditAlbum
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteSongMessage, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם edit-album-approve-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה confirmDeleteSong שבאמצעותה מתאפשר לבצע פעולות עם אישור המחיקה של השיר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם confirmDeleteSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם edit-album-approve-delete המצוי בתוך אלמנט שיש לו class בשם modal-dialog), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה confirmDeleteSong יתייחס בכל מקרה לאובייקט EditAlbum
        $('.modal-dialog').on('click', '#edit-album-approve-delete', $.proxy( this.confirmDeleteSong, this ))
        // כאשר מתבצעת לחיצה על האלמנט שיש לו class בשם cancel המצוי בתוך אלמנט שיש לו class בשם modal-dialog, נפעיל את הפונקציה cancelDelete המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לחזור לעמוד שבו היינו ולבטל את הפעולה של המחיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם cancelDelete יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם cancel המצוי בתוך אלמנט שיש לו class בשם modal-dialog), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה cancelDelete יתייחס בכל מקרה לאובייקט EditAlbum
        $('.modal-dialog').on('click', '.cancel', $.proxy( Utils.cancelDelete, this ))
        // כאשר מתבצעת לחיצה על האלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button, נפעיל את הפונקציה saveChanges שבאמצעותה מתאפשר לשמור את השינויים שבוצעו בטופס עריכת אלבום ולעדכן את האלבום במסד הנתונים, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם saveChanges יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם finish-and-save-button), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה saveChanges יתייחס בכל מקרה לאובייקט EditAlbum
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט EditAlbum
    init: function () {
        // הפרופרטי album_id מפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של האלבום המצוי ב- URL
        this.album_id = Utils.getAlbumID()

        // נבדוק אם הפרופרטי album_id מכיל את המזהה הייחודי של אלבום לא קיים, אז נבצע מספר פעולות
        if ( !this.album_id ) {
            // הפעלה של הפונקציה redirect המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע הפניה מחדש לנתיב
            Router.redirect()

            // ביצוע חזרה להמשך פעולות הפונקציה
            return
        }

        // הפעלה של הפונקציה setTitleEditAlbum שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        this.setTitleEditAlbum()
        // הפעלה של הפונקציה setTitleEditAlbumPlaylist שבאמצעותה מתאפשר להציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        this.setTitleEditAlbumPlaylist()
        // הפעלה של הפונקציה getAlbum שבאמצעותה מתאפשר לקבל אלבום ספציפי לפי המזהה הייחודי שלו
        this.getAlbum()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים בטופס עריכת אלבום
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט EditAlbum החוצה
export default EditAlbum