// ייבוא היכולות של jQuery על-מנת שהאובייקט EditAlbumTemplates יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט EditAlbumTemplates יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט בשם EditAlbumTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר להציג מידע ב- DOM וקשורות לטופס עריכת אלבום
// הגדרה של האובייקט EditAlbumTemplates כקבוע
const EditAlbumTemplates = {
    // באמצעות הפונקציה titleEditAlbum מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של העמוד בו אנו נמצאים
    titleEditAlbum: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של העמוד בו אנו נמצאים
        return `<h1>Edit Album</h1>`
    },

    // באמצעות הפונקציה titleEditAlbumPlaylist מתאפשר ליצור תבנית html המציגה ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
    titleEditAlbumPlaylist: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את הכותרת של החלק בו אנו נמצאים בעמוד
        return `<h1>Edit Album Playlist</h1>`
    },

    // באמצעות הפונקציה deleteSongDialog (שמקבלת את המשתנה songId המכיל את המזהה הייחודי של השיר) מתאפשר ליצור תבנית html המציגה ב- DOM הודעה מתאימה בדבר המחיקה של השיר הרלוונטי בטרם ביצוע פעולת המחיקה
    deleteSongDialog: function ( songId ) {
        // המשתנה songName מכיל את הערך המצוי באלמנט שיש לו class בשם song-name הקרוב ביותר לאלמנט שיש לו class בשם song-item המצוי באלמנט שיש לו attribute מסוג data-song-id המכיל את ה- data בשם song-id, ולמעשה המשתנה songName מכיל את שם השיר המצוי באלמנט מסוג input הקרוב ביותר לכפתור המחיקה שנלחץ
        let songName = $(`[data-song-id=${songId}]`).closest('.song-item').find('.song-name').val()
        // המשתנה albumArtist מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist
        let albumArtist = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר המחיקה של השיר  הרלוונטי בטרם ביצוע פעולת המחיקה
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
                        <button type="button" id="edit-album-approve-delete" title="Yes, I'm sure" data-song-id="${songId}">Yes, I'm sure</button>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה deleteSongSuccessDialog מתאפשר ליצור תבנית html המציגה ב- DOM הודעה המאשרת שהשיר נמחק
    deleteSongSuccessDialog: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהשיר נמחק
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

    // באמצעות הפונקציה successMessageEditAlbum מתאפשר ליצור תבנית html המציגה ב- DOM הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
    successMessageEditAlbum: function () {
        // המשתנה albumId מפעיל את הפונקציה getAlbumID המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לקבל את המזהה הייחודי של האלבום המצוי ב- URL
        let albumId = Utils.getAlbumID()
        // המשתנה albumName מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-name
        let albumName = $('#album-name').val()
        // המשתנה albumArtist מכיל את הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם album-artist
        let albumArtist = $('#album-artist').val()

        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעת הצלחה עם עריכת הנתונים ועדכון האלבום במסד הנתונים
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