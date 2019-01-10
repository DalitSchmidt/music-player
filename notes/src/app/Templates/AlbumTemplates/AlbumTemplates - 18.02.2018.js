// האובייקט AlbumTemplates המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM
// הגדרת האובייקט בשם AlbumTemplates כקבוע
const AlbumTemplates = {
    // באמצעות הפונקציה album המקבלת את המשתנה album, אנו יוצרים תבנית html של האלבום להצגה ב- DOM
    album: function ( album ) {
        // הפונקציה מחזירה תבנית html של האלבום להצגה ב- DOM
        return `
                <div class="col-md-3">
                    <div class="record" data-album-id="${album.album_id}">
                        <div>
                            <h4 data-album-id="${album.album_id}">${album.album_name} - ${album.album_artist}</h4>
                        </div>
                        <img src="${album.album_image}" alt="${album.album_name}">
                        <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                            <i class="fa fa-play" title="Play" aria-hidden="true"></i>
                        </a>
                        <a class="remove-icon" title="Remove Album" data-album-id="${album.album_id}">
                            <i class="fa fa-remove" aria-hidden="true"></i>
                        </a>
                        <a href="#edit-album/${album.album_id}" class="edit-icon" title="Edit Album" data-album-id="${album.album_id}">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה noAlbums מתאפשר להציג הודעה ב- DOM האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפתור המתאים, כאשר אין אלבומים שמורים במסד הנתונים
    noAlbums: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h2 המציג ב- DOM הודעה האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפור המתאים
        return `<h2 class="col-md-12">There are no albums!<br/>Click the 'Add New Album' button</h2>`
    },

    // באמצעות הפונקציה removeDialog המקבלת את המשתנה album אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר הסרת האלבום הרלוונטי
    removeDialog: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר הסרת האלבום הרלוונטי
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close cancel" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-justify">Are you sure you want to remove the album ${album.album_name} by ${album.album_artist}?</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cancel-button" class="cancel" title="Cancel">Cancel</button>
                        <button type="button" id="approve-remove" title="Yes, I'm sure" data-album-id="${album.album_id}">Yes, I'm sure</button>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה removeSuccessDialog המקבלת את המשתנים currentPage ו- albumId, אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום הוסר
    removeSuccessDialog: function ( currentPage, albumId ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהאלבום הוסר
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true" data-action="handle-remove" data-album-id="${albumId}" data-page="${currentPage}"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The album was successfully removed</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-button" title="Close" data-action="handle-remove" data-album-id="${albumId}" data-page="${currentPage}">Close</button>
                    </div>
                </div>
               `
    }
}

// ייצוא היכולות של האובייקט AlbumTemplates החוצה
export default AlbumTemplates