import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumPlayer from './AlbumPlayer'
import AlbumsBoard from './AlbumsBoard'
import Player from './Player'
import Router from './Router'
import Search from './Search'

const App = {
    init: function() {
        Router.setupRoutes({
            'all-albums': AlbumsBoard.init.bind( AlbumsBoard ),
            'add-new-album': AlbumForm.init.bind( AlbumForm ),
            'single-album': AlbumPlayer.init.bind( AlbumPlayer )
        }).init()
    }
}

$( document ).ready( App.init )