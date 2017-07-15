import $ from 'jquery';
import DataService from './DataService';
import Templates from './Templates';

export default AlbumsBoard = {
    removeLoader: function () {
        $('#album-list').removeClass('loading');
    },

    appendAlbums: function( albums ) {
        this.removeLoader();
        let html = '';
        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] );

        $('#album-list .row').append( html );
    },

    getAllAlbums: function() {
        DataService.getAllAlbums().then( this.appendAlbums );
    },

    displayAlbum: function( e ) {
        e.preventDefault();
        let el = $(e.target);
        let album_id = el.data('album-id');
        DataService.getAlbumById( album_id ).then( Player.playAlbum );
    },

    bindEvents: function() {
        $('.play-icon').on('click', $.proxy( this.displayAlbum, this ));
    },

    init: function() {
        this.bindEvents();
        this.getAllAlbums();
    }
};