import AlbumFormTemplates from './Templates/AlbumFormTemplates'

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
        'album-description': 'The description of album must begin with a big letter'
    },

    validateField: function ( input ) {
        let input_name = input.attr('name')
        let input_value = input.val()

        // Get the matched regex from the regexes object
        // Test the value of the input
        if ( !this.regexes[ input_name ].test( input_value ) ) {
            // Add class of error
            input.addClass('error')
            let html = AlbumFormTemplates.validateInput()
            $('.error-message').html( html )

            let errorMessage = this.error_messages[input_name]

            input.parent().prepend( html + `${errorMessage}` )
            return false
        }

        return true
    }
}

export default Validator