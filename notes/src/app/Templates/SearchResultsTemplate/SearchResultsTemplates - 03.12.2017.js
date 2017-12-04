import $ from 'jquery'

const SearchResultsTemplates = {
    result: function ( album ) {
        return `
            <div class="col-md-12">
                  <div class="row">
                       <div class="col-md-3">
                            <div class="search-results-record">
                                <img src="${album.album_image}" alt="${album.album_name}" class="img-responsive img-circle center-block">
                                <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                                    <i class="fa fa-play"></i>
                                </a>
                                <a href="#" class="remove-icon">
                                    <i class="fa fa-remove"></i>
                                </a>
                                <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </div>
                       </div>
            
                       <div class="col-md-9">
                            <h3 class="search-results-album-name">${album.album_artist} - ${album.album_name}</h3>
                            <p class="search-results-album-description">${album.album_description}</p>
                            <a href="#single-album/${album.album_id}" class="search-results-full-album-button pull-right" data-album-id="${album.album_id}">TO FULL ALBUM...</a>
                       </div>
                  </div>
            </div>
        `
    },

    results: function ( albums ) {
        let html = ''

        $.each(albums, ( index, album ) => html += this.result( album ))

        return html
    },

    title: function ( term, count ) {
        return `<h1 class="text-center">Found ${count} results for "${term}"</h1>`
    },

    emptyResults: function ( term ) {
        return `<h1 class="text-center">No results for term "${term}"</h1>`
    },

    suggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, album ) => {
            html += `<li><a href="#single-album/${album.album_id}">${album.album_name}</a></li>`
        })

        html += '</ul>'

        return html
    },

    noSuggestions: function () {
        return `<ul>
                    <li>No Suggestions</li>
                </ul>`
    }
}

export default SearchResultsTemplates