import $ from 'jquery'
import Utils from './Utils'
import Router from './Router'

const Player = {
    playing: true,
    defaultTitle: 'Music Player',
    timer: 0,
    interval: false,

    setSong: function( el ) {
        el = el.closest('li')
        $('#player-playlist li').removeClass('playing pause')
        el.addClass('pause')
        let youtube_id = el.data('code') // el.attr('data-code')
        let song_name = el.clone().find('>*').remove().end().text()
        let album_artist = $('#album-info-name').data('name')
        $('#now-playing-song #song-name').text( song_name )
        $('title').text('Now Playing - ' + song_name + 'by ' + album_artist)
        youtubeplayer.cueVideoById( youtube_id )
        this.timer = 0
        clearInterval( this.interval )
        this.interval = false
        let $time = $('#timer')
        $time.text( Utils.calculateTime( this.timer ) )
        let song_time = el.find('span').data('duration')
        $('#song-duration').val(0).attr('max', song_time)
    },

    playSong: function () {
        this.playing = true
        youtubeplayer.playVideo()
        this.toggleControls()
    },

    pauseSong: function () {
        this.playing = false
        youtubeplayer.pauseVideo()
        this.toggleControls()
    },

    stopSong: function () {
        this.playing = false
        youtubeplayer.stopVideo()
    },

    playPreviousSong: function () {
        let previous_song = $('li.playing, li.pause').prev('li')

        if ( previous_song.length === 0 )
            this.stopPlaylist()
        else {
            this.setSong( previous_song )
            this.playSong()
        }
    },

    playNextSong: function () {
        let next_song = $('li.playing, li.pause').next('li')

        if ( next_song.length !== 0 ) {
            this.setSong( next_song )
            this.playSong()
        } else
            this.stopPlaylist()
    },

    updateTimer: function () {
        let $time = $('#timer')

        if ( !this.interval ) {
            if ( youtubeplayer.getPlayerState() === 1 ) {
                this.interval = window.setInterval(() => {
                    $('#song-duration').val( this.timer++ )
                    $time.text( Utils.calculateTime( this.timer ) )
                }, 1000)
            } else if ( youtubeplayer.getPlayerState() === 5 ) {
                this.timer = 0
                $('#song-duration').val( this.timer )
                $time.text( Utils.calculateTime( this.timer ) )
            }
        } else {
            if ( youtubeplayer.getPlayerState() === 2 ) {
                clearInterval( this.interval )
                this.interval = false
            }
        }
    },

    changeCurrentTime: function ( e ) {
        let current_time = $( e.target ).val()
        youtubeplayer.seekTo( current_time, true )
        this.timer = current_time
    },

    changeVolume: function ( e ) {
        let volume = $( e.target ).val()
        let $volume = $('#volume-up i')
        youtubeplayer.setVolume( volume )

        if ( volume == 0 )
            $volume.attr('class', "fa fa-volume-off").css('margin-left', '8px')
        else if ( volume <= 50 )
            $volume.attr('class', 'fa fa-volume-down').css('margin-left', '8px')
        else if ( volume > 50 )
            $volume.attr('class', 'fa fa-volume-up').css('margin-left', '0')
    },

    toggleVolumeBar: function () {
        $('#volume').animate({ width:'toggle' }, 350)
        $('#controls').toggleClass('volume-width')
    },

    startPlaylist: function() {
        if ( $('#player').length === 0 )
            return

        let el = $( $('#player-playlist li')[0] )
        this.setSong( el )
        this.playSong()
    },

    stopPlaylist: function () {
        this.stopSong()
        $('#player-playlist li.playing').removeClass('playing')
        $('#now-playing-song #song-name').text('')
        $('title').text( this.defaultTitle )
        let el = $( $('#player-playlist li')[0] )
        this.setSong( el )
    },

    executePlaying: function ( e ) {
        this.stopSong()
        let el = $( e.target )
        this.setSong( el )
        this.playSong()
    },

    togglePlaying: function() {
        let current_player_state = youtubeplayer.getPlayerState()
        switch ( current_player_state ) {
            case 0:
                this.playNextSong()
                break
            case 1:
                this.pauseSong()
                break
            case 2:
                this.playSong()
                break
        }
        // if( youtubeplayer.getPlayerState() === 1 ) {
        //     this.pauseSong()
        // } else if ( youtubeplayer.getPlayerState() === 2 ) {
        //     this.playSong()
        // }
    },

    toggleControls: function () {
        if ( youtubeplayer.getPlayerState() === 1 ) {
            $('#play i').removeClass('fa-play').addClass('fa-pause').attr('title', 'Pause')
            $('#player-playlist li.pause').removeClass('pause').addClass('playing')
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            $('#play i').removeClass('fa-pause').addClass('fa-play').attr('title', 'Play')
            $('#player-playlist li.playing').removeClass('playing').addClass('pause')
        }
    },

    detectStateChange: function () {
        let player_state = youtubeplayer.getPlayerState()

        switch ( player_state ) {
            case 0:
                this.playNextSong()
                break
            case 1:
            case 2:
                this.toggleControls()
                break
        }
    },

    initYoutube: function () {
        let youtubeplayer
        let tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        let firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore( tag, firstScriptTag )
        // window.onhashchange = Router.setPage.bind( Router )
        Router.bindEvents()

        if ( isPlayerInit )
            onYouTubeIframeAPIReady()
    },

    bindEvents: function() {
        $('#player-playlist').on('click', 'li:not(.pause, .playing)', $.proxy( this.executePlaying, this ))
        $('#player-controls').on('click', '#play, #player-playlist li.playing, #player-playlist li.pause', $.proxy( this.togglePlaying, this ))
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        $('#step-backward').on('click', $.proxy( this.playPreviousSong, this ))
        $('#step-forward').on('click', $.proxy( this.playNextSong, this ))
        $('#volume').on('change', $.proxy( this.changeVolume, this ))
        $('#song-duration').on('change', $.proxy( this.changeCurrentTime, this ))
        $('#volume-up').on('click', $.proxy( this.toggleVolumeBar, this ))
        youtubeplayer.addEventListener('onStateChange', $.proxy( this.updateTimer, this ))
    },

    init: function () {
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player
export default Player