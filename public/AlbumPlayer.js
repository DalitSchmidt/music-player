const AlbumPlayer = {
    playSong: function( e ) {
        let el = $( e.target )
        $('#current-playlist li.playing').removeClass('playing')
        el.addClass('playing')
        let youtube_id = el.data('code') // el.attr('data-code')
        $('#album-cover iframe').attr('src', `https://www.youtube.com/embed/${youtube_id}?autoplay=1`)

        let song_name = el.text()
        $('#now-playing-song #song-name').text( song_name )
    },

    switchDetails: function( e ) {
        let el = $( e.target )
        $('#menu .active').removeClass('active')
        el.addClass('active')

        $('#album-description, #player-controls').toggle()

    },

    bindEvents: function() {
        $('#current-playlist li').on('click', $.proxy( this.playSong, this ))
        $('#menu .links').on('click', $.proxy( this.switchDetails, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

$(document).ready(function () {
    AlbumPlayer.init()
})