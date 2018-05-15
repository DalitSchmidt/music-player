import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
import Router from '../Router'

const Search = {
    searchAlbum: function () {
        let term = Router.getParams()[0]

        SearchAPIService.searchAlbums( term ).then(( results, status_text, xhr ) => {
            this.displayResults( term, results, xhr.status )
        })

        if ( window.location.href === 'http://localhost:8080/#search/' ) {
            let title = SearchResultsTemplates.emptyResults( term )
            $('#search-results-title').html( title )
        }
    },

    displayResults: function ( term, results, status ) {
        let title

        if ( status === 204 ) {
            title = SearchResultsTemplates.emptyResults( term )
            $('#search-results-title').html( title )
        } else {
            let html = SearchResultsTemplates.results( results.albums )
            title = SearchResultsTemplates.title( term, results.count )

            $('#search-results-title').html( title )
            $('#results').html( html )
        }
    },

    init: function () {
        this.searchAlbum()
    }
}

export default Search