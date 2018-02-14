import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from './../Templates/AlbumTemplates'
import Router from '../Router'

const DeleteAlbum = {
    currentPage: false,

    deleteMessage: function ( e ) {
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        AlbumAPIService.getAlbumById( album_id ).then(album => {
            let html = AlbumTemplates.deleteDialog( album )

            $('.modal-dialog').html( html )
            $('body').addClass('modal-open').css('padding-right', '17px')
            $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px', 'overflow-y': 'scroll'} )
        })
    },

    confirmAlbumDelete: function ( e ) {
        let album_id = $( e.target ).data('album-id')

        AlbumAPIService.deleteAlbum( album_id ).then(() => {
            $('.modal-dialog').fadeOut('slow', () => {
                let html = AlbumTemplates.deleteSuccessDialog( this.currentPage, album_id )
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    cancelDelete: function () {
        $('body').removeClass('modal-open').css('padding-right', '0')
        $('#modal').removeClass('in').css( {'display': 'none', 'padding-right': '0'} )
    },

    updateCurrentPage: function () {
        this.currentPage = Router.getRoute()
    },

    handleDelete: function () {
        location.reload()
    },

    bindEvents: function () {
        $(window).bind('hashchange',$.proxy( this.updateCurrentPage, this ))
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmAlbumDelete, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelDelete, this ))
        $('.modal-dialog').on('click', '[data-action=handle-delete]', $.proxy( this.handleDelete, this ))
    },

    init: function () {
        this.bindEvents()
        this.updateCurrentPage()
    }
}

export default DeleteAlbum