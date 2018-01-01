import $ from 'jquery'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'

const AlbumGenres = {
    removeGenreTag: function ( e ) {
        $( e.target ).parents('.tag').remove()
    },

    addGenreTag: function ( tagName ) {
        let html = AlbumFormTemplates.GenreTag( tagName )
        $('.tags-container').append( html )
        $('#search-genres').val('')
    },

    searchGenre: function ( term ) {

    },

    detectEvent: function ( e ) {
        let $input_value = $( e.target ).val()

        if ( e.keyCode == 13 ) {
            this.addGenreTag( $input_value )
            return
        }

        this.searchGenre( $input_value )
    },

    setGenreValue: function( e ) {
        $('#search-genres').val( $( e.target ).text() )
    },

    bindEvents: function () {
        $('#tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        $('#genres-results').on('click', 'li' ,$.proxy( this.setGenreValue, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default AlbumGenres