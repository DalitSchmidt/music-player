import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumsBoard from './AlbumsBoard'
import AlbumPlayer from './AlbumPlayer'
import Search from './Search'

class App {
    constructor() {
        AlbumPlayer().init()
        new AlbumsBoard()
        new AlbumForm()
        new Search()
    }
}

$(document).ready(function() {
    new App()
})