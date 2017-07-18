import $ from 'jquery';

let DataService = {
    getAllAlbums: function() {
        return $.getJSON('http://localhost:3000/api/albums');
    },

    getAlbumById: function( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id);
    },

    saveAlbum: function () {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        });
    },

    updateAlbum: function( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums' + album_id,
            contentType: 'application/json',
            method: 'PUT'
        });
    },

    deleteAlbum: function( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        });
    },

    searchAlbum: function( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    }
};

export default DataService;