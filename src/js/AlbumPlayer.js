import $ from 'jquery'
import DataService from './DataService'

const Player = {
    playSong: function( e ) {
        let el = $( e.target )
        $('#player-playlist li.playing').removeClass('playing')
        el.addClass('playing')
        let youtube_id = el.data('code') // el.attr('data-code')
        youtubeplayer.loadVideoById( youtube_id )
        let song_name = el.text()
        $('#now-playing-song #song-name').text( song_name )
    },

    startPlaylist: function() {
        if ( $('#player').length === 0 )
            return

        let el = $( $('#player-playlist li')[0] )
        el.addClass('playing')
        let video_id = el.attr('data-code')
        youtubeplayer.loadVideoById( video_id )
    },

    play: function() {
        $(this).attr('disabled', 'disabled')
        $('#pause').removeAttr('disabled')
        youtubeplayer.playVideo()
    },

    pause: function() {
        $(this).attr('disabled', 'disabled')
        $('#play').removeAttr('disabled')
        youtubeplayer.pauseVideo()
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        $('#play').on('click', this.play)
        $('#pause').on('click', this.pause)
    },

    init: function () {
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player

const AlbumPlayer = {
    switchDetails: function( e ) {
        let el = $( e.target )
        $('#album-info-menu .active').removeClass('active')
        el.addClass('active')

        $('#album-info-description, #player-controls').toggle()
        $('#song-youtube, #album-info-image img').toggle()
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        $('#album-info-menu .album-info-links').on('click', $.proxy( this.switchDetails, this ))
    },

    getAlbumID: function () {
        let id = location.hash.substring(1).split('/')[1]
        return id
    },

    getAlbum: function () {
        let id = this.getAlbumID()
        // if ( !id ) {
        //     location.replace('/')
        //     return
        // }

        DataService.getAlbumById( id ).then(album => {

        })
    },

    init: function () {
        this.getAlbum()
        this.bindEvents()
    }
}

export default AlbumPlayer