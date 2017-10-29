var youtubeplayer
let tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore( tag, firstScriptTag )

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

function onPlayerReady( event ) {
    Player.init()
}