import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplates from '../Templates/SearchResultsTemplates'
import Router from '../Router'

const Search = {
    searchAlbum: function() {
        let term = Router.getParams()[0]

        SearchAPIService.searchAlbums( term ).then(( results, statusText, xhr ) => {
            this.displayResults( term, results, xhr.status )
        })
    },

    displayResults: function( term, results, status ) {
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

    init: function() {
        this.searchAlbum()
    }
}

export default Search