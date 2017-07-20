import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates'

export default class Search {
    constructor() {
        this.bindEvents();
    }

    displayResults( results ) {
        let html = Templates.searchResults( results )
        $('#results').append( html )
    }

    searchAlbum( e ) {
        let $input = $(e.target)
        let term = $input.val()

        if ( term.length >= 3 )
            DataService.searchAlbum( term ).then( $.proxy( this.displayResults, this ) )
    }

    bindEvents() {
        $('#search').on('keyup', $.proxy( this.searchAlbum, this ))
    }
}