import $ from 'jquery'
import DataService from './DataService'
import AlbumTemplates from './Templates/AlbumTemplates'

const AlbumPlayer = {
    switchDetails: function( e ) {
        let el = $( e.target )
        $('#album-info-menu .active').removeClass('active')
        el.addClass('active')

        $('#album-info-description, #player-controls').toggle()
        $('#song-youtube, #album-info-image img').toggle()
    },

    bindEvents: function() {
        $('#album-info-menu .album-info-links').on('click', $.proxy( this.switchDetails, this ))
    },

    getAlbumID: function () {
        let id = location.hash.substring(1).split('/')[1]
        return id
    },

    setPlaylist: function( playlist ) {
        let html = AlbumTemplates.albumPlaylist( playlist )
        $('#player-playlist').html( html )
    },

    setAlbumInfo: function ( album ) {
        let html = AlbumTemplates.albumInfo( album )
        $('#album-info').html( html )
    },

    setAlbumImage: function( img ) {
        let html = AlbumTemplates.albumImage( img )
        $('#album-info-image').html( html )
    },

    getAlbum: function () {
        let id = this.getAlbumID()
        DataService.getAlbumById( id ).then(album => {
            this.setPlaylist( album.songs )
            this.setAlbumInfo( album )
            this.setAlbumImage( album.album_image )
        })
    },

    init: function () {
        this.getAlbum()
        this.bindEvents()
    }
}

export default AlbumPlayer