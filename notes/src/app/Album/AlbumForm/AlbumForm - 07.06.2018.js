import $ from 'jquery'
import AlbumGenres from './AlbumGenres'
import AlbumValidator from './AlbumValidator'
import EditAlbum from './EditAlbum'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import SearchAPIService from '../APIServices/SearchAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Utils from '../Utils'

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

        if ( term.length < 2 )
            return

        SearchAPIService.searchArtist( term ).then(( results, text_status, xhr ) => {
            let html

            if ( xhr.status === 204 )
                html = AlbumFormTemplates.noSuggestions()
            else
                html = AlbumFormTemplates.artistSuggestions( results.results )

            $('#artist-results').html( html )
        })
    },

    setValueArtistResult: function ( e ) {
        let selected_artist = $( e.target ).text()
        $('#album-artist').val( selected_artist )
    },

    clearArtistResults: function () {
        setTimeout(() => {
            $('#artist-results').find('ul, li').remove()
        }, 500)
    },

    setCoverImage: function ( img ) {
        $('#image-cover-preview img').attr('src', img)
    },

    changeCoverImage: function () {
        let img = $('#album-image').val()
        let regex = new RegExp(/^http?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$/)

        if ( regex.test( img ) )
            this.setCoverImage( img )

        if ( img === '' ) {
            this.setCoverImage( PREVIEW_IMG )
            return
        }
    },

    searchYoutubeVideo: function ( e ) {
        let $input = $( e.target )
        let youtube_id = $input.val()

        $input.parents('.song-item').find('.error-message').remove()
        $input.parents('.song-item').removeClass('error')

        AlbumAPIService.getYoutubeID( youtube_id ).then(
            video => {
                $input.closest('.song-item').find('input[name=song_time]').val( video.duration )
                $input.closest('.song-item').find('.song-time').html( Utils.calculateTime( video.duration ) )
            },
            error => {
                let html = AlbumFormTemplates.errorMessage( error.responseJSON.error )
                $input.parent().prepend( html )
            })
    },

    removeSongItem: function ( e ) {
        e.preventDefault()

        let item = $(this).closest('.song-item')

        item.fadeOut('slow', () => item.remove())
    },

    addSong: function ( e, song = false ) {
        if ( e )
            e.preventDefault()

        let html = AlbumFormTemplates.songItem( song )
        $('#add-album-playlist-form').append( html )
    },

    addSongsInputs: function ( items = 5, songs = [] ) {
        for ( let i = 0; i < items; i++ )
            this.addSong( false, songs[ i ] )
    },

    collectValues: function () {
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

    collectSongs: function () {
        let has_duplications = false, songs = []

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
            } else {
                AlbumValidator.validateField( song.find('input[name=song_youtube]') )
                AlbumValidator.validateField( song.find('input[name=song_name]') )
            }
        })

        if ( has_duplications || !AlbumValidator.validateInputs( songs, 5, 'song_youtube_id', $('#add-album-playlist-form') ) )
            return false

        return songs
    },

    validateAlbum: function () {
        let album = this.collectValues()
        let songs = this.collectSongs()

        if ( !album ) {
            Utils.scrollTop( $('#main-container') )
            return false
        }

        if ( !songs ) {
            Utils.scrollTop( $('#add-album-playlist-details') )
            return false
        }

        album.songs = songs

        return album
    },

    validateField: function ( e ) {
        let $input = $( e.target )

        $input.siblings('.error-message').remove()
        $input.removeClass('error')

        if ( AlbumValidator.validateField( $input ) ) {
            $input.removeClass('error').addClass('success')
            $input.siblings('.error-message').remove()
        }
    },

    validateGenres: function () {
        let $input = $('#album-genres')

        if ( AlbumValidator.validateInputs( this.collectGenres(), 1, 'genres', $input ) ) {
            $input.find('#tags').removeClass('error').addClass('success')
            $input.find('.error-message').remove()
        }
    },

    setSuccessMessage: function () {
        let html = AlbumFormTemplates.successMessage()
        $('.modal-dialog').html( html )

        Utils.modalOpen()
    },

    resetFields: function ( e ) {
        e.preventDefault()

        $('.form-group span').text('')
        this.setCoverImage( PREVIEW_IMG )
        $('#tags-container').find('.tag').remove()
        $('input.error, div.error, textarea.error, span.error').removeClass('error')
        $('input.success, div.success, textarea.success, span.success').removeClass('success')
        $('#add-new-album-form').find('.error-message').remove()
        $('#add-album-playlist-form').find('.error-message').remove()

        $.each( $('input, textarea'), ( index, input ) => {
            $(input).val('')
        })

        return Utils.scrollTop( $('#main-container') )
    },

    emptyValues: function ( e ) {
        let $input = $( e.target )

        if ( $input.closest('.song-item').find('input[name=song_time]').val('') )
            $input.closest('.song-item').find('.song-time').html('')
    },

    saveAlbum: function ( e ) {
        e.preventDefault()

        let album = this.validateAlbum()

        if ( !album )
            return

        let $input = $( e.target )

        $input.siblings('.error-message').remove()
        $input.removeClass('error')

        AlbumAPIService.saveAlbum( album ).then(
            this.setSuccessMessage,
            ( error ) => {
                let input, error_message, html
                let input_name = error.responseJSON.reason.message.split(' ')[0]

                switch ( input_name ) {
                    case 'Validation':
                        let album_year = error.responseJSON.reason.error.split(' ')[0]
                        input = $('input[name=album_year]')

                        input.removeClass('success')
                        input.addClass('error')
                        error_message = `Validation max or min on ${( album_year.replace('_', ' ') )} failed`

                        html = AlbumFormTemplates.errorMessage( error_message )
                        input.parent('.form-group').prepend( html )
                        Utils.scrollTop( $('#main-container') )
                        break

                    case 'song_youtube':
                        let youtube_code = error.responseJSON.reason.error.split(' ')[1].replace(/['\']+/g, '')

                        input = $('input[name=song_youtube]').filter(function () {
                            return this.value === youtube_code
                        })

                        input.removeClass('success')
                        input.addClass('error')
                        error_message = 'Song already exist in app'
                        html = AlbumFormTemplates.errorMessage( error_message )
                        input.parent('.form-group').prepend( html )
                        Utils.scrollTop( $('#add-album-playlist-details') )
                        break

                    default:
                        input = $(`input[name=${input_name}]`)

                        input.removeClass('success')
                        input.addClass('error')
                        error_message = `${Utils.capitalize( input_name.replace('_', ' ') )} must be unique`
                        html = AlbumFormTemplates.errorMessage( error_message )
                        input.parent('.form-group').prepend( html )
                        Utils.scrollTop( $('#main-container') )
                        break
                }
            }
        )
    },

    bindEvents: function () {
        $('#album-artist').on('keyup', Utils.debounce( $.proxy( this.searchArtist, this ), 500) )
        $('#album-artist').on('blur', $.proxy( this.clearArtistResults, this ))
        $('#artist-results').on('click', 'li', $.proxy( this.setValueArtistResult, this ))
        $('#album-image').on('blur', $.proxy( this.changeCoverImage, this ))
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', Utils.debounce( $.proxy( this.searchYoutubeVideo, this ), 500) )
        $('#add-album-playlist-form').on('keyup', 'input[name=song_youtube]', $.proxy( this.emptyValues, this ))
        $('#add-another-song-button').on('click', $.proxy( this.addSong, this ))
        $('#add-new-album-form').on('blur', 'input.error, textarea.error', $.proxy( this.validateField, this ))
        $('#add-album-playlist-form').on('blur', 'input.error, .song-item.error', $.proxy( this.validateField, this ))
        $('#reset-fields-button').on('click', $.proxy( this.resetFields, this ))

        if ( !this.hasAlbum ) {
            $('#finish-and-save-button').on('click', $.proxy( this.saveAlbum, this ))
            $('#add-album-playlist-form').on('click', '.remove-icon', this.removeSongItem)
        }
    },

    init: function ( getAlbum = false ) {
        this.setTitleAddNewAlbum()
        this.setTitleAddAlbumPlaylist()
        this.hasAlbum = getAlbum

        if ( this.hasAlbum )
            EditAlbum.init()
        else
            this.addSongsInputs()

        AlbumGenres.init()
        this.bindEvents()
    }
}

export default AlbumForm