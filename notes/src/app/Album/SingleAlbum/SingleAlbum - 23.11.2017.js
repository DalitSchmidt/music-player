import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from '../Templates/AlbumTemplates'
import Player from '../Player'

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

        AlbumAPIService.getAlbumById( id ).then(album => {
            this.setPlaylist( album.songs )
            this.setAlbumInfo( album )
            this.setAlbumImage( album.album_image )
            Player.playSong($('#player-playlist li').first())
        })
    },

    init: function () {
        this.getAlbum()
        this.bindEvents()
        Player.init()
    }
}

export default AlbumPlayer