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
                    <a href="#" class="remove-icon" data-album-id="${album.album_id}">
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
    }
}

// ייצוא היכולות של האובייקט AlbumTemplates החוצה
export default AlbumTemplates