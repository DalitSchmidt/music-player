import Utils from './Utils'

const Player = {
    playing: true,
    defaultTitle: 'Music Player',
    timer: 0,
    interval: false,

    setSong: function( el ) {
        $('#player-playlist li.playing').removeClass('playing')
        el.addClass('playing')
        let youtube_id = el.data('code') // el.attr('data-code')
        let song_name = el.clone().find('>*').remove().end().text()
        $('#now-playing-song #song-name').text( song_name )
        $('title').text( song_name )
        youtubeplayer.cueVideoById( youtube_id )
        this.timer = 0
        clearInterval( this.interval )
        this.interval = false
        $('#timer').text( Utils.calculateTime( this.timer ) )
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

    playPreviousSong: function () {
        let previous_song = $('li.playing').prev('li')

        if ( previous_song.length === 0 )
            this.stopPlaylist()
        else {
            this.setSong( previous_song )
            this.playSong()
        }
    },

    playNextSong: function () {
        let next_song = $('li.playing').next('li')

        if ( next_song.length !== 0 ) {
            this.setSong( next_song )
            this.playSong()
        } else
            this.stopPlaylist()
    },

    stopSong: function () {
        this.playing = false
        youtubeplayer.stopVideo()
    },

    changeVolume: function ( e ) {
        const volume = $( e.target ).val()
        youtubeplayer.setVolume( volume )

        // this.player.volume = $('.audio-player input[name="volume"]').val()
        // if ($('.audio-player input[name="volume"]').val() == 0) {
        //     $('.audio-player span:last-of-type i').attr('class', "fa fa-volume-off")
        // }
        // else if ($('.audio-player input[name="volume"]').val() <= .5) {
        //     $('.audio-player span:last-of-type i').attr('class', 'fa fa-volume-down')
        // }
        // else if ($('.audio-player input[name="volume"]').val() > .5) {
        //     $('.audio-player span:last-of-type i').attr('class', 'fa fa-volume-up')
        // }
    },

    stopPlaylist: function () {
        this.stopSong()
        $('#player-playlist li.playing').removeClass('playing')
        $('#now-playing-song #song-name').text('')
        $('title').text( this.defaultTitle )
        let el = $( $('#player-playlist li')[0] )
        this.setSong( el )
    },

    startPlaylist: function() {
        if ( $('#player').length === 0 )
            return

        let el = $( $('#player-playlist li')[0] )
        this.setSong( el )
        this.playSong()
    },

    toggleControls: function () {
        if ( youtubeplayer.getPlayerState() === 1 ) {
            $('#play i').removeClass('fa-play').addClass('fa-pause')
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            $('#play i').removeClass('fa-pause').addClass('fa-play')
        }
    },

    detectStateChange: function () {
        const player_state = youtubeplayer.getPlayerState()

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

    executePlaying: function ( e ) {
        let el = $( e.target )
        this.setSong( el )
        this.playSong()
    },

    togglePlaying: function() {
        const current_player_state = youtubeplayer.getPlayerState()
        console.log(current_player_state)
        switch ( current_player_state ) {
            case 0:
                console.log('ended')
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
        const current_time = $( e.target ).val()
        youtubeplayer.seekTo( current_time, true )
        this.timer = current_time
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.executePlaying, this ))
        $('#play').on('click', $.proxy( this.togglePlaying, this ))
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        $('#step-backward').on('click', $.proxy( this.playPreviousSong, this ))
        $('#step-forward').on('click', $.proxy( this.playNextSong, this ))
        $('#volume').on('change', $.proxy( this.changeVolume, this ))
        $('#song-duration').on('change', $.proxy( this.changeCurrentTime, this ))
        youtubeplayer.addEventListener('onStateChange', $.proxy( this.updateTimer, this ))
    },

    init: function () {
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player
export default Player