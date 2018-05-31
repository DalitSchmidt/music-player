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
        // המשתנה inputs מכיל באמצעות jQuery את כל ה- inputים ואת תיבת הטקסט שיש לו מזהה ייחודי בשם album-description ושיש להם את ה- attribute בשם required המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם add-new-album-form
        let inputs = $('#add-new-album-form input[required], #add-new-album-form #album-description[required]')

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

        // הפעלה של הפונקציה openModal המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.openModal()
    },

    // באמצעות הפונקציה confirmDeleteSong המקבלת את המשתנה e (המסמל event) מתאפשר לבצע פעולות עם אישור מחיקת השיר
    confirmDeleteSong: function ( e ) {
        // המשתנה song_id מכיל את האלמנט הקרוב ביותר שמכיל את ה- data בשם song-id, כך שלמעשה המשתנה song_id מכיל את האלמנט הקרוב ביותר עם המספר id של השיר
        let song_id = $( e.target ).data('song-id')

        // האלמנט שיש לו class בשם modal-dialog מבצע fadeOut (דהייה איטית של האלמנט שנלחץ) ומפעיל פונקציית callback (המסומנת כפונקציית חץ)
        $('.modal-dialog').fadeOut('slow', () => {
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

        // הפעלה של הפונקציה openModal המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לפתוח את המודל ולהציגו ב- DOM
        Utils.openModal()
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

        // הפעלה של הפונקציה updateAlbum המקבלת את המשתנה this.album_id המכיל את המספר id של האלבום ואת המשתנה album המכיל את הפרטים של האלבום שמצוי תחת האובייקט AlbumAPIService ושבאמצעותה מתאפשר לעדכן נתונים באלבום לפי המספר id שלו, ולאחר מכן נפעיל promise המפעיל את הפונקציה setSuccessMessageEditAlbum המציגה הודעת הצלחה עם עדכון הנתונים של האלבום
        AlbumAPIService.updateAlbum( this.album_id, album ).then( this.setSuccessMessageEditAlbum )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המצויים בטופס עריכת אלבום
    bindEvents: function () {
        // בעת ביצוע לחיצה על האלמנט שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form, נפעיל את הפונקציה deleteSongMessage המאפשרת להציג הודעת מחיקה כאשר אנו מעוניינים למחוק שיר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם deleteSongMessage יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם remove-icon), לכן נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה deleteSongMessage יתייחס בכל מקרה לאובייקט EditAlbum
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteSongMessage, this ))
        // כאשר לוחצים על הכתפור שיש לו class בשם remove-icon שמצוי בתוך האלמנט div שיש לו מזהה ייחודי בשם add-album-playlist-form נפעיל את הפונקציה debounce שמצויה תחת האובייקט Utils שבאמצעותה אנו מבצעים השהיה של הפעלת הפונקציה שאנו מעוניינים להפעיל, במקרה זה מדובר בפונקציה removeSongItem המצויה תחת האובייקט AlbumForm שמאפשרת למחוק שורה המכילה את השדות להוספת שיר לאלבום ונשהה את הפעולה שלה למשך 5 שניות, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם removeSongItem יתייחס לאלמנט עצמו (במקרה זה לכתפור שיש לו class בשם remove-icon) נשתמש ב- proxy, כדי שההקשר של this יתייחס בכל מקרה לאובייקט EditAlbum
        // $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy( Utils.debounce( AlbumForm.removeSongItem, this ), 5000) )
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