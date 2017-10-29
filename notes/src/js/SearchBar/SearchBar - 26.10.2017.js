import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

const SearchBar = {
    searchAlbum: function () {
        let term = this.getTerm()
        alert("/search/" + term)
    },

    getTerm: function () {
        return $('#search-term').val()
    },

    bindEvents: function() {
        $('#search').on('click', $.proxy( this.searchAlbum, this ))

    },

    init: function() {
        this.bindEvents()
    }
}

export default SearchBar