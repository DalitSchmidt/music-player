import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
import Utils from '../Utils'

const SearchBar = {
    getTerm: function () {
        return $('#search-term').val()
    },

    searchTerm: function ( e ) {
        e.preventDefault()

        let term = this.getTerm()

        window.location.href = 'http://localhost:8080/#search/' + term
        this.clearResults()

        return false
    },

    getSuggestions: function () {
        let term = this.getTerm()

        if ( term.length < 2 ) {
            this.clearResults()

            return
        }

        SearchAPIService.suggestions( term ).then(( response, status_text, xhr ) => {
            let html

            if ( xhr.status === 204 )
                html = SearchResultsTemplates.noSuggestions()
            else
                html = SearchResultsTemplates.suggestions( response.results )

            $('#results-list').html( html ).closest('#search-area').addClass('has-suggestions')
        })
    },

    clearResults: function () {
        $('#results-list').hide(800, function () {
            $(this).html('')
            $('#search-term').val('')
            $('#search-area').removeClass('has-suggestions')
            $(this).css('display', 'block')
        })
    },

    bindEvents: function () {
        $('#search-form').on('submit', $.proxy( this.searchTerm, this ))
        $('#search-term').on('keyup', Utils.debounce( $.proxy( this.getSuggestions, this ), 500))
        $('header').on('click', '#search-area.has-suggestions li', $.proxy( this.clearResults, this ))
        $('header').on('mouseleave', '#search-area.has-suggestions', $.proxy( this.clearResults, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default SearchBar