import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates'
import Player from './AlbumPlayer'

export default class AlbumsBoard {
    constructor() {
        this.bindEvents()
        this.getAllAlbums()
        this.player = new Player()
    }

    removeLoader() {
        $('#album-list').removeClass('loading')
    }

    appendAlbums( albums ) {
        this.removeLoader()
        let html = ''
        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] )

        $('#album-list .row').append( html )
    }

    getAllAlbums() {
        DataService.getAllAlbums().then( $.proxy(this.appendAlbums, this) )
    }

    displayAlbum( e ) {
        e.preventDefault()
        let el = $(e.target)
        let album_id = el.data('album-id')
        DataService.getAlbumById( album_id ).then( this.player.playAlbum )
    }

    editAlbum() {

    }

    bindEvents() {
        $('#album-list').on('click', '.record h4', $.proxy( this.displayAlbum, this ))
        $('.edit-icon').on('click', $.proxy( this.editAlbum, this ))
    }
}