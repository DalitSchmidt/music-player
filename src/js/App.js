import $ from 'jquery';
import Player from './Player';
import AlbumForm from './AlbumForm';
import AlbumBoard from './AlbumsBoard';
import Search from './Search';

const App = {
    init: function() {
        Player.init();
        AlbumForm.init();
        AlbumBoard.init();

        new Search();
    }
};

$(document).ready(function() {
    App.init();
});