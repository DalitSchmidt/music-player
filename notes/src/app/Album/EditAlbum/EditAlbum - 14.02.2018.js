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

    deleteMessageSong: function ( e ) {
        let song_id = $( e.target ).closest('[data-song-id]').data('song-id')

        // AlbumAPIService.getAlbumById( song_id ).then(album => {
            let html = EditAlbumTemplates.deleteSongDialog( song_id )

            $('.modal-dialog').html( html )
            $('body').addClass('modal-open').css('padding-right', '17px')
            $('#modal').addClass('in').css( {'display': 'block', 'padding-right': '17px'} )
        // })
    },

    confirmDeleteSong: function ( e ) {
        let song_id = $( e.target ).data('song-id')

        // AlbumAPIService.deleteAlbum( song_id ).then(album => {
            $('.modal-dialog').fadeOut('slow', () => {
                let html = EditAlbumTemplates.deleteSuccessDialog( song_id )
                $('.modal-dialog').html( html ).fadeIn('slow')
            })
        // })
    },

    cancelDelete: function () {
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
        $('#finish-and-save-button').on('click', $.proxy( this.saveChanges, this ))
        $('.modal-dialog').on('click', '#edit-album-approve-delete', $.proxy( this.confirmDeleteSong, this ))
        $('.modal-dialog').on('click', '.cancel', $.proxy( this.cancelDelete, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy ( this.deleteMessageSong, this ))
        $('#add-album-playlist-form').on('click', '.remove-icon', $.proxy( Utils.debounce( AlbumForm.removeSongItem, this ), 5000) )
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