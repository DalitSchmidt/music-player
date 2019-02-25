// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumFormTemplates יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט AlbumFormTemplates יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט בשם AlbumFormTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר להציג מידע ב- DOM וקשורות לטופס הוספת אלבום חדש
// הגדרה של האובייקט AlbumFormTemplates כקבוע
const AlbumFormTemplates = {
    // באמצעות הפונקציה titleAddNewAlbum מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
    titleAddNewAlbum: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        return `<h1>Add New Album</h1>`
    },

    // באמצעות הפונקציה titleAddAlbumPlaylist מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    titleAddAlbumPlaylist: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        return `<h1>Add Album Playlist</h1>`
    },

    // באמצעות הפונקציה artistSuggestions (שמקבלת את המשתנה suggestions המכיל את ההצעות האפשריות של תוצאות החיפוש) מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
    artistSuggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר אלמנטים המאפשרים להציג ב- DOM את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
        let html = '<ul>'

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה suggestions, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- artist ומבצעת מספר פעולות
        $.each(suggestions, ( index, artist ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
            html += `
                     <li title="${artist}">${artist}</li>
                    `
        })

        // המשתנה html משרשר אליו את האלמנט הסוגר של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את ההצעות האפשריות של שמות האמנים השמורים במסד הנתונים
        return html
    },

    // באמצעות הפונקציה noSuggestions מתאפשר ליצור תבנית html המציגה בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
    noSuggestions: function () {
        // הפונקציה מחזירה אלמנט ul שבתוכו מצוי אלמנט li המכיל טקסט האומר ש"אין הצעות", ובכך מתאפשר להציג בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
        return `
                <ul>
                    <li title="No Suggestions">No Suggestions</li>
                </ul>
               `
    },

    // באמצעות הפונקציה genreTag (שמקבלת את המשתנה tagName המכיל את שם הז'אנר ואת המשתנה genreId המכיל כברירת מחדל את הערך הבוליאני false) מתאפשר ליצור תבנית html המציגה ב- DOM את הז'אנרים של האלבום
    genreTag: function ( tagName, genreId = false ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את הז'אנרים של האלבום
        return `
                <span class="tag" title="${Utils.capitalize( tagName )}">${Utils.capitalize( tagName )}
                    <a title="Remove Tag">
                        <i class="fa fa-remove" aria-hidden="true"></i>
                    </a>
                    <input type="hidden" name="genres_tags" value="${genreId ? genreId : Utils.capitalize( tagName )}">
                </span>
               `
    },

    // באמצעות הפונקציה genreSuggestions (שמקבלת את המשתנה suggestions המכיל את ההצעות האפשריות של תוצאות החיפוש) מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
    genreSuggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר אלמנטים המאפשרים להציג ב- DOM את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
        let html = '<ul>'

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה suggestions, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- genre ומבצעת מספר פעולות
        $.each(suggestions, ( index, genre ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
            html += `
                     <li title="${genre.genre_name}" data-genre-id="${genre.genre_id}">${genre.genre_name}</li>
                    `
        })

        // המשתנה html משרשר אליו את האלמנט הסוגר של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את ההצעות האפשריות של הז'אנרים השמורים במסד הנתונים
        return html
    },

    // באמצעות הפונקציה songItem (שמקבלת את המשתנה song המכיל כברירת מחדל את הערך הבוליאני false) מתאפשר ליצור תבנית html המציגה ב- DOM את השדות להוספת שיר
    songItem: function ( song = false ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את השדות להוספת שיר
        return `
                <div class="col-md-12 song-item" data-song-id="${song.song_id}">
                    <div class="form-group song">
                        <label class="control-label youtube-id-label">YouTube ID:</label>
                        <input type="text" name="song_youtube" class="form-control youtube-id" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${song ? song.song_youtube : ''}" required>
                    </div>
                    <div class="form-group song">
                        <label class="control-label song-name-label">Song Name:</label>
                        <input type="text" name="song_name" class="form-control song-name" placeholder="The Power of Equality" title="Song Name" value="${song ? song.song_name : ''}" required>
                    </div>
                    <div class="form-group song">
                        <label class="control-label song-time-label">Song Time:</label>
                        <span class="form-control song-time" title="Song Time">${song ? Utils.calculateTime( song.song_time ) : ''}</span>
                        <input type="hidden" name="song_time" value="${song ? song.song_time : ''}" required>
                    </div>
                    <a class="remove-icon" title="Remove Song" data-song-id="${song.song_id}">
                        <i class="fa fa-remove" aria-hidden="true"></i>
                    </a>
                </div>
               `
    },

    // באמצעות הפונקציה errorMessage (שמקבלת את המשתנה errorMessage המכיל את הודעת השגיאה) מתאפשר ליצור תבנית html המציגה ב- DOM את הודעת השגיאה
    errorMessage: function ( errorMessage ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את הודעת השגיאה
        return `
                <div class="error-message">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    ${errorMessage}
                </div>
               `
    },

    // באמצעות הפונקציה successMessage מתאפשר ליצור תבנית html המציגה ב- DOM הודעת הצלחה עם היצירה של האלבום במסד הנתונים
    successMessage: function () {
        // המשתנה albumName מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-name
        let albumName = $('#album-name').val()
        // המשתנה albumArtist מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist
        let albumArtist = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעת הצלחה עם היצירה של האלבום במסד הנתונים
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#all-albums" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true" data-action="handle-delete"></i>
                        </a>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The album ${albumName} by ${albumArtist} was created successfully</h4>
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