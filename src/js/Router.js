const Router = {
    routes: {},

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

        let d = $.Deferred()

        this.getHTML( page ).then((html => {
            $('#main-container').html( html )

            d.resolve()
        }), xhr => d.reject( xhr ))

        return d.promise()
    },

    bindEvents: function () {
        window.onhashchange = () => this.setPage()
    },

    setupRoutes: function( routes ) {
        this.routes = routes
        return this
    },

    init: function() {
        let page = this.checkURLHash()
        if ( page ) {
            this.setPage().then(() => {
                this.bindEvents()
                let callback = this.routes[ page ]
                callback()
            })
        } else
            this.bindEvents()
    }
}

export default Router