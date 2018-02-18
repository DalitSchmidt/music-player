import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumAPIService from '../APIServices/AlbumAPIService'
import SearchAPIService from '../APIServices/SearchAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Utils from '../Utils'

const AlbumGenres = {
    addGenreTag: function ( tag_name, genre_id = false ) {
        if ( !tag_name )
            return

        let html = AlbumFormTemplates.genreTag( tag_name, genre_id )

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
            $('#genres-results').html('')
            return
        }

        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 )
            Utils.debounce( this.searchGenre, 500 )( $input_value )

        if ( $('#search-genres').length )
            $('#genres-results').html('')
    },

    setGenreValue: function ( e ) {
        // let genre_name = $( e.target ).text()
        // let genre_id = $( e.target ).data('genre-id')
        //
        // this.addGenreTag( genre_name, genre_id )
        // $('#genres-results').html('')

        let genre_name = $( e.target ).text()
        let genre_id = $( e.target ).data('genre-id')

        AlbumAPIService.getGenres().then(() => {
            this.addGenreTag( genre_name, genre_id )
            $('#genres-results').html('')
        })
    },

    removeGenreTag: function ( e ) {
        let $input = $( e.target )

        $input.parents('.tag').remove()
    },

    bindEvents: function () {
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        $('#genres-results').on('click', 'li' ,$.proxy( this.setGenreValue, this ))
        $('#tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default AlbumGenres