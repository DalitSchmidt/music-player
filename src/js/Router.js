const Router = {
    getPageName: function() {
        let hash = location.hash.substring(1)
        let url = hash.split('/')

        if ( typeof url === 'undefined' )
            return hash

        return url[0]
    },

    checkURLHash: function() {
        return ( location.hash === '' ) ? false : this.getPageName()
    },

    getHTML: function( page ) {
        return $.ajax(`http://localhost:8080/js/_templates/_${page}.html`)
    },

    setPage: function( page ) {
        page = page || this.getPageName()
        this.getHTML( page ).then(html => $('#main-container').html( html ))
    },

    bindEvents: function () {
        window.onhashchange = () => this.setPage()
    },

    init: function () {
        let page = this.checkURLHash()

        if ( page )
            this.setPage()

        this.bindEvents()
    }
}

export default Router