import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from '../Templates/AlbumTemplates'

const AlbumsBoard = {
    getAllAlbums: function () {
        return AlbumAPIService.getAllAlbums()
    },

    appendAlbums: function ( albums ) {
        let html = ''

        for ( let i = 0; i < albums.length; i++ )
            html += AlbumTemplates.album( albums[ i ] )

        $('#album-list').fadeTo('slow', 1.5, () => {
            $('#album-list').removeClass('loading')
        }).delay(1500, () => {
            $('#album-list').html( html )
        })
    },

    noAlbums: function () {
        let html = AlbumTemplates.noAlbums()

        $('#album-list').fadeTo('slow', 1.5, () => {
            $('#album-list').removeClass('loading')
        }).delay(1500, () => {
            $('#album-list').html( html )
        })
    },

    applyAlbums: function () {
        this.getAllAlbums().then(( albums, status, xhr ) => {
            if ( typeof albums === 'undefined' || xhr.status === 204 )
                this.noAlbums()
            else
                this.appendAlbums( albums )
        })
    },

    init: function () {
        this.applyAlbums()
    }
}

export default AlbumsBoard