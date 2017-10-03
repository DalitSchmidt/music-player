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