const AlbumPlayer = {
    switchDetails: function( e ) {
        let el = $( e.target )
        $('#menu .active').removeClass('active')
        el.addClass('active')

        $('#album-description, #player-controls').toggle()
        $('#song-youtube, #album-image').toggle()
    },

    bindEvents: function() {
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        $('#menu .links').on('click', $.proxy( this.switchDetails, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

$(document).ready(function () {
    AlbumPlayer.init()
})