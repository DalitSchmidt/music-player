const Player = {
    playing: true,

    playSong: function( el ) {
        $('#player-playlist li.playing').removeClass('playing')
        el.addClass('playing')
        let youtube_id = el.data('code') // el.attr('data-code')
        let song_name = el.clone().find(">*").remove().end().text()
        $('#now-playing-song #song-name').text( song_name )
        $('title').text( song_name )
        youtubeplayer.loadVideoById( youtube_id )
        this.toggleControls({data: 'custom_activation'}, 'custom_activation')
    },

    playNextSong: function () {
        let next_song = $('li.playing').next()

        if ( next_song.length )
            this.playSong( next_song )
        else
            this.stopPlaylist()
    },

    stopSong: function () {
        this.playing = false
        youtubeplayer.stopVideo()
    },

    stopPlaylist: function () {
        this.stopSong()

        $('#player-playlist li.playing').removeClass('playing')
        $('#now-playing-song #song-name').text('')
        $('title').text( this.defaultTitle )
    },

    startPlaylist: function() {
        if ( $('#player').length === 0 )
            return

        let el = $( $('#player-playlist li')[0] )
        el.addClass('playing')
        let video_id = el.attr('data-code')
        youtubeplayer.loadVideoById( video_id )
    },

    // play: function() {
    //     this.playing = !this.playing
    //     $('#play').toggleClass('fa-play fa-pause')
    //     youtubeplayer.playVideo()
    // },
    //
    // pause: function() {
    //     this.playing = !this.playing
    //     $('#pause').attr('disabled', 'disabled')
    //     $('#play').removeAttr('disabled')
    //     $('#play').toggleClass('fa-play fa-pause')
    //     youtubeplayer.pauseVideo()
    // },

    toggleControls: function ( param, e ) {

        if( YT.PlayerState.PLAYING !== e.data ||  YT.PlayerState.PAUSED !== e.data || e.data !== 'custom_activation' || param !== 'custom_activation' )
            return

        if ( this.playing )
            youtubeplayer.pauseVideo()
        else
            youtubeplayer.playVideo()

        this.playing = !this.playing
        $('#play i').toggleClass('fa-play fa-pause')
    },

    executePlaying: function ( e ) {
        let el = $( e.target )
        this.playSong( el )
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.executePlaying, this ))
        $('#play').on('click', $.proxy( this.toggleControls, this, 'custom_activation' ))
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        $('#step-forward').on('click', $.proxy( this.playNextSong, this))
    },

    init: function () {
        this.defaultTitle = 'Music Player'
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player
export default Player