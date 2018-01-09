import $ from 'jquery'
import Utils from '../Utils'

const AlbumFormTemplates = {
    titleAddNewAlbum: function () {
        return `<h1 class="text-center">Add New Album</h1>`
    },

    titleAddAlbumPlaylist: function () {
        return `<h1 class="text-center">Add Album Playlist</h1>`
    },

    titleEditAlbum: function () {
        return `<h1 class="text-center">Edit Album</h1>`
    },

    titleEditAlbumPlaylist: function () {
        return `<h1 class="text-center">Edit Album Playlist</h1>`
    },

    genreTag: function ( tagName, genre_id = false ) {
        return `<span class="tag">
                    ${tagName}<a>×</a>
                    <input name="tags" type="hidden" value="${genre_id ? genre_id : tagName}">
                </span>`
    },

    genreSuggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, genre ) => {
            html += `<li data-genre-id="${genre.genre_id}">${genre.genre_name}</li>`
        })

        html += '</ul>'

        return html
    },

    songItem: function ( song = false ) {
        let html = `
            <div class="col-md-12 song-item">
                <div class="form-group song">
                    <label class="youtube-url-label control-label">YouTube ID:</label>
                    <input type="text" class="song-youtube form-control" name="song_youtube" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${ song ? song.song_youtube : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="song-name-label control-label">Song Name:</label>
                    <input type="text" class="song-name form-control" name="song_name" placeholder="The Power of Equality" title="Song Name" value="${ song ? song.song_name : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="song-time-label control-label">Song Time:</label>
                    <span class="song-time form-control">${ song ? Utils.calculateTime( song.song_time ) : '' }</span>
                    <input type="hidden" name="song_time" title="Song Time" required value="${ song ? song.song_time : '' }">
                </div>
                <a href="#" class="remove-icon" data-album-id="">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        `

        return html
    },

    errorMessage: function ( errorMessage ) {
        return `<div class="error-message">
                    <span class="error exclamation-triangle">
                        <strong>
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            ${errorMessage}
                        </strong>
                    </span>
                </div>
                `
    },

    successMessage: function ( current_page, album_id ) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album was created successfully</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },

    deleteDialogSong: function ( album ) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close cancel" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-justify">Are you sure you want to delete the song ${album.song_name} by ${album.album_artist}?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-button" class="pull-left cancel" data-dismiss="modal">Cancel</button>
                    <button type="button" id="approve-delete" class="pull-right" data-album-id="${album.album_id}">Yes, I'm sure</button>
                </div>
            </div>
        `
    },

    deleteSuccessDialogSong: function ( current_page, album_id ) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The song was deleted successfully</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${ current_page }" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },

    successMessageEditAlbum: function ( current_page, album_id ) {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album has been updated</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close-button" class="pull-right" data-action="handle-delete" data-page="${current_page}" data-album-id="${album_id}">Close</button>
                </div>
            </div>
        `
    },
}

export default AlbumFormTemplates