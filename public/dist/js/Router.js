const Router = {
    getPageName: function () {
        return location.hash.substring(1)
    },

    checkURLHash: function() {
        if ( location.hash === '' )
            return false

        else
            return this.getPageName()
    },

    getHTML: function( page ) {
        return $.ajax(`http://localhost:8080/dist/js/_templates/_${page}.html`)
    },

    setPage: function() {
        let page = this.getPageName()
        this.getHTML( page ).then(html => {
            $('#main-container').html( html )
        })
    },

    bindEvents: function () {
        window.onhashchange = this.setPage.bind( this )
    },

    init: function () {
        let page = this.checkURLHash()
        if ( page )
            this.setPage( page )
        
        this.bindEvents()
    }
}

$(document).ready(() => Router.init())