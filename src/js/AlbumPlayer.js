import $ from 'jquery'
import DataService from './DataService'
import AlbumTemplate from './Templates/AlbumTemplate'

const AlbumPlayer = {
    fetchAlbum: function () {
        DataService.getAlbumById( 1 ).then(album => {
            let html = AlbumTemplate.getTemplate( album )
        })
    },

    bindEvents: function() {

    },

    init: function () {
        this.bindEvents()
    }
}

export default AlbumPlayer