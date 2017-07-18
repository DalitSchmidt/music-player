import $ from 'jquery';

let Player = {
    playAlbum: function ( album ) {
        alert('Playing')
    },

    bindEvents: function () {

    },

    init: function () {
        this.bindEvents();
    }
};

export default Player;