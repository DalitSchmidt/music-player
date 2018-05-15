import $ from 'jquery'
import AlbumForm from './Album/AlbumForm'
import AlbumsBoard from './Album/AlbumsBoard'
import DeleteAlbum from './Album/DeleteAlbum'
import SingleAlbum from './Album/SingleAlbum'
import Search from './Search/Search'
import SearchBar from './Search/SearchBar'
import Router from './Router'

const Application = {
    init: function () {
        Router.when({
            path: '/all-albums',
            template: '/js/_templates/_all-albums.html',
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        }).when({
            path: '/add-new-album',
            template: '/js/_templates/_add-new-album.html',
            callback: AlbumForm.init.bind( AlbumForm )
        }).when({
            path: '/edit-album',
            template: '/js/_templates/_add-new-album.html',
            callback: AlbumForm.init.bind( AlbumForm, true )
        }).when({
            path: '/search',
            template: '/js/_templates/_search-results.html',
            callback: Search.init.bind( Search )
        }).when({
            path: '/single-album',
            template: '/js/_templates/_single-album.html',
            callback: SingleAlbum.init.bind( SingleAlbum )
        }).otherwise({
            path: 'all-albums',
            template: '/js/_templates/_all-albums.html',
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        }).init()

        SearchBar.init()
        DeleteAlbum.init()
    }
}

$( document ).ready( Application.init )