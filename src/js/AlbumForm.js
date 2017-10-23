import $ from 'jquery'
import DataService from './DataService'
import Templates from './Templates/Templates'

class AlbumForm {
    constructor() {
        this.bindEvents()
        this.dataService = new DataService()
    }

    collectValues() {
        let regexes = {
            name: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            artist: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
            img: new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            year: new RegExp("^[0-9]{4}$"),
            description: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
        }

        let errors = false
        let inputs = $('#add-new-album-form input, #add-new-album-form textarea')
        let album = {}
        let i, input, input_name, input_value

        inputs.removeClass('error-value')

        for ( i = 0; i < inputs.length; i++ ) {
            // Collect the element
            input = inputs [ i ]

            // Convert the element from native JS element to a jQuery element
            input = $( input )
            input_name = input.attr('name')
            input_value = input.val()

            // Get the matched regex from the regexes object
            // Test the value of the input
            if ( !regexes[ input_name ].test( input_value ) ) {
                // If there is an error with the regex, set errors to be true, mean we have errors in the validation
                errors = true
                // Add class of error
                input.addClass('error-value')
            }

            // Add the property of the input name inside the album object
            album[ input_name ] = input_value
        }

        if ( errors )
            return false

        return album
    }

    setSuccessMessage() {
        alert('Album has been created :)')
    }

    collectSongs() {
        let songs_container = $('#add-album-playlist-form .col-md-12 .song')
        let songs_inputs, i, songs = []

        for ( i = 0; i < songs_container.length; i++ ) {
            songs_inputs = $( songs_container[ i ] ).find('input')
            songs.push({
                name: $(songs_inputs[0]).val(),
                url: $(songs_inputs[1]).val()
            })
        }

        return songs
    }

    saveAlbum( e ) {
        e.preventDefault()
        let el = $(e.target),

            album = this.collectValues(),
            songs = this.collectSongs()

        if ( !album || !songs )
            return

        album.songs = songs
        this.dataService.saveAlbum( album ).then( this.setSuccessMessage )
    }

    addSong( e ) {
        e.preventDefault()
        let html = Templates.songItem()

        $('#add-album-playlist-form').append( html )
    }

    setCoverImage( img ) {
        $('#image-cover-preview img').attr('src', img)
    }

    changeCoverImage() {
        let img = $('#image-url').val()
        let regex = new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$")

        if ( regex.test( img ) )
            this.setCoverImage( img )
    }

    bindEvents() {
        $('#save-album').on('click', $.proxy( this.saveAlbum, this ))
        $('#add-another-song').on('click', this.addSong)
        $('#image-url').on('blur', $.proxy( this.changeCoverImage, this ))
    }
}

export default AlbumForm