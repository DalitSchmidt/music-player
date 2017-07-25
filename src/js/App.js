import $ from 'jquery'
import Player from './Player'
import AlbumForm from './AlbumForm'
import AlbumBoard from './AlbumsBoard'
import Search from './Search'

class App {
    constructor() {
        let player = new Player()
        new AlbumBoard()
        new AlbumForm()
        new Search()
    }
}

$(document).ready(function() {
    new App()
});