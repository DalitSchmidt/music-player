import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import Player from './../Player'
import Templates from '../Templates/Templates'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'

const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

function debounce( func, wait, immediate ) {
    let timeout

    return function() {
        let context = this, args = arguments

        let later = function() {
            timeout = null
            if ( !immediate )
                func.apply( context, args )
        }

        let callNow = immediate && !timeout
        clearTimeout( timeout )
        timeout = setTimeout( later, wait )

        if ( callNow )
            func.apply( context, args )
    }
}

const AlbumForm = {
    collectValues: function() {
        let regexes = {
            'album-name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            'album-artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            'album-image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            'album-year': new RegExp("^[0-9]{4}$"),
            'album-description': new RegExp("^[A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
        }

        let errors = false
        let inputs = $('#add-new-album-form input, #add-new-album-form textarea')
        let album = {}
        let i, input, input_name, input_value

        inputs.removeClass('error')

        for ( i = 0; i < inputs.length; i++ ) {
            // Collect the element
            input = inputs [ i ]

            // Convert the element from native JS element to a jQuery element
            input = $( input )
            if ( input.attr('type') === 'checkbox' )
                continue

            input_name = input.attr('name')
            input_value = input.val()

            // Get the matched regex from the regexes object
            // Test the value of the input
            if ( !regexes[ input_name ].test( input_value ) ) {
                // If there is an error with the regex, set errors to be true, mean we have errors in the validation
                errors = true
                // Add class of error
                input.addClass('error')
            }

            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        if ( errors )
            return false

        return album
    },

    scrollTop: function () {
        $("html, body").animate({ scrollTop: 0 }, 1200)
    },

    setSuccessMessage: function() {
        alert('Album has been created :)')
    },

    collectSongs: function() {
        let songs = [], song, name, duration, id

        $.each( $('.song-item'), ( index, item ) => {
            song = $(item)

            name = song.find('input[name=song-name]').val()
            duration = song.find('input[name=song-time]').val()
            id = song.find('input[name=youtube-url]').val()

            if ( name !== '' && duration !== '' && id !== '' )
                songs.push({ name, id, duration })
        })

        return songs
    },
    
    collectGenres: function () {
        let inputs = $('#album-genres div input[type=checkbox]:checked')
        let ids = []

        $.each(inputs, ( i, input ) => {
            ids.push( $( input ).val() )
        })

        return ids
    },

    saveAlbum: function( e ) {
        e.preventDefault()
        let album = this.collectValues()

        if ( !album ) {
            this.scrollTop()
            return
        }

        album.genres = this.collectGenres()
        console.log( album )
        return

        // let songs = this.collectSongs()
        //
        // if ( !album || !songs )
        //     return
        //
        // album.songs = songs
        AlbumAPIService.saveAlbum( album ).then( this.setSuccessMessage )
    },

    addSong: function( e ) {
        if ( e )
            e.preventDefault()
        let html = AlbumFormTemplates.songItem()

        $('#add-album-playlist-form').append( html )
    },

    removeSongItem: function( e ) {
        e.preventDefault()
        let item = $(this).closest('.song-item')
        item.fadeOut('slow', () => item.remove())
    },
    
    addSongsInputs: function ( items = 5 ) {
        for ( let i = 1; i <= items; i++ ) {
            this.addSong()
        }
    },

    setCoverImage: function( img ) {
        $('#image-cover-preview img').attr('src', img)
    },

    changeCoverImage: function() {
        let img = $('#image-url').val()
        let regex = new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$")

        if ( img === '' ) {
            this.setCoverImage( PREVIEW_IMG )
            return
        }

        if ( regex.test( img ) )
            this.setCoverImage( img )
    },

    setGenres: function() {
        AlbumAPIService.getGenres().then(genres => {
            let html = AlbumFormTemplates.genres( genres )
            $('#album-genres div').html( html )
        })
    },

    searchYoutubeVideo: function( e ) {
        let $input = $( e.target )

        // debounce(function () {
            let youtube_id = $input.val()

            AlbumAPIService.searchYoutubeID( youtube_id ).then(video => {
                $input.closest('.song-item').find('input[name=song-name]').val( video.title )
                $input.closest('.song-item').find('input[name=song-time]').val( video.duration )
            })
        // }, 300)
    },

    bindEvents: function() {
        $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))
        $('#add-another-song').on('click', this.addSong)
        $('#image-url').on('blur', $.proxy( this.changeCoverImage, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        $('input[name=youtube-url]').on('keyup', this.searchYoutubeVideo.bind( this ))
    },

    init: function() {
        this.addSongsInputs()
        this.bindEvents()
        this.setGenres()
    }
}

export default AlbumForm