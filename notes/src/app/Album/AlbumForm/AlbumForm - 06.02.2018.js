import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import AlbumValidator from './AlbumValidator'
import Utils from '../Utils'
import EditAlbum from './EditAlbum'
import AlbumGenres from './AlbumGenres'
import SearchAPIService from "../APIServices/SearchAPIService"
import SearchResultsTemplates from "../Templates/SearchResultsTemplates"

const PREVIEW_IMG = 'http://localhost:3000/images/preview.png'

const AlbumForm = {
    setTitleAddNewAlbum: function () {
        let html = AlbumFormTemplates.titleAddNewAlbum()
        $('#add-new-album-title').html( html )
    },

    setTitleAddAlbumPlaylist: function () {
        let html = AlbumFormTemplates.titleAddAlbumPlaylist()
        $('#add-album-playlist-title').html( html )
    },

    searchArtist: function () {
        let term = $('#album-artist').val()

        if ( term.length < 2 ) {
            return
        }

        SearchAPIService.searchArtist( term ).then(( results, text_status, xhr ) => {
            let html

            if ( xhr.status === 204 )
                html = AlbumFormTemplates.noSuggestions()
            else
                html = AlbumFormTemplates.artistSuggestions( results.album_artist )

            $('#artist-results').html( html )
        })
    },

    clearArtistResult: function () {
        $('#artist-results').find('ul, li').remove()
    },

    setCoverImage: function( img ) {
        $('#image-cover-preview img').attr('src', img)
    },

    changeCoverImage: function() {
        let img = $('#album-image').val()
        let regex = new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp|tif?f)$")

        if ( img === '' ) {
            this.setCoverImage( PREVIEW_IMG )
            return
        }

        if ( regex.test( img ) )
            this.setCoverImage( img )
    },

    addSong: function( e, song = false ) {
        if ( e )
            e.preventDefault()

        let html = AlbumFormTemplates.songItem( song )
        $('#add-album-playlist-form').append( html )
    },

    addSongsInputs: function ( items = 5, songs = [] ) {
        for ( let i = 0; i < items; i++ ) {
            this.addSong( false, songs[ i ] )
        }
    },

    removeSongItem: function( e ) {
        e.preventDefault()
        let item = $(this).closest('.song-item')
        item.fadeOut('slow', () => item.remove())
    },

    searchYoutubeVideo: function( e ) {
        let $input = $( e.target )
        $input.parent().find('.error-message').remove()
        $input.parents('.song-item').removeClass('error')

        let youtube_id = $input.val()

        AlbumAPIService.searchYoutubeID( youtube_id ).then(
            video => {
                $input.closest('.song-item').find('input[name=song_time]').val( video.duration )
                $input.closest('.song-item').find('.song-time').html( Utils.calculateTime( video.duration ) )
            },
            error => {
                let html = AlbumFormTemplates.errorMessage( error.responseJSON.error )
                $input.parent().prepend( html )
            })
    },

    resetFields: function () {
        $('.form-group span').text('')
        this.setCoverImage( PREVIEW_IMG )
        $('#tags-container').find('.tag').remove()
        $('input.error, div.error, textarea.error, span.error').removeClass('error')
        $('input.success, div.success, textarea.success, span.success').removeClass('success')
        $('#add-new-album-form, #add-album-playlist-form').find('.error-message').remove()

        return this.scrollTop( $('#main-container') )
    },

    collectValues: function() {
        let errors = false
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')
        let album = {}
        let i, input, input_name, input_value

        inputs.removeClass('error')
        $('#add-new-album-form .error-message').remove()
        $('#add-new-album-form span.error').remove()

        for ( i = 0; i < inputs.length; i++ ) {
            // Collect the element
            input = inputs [ i ]

            // Convert the element from native JS element to a jQuery element
            input = $( input )

            input_name = input.attr('name')
            input_value = input.val()

            // If there is an error with the regex, set errors to be true, mean we have errors in the validation
            if ( !AlbumValidator.validateField( input ) )
                errors = true

            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        album.genres = this.collectGenres()

        if ( !AlbumValidator.validateInputs( album.genres, 1, 'genres', $('#album-genres') ) ) {
            $('#tags').addClass('error')
            errors = true
        }

        if ( errors )
            return false

        return album
    },

    collectGenres: function () {
        let input = $('#tags input[type=hidden]')
        let genres = []

        $.each(input, ( i, input ) => {
            genres.push( $( input ).val() )
        })

        return genres
    },

    collectSongs: function() {
        let has_duplications = false, has_errors = false, songs = []

        $('.song-item, .song-item *').removeClass('error')
        $('#add-album-playlist-form .error-message').remove()

        $.each( $('.song-item'), ( index, item ) => {
            let song, song_youtube, song_name, song_time

            song = $( item )
            song_youtube = song.find('input[name=song_youtube]').val()
            song_name = song.find('input[name=song_name]').val()
            song_time = song.find('input[name=song_time]').val()

            if ( song_youtube !== '' && song_time !== '' ) {
                if ( songs.length === 0 ) {
                    if ( AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                        songs.push({ song_youtube, song_name, song_time })
                    }

                    return
                }

                has_duplications = AlbumValidator.validateDuplications( songs, 'song_youtube', song_youtube, 'duplicate_song', $( item ) )

                if ( !has_duplications && AlbumValidator.validateField( song.find('input[name=song_name]') ) ) {
                    songs.push({ song_youtube, song_name, song_time })

                    return
                }
            }
        })

        if ( has_duplications || !AlbumValidator.validateInputs( songs, 5, 'song_youtube_id', $('#add-album-playlist-form') ) )
            return false

        return songs
    },

    scrollTop: function ( $el ) {
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    },

    validateAlbum: function () {
        let album = this.collectValues()
        let songs = this.collectSongs()

        if ( !album ) {
            this.scrollTop( $('#main-container') )
            return false
        }

        if ( !songs ) {
            this.scrollTop( $('#add-album-playlist-details') )
            return false
        }

        album.songs = songs
        console.log( JSON.stringify(album) )

        return album
    },

    validateField: function ( e ) {
        let $input = $( e.target )

        $input.siblings('.error-message').remove()

        if ( AlbumValidator.validateField( $input ) ) {
            $input.removeClass('error').addClass('success')
            $input.siblings('.error-message').remove()
        }
    },

    validateGenres: function ( e ) {
        let $input = $('#album-genres')

        if ( AlbumValidator.validateInputs( this.collectGenres(), 1, 'genres', $input ) ) {
            $input.find('#tags').removeClass('error').addClass('success')
            $input.find('.error-message').remove()
        }
    },

    setSuccessMessage: function() {
        // alert('Album has been created :)')
        let html = AlbumFormTemplates.successMessage()
        $('.modal-dialog').html( html )
        $('body').addClass('modal-open').css('padding-right', '17px')
        $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px', 'overflow-y': 'scroll'} )
    },

    saveAlbum: function( e ) {
        e.preventDefault()
        let album = this.validateAlbum()

        if ( !album )
            return

        AlbumAPIService.saveAlbum( album ).then(
            this.setSuccessMessage,
            ( error ) => {
                let input, error_message, html
                let input_name = error.responseJSON.reason.message.split(" ")[0]

                switch ( input_name ) {
                    case 'song_youtube':
                        let youtube_code = error.responseJSON.reason.error.split(" ")[1].replace(/['\']+/g, '')
                        console.log( youtube_code )

                        input = $('input[name=song_youtube]').filter(function () {
                            return this.value === youtube_code
                        })

                        input.addClass('error')
                        error_message = 'Song already exist in app'
                        html = AlbumFormTemplates.errorMessage( error_message )
                        input.parent('.form-group').prepend( html )
                        this.scrollTop( $('#add-album-playlist-details') )
                        break

                    default:
                        input = $(`input[name=${ input_name }`)

                        input.addClass('error')
                        error_message = `${ Utils.capitalize( input_name.replace('_', ' ') ) } must be unique`
                        html = AlbumFormTemplates.errorMessage( error_message )
                        input.parent('.form-group').prepend( html )
                        this.scrollTop( $('#main-container') )
                        break
                }
            }
        )
    },

    bindEvents: function() {
        if ( !this.hasAlbum )
            $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))

        $('#add-another-song-button').on('click', $.proxy( this.addSong, this ))
        $('#reset-fields-button').on('click', $.proxy( this.resetFields, this ))
        $('#album-artist').on('keyup', Utils.debounce( $.proxy( this.searchArtist, this ), 500) )
        $('#album-artist').on('blur', $.proxy( this.clearArtistResult, this ))
        $('#album-image').on('blur', $.proxy( this.changeCoverImage, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', Utils.debounce( $.proxy( this.searchYoutubeVideo, this ), 500) )
        $('#add-new-album-form .form-group').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
        $('#add-album-playlist-form .form-group').on('blur', 'input.error, span.error', $.proxy( this.validateField, this ))
    },

    init: function( getAlbum = false ) {
        this.hasAlbum = getAlbum
        this.bindEvents()
        this.setTitleAddNewAlbum()
        this.setTitleAddAlbumPlaylist()

        if ( this.hasAlbum )
            EditAlbum.init()
        else
            this.addSongsInputs()

        AlbumGenres.init()
    }
}

export default AlbumForm