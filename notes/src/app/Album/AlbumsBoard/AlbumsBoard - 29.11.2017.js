import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import Templates from '../Templates/Templates'

const AlbumsBoard = {
    appendAlbums: function( albums ) {
        let html = ''

        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] )

        $('#album-list').fadeTo('slow', 1.5, function()  {
            $('#album-list').removeClass('loading')
        }).delay(1000, function(){
            $('#album-list').html( html )
        });
    },

    getAllAlbums: function() {
        return AlbumAPIService.getAllAlbums()
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