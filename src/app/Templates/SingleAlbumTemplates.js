import $ from 'jquery'

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
        function calculateTime( seconds ) {
            return Math.floor( seconds / 60 ) + ':' + seconds % 60
        }

        let html = ''

        $.each(playlist, ( index, song ) => {
            html += `<li data-code="${song.song_youtube}">${song.song_name} <span>(${calculateTime( song.song_time )})</span></li>`
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
            <a id="step-backward" class="step-backward-icon" data-album-id="">
                <i class="fa fa-step-backward"></i>
            </a>
            <a id="play" class="play-icon" data-album-id="">
                <i class="fa fa-play"></i>
            </a>
            <a id="stop" class="stop-icon" data-album-id="">
                <i class="fa fa-stop"></i>
            </a>
            <a id="step-forward" class="step-forward-icon" data-album-id="">
                <i class="fa fa-step-forward"></i>
            </a>
            <time>0:00</time>
            <div id="volume-controls">
                <div id="master" style="width:85px; margin:12px; float: right;"></div>
                
                <a id="volume-off" class="volume-off-icon" data-album-id="">
                    <i class="fa fa-volume-off"></i>
                </a>
                <a id="volume-down" class="volume-down-icon" data-album-id="">
                    <i class="fa fa-volume-down"></i>
                </a>
                <a id="volume-up" class="volume-up-icon" data-album-id="">
                    <i class="fa fa-volume-up"></i>
                </a>
            </div>
        `
    }
}

export default SingleAlbumTemplates