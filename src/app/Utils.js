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

            let callNow = immediate && !timeout
            clearTimeout( timeout )
            timeout = setTimeout( later, wait )

            if ( callNow )
                func.apply( context, args )
        }
    },

    calculateTime: function( seconds ) {
        return Math.floor( seconds / 60 ) + ':' + seconds % 60
    }
}

export default Utils