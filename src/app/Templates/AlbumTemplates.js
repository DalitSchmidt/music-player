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
                    <a class="remove-icon" data-album-id="${album.album_id}" data-toggle="modal" data-target="#modal"> 
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

    deleteDialog: function ( album ) {
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

    deleteSuccessDialog: function () {
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

export default AlbumTemplates