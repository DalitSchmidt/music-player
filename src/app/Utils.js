const Utils = {
    debounce: function ( func, wait, immediate ) {
        let timeout

        return function () {
            let context = this, args = arguments

            let later = function () {
                timeout = null
                if ( !immediate )
                    func.apply( context, args )
            }

            let call_now = immediate && !timeout
            clearTimeout( timeout )
            timeout = setTimeout( later, wait )

            if ( call_now )
                func.apply( context, args )
        }
    },

    calculateTime: function( seconds ) {
        // if ( ( seconds < 10 ? "0" : "" ) + seconds )

        return Math.floor( seconds / 60 ) + ':' + seconds % 60
    },

    isInArrayOfObjects: function ( arr_to_check, key_to_check, value_to_check ) {
        let new_arr = arr_to_check.filter( item => item[ key_to_check ] === value_to_check )
        return new_arr.length > 0
    }
}

export default Utils