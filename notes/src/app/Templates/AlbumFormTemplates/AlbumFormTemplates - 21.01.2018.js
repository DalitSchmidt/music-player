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

    // באמצעות הפונקציה genreTag המקבלת את המשתנים tagName ו- genre_id המוגדר כברירת מחדל בערך הבוליאני false אנו יוצרים תבנית html המציגה ב- DOM את הז'אנרים של האלבום
    genreTag: function ( tagName, genreId = false ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הז'אנרים של האלבום
        return `<span class="tag" title="${tagName}">
                    ${tagName}<a>×</a>
                    <input type="hidden" name="genres_tags" value="${genreId ? genreId : tagName}">
                </span>`
    },

    // באמצעות הפונקציה genreSuggestions המקבלת את המשתנה suggestions אנו יוצרים תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
    genreSuggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר נתונים שיאפשרו להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        let html = '<ul>'

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה suggestions (המכיל מערך עם הנתונים של ההצעות האפשריות לתוצאות החיפוש) ומוציאה ממנו את ה- index והפרטים של הז'אנר הרלוונטי להצעות האפשריות של הז'אנרים הקיימים במסד הנתונים, ולאחר מכן תופעל פונקציית callback (המסומנת כפונקציית חץ) שבה המשתנה html משרשר אליו את האלמנט li שיש בו את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        $.each(suggestions, ( index, genre ) => {
            html += `<li data-genre-id="${genre.genre_id}" title="${genre.genre_name}">${genre.genre_name}</li>`
        })

        // המשתנה html משרשר אליו את האלמנט הסוגר של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות של הז'אנרים הקיימים במסד הנתונים
        return html
    },

    // באמצעות הפונקציה songItem המקבלת את המשתנה song המוגדר כברירת מחדל עם הערך הבוליאני false, אנו יוצרים תבנית html של השדות להוספת שיר לאלבום
    songItem: function ( song = false ) {
        // הפונקציה מחזירה תבנית html של השדות להוספת שיר לאלבום
        return `
            <div class="col-md-12 song-item">
                <div class="form-group song">
                    <label class="control-label youtube-id-label">YouTube ID:</label>
                    <input type="text" name="song_youtube" class="form-control youtube-id" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${ song ? song.song_youtube : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="control-label song-name-label">Song Name:</label>
                    <input type="text" name="song_name" class="form-control song-name" placeholder="The Power of Equality" title="Song Name" value="${ song ? song.song_name : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="control-label song-time-label">Song Time:</label>
                    <span class="form-control song-time" title="Song Time">${ song ? Utils.calculateTime( song.song_time ) : '' }</span>
                    <input type="hidden" name="song_time" value="${ song ? song.song_time : '' }" required>
                </div>
                <a href="#" class="remove-icon" title="Remove Song" data-song-id="${song.song_id}">
                    <i class="fa fa-remove" aria-hidden="true"></i>
                </a>
            </div>
        `
    },

    // באמצעות הפונקציה errorMessage המקבלת את המשתנה errorMessage אנו יוצרים תבנית html המציגה ב- DOM את הודעת השגיאה
    errorMessage: function ( errorMessage ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הודעת השגיאה הרלוונטית
        return `<div class="error-message">
                    <span class="exclamation-triangle">
                        <strong>
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            ${errorMessage}
                        </strong>
                    </span>
                </div>
                `
    },

    // באמצעות הפונקציה successMessage המקבלת את המשתנים current_page ו- album_id אנו יוצרים תבנית html המציגה ב- DOM הודעת הצלחה עם יצירת האלבום
    successMessage: function () {
        // המשתנה albumName מכיל את הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם album-name
        let albumName = $('#album-name').val()
        // המשתנה artistName מכיל את הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם album-artist
        let artistName = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את הודעת ההצלחה עם יצירת האלבום
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <a href="#all-albums" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                        <span aria-hidden="true" data-action="handle-delete">×</span>
                    </a>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album ${albumName} by ${artistName} was created successfully</h4>
                </div>
                <div class="modal-footer">
                    <a href="#all-albums" id="close-button" title="Close" data-action="handle-delete">Close</a>
                </div>
            </div>
        `
    }
}

// ייצוא היכולות של האובייקט AlbumFormTemplates החוצה
export default AlbumFormTemplates