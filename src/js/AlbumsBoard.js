import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

const AlbumsBoard = {
    removeLoader: function() {
        $('#album-list').removeClass('loading')
    },

    appendAlbums: function( albums ) {
        let html = ''
        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] )

        $('#album-list .row').append( html )
    },

    getAllAlbums: function() {
        return DataService.getAllAlbums()
    },

    applyAlbums: function() {
        this.getAllAlbums().then(albums => {
            this.appendAlbums( albums )
        })
    },

    init: function() {
        this.applyAlbums()
    }
}

export default AlbumsBoard