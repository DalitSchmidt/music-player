import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import SingleAlbumTemplates from '../Templates/SingleAlbumTemplates'
import Player from '../Player'
import Router from '../Router'
import Utils from '../Utils'

const SingleAlbum = {
    setAlbumInfoMenu: function () {
        let html = SingleAlbumTemplates.albumInfoMenu()
        $('#album-info-menu').html( html )
    },

    setAlbumInfoControls: function ( album_id ) {
        let html = SingleAlbumTemplates.albumInfoControls( album_id )
        $('#album-info-controls').html( html )
    },

    switchDetails: function ( e ) {
        let el = $( e.target )

        $('#album-info-menu .active').removeClass('active')
        el.addClass('active')

        $('#album-info-image').find('span').attr('id', 'album-info-image-circle')
        $('#album-info-description, #player-controls, #album-info-image span').toggle()
        $('#song-youtube, #album-info-image img').toggle()
    },

    setAlbumInfoImage: function ( img ) {
        let html = SingleAlbumTemplates.albumInfoImage( img )
        $('#album-info-image').html( html )
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
    },

    setAlbumPlaylist: function ( playlist ) {
        let html = SingleAlbumTemplates.albumPlaylist( playlist )
        $('#player-playlist').html( html )
    },

    getAlbum: function ( album_id ) {
        AlbumAPIService.getAlbumById( album_id ).then(album => {
                this.setAlbumInfoMenu()
                this.setAlbumInfoControls( album.album_id )
                this.setAlbumInfoImage( album.album_image )
                this.setAlbumInfo( album )
                this.setNowPlayingSong()
                this.setAlbumControls()
                this.setAlbumPlaylist( album.songs )
                Player.setSong( $('#player-playlist li').first() )
            }, () => {
                Router.redirect('all-albums')
            })
    },

    bindEvents: function () {
        $('#album-info-menu').on('click', '.album-info-links', $.proxy( this.switchDetails, this ))
    },

    init: function () {
        let album_id = Utils.getAlbumID()

        if ( !album_id ) {
            Router.redirect()
            return
        }

        this.getAlbum( album_id )
        Player.initYouTube()
        this.bindEvents()
    }
}

export default SingleAlbum