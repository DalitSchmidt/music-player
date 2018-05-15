import $ from 'jquery'

const Utils = {
    calculateTime: function ( seconds ) {
        let minutes = Math.floor( seconds / 60 )
        let seconds_to_display = seconds % 60

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds_to_display = seconds_to_display < 10 ? '0' + seconds_to_display : seconds_to_display

        return minutes + ':' + seconds_to_display
    },

    cancelDelete: function () {
        $('body').removeClass('modal-open').css('padding-right', '0')
        $('#modal').removeClass('in').css({'display': 'none', 'padding-right': '0'})
    },

    capitalize: function ( s ) {
        return s && s[0].toUpperCase() + s.slice(1)
    },

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

    getAlbumID: function () {
        return location.hash.substring(1).split('/')[1]
    },

    isInArrayOfObjects: function ( arr_to_check, key_to_check, value_to_check ) {
        if ( arr_to_check.length === 0 )
            return false

        let new_arr = arr_to_check.filter(item => item[ key_to_check ] === value_to_check)

        return new_arr.length > 0
    },

    openModal: function () {
        $('body').addClass('modal-open').css('padding-right', '17px')
        $('#modal').addClass('in').css({'display': 'block', 'padding-right': '0', 'overflow-y': 'scroll'})
    },

    scrollTop: function ( $el ) {
        $('html, body').animate({ scrollTop: $el.offset().top }, 800)
    }
}

export default Utils