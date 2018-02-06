import $ from 'jquery'

const SearchResultsTemplates = {
    suggestions: function ( suggestions ) {
        let html = '<ul>'

        $.each(suggestions, ( index, album ) => {
            html += `<li title="${album.album_name}"><a href="#single-album/${album.album_id}">${album.album_name}</a></li>`
        })

        html += '</ul>'

        return html
    },

    noSuggestions: function () {
        return `<ul>
                    <li title="No Suggestions">No Suggestions</li>
                </ul>`
    },

    title: function ( term, count ) {
        return `<h1 class="text-center">Found ${count} results for "${term}"</h1>`
    },

    emptyResults: function ( term ) {
        return `<h1 class="text-center">No results for term "${term}"</h1>`
    },

    result: function ( album ) {
        return `
            <div class="col-md-12">
                  <div class="row">
                       <div class="col-md-3">
                            <div class="search-results-record">
                                <img src="${album.album_image}" alt="${album.album_name}">
                                <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                                    <i class="fa fa-play" aria-hidden="true" title="Play"></i>
                                </a>
                                <a class="remove-icon" title="Remove Album" data-album-id="${album.album_id}">
                                    <i class="fa fa-remove" aria-hidden="true"></i>
                                </a>
                                <a href="#edit-album/${album.album_id}" class="edit-icon" title="Edit Album">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </div>
                       </div>
            
                       <div class="col-md-9">
                            <h3 class="search-results-album-name">${album.album_artist} - ${album.album_name}</h3>
                            <p class="search-results-album-description">${album.album_description}</p>
                            <a href="#single-album/${album.album_id}" class="search-results-full-album-button" title="TO FULL ALBUM..." data-album-id="${album.album_id}">TO FULL ALBUM...</a>
                       </div>
                  </div>
            </div>
        `
    },

    results: function ( albums ) {
        let html = ''

        $.each(albums, ( index, album ) =>
            html += this.result( album ))

        return html
    }
}

export default SearchResultsTemplates