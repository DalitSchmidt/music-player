import $ from 'jquery'

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

    init: function () {
        this.bindEvents()
    }
}

export default AlbumPlayer