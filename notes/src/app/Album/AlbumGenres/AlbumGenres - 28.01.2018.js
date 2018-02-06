import $ from 'jquery'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import AlbumForm from './AlbumForm'
import Utils from '../Utils'
import SearchAPIService from '../APIServices/SearchAPIService'

const AlbumGenres = {
    addGenreTag: function ( tagName, genre_id = false ) {
        if ( !tagName )
            return

        let html = AlbumFormTemplates.genreTag( tagName, genre_id )

        $('#tags-container').append( html )
        $('#search-genres').val('')

        if ( $('#tags.error').length )
            AlbumForm.validateGenres()
    },

    searchGenre: function ( term ) {
        SearchAPIService.searchGenres( term ).then(results => {
            if ( results ) {
                let html = AlbumFormTemplates.genreSuggestions( results.results )
                $('#genres-results').html( html )
            } else
                $('#genres-results').html('')
        })
    },

    detectEvent: function ( e ) {
        let $input = $( e.target )
        let $input_value = $input.val()

        if ( e.keyCode == 13 ) {
            this.addGenreTag( $input_value )
            return
        }

        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 )
            Utils.debounce( this.searchGenre, 500 )( $input_value )
    },

    setGenreValue: function( e ) {
        let genre_id = $( e.target ).data('genre-id')
        let genre_name = $( e.target ).text()

        this.addGenreTag( genre_name, genre_id )
        $('#genres-results').html('')
    },

    removeGenreTag: function ( e ) {
        let $input = $( e.target )
        $input.parents('.tag').remove()
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