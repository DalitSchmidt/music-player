import $ from 'jquery'

var youtubeplayer
var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function onYouTubeIframeAPIReady() {
    youtubeplayer = new YT.Player('song-youtube', {
        height: '250',
        width: '250',
        playerVars: {
            autoplay: 0,
            controls: 0,
            rel : 0,
            showinfo: 0,
            modestbranding: 1,  // Hide the Youtube Logo
            loop: 0,            // Run the video in a loop
            fs: 0,              // Hide the full screen button
            cc_load_policy: 0, // Hide closed captions
            iv_load_policy: 3,  // Hide the Video Annotations
            autohide: 0
        },
        events: {
            'onReady': onPlayerReady
        },
    })
}

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

export default Player