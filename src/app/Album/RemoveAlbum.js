import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from './../Templates/AlbumTemplates'
import Router from '../Router'

const RemoveAlbum = {
    currentPage: false,

    removeMessage: function ( e ) {
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        AlbumAPIService.getAlbumById( album_id ).then(album => {
            let html = AlbumTemplates.removeDialog( album )

            $('.modal-dialog').html( html )
            $('body').addClass('modal-open').css('padding-right', '17px')
            $('#modal').addClass('in').css({'display': 'block', 'padding-right': '0', 'overflow-y': 'scroll'})
        })
    },

    confirmRemoveAlbum: function ( e ) {
        let album_id = $( e.target ).data('album-id')

        AlbumAPIService.deleteAlbum( album_id ).then(() => {
            $('.modal-dialog').fadeOut('slow', () => {
                let html = AlbumTemplates.removeSuccessDialog( this.currentPage, album_id )
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    cancelRemove: function () {
        $('body').removeClass('modal-open').css('padding-right', '0')
        $('#modal').removeClass('in').css({'display': 'none', 'padding-right': '0'})
    },

    updateCurrentPage: function () {
        this.currentPage = Router.getRoute()
    },

    handleRemove: function () {
        location.reload()
    },

    bindEvents: function () {
        $(window).bind('hashchange',$.proxy( this.updateCurrentPage, this ))
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.removeMessage, this ))
        $('.modal-dialog').on('click', '#approve-remove', $.proxy( this.confirmRemoveAlbum, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelRemove, this ))
        $('.modal-dialog').on('click', '[data-action=handle-remove]', $.proxy( this.handleRemove, this ))
    },

    init: function () {
        this.bindEvents()
        this.updateCurrentPage()
    }
}

export default RemoveAlbum