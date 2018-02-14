import $ from 'jquery'
import Utils from '../Utils'

const SingleAlbumTemplates = {
    albumInfoMenu: function () {
        return `
            <div class="album-info-links" title="Description">Description</div>
            <div class="album-info-links active" title="Playlist">Playlist</div>
        `
    },

    albumInfoControls: function ( albumId ) {
        return `
            <a class="remove-icon" title="Remove Album" data-album-id="${albumId}">
                <i class="fa fa-remove" aria-hidden="true"></i>
            </a>
            <a href="#edit-album/${albumId}" class="edit-icon" title="Edit Album" data-album-id="${albumId}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
        `
    },

    albumInfoImage: function ( albumImage ) {
        return `
                <img src="${albumImage}">
                <span></span>
                `
    },

    albumInfo: function ( album ) {
        let genresHTML = this.albumGenres( album.genres )

        return `
            <h1 id="album-info-name" data-name="${album.album_artist}">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">${genresHTML}</ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    albumGenres: function ( genres ) {
        let html = ''

        for ( let i = 0; i < genres.length; i++ )
            html += `<li>${genres[ i ].genre_name}</li>`

        html += '<li></li>'
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
                <input type="range" name="song_duration" id="song-duration">
                <time id="timer"></time>
                <div id="volume-controls">
                    <a id="volume-up" title="Volume">
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                    </a>
                    <input type="range" name="song_volume" id="volume" min="0" max="100" value="100">
                </div>
        `
    },

    albumPlaylist: function ( playlist ) {
        let html = ''

        $.each(playlist, ( index, song ) => {
            html += `<li title="${song.song_name} ${Utils.calculateTime( song.song_time )}" data-code="${song.song_youtube}">${song.song_name}
                        <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
                     </li>`
        })

        return html
    }
}

export default SingleAlbumTemplates