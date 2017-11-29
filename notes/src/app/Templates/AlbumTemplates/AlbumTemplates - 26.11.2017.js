import $ from 'jquery'

const AlbumTemplates = {
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
    }
}

export default AlbumTemplates