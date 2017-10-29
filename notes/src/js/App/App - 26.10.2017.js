import $ from 'jquery'
import AlbumForm from './AlbumForm'
import AlbumPlayer from './AlbumPlayer'
import AlbumsBoard from './AlbumsBoard'
import Player from './Player'
import Router from './Router'
import Search from './Search'
import SearchBar from "./SearchBar"

const App = {
    init: function() {
        Router.setupRoutes({
            'all-albums': AlbumsBoard.init.bind( AlbumsBoard ),
            'add-new-album': AlbumForm.init.bind( AlbumForm ),
            'single-album': AlbumPlayer.init.bind( AlbumPlayer ),
            'search': Search.init.bind( Search )
        }).init()

        SearchBar.init()
    }
}

$( document ).ready( App.init )