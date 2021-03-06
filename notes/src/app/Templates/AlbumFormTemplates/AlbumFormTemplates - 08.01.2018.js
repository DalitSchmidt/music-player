// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumFormTemplates יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט על-מנת שהאובייקט AlbumFormTemplates יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט בשם AlbumFormTemplates המתפקד כ"מעין" מחלקת שירות מכל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM וקשורות לטופס הוספת אלבום חדש
// הגדרת האובייקט AlbumFormTemplates כקבוע
const AlbumFormTemplates = {
    // באמצעות הפונקציה titleAddNewAlbum מתאפשר להציג ב- DOM תבנית html המכילה כותרת של העמוד בו אנו נמצאים
    titleAddNewAlbum: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        return `<h1 class="text-center">Add New Album</h1>`
    },

    // באמצעות הפונקציה titleAddAlbumPlaylist מתאפשר להציג ב- DOM תבנית html המכילה כותרת של החלק בו אנו נמצאים בעמוד
    titleAddAlbumPlaylist: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        return `<h1 class="text-center">Add Album Playlist</h1>`
    },

    // באמצעות הפונקציה titleEditAlbum מתאפשר להציג ב- DOM תבנית html המכילה כותרת של העמוד בו אנו נמצאים
    titleEditAlbum: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        return `<h1 class="text-center">Edit Album</h1>`
    },

    // באמצעות הפונקציה titleEditAlbumPlaylist מתאפשר להציג ב- DOM תבנית html המגילה כותרת של החלק בו אנו נמצאים בעמוד
    titleEditAlbumPlaylist: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        return `<h1 class="text-center">Edit Album Playlist</h1>`
    },

    // באמצעות בפונקציה genreTag המקבלת את המשתנים tagName ו- genre_id המוגדר כברירת מחדל בערך הבוליאני false אנו יוצרים תבנית html המציגה ב- DOM את הז'אנרים של האלבום
    genreTag: function ( tagName, genre_id = false ) {
        return `<span class="tag">
                    ${tagName}<a>×</a>
                    <input name="tags" type="hidden" value="${genre_id ? genre_id : tagName}">
                </span>`
    },

    // באמצעות הפונקציה genreSuggestions המקבלת את המשתנה suggestions אנו יוצרים תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
    genreSuggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר נתונים שיאפשרו להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        let html = '<ul>'

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה suggestions (המכיל מערך עם הנתונים של ההצעות האפשריות לתוצאות החיפוש) ומוציאה ממנו את ה- index והפרטים של הז'אנר הרלוונטי להצעות האפשריות של הז'אנרים הקיימים במסד הנתונים, ולאחר מכן תופעל פונקציית callback (המסומנת כפונקציית חץ) שבה המשתנה html משרשר אליו את האלמנט li שיש בו את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        $.each(suggestions, ( index, genre ) => {
            html += `<li data-genre-id="${genre.genre_id}">${genre.genre_name}</li>`
        })

        // המשתנה html משרשר אליו את האלמנט הסוגר של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        return html
    },

    // באמצעות הפונקציה songItem המקבלת את המשתנה song המוגדר כברירת מחדל עם הערך הבוליאני false, אנו יוצרים תבנית html של השדות להוספת שיר לאלבום
    songItem: function ( song = false ) {
        // המשתנה html מכיל תבנית html של השדות להוספת שיר לאלבום
        let html = `
            <div class="col-md-12 song-item">
                <div class="form-group song">
                    <label class="youtube-url-label control-label">YouTube ID:</label>
                    <input type="text" class="song-youtube form-control" name="song_youtube" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${ song ? song.song_youtube : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="song-name-label control-label">Song Name:</label>
                    <input type="text" class="song-name form-control" name="song_name" placeholder="The Power of Equality" title="Song Name" value="${ song ? song.song_name : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="song-time-label control-label">Song Time:</label>
                    <span class="song-time form-control">${ song ? Utils.calculateTime( song.song_time ) : '' }</span>
                    <input type="hidden" name="song_time" title="Song Time" required value="${ song ? song.song_time : '' }">
                </div>
                <a href="#" class="remove-icon" data-album-id="">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של השדות להוספת שיר לאלבום
        return html
    },

    // באמצעות הפונקציה errorMessage המקבלת את המשתנה errorMessage אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
    errorMessage: function ( errorMessage ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הודעת השגיאה הרלוונטית
        return `<div class="error-message">
                    <span class="error exclamation-triangle">
                        <strong>
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            ${errorMessage}
                        </strong>
                    </span>
                </div>
                `
    },

    // באמצעות הפונקציה successMessage המקבלת את המשתנים current_page ו- album_id אנו יוצרים תבנית html המציגה ב- DOM הודעת הצלחה עם יצירת האלבום
    successMessage: function ( current_page, album_id ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הודעת ההצלחה עם יצירת האלבום
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album was created successfully</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },

    // באמצעות הפונקציה deleteDialogSong המקבלת את המשתנה album אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת השיר מהאלבום הרלוונטי
    deleteDialogSong: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר מחיקת השיר מהאלבום הרלוונטי
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close cancel" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-justify">Are you sure you want to delete the song ${album.song_name} by ${album.album_artist}?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-button" class="pull-left cancel" data-dismiss="modal">Cancel</button>
                    <button type="button" id="approve-delete" class="pull-right" data-album-id="${album.album_id}">Yes, I'm sure</button>
                </div>
            </div>
        `
    },

    // באמצעות הפונקציה deleteSuccessDialogSong המקבלת את המשתנים current_page ו- album_id אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהשיר נמחק מהאלבום
    deleteSuccessDialogSong: function ( current_page, album_id ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהשיר נמחק מהאלבום
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The song was deleted successfully</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${ current_page }" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },

    // באמצעות הפונקציה successMessageEditAlbum המקבלת את המשתנים current_page ו- album_id אנו יוצרים תבנית html המציגה ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום
    successMessageEditAlbum: function ( current_page, album_id ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album has been updated</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },
}

// ייצוא היכולות של האובייקט AlbumFormTemplates החוצה
export default AlbumFormTemplates