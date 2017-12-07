import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import SingleAlbumTemplates from '../Templates/SingleAlbumTemplates'
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
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        $('#player-playlist').html( html )
    },

    setAlbumInfo: function ( album ) {
        let html = SingleAlbumTemplates.albumInfo( album )
        $('#album-info').html( html )
    },

    setAlbumImage: function( img ) {
        let html = SingleAlbumTemplates.albumImage( img )
        $('#album-info-image').html( html )
    },

    setNowPlayingSong: function () {
        let html = SingleAlbumTemplates.nowPlayingSong()
        $('#now-playing-song').html( html )
    },

    setControls: function () {
        let html = SingleAlbumTemplates.albumControls()
        $('#controls').html( html )
    },

    getAlbum: function () {
        let id = this.getAlbumID()

        AlbumAPIService.getAlbumById( id ).then( album => {
            this.setPlaylist( album.songs )
            this.setAlbumInfo( album )
            this.setAlbumImage( album.album_image )
            this.setControls()
            this.setNowPlayingSong()
            Player.setSong( $('#player-playlist li').first() )
        })
    },

    init: function () {
        this.getAlbum()
        this.bindEvents()
        Player.init()
    }
}

export default AlbumPlayer