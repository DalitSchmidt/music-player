import $ from 'jquery'
import AlbumValidator from './AlbumValidator'
import SearchAPIService from '../APIServices/SearchAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Utils from '../Utils'

const AlbumGenres = {
    searchResults: '',

    addGenreTag: function ( tag_name, genre_id = false ) {
        if ( !tag_name || !this.validateGenres( tag_name ) )
            return

        let html = AlbumFormTemplates.genreTag( tag_name, genre_id )
        $( html ).insertBefore('#search-genres')

        $('#search-genres').val('')

        if ( $('#genres-tags.error').length )
            this.validateGenres()
    },

    searchGenre: function ( term ) {
        let html

        SearchAPIService.searchGenres( term ).then(results => {
            if ( results ) {
                this.searchResults = results.results

                html = AlbumFormTemplates.genreSuggestions( this.searchResults )
            } else {
                this.searchResults = []

                html = AlbumFormTemplates.noSuggestions()
                this.clearGenresResults()
            }

            $('#genres-results').html( html )

            let el = $('#search-genres')
            let position = $( el ).position()
            let width = $( el ).outerWidth()

            $('#genres-results').css({
                position: 'absolute',
                top: 22 + position.top + 'px',
                left: (position.left - 158 + width) + 'px'
            })
        })
    },

    clearGenresResults: function () {
        $('#genres-results').find('ul, li').remove()
    },

    detectEvent: function ( e ) {
        let $input = $( e.target )
        let $input_value = $input.val()

        if ( e.keyCode == 13 ) {
            let is_in_search_results = this.searchResults.filter( item => item.genre_name.toLowerCase() === $input_value.toLowerCase() )
            let existing_genre_id = is_in_search_results.length ? is_in_search_results[0].genre_id : false

            this.addGenreTag( $input_value, existing_genre_id )
            $('#genres-results').html('')
            this.searchResults = []

            return
        }

        if ( ( e.which <= 90 && e.which >= 48 ) && $input_value.length > 0 ) {
            Utils.debounce($.proxy(this.searchGenre, this), 500)($input_value)
            $('#genres-results').html('')
        }

        if ( $('#search-genres').length ) {
            $('#genres-results').html('')
            this.searchResults = []
        }
    },

    setGenreValue: function ( e ) {
        let genre_name = $( e.target ).text()
        let genre_id = $( e.target ).data('genre-id')

        $('#genres-results').html('')
        this.searchResults = []

        this.addGenreTag( genre_name, genre_id )
    },

    removeGenreTag: function ( e ) {
        let $input = $( e.target )

        $input.parents('.tag').remove()
    },

    validateGenres: function ( tag_name ) {
        $('#album-genres .error-message').remove()

        let tag_names = [], error_message, html
        let $input = $('#album-genres')

        $.each( $('.tag'), ( index, item ) => {
            tag_names.push( $( item ).attr('title') )
        })

        if ( AlbumValidator.validateInputs( this.collectGenres(), 1, 'genres', $input ) ) {
            $input.find('#genres-tags').removeClass('error').addClass('success')
            $input.find('.error-message').remove()
        }

        if ( tag_names.indexOf( tag_name ) !== -1 ) {
            error_message = 'The genre is already in list'
            html = AlbumFormTemplates.errorMessage( error_message )

            $('#album-genres').prepend( html )
            $('#search-genres').val('')

            return false
        }

        if ( $('.tag').length === 5 ) {
            error_message = 'The album can contain a maximum of 5 genres'
            html = AlbumFormTemplates.errorMessage( error_message )

            $('#album-genres').prepend( html )
            $('#search-genres').val('')

            return false
        }

        return true
    },

    bindEvents: function () {
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        $('#genres-results').on('click', 'li', $.proxy( this.setGenreValue, this ))
        $('#genres-tags').on('click', '.tag a', $.proxy( this.removeGenreTag, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default AlbumGenres