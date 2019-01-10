// האובייקט AlbumTemplates המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM
// הגדרת האובייקט בשם AlbumTemplates כקבוע
const AlbumTemplates = {
    // באמצעות הפונקציה album המקבלת את הפרמטר album, אנו יוצרים תבנית html של האלבום להצגה ב- DOM
    album: function( album ) {
        // המשתנה html מכיל תבנית html של האלבום להצגה ב- DOM
        let html =
            `
            <div class="col-md-3">
                <div class="record" data-album-id="${album.album_id}">
                    <div class="text-center">
                        <h4 class="album-list-name" data-album-id="${album.album_id}">${album.album_name} - ${album.album_artist}</h4>
                    </div>
                    <img src="${album.album_image}" alt="${album.album_name}" class="img-responsive img-circle center-block">
                    <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                        <i class="fa fa-play"></i>
                    </a>
                    <a class="remove-icon" data-album-id="${album.album_id}"> 
                        <i class="fa fa-remove"></i>
                    </a>
                    <a href="#edit-album/${album.album_id}" class="edit-icon" data-album-id="${album.album_id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
            </div>
            `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של האלבום להצגה ב- DOM
        return html
    },

    // באמצעות הפונקציה noAlbums מתאפשר להציג הודעה ב- DOM האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפתור המתאים, כאשר אין אלבומים שמורים במסד הנתונים
    noAlbums: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h2 המציג ב- DOM הודעה האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפור המתאים
        return '<h2 class="col-md-12 text-center">There are no albums!<br/><br/>Click the \'Add New Album\' button</h2>'
    },

    // באמצעות הפונקציה deleteDialog המקבלת את המשתנה album אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת האלבום הרלוונטי
    deleteDialog: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר מחיקת האלבום הרלוונטי
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close cancel" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-justify">Are you sure you want to delete ${album.album_name} by ${album.album_artist}?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-button" class="pull-left cancel" data-dismiss="modal">Cancel</button>
                    <button type="button" id="approve-delete" class="pull-right" data-album-id="${album.album_id}">Yes, I'm sure</button>
                </div>
            </div>
        `
    },

    // באמצעות הפונקציה deleteSuccessDialog המקבלת את המשתנים current_page ו- album_id, אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום נמחק
    deleteSuccessDialog: function ( current_page, album_id ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהאלבום נמחק
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${ current_page }" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album was deleted successfully</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${ current_page }" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    }
}

// ייצוא היכולות של האובייקט AlbumTemplates החוצה
export default AlbumTemplates