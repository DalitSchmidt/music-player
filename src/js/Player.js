const Player = {
    playing: true,

    playSong: function( e ) {
        let el = $( e.target )
        $('#player-playlist li.playing').removeClass('playing')
        el.addClass('playing')
        let youtube_id = el.data('code') // el.attr('data-code')
        youtubeplayer.loadVideoById( youtube_id )
        let song_name = el.text()
        $('#now-playing-song #song-name').text( song_name )
        this.toggleControls()
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
        this.playing = !this.playing
        $('#play').attr('disabled', 'disabled')
        $('#pause').removeAttr('disabled')
        youtubeplayer.playVideo()
    },

    pause: function() {
        this.playing = !this.playing
        $('#pause').attr('disabled', 'disabled')
        $('#play').removeAttr('disabled')
        youtubeplayer.pauseVideo()
    },

    toggleControls: function () {
        if ( this.playing )
            this.pause()
        else
            this.play()
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        $('#play, #pause').on('click', $.proxy( this.toggleControls, this ))
    },

    init: function () {
        this.startPlaylist()
        this.bindEvents()
    }
}

window.Player = Player