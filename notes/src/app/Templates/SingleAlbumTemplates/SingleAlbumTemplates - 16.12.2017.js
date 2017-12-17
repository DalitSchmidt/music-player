import $ from 'jquery'
import Utils from '../Utils'

const SingleAlbumTemplates = {
    albumInfo: function( album ) {
        let genresHTML = this.albumGenres( album.genres )

        return `
            <h1 id="album-info-name">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">${genresHTML}</ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    albumImage: function( img ) {
        return `<img src="${img}" class="img-circle">`
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
            html += `<li data-code="${song.song_youtube}">${song.song_name} <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span></li>`

            // html += `<li data-code="${song.song_youtube}">
            //             <span>${song.song_name}</span>
            //             <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
            //          </li>`
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
            <a id="step-backward" data-album-id="">
                <i class="fa fa-step-backward"></i>
            </a>
            <a id="play" data-album-id="">
                <i class="fa fa-play"></i>
            </a>
            <a id="stop" data-album-id="">
                <i class="fa fa-stop"></i>
            </a>
            <a id="step-forward" data-album-id="">
                <i class="fa fa-step-forward"></i>
            </a>
            <div id="song-duration-controls">
                <input type="range" id="song-duration" name="song-duration">
                <time id="timer"></time>            
            </div>
            <div id="volume-controls">
                <a id="volume-up" data-album-id="">
                    <i class="fa fa-volume-up"></i>
                </a>            
                <input type="range" id="volume" name="volume" min="0" max="100" value="100">
                
                <!--<a id="volume-off" data-album-id="">-->
                    <!--<i class="fa fa-volume-off"></i>-->
                <!--</a>-->
                <!--<a id="volume-down" data-album-id="">-->
                    <!--<i class="fa fa-volume-down"></i>-->
                <!--</a>-->
            </div>
        `
    }
}

export default SingleAlbumTemplates