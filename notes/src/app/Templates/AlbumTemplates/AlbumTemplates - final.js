const AlbumTemplates = {
    album: function ( album ) {
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

    appendAlbums: function ( albums ) {
        let html = ''

        for ( let i = 0; i < albums.length; i++ )
            html += this.album( albums[ i ] )

        return html
    },

    noAlbums: function () {
        return `<h2 class="col-md-12">There are no albums!<br/>Click the 'Add New Album' button</h2>`
    },

    deleteDialog: function ( album ) {
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

    deleteSuccessDialog: function ( currentPage, albumId ) {
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

export default AlbumTemplates