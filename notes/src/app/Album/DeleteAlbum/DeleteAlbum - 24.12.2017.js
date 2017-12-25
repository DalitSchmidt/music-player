import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumTemplates from './../Templates/AlbumTemplates'

const DeleteAlbum = {
    deleteMessage: function ( e ) {
        const album_id = $( e.target ).closest('[data-album-id]').data('album-id')
        AlbumAPIService.getAlbumById( album_id ).then(album => {
            let html = AlbumTemplates.deleteDialog( album )
            $('.modal-dialog').html( html )
        })
    },

    confirmAlbumDelete: function ( e ) {
        const album_id = $( e.target ).data('album-id')
        AlbumAPIService.deleteAlbum( album_id ).then( album => {
            $('.modal-dialog').fadeOut('slow', function () {
                let html = AlbumTemplates.deleteSuccessDialog()
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        })
    },

    removeAlbumFromArray: function ( e, album ) {
        let album_id = $( e.target ).closest('[data-album-id]').data('album-id')

        for ( let i = 0; i < album.length; i++ ) {
            if ( album[ i ].id === album_id ) {
                album.splice( i, 1 )
                break
            }
        }

        console.log( album )
    },

    bindEvents: function () {
        $('#main-container').on('click', '#album-info-controls .remove-icon, .record .remove-icon, .search-results-record .remove-icon', $.proxy( this.deleteMessage, this ))
        $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmAlbumDelete, this ))
    },

    init: function () {
        this.bindEvents()
    }
}

export default DeleteAlbum