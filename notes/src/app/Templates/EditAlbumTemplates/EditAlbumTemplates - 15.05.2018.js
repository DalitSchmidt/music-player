// ייבוא היכולות של jQuery על-מנת שהאובייקט EditAlbumTemplates יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט בשם EditAlbumTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM וקשורות לטופס עריכת אלבום
// הגדרת האובייקט EditAlbumTemplates כקבוע
const EditAlbumTemplates = {
    // באמצעות הפונקציה titleEditAlbum מתאפשר להציג ב- DOM תבנית html המכילה כותרת של העמוד בו אנו נמצאים
    titleEditAlbum: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        return `<h1>Edit Album</h1>`
    },

    // באמצעות הפונקציה titleEditAlbumPlaylist מתאפשר להציג ב- DOM תבנית html המכילה כותרת של החלק בו אנו נמצאים בעמוד
    titleEditAlbumPlaylist: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        return `<h1>Edit Album Playlist</h1>`
    },

    // באמצעות הפונקציה deleteSongDialog המקבלת את המשתנה songId אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת השיר מהאלבום הרלוונטי
    deleteSongDialog: function ( songId ) {
        // המשתנה songName מכיל את המספר id של השיר הקרוב ביותר לאלמנט שיש לו class בשם song-item ובתוכו מצוי אלמנט שיש לו class בשם song-name והוא מביא את הערך המצוי באלמנט זה, כך שלמעשה הוא מכיל את השם של השיר המצוי בתיבת input הקרובה ביותר לכפתור המחיקה שנלחץ
        let songName = $(`[data-song-id=${songId}]`).closest('.song-item').find('.song-name').val()
        // המשתנה albumArtist מכיל את הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם album-artist
        let albumArtist = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר מחיקת השיר מהאלבום הרלוונטי
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close cancel" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-justify">Are you sure you want to delete the song ${songName} by ${albumArtist}?</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="edit-album-cancel-button" class="cancel" title="Cancel">Cancel</button>
                        <button type="button" id="edit-album-approve-delete" title="Yes, I'm sure">Yes, I'm sure</button>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה deleteSongSuccessDialog אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהשיר נמחק
    deleteSongSuccessDialog: function () {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהשיר נמחק
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close cancel" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The song was deleted successfully</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="edit-album-close-button" class="cancel" title="Close">Close</button>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה successMessageEditAlbum אנו יוצרים תבנית html המציגה ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום
    successMessageEditAlbum: function () {
        // המשתנה albumId מכיל את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים למערך לאחר שאנו מורידים ממנו את הסימן '/', כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        let albumId = location.hash.substring(1).split('/')[1]
        // המשתנה albumName מכיל את הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם album-name
        let albumName = $('#album-name').val()
        // המשתנה albumArtist מכיל את הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם album-artist
        let albumArtist = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעת הצלחה עם עדכון הנתונים של האלבום
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#single-album/${albumId}" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true" data-action="handle-delete"></i>
                        </a>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The album ${albumName} by ${albumArtist} was updated successfully</h4>
                    </div>
                    <div class="modal-footer">
                        <a href="#single-album/${albumId}" id="close-button" title="Close" data-action="handle-delete">Close</a>
                    </div>
                </div>
               `
    }
}

// ייצוא היכולות של האובייקט EditAlbumTemplates החוצה
export default EditAlbumTemplates