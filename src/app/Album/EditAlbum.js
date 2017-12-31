import $ from 'jquery'
import AlbumAPIService from './../APIServices/AlbumAPIService'
import AlbumFormTemplates from '../Templates/AlbumFormTemplates'
import Validator from '../Validator'
import Utils from '../Utils'
import Router from '../Router'
import Player from '../Player'
import AlbumForm from './AlbumForm'

const EditAlbum = {
    album_id: null,

    getAlbumID: function () {
        let id = location.hash.substring(1).split('/')[1]
        return id
    },

    setValues: function ( album ) {
        let inputs = $('#add-new-album-form input[required], #add-new-album-form textarea[required]')

        $.each(inputs, ( index, input ) => {
           input.value = album [ input.name ]
        })
        AlbumForm.changeCoverImage()
        AlbumForm.addSongsInputs( album.songs.length, album.songs )
    },

    saveChanges: function ( e ) {
        e.preventDefault()
        const album = AlbumForm.validateAlbum()
        AlbumAPIService.updateAlbum( this.album_id, album ).then( this.setSuccessMessage )
    },

    setSuccessMessage: function() {
        alert('Album has been updated :)')
    },

    bindEvents: function () {
        $('#add-new-album').on('submit', $.proxy( this.saveChanges, this ))
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
        this.bindEvents()
    }
}

export default EditAlbum