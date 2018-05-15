import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Utils from '../Utils'

const AlbumValidator = {
    regexes: {
        'album_name': new RegExp(/^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/),
        'album_artist': new RegExp(/^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/),
        'album_image': new RegExp(/^http?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$/),
        'album_year': new RegExp(/^[0-9]{4}$/),
        'album_description': new RegExp(/^[A-Z]/),
        'song_youtube': new RegExp(/([A-Za-z0-9\\-_]{11})/),
        'song_name': new RegExp(/^[A-Z0-9][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/)
    },

    error_messages: {
        'album_name': 'The name of album must begin with a capital letter',
        'album_artist': 'The name of album artist must begin with a capital letter',
        'album_image': 'The image of album cover must be a URL that ends with .JPG, .JPEG, .GIF, .PNG, .BMP, .TIF, .TIFF or .SVG',
        'album_year': 'The year of album must be 4 characters',
        'genres': 'The album must contain at least 1 genre',
        'album_description': 'The description of album must begin with a capital letter',
        'song_youtube_id': 'The album must contain at least 5 songs',
        'song_name': 'The name of song must begin with a capital letter or with a numbers',
        'duplicate_song': 'The song is already in list',
        'song_youtube': 'The field cannot be empty'
    },

    validateField: function ( input ) {
        let input_name = input.attr('name')
        let input_value = input.val()

        // Get the matched regex from the regexes object
        // Test the value of the input
        if ( !this.regexes[ input_name ].test( input_value ) ) {
            // Add class of error
            input.addClass('error')

            let error_message = this.error_messages[ input_name ]
            let html = AlbumFormTemplates.errorMessage( error_message )

            if ( !input.parents('.song-item').find('.error-message').length ) {
                input.parent('.form-group').prepend( html )
                input.find('.song-item').parents('.error-message').prepend( html )
            }

            return false
        }

        return true
    },

    validateInputs: function ( inputs_arr, min_length, error_key, error_container ) {
        error_container.find('>.error-message:first-of-type').remove()

        if ( inputs_arr.length < min_length ) {
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            error_container.prepend( html )

            return false
        }

        return true
    },

    validateDuplications: function ( arr_to_check, key_to_check, value_to_check, error_key, error_container ) {
        error_container.find('.error-message').remove()

        let has_duplications = Utils.isInArrayOfObjects( arr_to_check, key_to_check, value_to_check)

        if ( has_duplications ) {
            let html = AlbumFormTemplates.errorMessage( this.error_messages[ error_key ] )
            error_container.removeClass('success').addClass('error').prepend( html )
        }

        return has_duplications
    }
}

export default AlbumValidator