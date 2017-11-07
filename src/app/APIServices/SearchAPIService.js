import $ from 'jquery'

const SearchAPIService = {
    searchAlbums: function( term ) {
        return $.getJSON('http://localhost:3000/api/albums/search/' + term)
    },

    suggestions: function( term ) {
        return $.getJSON('http://localhost:3000/api/albums/suggestions/' + term)
    }
}

export default SearchAPIService