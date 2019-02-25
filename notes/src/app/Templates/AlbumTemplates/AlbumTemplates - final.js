// האובייקט AlbumTemplates המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר להציג מידע ב- DOM וקשורות לתצוגה של האלבומים
// הגדרה של האובייקט AlbumTemplates כקבוע
const AlbumTemplates = {
    // באמצעות הפונקציה album (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את האלבום
    album: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את האלבום
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

    // באמצעות הפונקציה appendAlbums (שמקבלת את המשתנה albums המכיל את כל הפרטים של האלבומים) מתאפשר להכניס ל- DOM את התבנית html של האלבומים
    appendAlbums: function ( albums ) {
        // המשתנה html מכיל ערך ריק על-מנת שנוכל לשרשר אותו ולהוסיף אלמנטים ל- DOM
        let html = ''

        // כדי לקבל את כל הערכים המצויים במשתנה albums, נעבור עליהם באמצעות לולאת for כדי שניתן יהיה להציג את כל האלבומים ב- DOM
        for ( let i = 0; i < albums.length; i++ )
            // המשתנה html משרשר אליו את הפונקציה album שבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את האלבום בהתאם למיקום של המשתנה albums המתקבל מהלולאה
            html += this.album( albums[ i ] )

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את האלבום
        return html
    },

    // באמצעות הפונקציה noAlbums מתאפשר ליצור תבנית html המציגה ב- DOM הודעה האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפתור המתאים כאשר אין אלבומים שמורים במסד הנתונים
    noAlbums: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h2 המציג ב- DOM הודעה האומרת שאין אלבומים ולהוספת אלבום חדש יש ללחוץ על הכפתור המתאים
        return `<h2 class="col-md-12">There are no albums!<br/>Click the 'Add New Album' button</h2>`
    },

    // באמצעות הפונקציה deleteDialog (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
    deleteDialog: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעה מתאימה בדבר המחיקה של האלבום הרלוונטי בטרם ביצוע פעולת המחיקה
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close cancel" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-justify">Are you sure you want to delete the album ${album.album_name} by ${album.album_artist}?</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="cancel-button" class="cancel" title="Cancel">Cancel</button>
                        <button type="button" id="approve-delete" title="Yes, I'm sure" data-album-id="${album.album_id}">Yes, I'm sure</button>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה deleteSuccessDialog (שמקבלת את המשתנה currentPage המכיל את כל הפרטים של העמוד בו אנו נמצאים ואת המשתנה albumId המכיל את המזהה הייחודי של האלבום) מתאפשר ליצור תבנית html המציגה ב-DOM הודעה המאשרת שהאלבום נמחק
    deleteSuccessDialog: function ( currentPage, albumId ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM הודעה המאשרת שהאלבום נמחק
        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true" data-action="handle-delete" data-album-id="${albumId}" data-page="${currentPage}"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The album was deleted successfully</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-button" title="Close" data-action="handle-delete" data-album-id="${albumId}" data-page="${currentPage}">Close</button>
                    </div>
                </div>
               `
    }
}

// ייצוא היכולות של האובייקט AlbumTemplates החוצה
export default AlbumTemplates