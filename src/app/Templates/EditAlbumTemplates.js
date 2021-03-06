import $ from 'jquery'
import Utils from '../Utils'

const EditAlbumTemplates = {
    titleEditAlbum: function () {
        return `<h1>Edit Album</h1>`
    },

    titleEditAlbumPlaylist: function () {
        return `<h1>Edit Album Playlist</h1>`
    },

    deleteSongDialog: function ( songId ) {
        let songName = $(`[data-song-id=${songId}]`).closest('.song-item').find('.song-name').val()
        let albumArtist = $('#album-artist').val()

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

    deleteSongSuccessDialog: function () {
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

    successMessageEditAlbum: function () {
        let albumId = Utils.getAlbumID()
        let albumName = $('#album-name').val()
        let albumArtist = $('#album-artist').val()

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

export default EditAlbumTemplates