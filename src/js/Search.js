import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

const Search = {
    displayResults: function( results ) {
        let html = Templates.searchResults( results )
        console.log( html )
        $('#results-list').html( html )
    },

    searchAlbum: function( e ) {
        let $input = $(e.target)
        let term = $input.val()

        if ( term.length >= 3 )
            DataService.searchAlbum( term ).then( $.proxy( this.displayResults, this ) )

        // Check if the length is smaller than 3, we have to remove all the results
    },

    bindEvents: function() {
        $('#search').on('keyup', $.proxy( this.searchAlbum, this ))
    },

    init: function() {
        this.bindEvents()
    }
}

export default Search