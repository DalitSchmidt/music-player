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
        let previous_song = $('li.playing').before()

        if ( previous_song.length !== 0 ) {
            this.stopPlaylist()
        }
        else
            this.setSong( previous_song )
            this.playSong()
    },

    playNextSong: function () {
        let next_song = $('li.playing').next('li')

        if ( next_song.length !== 0 ) {
            this.setSong( next_song )
            this.playSong()
        }
        else
            this.stopPlaylist()
    },

    stopSong: function () {
        this.playing = false
        youtubeplayer.stopVideo()
    },

    changeVolume: function () {
        this.player.volume = $('.audio-player input[name="volume"]').val()
        if ($('.audio-player input[name="volume"]').val() == 0) {
            $('.audio-player span:last-of-type i').attr('class', "fa fa-volume-off")
        }
        else if ($('.audio-player input[name="volume"]').val() <= .5) {
            $('.audio-player span:last-of-type i').attr('class', 'fa fa-volume-down')
        }
        else if ($('.audio-player input[name="volume"]').val() > .5) {
            $('.audio-player span:last-of-type i').attr('class', 'fa fa-volume-up')
        }
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
        if( youtubeplayer.getPlayerState() === 1 ){
            $('#play i').removeClass('fa-play').addClass('fa-pause')
        } else if( youtubeplayer.getPlayerState() === 2 ) {
            $('#play i').removeClass('fa-pause').addClass('fa-play')
        }
    },

    executePlaying: function ( e ) {
        let el = $( e.target )
        this.setSong( el )
        this.playSong()
    },

    togglePlaying: function() {
        if( youtubeplayer.getPlayerState() === 1 ){
            this.pauseSong()
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            this.playSong()
        }
    },

    updateTimer: function () {
        if ( !this.interval ) {
            if ( youtubeplayer.getPlayerState() === 1 ) {
                this.interval = window.setInterval(() => {
                    this.timer++
                }, 1000)
            } else if ( youtubeplayer.getPlayerState() === 5 ) {
                this.timer = 0
            }
        } else {
            if ( youtubeplayer.getPlayerState() === 2 ) {
                clearInterval( this.interval )
                this.interval = false
            }
        }
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.executePlaying, this ))
        $('#play').on('click', $.proxy( this.togglePlaying, this ))
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        $('#step-backward').on('click', $.proxy( this.playPreviousSong, this ))
        $('#step-forward').on('click', $.proxy( this.playNextSong, this ))
        youtubeplayer.addEventListener('onStateChange', $.proxy( this.updateTimer, this ))
    },

    init: function () {
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player
export default Player