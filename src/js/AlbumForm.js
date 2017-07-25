import $ from 'jquery'
import Templates from './Templates'
import DataService from "./DataService";

export default class AlbumForm {
    constructor( dataService ) {
        this.bindEvents()
        this.dataService = new DataService();
    }

    collectValues() {
        let regexes = {
            name: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*"),
            artist: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*"),
            img: new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            year: new RegExp("^[0-9]{4}$"),
            description: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*")
        }
            errors = false,
            inputs = $('#album-form input, #album-form textarea'),
            album = {},
            i, input, input_name, input_value

        inputs.removeClass('error-value')

        for ( i = 0; i < inputs.length; i++ ) {
            input = $( inputs [ i ] )
            input_name = input.attr('name')
            input_value = input.val()

            if ( !regexes[ input_name ].test( input_value ) ) {
                errors = true
                input.addClass('error-value')
            }

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
        let songs_container = $('#songs-form .song')
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

        $('#songs-form').append( html )
    }

    bindEvents() {
        $('#save-album').on('click', $.proxy( this.saveAlbum, this ))
        $('#add-song').on('click', this.addSong)
    }
}