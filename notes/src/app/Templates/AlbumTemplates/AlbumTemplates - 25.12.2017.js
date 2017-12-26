const AlbumTemplates = {
    album: function( album ) {
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
                    <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum" data-album-id="${album.album_id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
            </div>
            `

        return html
    },

    noAlbums: function () {
        return '<h2 class="col-md-12 text-center">There are no albums!<br/>Click the \'Add New Album\' button</h2>'
    },

    deleteDialog: function ( album ) {
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

    deleteSuccessDialog: function ( current_page, album_id ) {
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

export default AlbumTemplates