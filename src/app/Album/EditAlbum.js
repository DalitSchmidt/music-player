import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Router from '../Router'
import AlbumForm from './AlbumForm'
import AlbumGenres from './AlbumGenres'

const EditAlbum = {
    album_id: null,

    setTitleEditAlbum: function () {
        let html = AlbumFormTemplates.titleEditAlbum()
        $('#add-new-album-title').html( html )
    },

    setTitleEditAlbumPlaylist: function () {
        let html = AlbumFormTemplates.titleEditAlbumPlaylist()
        $('#add-album-playlist-title').html( html )
    },

    getAlbumID: function () {
        return location.hash.substring(1).split('/')[1]
    },

    setValues: function ( album ) {
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        $.each(inputs, ( index, input ) => {
           input.value = album [ input.name ]
        })

        AlbumForm.changeCoverImage()
        AlbumForm.addSongsInputs( album.songs.length, album.songs )

        $.each(album.genres, ( index, genre  ) => {
            AlbumGenres.addGenreTag( genre.genre_name, genre.genre_id )
        })
    },

    saveChanges: function ( e ) {
        e.preventDefault()

        let album = AlbumForm.validateAlbum()

        if ( !album )
            return

        AlbumAPIService.updateAlbum( this.album_id, album ).then( this.setSuccessMessageEditAlbum )
    },

    // deleteMessageSong: function ( e ) {
    //     let album_id = $( e.target ).closest('[data-album-id]').data('album-id')
    //     AlbumAPIService.getAlbumById( album_id ).then(album => {
    //         let html = AlbumTemplates.deleteDialog( album )
    //         $('.modal-dialog').html( html )
    //         $('body').addClass('modal-open').css('padding-right', '17px')
    //         $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px'} )
    //     })
    // },
    //
    // confirmAlbumDeleteSong: function ( e ) {
    //     let album_id = $( e.target ).data('album-id')
    //     AlbumAPIService.deleteAlbum( album_id ).then( album => {
    //         $('.modal-dialog').fadeOut('slow', () => {
    //             let html = AlbumTemplates.deleteSuccessDialog( this.currentPage, album_id )
    //             $('.modal-dialog').html( html ).fadeIn('slow')
    //         })
    //     })
    // },

    setSuccessMessageEditAlbum: function() {
        // alert('Album has been updated :)')
        let html = AlbumFormTemplates.successMessageEditAlbum()
        $('.modal-dialog').html( html )
        $('body').addClass('modal-open').css('padding-right', '17px')
        $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px'} )
    },

    bindEvents: function () {
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
        // $('.modal-dialog').on('click', '#approve-delete', $.proxy( this.confirmAlbumDeleteSong, this ))
        // $('.modal-dialog').on('click', '.cancel', $.proxy( DeleteAlbum.cancelDelete, this ))
        // $('.modal-dialog').on('click', '[data-action=handle-delete]', $.proxy( DeleteAlbum.handleDelete, this ))
        // $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteMessageSong, this ))
        // $('#add-album-playlist-form').on('click', '.remove-icon', AlbumForm.removeSongItem)
    },

    getAlbum: function () {
        AlbumAPIService.getAlbumById( this.album_id ).then(
            album => {
                console.log( album )
                this.setValues( album )
            }, error => {
                Router.redirect()
                return
            })
    },

    init: function () {
        this.album_id = this.getAlbumID()

        if ( !this.album_id ) {
            Router.redirect()
            return
        }

        this.getAlbum()
        this.setTitleEditAlbum()
        this.setTitleEditAlbumPlaylist()
        this.bindEvents()
    }
}

export default EditAlbum