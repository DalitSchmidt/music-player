import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from './../Templates/AlbumTemplates'
import Router from '../Router'
import Utils from '../Utils'

const DeleteAlbum = {
    currentPage: false,

    deleteMessage: function ( e ) {
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        AlbumAPIService.getAlbumById( album_id ).then(album => {
            let html = AlbumTemplates.deleteDialog( album )
            $('.modal-dialog').html( html )

            Utils.modalOpen()
        })
    },

    confirmDeleteAlbum: function ( e ) {
        let album_id = $( e.target ).data('album-id')

        AlbumAPIService.deleteAlbum( album_id ).then(() => {
            $('.modal-dialog').fadeOut('slow', () => {
                let html = AlbumTemplates.deleteSuccessDialog( this.currentPage, album_id )
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    updateCurrentPage: function () {
        this.currentPage = Router.getRoute()
    },

    handleDelete: function () {
        location.reload()
    },

    bindEvents: function () {
        $(window).bind('hashchange', $.proxy( this.updateCurrentPage, this ))
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmDeleteAlbum, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( Utils.cancelDelete, this ))
        $('.modal-dialog').on('click', '[data-action=handle-delete]', $.proxy( this.handleDelete, this ))
    },

    init: function () {
        this.updateCurrentPage()
        this.bindEvents()
    }
}

export default DeleteAlbum