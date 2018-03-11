import $ from 'jquery'
import Utils from '../Utils'

const AlbumFormTemplates = {
    titleAddNewAlbum: function () {
        return `<h1>Add New Album</h1>`
    },

    titleAddAlbumPlaylist: function () {
        return `<h1>Add Album Playlist</h1>`
    },

    artistSuggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, artist ) => {
            html += `<li title="${artist}">${artist}</li>`
        })

        html += '</ul>'

        return html
    },

    noSuggestions: function () {
        return `
                <ul>
                    <li title="No Suggestions">No Suggestions</li>
                </ul>
               `
    },

    genreTag: function ( tagName, genreId = false ) {
        return `
                <span class="tag" title="${tagName}">
                    ${tagName}
                    <a title="Remove Tag">
                        <i class="fa fa-remove" aria-hidden="true"></i>
                    </a>
                    <input type="hidden" name="genres_tags" value="${genreId ? genreId : tagName}">
                </span>
               `
    },

    genreSuggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, genre ) => {
            html += `<li title="${genre.genre_name}" data-genre-id="${genre.genre_id}">${genre.genre_name}</li>`
        })

        html += '</ul>'

        return html
    },

    songItem: function ( song = false ) {
        return `
                <div class="col-md-12 song-item">
                    <div class="form-group song">
                        <label class="control-label youtube-id-label">YouTube ID:</label>
                        <input type="text" name="song_youtube" class="form-control youtube-id" placeholder="JT6UCvR7kgU" title="YouTube ID" value="${song ? song.song_youtube : ''}" required>
                    </div>
                    <div class="form-group song">
                        <label class="control-label song-name-label">Song Name:</label>
                        <input type="text" name="song_name" class="form-control song-name" placeholder="The Power of Equality" title="Song Name" value="${song ? song.song_name : ''}" required>
                    </div>
                    <div class="form-group song">
                        <label class="control-label song-time-label">Song Time:</label>
                        <span class="form-control song-time" title="Song Time">${song ? Utils.calculateTime( song.song_time ) : ''}</span>
                        <input type="hidden" name="song_time" value="${song ? song.song_time : ''}" required>
                    </div>
                    <a href="#" class="remove-icon" title="Remove Song" data-song-id="${song.song_id}">
                        <i class="fa fa-remove" aria-hidden="true"></i>
                    </a>
                </div>
               `
    },

    errorMessage: function ( errorMessage ) {
        return `
                <div class="error-message">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    ${errorMessage}
                </div>
               `
    },

    successMessage: function () {
        let albumName = $('#album-name').val()
        let albumArtist = $('#album-artist').val()

        return `
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#all-albums" class="close" title="Close" aria-label="Close" data-dismiss="modal">
                            <i class="fa fa-remove" aria-hidden="true" data-action="handle-remove"></i>
                        </a>
                    </div>
                    <div class="modal-body">
                        <h4 class="text-center">The album ${albumName} by ${albumArtist} was created successfully</h4>
                    </div>
                    <div class="modal-footer">
                        <a href="#all-albums" id="close-button" title="Close" data-action="handle-remove">Close</a>
                    </div>
                </div>
               `
    }
}

export default AlbumFormTemplates