import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

export default class Search {
    constructor() {
        this.bindEvents()
    }

    displayResults( results ) {
        let html = Templates.searchResults( results )
        console.log( html )
        $('#results-list').html( html )
    }

    searchAlbum( e ) {
        let $input = $(e.target)
        let term = $input.val()

        if ( term.length >= 3 )
            DataService.searchAlbum( term ).then( $.proxy( this.displayResults, this ) )

        // Check if the length is smaller than 3, we have to remove all the results
    }

    bindEvents() {
        $('#search').on('keyup', $.proxy( this.searchAlbum, this ))
    }
}