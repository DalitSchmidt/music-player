import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

export default class AlbumsBoard {
    constructor() {
        this.applyAlbums()
    }

    removeLoader() {
        $('#album-list').removeClass('loading')
    }

    appendAlbums( albums ) {
        let html = ''
        for ( let i = 0; i < albums.length; i++ )
            html += Templates.album( albums[ i ] )

        $('#album-list .row').append( html )
    }

    getAllAlbums() {
        return DataService.getAllAlbums()
    }

    applyAlbums() {
        this.getAllAlbums().then(albums => {
            this.appendAlbums( albums )
        })
    }
}