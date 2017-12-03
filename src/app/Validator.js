const Validator = {
    regexes: {
        'album-name': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-artist': new RegExp("^[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*"),
        'album-image': new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
        'album-year': new RegExp("^[0-9]{4}$"),
        'album-description': new RegExp("^[A-Za-z\s?:\s[A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*")
    },

    error_messages: {
        'album-name': 'error 1',
        'album-artist': 'error 2',
        'album-image': 'error 3',
        'album-year': 'error 4',
        'album-description': 'error 5'
    },

    validateField: function ( input ) {
        let input_name = input.attr('name')
        let input_value = input.val()

        // Get the matched regex from the regexes object
        // Test the value of the input
        if ( !this.regexes[ input_name ].test( input_value ) ) {
            // If there is an error with the regex, set errors to be true, mean we have errors in the validation
            // Add class of error
            input.addClass('error')
            input.parent().prepend(`<span class="error">${this.error_messages[input_name]}</span>`)
            return false
        }

        return true
    }


}

export default Validator