import $ from 'jquery'
import SearchAPIService from '../APIServices/SearchAPIService'
import SearchResultsTemplate from '../Templates/SearchResultsTemplate'
import Router from '../Router'

const Search = {
    displayResults: function( term, results ) {
        let title

        if ( results.count === 0 ) {
            title = SearchResultsTemplate.emptyResults()
            $('#search-results-title').html( title )
        } else {
            let html = SearchResultsTemplate.results( results.albums )
            title = SearchResultsTemplate.title( term, results.count )

            $('#search-results-title').html( title )
            $('#results').html( html )
        }
    },

    searchAlbum: function() {
        let term = Router.getParams()[0]

        SearchAPIService.searchAlbums( term ).then(results => this.displayResults( term, results ))
    },

    init: function() {
        this.searchAlbum()
    }
}

export default Search