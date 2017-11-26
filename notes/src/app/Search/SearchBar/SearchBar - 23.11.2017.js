import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplate from '../Templates/SearchResultsTemplate'

const SearchBar = {
    searchAlbum: function ( e ) {
        e.preventDefault()
        let term = this.getTerm()
        window.location.href = 'http://localhost:8080/#search/' + term

        return false
    },

    getTerm: function () {
        return $('#search-term').val()
    },

    clearResults: function() {
        $('#results-list').html('')
        $('#search-term').val('')
    },

    getSuggestions: function() {
        let term = this.getTerm()

        if ( term.length < 2 ) {
            this.clearResults()
            return
        }

        SearchAPIService.suggestions( term ).then(response => {
            let html = SearchResultsTemplate.suggestions( response.results )
            $('#results-list').html( html )
        })
    },

    bindEvents: function() {
        $('#search').on('click', $.proxy( this.searchAlbum, this ))
        $('#search-term').on('keyup', $.proxy( this.getSuggestions, this )).on('blur', this.clearResults)
    },

    init: function() {
        this.bindEvents()
    }
}

export default SearchBar