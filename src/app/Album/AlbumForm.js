import $ from 'jquery'
// import 'jquery-ui/themes/base/core.css'
// import 'jquery-ui/themes/base/theme.css'
// import 'jquery-ui/themes/base/selectable.css'
// import 'jquery-ui/ui/core'
// import * as ui from 'jquery-ui/ui/widgets/autocomplete'
import ui from 'jquery-ui-browserify'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Validator from '../Validator'
import Utils from '../Utils'

const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

const AlbumForm = {
    collectValues: function() {
        let errors = false
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')
        let album = {}
        let i, input, input_name, input_value

        inputs.removeClass('error')
        $('#add-new-album-form span.error').remove()

        for ( i = 0; i < inputs.length; i++ ) {
            // Collect the element
            input = inputs [ i ]

            // Convert the element from native JS element to a jQuery element
            input = $( input )

            input_name = input.attr('name')
            input_value = input.val()

            if( !Validator.validateField( input ) )
                // If there is an error with the regex, set errors to be true, mean we have errors in the validation
                errors = true

            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        if ( errors )
            return false

        return album
    },

    scrollTop: function ( $el ) {
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    },

    setSuccessMessage: function() {
        alert('Album has been created :)')
    },

    collectSongs: function() {
        let songs = [], song, name, duration, id

        $.each( $('.song-item'), ( index, item ) => {
            song = $( item )

            name = song.find('input[name=song-name]').val()
            duration = song.find('input[name=song-time]').val()
            id = song.find('input[name=youtube-url]').val()

            if ( name !== '' && duration !== '' && id !== '' ) {

                let isIdExists = Utils.isInArrayOfObjects( songs, 'id', id )
                songs.push({ name, id, duration })
                console.log( songs )
            }
        })

        Validator.validateInputs( songs, 5, 'songs_youtube_id', $('#add-album-playlist-form') )
        return songs.length ? songs : false
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
            this.scrollTop( $('#add-new-album') )
            return
        }

        let songs = this.collectSongs()
        if( !songs ) {
            this.scrollTop( $('#add-album-playlist-title') )
            return
        }

        album.genres = this.collectGenres()


        album.songs = songs
        // Temporary!!!
        album.genres = ['Pop']
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

    // setGenres: function() {
    //     AlbumAPIService.getGenres().then(genres => {
    //         let html = AlbumFormTemplates.genres( genres )
    //         $('#album-genres div').html( html )
    //     })
    // },

    searchYoutubeVideo: function( e ) {
        let $input = $( e.target )
        $input.parent().find('.error-message').remove()

        let youtube_id = $input.val()

        AlbumAPIService.searchYoutubeID( youtube_id ).then(
            video => {
                $input.closest('.song-item').find('input[name=song-name]').val( video.title )
                $input.closest('.song-item').find('input[name=song-time]').val( video.duration )
            },
            error => {
                let html = AlbumFormTemplates.validateInput( error.responseJSON.error )
                $input.parent().prepend( html )
            })
    },

    validateField: function ( e ) {
        let $input = $( e.target )
        console.log( $input )
        if( Validator.validateField( $input ) ){
            $input.removeClass('error')
            $input.siblings('.error-message').remove()
        }
    },

    bindEvents: function() {
        $('#add-new-album').on('submit', $.proxy( this.saveAlbum, this ))
        $('#add-another-song').on('click', this.addSong)
        $('#image-url').on('blur', $.proxy( this.changeCoverImage, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        $('input[name=youtube-url]').on('keyup', Utils.debounce( $.proxy( this.searchYoutubeVideo, this ), 1000) )
        $('#add-new-album-form .form-group').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
    },

    init: function( getAlbum = false ) {
        this.addSongsInputs()
        this.bindEvents()
        // this.setGenres()
        // this.genresBootstrap()
    }
}

export default AlbumForm