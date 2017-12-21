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
                    <a class="remove-icon" data-album-id="${album.album_id}" data-toggle="modal" data-target="#modal"> 
                        <i class="fa fa-remove"></i>
                    </a>
                    <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum" data-album-id="${album.album_id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
            </div>
            `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של האלבום להצגה ב- DOM
        return html
    },

    // באמצעות הפונקציה deleteDialog המקבלת את המשתנה album אנו יוצרים תבנית html המציגה ב- DOM הודעה מתאימה בדבר מחיקת האלבום הרלוונטי
    deleteDialog: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר מחיקת האלבום הרלוונטי
        return `
            <div class="modal-content">
                <div class="modal-body">
                    Are you sure you want to delete ${album.album_name} by ${album.album_artist}
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="approve-delete" class="btn btn-primary" data-album-id="${album.album_id}">Approval</button>
            </div>
        </div>`
    },

    // באמצעות הפונקציה deleteSuccessDialog אנו יוצרים תבנית html המציגה ב- DOM הודעה המאשרת שהאלבום נמחק
    deleteSuccessDialog: function () {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהאלבום נמחק
        return `
            <div class="modal-content">
                <div class="modal-body">
                    The album was deleted successfully
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
        </div>`
    }
}

// ייצוא היכולות של האובייקט AlbumTemplates החוצה
export default AlbumTemplates