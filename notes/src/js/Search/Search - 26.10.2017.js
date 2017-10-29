import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

const Search = {
    displayResults: function( results ) {
        let html = Templates.searchResults( results )
        console.log( html )
        $('#results-list').html( html )
    },

    searchAlbum: function() {
        let term = location.hash.substring(1).split('/')[1]
        DataService.searchAlbum( term ).then( results => {
            if ( results.count > 0 ) {
                console.log( results.albums )
            }
        })
    },

    init: function() {
        this.searchAlbum()
    }
}

export default Search