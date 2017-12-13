import AlbumFormTemplates from './Templates/AlbumFormTemplates'
import Utils from './Utils'

const Validator = {
    regexes: {
        'album-name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
        'album-year': new RegExp("^[0-9]{4}$"),
        'album-description': new RegExp("^[A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
    },

    error_messages: {
        'album-name': 'The name of album must begin with a big letter',
        'album-artist': 'The name of album artist must begin with a big letter',
        'album-image': 'The image of album cover must be a URL that ends with .JPG, .JPEG, .GIF or .PNG',
        'album-year': 'The year of album must be 4 characters',
        'album-description': 'The description of album must begin with a big letter',
        'songs_youtube_id': 'The album must contain at least 5 songs',
        'duplicate_song': 'Song is already in list'
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
            let html = AlbumFormTemplates.validateInput( error_message )
            input.parent('.form-group').prepend( html )
            return false
        }

        return true
    },

    validateInputs: function ( inputs_arr, min_length, error_key, error_container ) {
        error_container.find('>.error-message:first-of-type').remove()

        if ( inputs_arr.length < min_length ) {
            let html = AlbumFormTemplates.validateInput( this.error_messages[ error_key ] )
            error_container.prepend( html )
        }
    },

    validateDuplications: function ( arr_to_check, key_to_check, value_to_check, error_key, error_container ) {
        error_container.find('.error-message').remove()
        let has_duplications = Utils.isInArrayOfObjects( arr_to_check, key_to_check, value_to_check)

        if ( has_duplications ) {
            let html = AlbumFormTemplates.validateInput( this.error_messages[ error_key ] )
            error_container.prepend( html )
        }

        return has_duplications
    }
}

export default Validator