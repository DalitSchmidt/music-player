const AlbumTemplates = {
    albumInfo: function( album ) {
        return `
            <h1 id="album-info-name">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">
                <li>Baroque</li>
                <li>Pop</li>
                <li></li>
            </ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    albumImage: function( img ) {
        return `<img src="${img}">`
    },

    albumGenres: function( genres ) {
        let html = '<ul id="album-genres">'

        for ( let i = 0; i < genres.length; i++ )
            html += `<li>${genres[ i ].genre_name}</li>`

        html += '</ul>'

        return html
    },

    albumPlaylist: function( playlist ) {
        function calculateTime( seconds ) {
            return Math.floor( seconds / 60 ) + ':' + seconds % 60
        }

        let html = ''

        $.each(playlist, ( index, song ) => {
            html += `<li data-code="${song.song_youtube}">${song.song_name} (${calculateTime( song.song_time )})</li>`
        })

        return html
    },

    getTemplate: function( album ) {
        let info = this.albumInfo( album )
        let genres = this.albumGenres( album.genres )
    }
}

export default AlbumTemplates