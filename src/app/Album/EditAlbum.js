import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumGenres from './AlbumGenres'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import EditAlbumTemplates from '../Templates/EditAlbumTemplates'
import Router from '../Router'
import Utils from '../Utils'

const EditAlbum = {
    album_id: null,

    setTitleEditAlbum: function () {
        let html = EditAlbumTemplates.titleEditAlbum()
        $('#add-new-album-title').html( html )
    },

    setTitleEditAlbumPlaylist: function () {
        let html = EditAlbumTemplates.titleEditAlbumPlaylist()
        $('#add-album-playlist-title').html( html )
    },

    setValues: function ( album ) {
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        $.each(inputs, ( index, input ) => {
            input.value = album [ input.name ]
        })

        AlbumForm.changeCoverImage()
        AlbumForm.addSongsInputs( album.songs.length, album.songs )

        $.each(album.genres, ( index, genre ) => {
            AlbumGenres.addGenreTag( genre.genre_name, genre.genre_id )
        })
    },

    getAlbum: function () {
        AlbumAPIService.getAlbumById( this.album_id ).then(album => {
            this.setValues( album )
        }, () => {
            Router.redirect()

            return
        })
    },

    deleteSongMessage: function ( e ) {
        let song_id, html

        song_id = $( e.target ).closest('[data-song-id]').data('song-id')

        html = EditAlbumTemplates.deleteSongDialog( song_id )
        $('.modal-dialog').html( html )

        Utils.modalOpen()
    },

    confirmDeleteSong: function ( e ) {
        let song_id = $( e.target ).data('song-id')

        $('.modal-dialog').fadeOut('slow', () => {
            $(`.song-item[data-song-id=${song_id}]`).remove()

            let html = EditAlbumTemplates.deleteSongSuccessDialog( song_id )
            $('.modal-dialog').html( html ).fadeIn('slow')
        })
    },

    setSuccessMessageEditAlbum: function () {
        let html = EditAlbumTemplates.successMessageEditAlbum()
        $('.modal-dialog').html( html )

        Utils.modalOpen()
    },

    saveChanges: function ( e ) {
        e.preventDefault()

        let album = AlbumForm.validateAlbum()

        if ( !album )
            return

        let $input = $( e.target )

        $input.siblings('.error-message').remove()
        $input.removeClass('error')

        AlbumAPIService.updateAlbum( this.album_id, album ).then(
            this.setSuccessMessageEditAlbum,
            ( error ) => {
                AlbumForm.validateFieldFromDB( error )
            }
        )
    },

    bindEvents: function () {
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteSongMessage, this ))
        $('.modal-dialog').on('click', '#edit-album-approve-delete', $.proxy( this.confirmDeleteSong, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( Utils.cancelDelete, this ))
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
    },

    init: function () {
        this.album_id = Utils.getAlbumID()

        if ( !this.album_id ) {
            Router.redirect()

            return
        }

        this.setTitleEditAlbum()
        this.setTitleEditAlbumPlaylist()
        this.getAlbum()
        this.bindEvents()
    }
}

export default EditAlbum