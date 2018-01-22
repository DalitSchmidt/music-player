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

    genreTag: function ( tagName, genreId = false ) {
        return `<span class="tag" title="${tagName}">
                    ${tagName}<a>×</a>
                    <input type="hidden" name="genres_tags" value="${genreId ? genreId : tagName}">
                </span>`
    },

    genreSuggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, genre ) => {
            html += `<li data-genre-id="${genre.genre_id}" title="${genre.genre_name}">${genre.genre_name}</li>`
        })

        html += '</ul>'

        return html
    },

    songItem: function ( song = false ) {
        return `
            <div class="col-md-12 song-item">
                <div class="form-group song">
                    <label class="control-label youtube-id-label">YouTube ID:</label>
                    <input type="text" name="song_youtube" class="form-control youtube-id" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${ song ? song.song_youtube : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="control-label song-name-label">Song Name:</label>
                    <input type="text" name="song_name" class="form-control song-name" placeholder="The Power of Equality" title="Song Name" value="${ song ? song.song_name : '' }" required>
                </div>
                <div class="form-group song">
                    <label class="control-label song-time-label">Song Time:</label>
                    <span class="form-control song-time" title="Song Time">${ song ? Utils.calculateTime( song.song_time ) : '' }</span>
                    <input type="hidden" name="song_time" value="${ song ? song.song_time : '' }" required>
                </div>
                <a href="#" class="remove-icon" title="Remove Song" data-song-id="${song.song_id}">
                    <i class="fa fa-remove" aria-hidden="true"></i>
                </a>
            </div>
        `
    },

    errorMessage: function ( errorMessage ) {
        return `<div class="error-message">
                    <span class="exclamation-triangle">
                        <strong>
                            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            ${errorMessage}
                        </strong>
                    </span>
                </div>
                `
    },

    successMessage: function () {
        let albumName = $('#album-name').val()
        let artistName = $('#album-artist').val()

        return `
            <div class="modal-content">
                <div class="modal-header">
                    <a href="#all-albums" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                        <span aria-hidden="true" data-action="handle-delete">×</span>
                    </a>
                </div>
                <div class="modal-body">
                    <h4 class="text-center">The album ${albumName} by ${artistName} was created successfully</h4>
                </div>
                <div class="modal-footer">
                    <a href="#all-albums" id="close-button" title="Close" data-action="handle-delete">Close</a>
                </div>
            </div>
        `
    }
}

export default AlbumFormTemplates