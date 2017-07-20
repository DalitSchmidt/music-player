import $ from 'jquery';

export default class DataService {
    getAllAlbums() {
        return $.getJSON('http://localhost:3000/api/albums');
    }

    getAlbumById( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id);
    }

    saveAlbum () {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        });
    }

    updateAlbum( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums' + album_id,
            contentType: 'application/json',
            method: 'PUT'
        });
    }

    deleteAlbum( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        });
    }

    searchAlbum( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    }
};