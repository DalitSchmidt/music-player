import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
import Utils from '../Utils'

const SearchBar = {
    searchAlbum: function ( e ) {
        e.preventDefault()
        let term = this.getTerm()
        window.location.href = 'http://localhost:8080/#search/' + term
        this.clearResults()

        return false
    },

    getTerm: function () {
        return $('#search-term').val()
    },

    clearResults: function() {
        $('#results-list').hide(300, function() {
            $(this).html('')
            $('#search-term').val('')
            $('.pull-right').removeClass('has-suggestions')
            $(this).css('display', 'block')
        })
    },

    getSuggestions: function() {
        let term = this.getTerm()

        if ( term.length < 2 ) {
            this.clearResults()
            return
        }

        SearchAPIService.suggestions( term ).then(( response, textStatus, xhr ) => {
            let html

            if ( xhr.status === 204 ) {
                html = SearchResultsTemplates.noSuggestions()
            } else {
                html = SearchResultsTemplates.suggestions( response.results )
            }
            $('#results-list').html( html ).closest('.pull-right').addClass('has-suggestions')
        })
    },

    bindEvents: function() {
        $('#search-form').on('submit', $.proxy( this.searchAlbum, this ))
        $('#search-term').on('keyup', Utils.debounce( $.proxy( this.getSuggestions, this ), 500) )
        $('header').on('mouseleave', '.pull-right.has-suggestions', $.proxy( this.clearResults ))
        $('header').on('click', '.pull-right.has-suggestions li', $.proxy( this.clearResults ))
    },

    init: function() {
        this.bindEvents()
    }
}

export default SearchBar