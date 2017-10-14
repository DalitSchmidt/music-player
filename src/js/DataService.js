import $ from 'jquery'

export default class DataService {
    static getAllAlbums() {
        return $.getJSON('http://localhost:3000/api/albums')
    }

    /**
     * @param album_id
     * @returns {Promise}
     */
    static getAlbumById( album_id ) {
        return $.getJSON('http://localhost:3000/api/albums/' + album_id)
    }

    static saveAlbum() {
        return $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album )
        })
    }

    static updateAlbum( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'PUT'
        })
    }

    static deleteAlbum( album_id ) {
        return $.ajax({
            url: 'http://localhost:3000/api/albums/' + album_id,
            contentType: 'application/json',
            method: 'DELETE'
        })
    }

    static searchAlbum( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    }
}