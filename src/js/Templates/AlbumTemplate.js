const AlbumTemplate = {
    albumInfo: function( album ) {
        return `
            <h2 id="album-name">Album name: ${album.album_name}</h2>
            <h4 id="album-artist">Artist: ${album.album_artist}</h4>
            <h4>Year: <span id="album-year">${album.album_year}</span></h4>
            <img id="album-image" src="${album.album_image}" alt="${album.album_name}">
            <h4>Description:</h4>
            <p id="album-description">${album.album_description}</p>
        `
    },

    albumGenres: function( genres ) {
        let html = '<ul id="album-genres">'

        for ( let i = 0; i < genres.length; i++ )
            html += `<li>${genres[ i ].genre_name}</li>`

        html += '</ul>'

        return html
    },

    getTemplate: function( album ) {
        let info = this.albumInfo( album )
        let genres = this.albumGenres( album.genres )
    }
}

export default AlbumTemplate