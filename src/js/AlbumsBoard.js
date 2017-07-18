import $ from 'jquery';
import DataService from './DataService';
import Templates from './Templates';
import Player from './Player';

let AlbumsBoard = {
    removeLoader: function () {
        $('#album-list').removeClass('loading');
    },

    appendAlbums: function( albums ) {
        alert('getAllAlbums');
        this.removeLoader();
        let html = '';
        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] );

        $('#album-list .row').append( html );
    },

    getAllAlbums: function() {
        DataService.getAllAlbums().then( $.proxy(this.appendAlbums, this) );
    },

    displayAlbum: function( e ) {
        e.preventDefault();
        let el = $(e.target);
        let album_id = el.data('album-id');
        DataService.getAlbumById( album_id ).then( Player.playAlbum );
    },

    displayResults: function( results ) {

    },

    searchAlbum: function( e ) {
        let input = $(e.target)
        let term = input.val()

        if ( term.length >= 3 ) {
            DataService.searchAlbum( term ).then( $.proxy( this.displayResults, this ) )
        }
    },

    bindEvents: function() {
        $('#album-list').on('click', '.record h4', $.proxy( this.displayAlbum, this ));
        $('.edit-icon').on('click', $.proxy( this.editAlbum, this ));
        $('#search').on('keyup', $.proxy( this.searchAlbum, this ))
    },

    init: function() {
        this.bindEvents();
        this.getAllAlbums();
    }
};

export default AlbumsBoard;