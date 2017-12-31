import $ from 'jquery'

const AlbumGenres = {
    removeTag: function ( e ) {
        $( e.target ).parents('.tag').remove()
    },

    addTag: function ( tagName ) {
        let html = `<span class="tag">  
                        ${tagName}<a>×</a>
                        <input name="tags" type="hidden" value="${tagName}">
                    </span>`

        $('.tags-container').append( html )
        $('#search-genres').val('')
    },

    searchGenre: function ( term ) {

    },

    detectEvent: function ( e ) {
        let $input_value = $( e.target ).val()

        if ( e.keyCode == 13 ) {
            this.addTag( $input_value )
            return
        }

        this.searchGenre( $input_value )
    },

    setGenreValue: function( e ) {
        $('#search-genres').val( $( e.target ).text() )
    },

    bindEvents: function () {
        $('#tags').on('click', '.tag a', $.proxy( this.removeTag, this ))
        $('#search-genres').on('keyup', $.proxy( this.detectEvent, this ))
        $('#genres-results').on('click', 'li' ,$.proxy( this.setGenreValue, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default AlbumGenres