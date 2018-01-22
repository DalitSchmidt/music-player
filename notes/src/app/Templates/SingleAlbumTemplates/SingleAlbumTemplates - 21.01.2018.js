import $ from 'jquery'
import Utils from '../Utils'

const SingleAlbumTemplates = {
    albumInfo: function( album ) {
        let genresHTML = this.albumGenres( album.genres )

        return `
            <h1 id="album-info-name" data-name="${album.album_artist}">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">${genresHTML}</ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    albumInfoControls: function ( album_id ) {
        return `
            <a class="remove-icon" title="Remove Album" data-album-id="${album_id}">
                <i class="fa fa-remove" aria-hidden="true"></i>
            </a>
            <a href="#edit-album/${album_id}" class="edit-icon" title="Edit Album" data-album-id="${album_id}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
        `
    },

    albumInfoMenu: function () {
        return `
            <div class="album-info-links" title="Description">Description</div>
            <div class="album-info-links active" title="Playlist">Playlist</div>
        `
    },

    albumImage: function( img ) {
        return `<img src="${img}">`
    },

    albumGenres: function( genres ) {
        let html = ''

        for ( let i = 0; i < genres.length; i++ )
            html += `<li>${genres[ i ].genre_name}</li>`

        html += '<li></li>'
        return html
    },

    albumPlaylist: function( playlist ) {
        let html = ''

        $.each(playlist, ( index, song ) => {
            html += `<li data-code="${song.song_youtube}" title="${song.song_name} ${Utils.calculateTime( song.song_time )}">${song.song_name}
                        <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
                     </li>`
        })

        return html
    },

    nowPlayingSong: function () {
        return `<strong>
                    NOW PLAYING:
                    <span id="song-name"></span>
                </strong>`
    },

    albumControls: function () {
        return `
            <a id="step-backward" title="Previous">
                <i class="fa fa-step-backward" aria-hidden="true"></i>
            </a>
            <a id="play">
                <i class="fa fa-play" aria-hidden="true"></i>
            </a>
            <a id="stop" title="Stop">
                <i class="fa fa-stop" aria-hidden="true"></i>
            </a>
            <a id="step-forward" title="Next">
                <i class="fa fa-step-forward" aria-hidden="true"></i>
            </a>
            <input type="range" name="song-duration" id="song-duration">
            <time id="timer"></time>
            <a id="volume-up" title="Volume">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
            </a>
            <input type="range" name="volume" id="volume" min="0" max="100" value="100">
        `
    }
}

export default SingleAlbumTemplates