import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumPlayer from './AlbumPlayer'
import AlbumsBoard from './AlbumsBoard'
import Player from './Player'
import Router from './Router'
import Search from './Search'

const App = {
    init: function() {
        Router.init(() => {
            AlbumPlayer.init()
            new AlbumForm()
            new AlbumsBoard()
            new Search()
            Player.init()
        })
    }
}

$( document ).ready( App.init )