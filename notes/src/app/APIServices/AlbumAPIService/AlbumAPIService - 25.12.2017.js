import $ from 'jquery'

const AlbumAPIService = {
    getAllAlbums: function() {
        return $.getJSON('http://localhost:3000/api/albums')
    },

    /**
     * @param album_id
     * @returns {Promise}
     */
    getAlbumById: function( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id)
    },

    saveAlbum: function( album ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        })
    },

    updateAlbum: function( album_id, album ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify( album )
        })
    },

    deleteAlbum: function( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        })
    },

    getGenres: function() {
        return $.getJSON('http://localhost:3000/api/genres')
    },

    searchYoutubeID: function( youtube_id ) {
        return $.getJSON('http://localhost:3000/api/youtube/' + youtube_id)
    }
}

export default AlbumAPIService