import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumGenres from './AlbumGenres'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import EditAlbumTemplates from '../Templates/EditAlbumTemplates'
import Router from '../Router'
import Utils from '../Utils'

const EditAlbum = {
    album_id: null,

    getAlbumID: function () {
        return location.hash.substring(1).split('/')[1]
    },

    setTitleEditAlbum: function () {
        let html = AlbumFormTemplates.titleEditAlbum()
        $('#add-new-album-title').html( html )
    },

    setTitleEditAlbumPlaylist: function () {
        let html = AlbumFormTemplates.titleEditAlbumPlaylist()
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
        AlbumAPIService.getAlbumById( this.album_id ).then(
            album => {
                this.setValues( album )
            }, () => {
                Router.redirect()
                return
            })
    },

    removeSongMessage: function ( e ) {
        let song_id = $( e.target ).closest('[data-song-id]').data('song-id')

        // AlbumAPIService.getAlbumById( song_id ).then(album => {
            let html = EditAlbumTemplates.removeSongDialog( song_id )

            $('.modal-dialog').html( html )
            $('body').addClass('modal-open').css('padding-right', '17px')
            $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px'} )
        // })
    },

    confirmRemoveSong: function ( e ) {
        let song_id = $( e.target ).data('song-id')

        // AlbumAPIService.deleteAlbum( song_id ).then(album => {
            $('.modal-dialog').fadeOut('slow', () => {
                let html = EditAlbumTemplates.removeSuccessDialog( song_id )
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        // })
    },

    cancelRemove: function () {
        $('body').removeClass('modal-open').css('padding-right', '0')
        $('#modal').removeClass('in').css( {'display': 'none', 'padding-right': '0'} )
    },

    setSuccessMessageEditAlbum: function () {
        let html = EditAlbumTemplates.successMessageEditAlbum()

        $('.modal-dialog').html( html )
        $('body').addClass('modal-open').css('padding-right', '17px')
        $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px', 'overflow-y': 'scroll'} )
    },

    saveChanges: function ( e ) {
        e.preventDefault()

        let album = AlbumForm.validateAlbum()

        if ( !album )
            return

        AlbumAPIService.updateAlbum( this.album_id, album ).then( this.setSuccessMessageEditAlbum )
    },

    bindEvents: function () {
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.removeSongMessage, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy( Utils.debounce( AlbumForm.removeSongItem, this ), 5000) )
        $('.modal-dialog').on('click', '#edit-album-approve-remove', $.proxy( this.confirmRemoveSong, this ))
        $('.modal-dialog').on('click', '#edit-album-approve-remove', $.proxy( this.confirmRemoveSong, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelRemove, this ))
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
    },

    init: function () {
        this.album_id = this.getAlbumID()

        if ( !this.album_id ) {
            Router.redirect()
            return
        }

        this.bindEvents()
        this.setTitleEditAlbum()
        this.setTitleEditAlbumPlaylist()
        this.getAlbum()
    }
}

export default EditAlbum