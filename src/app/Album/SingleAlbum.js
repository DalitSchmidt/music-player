import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import SingleAlbumTemplates from '../Templates/SingleAlbumTemplates'
import Player from '../Player'
import Router from '../Router'

const SingleAlbum = {
    getAlbumID: function () {
        return location.hash.substring(1).split('/')[1]
    },

    setAlbumInfoMenu: function () {
        let html = SingleAlbumTemplates.albumInfoMenu()
        $('#album-info-menu').html( html )
    },

    setAlbumInfoControls: function ( album_id ) {
        let html = SingleAlbumTemplates.albumInfoControls( album_id )
        $('#album-info-controls').html( html )
    },

    setAlbumImage: function( img ) {
        let html = SingleAlbumTemplates.albumImage( img )
        $('#album-info-image').html( html )
    },

    switchDetails: function( e ) {
        let el = $( e.target )
        $('#album-info-menu .active').removeClass('active')
        el.addClass('active')

        $('#album-info-description, #player-controls').toggle()
        $('#song-youtube, #album-info-image img').toggle()
    },

    setAlbumInfo: function ( album ) {
        let html = SingleAlbumTemplates.albumInfo( album )
        $('#album-info').html( html )
    },

    setNowPlayingSong: function () {
        let html = SingleAlbumTemplates.nowPlayingSong()
        $('#now-playing-song').html( html )
    },

    setAlbumControls: function () {
        let html = SingleAlbumTemplates.albumControls()
        $('#controls').html( html )
        $('#controls').find('>i.fa-volume-up').remove()
        $('#volume-controls').find('>i.fa-volume-up').removeClass()
    },

    setAlbumPlaylist: function( playlist ) {
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        $('#player-playlist').html( html )
    },

    getAlbum: function ( id ) {
        AlbumAPIService.getAlbumById( id ).then(
            album => {
                this.setAlbumPlaylist( album.songs )
                this.setAlbumInfo( album )
                this.setAlbumInfoControls( album.album_id )
                this.setAlbumInfoMenu()
                this.setAlbumImage( album.album_image )
                this.setNowPlayingSong()
                this.setAlbumControls()
                Player.setSong( $('#player-playlist li').first() )
            }, error => {
                Router.redirect('all-albums')
            })
    },

    bindEvents: function() {
        $('#album-info-menu').on('click', '.album-info-links', $.proxy( this.switchDetails, this ))
    },

    init: function () {
        let id = this.getAlbumID()

        if ( !id ) {
            Router.redirect()
            return
        }

        this.getAlbum( id )
        this.bindEvents()
        Player.initYoutube()
    }
}

export default SingleAlbum