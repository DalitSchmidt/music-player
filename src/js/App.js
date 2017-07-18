import $ from 'jquery';
import Player from './Player';
import AlbumForm from './AlbumForm';
import AlbumBoard from './AlbumsBoard';

const App = {
    init: function() {
        console.log("App init");

        Player.init();
        AlbumForm.init();
        AlbumBoard.init();
    }
};

$(document).ready(function() {
    App.init();
});