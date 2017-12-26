import $ from 'jquery'

const Router = {
    routes: {},
    default: {},

    when: function( route ) {
        // let callback = eval( route.callback )
        // let context = eval( route.callback.split('.')[0] )

        this.routes[ route.path.substring(1) ] = {
            callback: route.callback,
            template: route.template
        }

        return this
    },

    otherwise: function( route ) {
        this.default = route
        return this
    },

    getParams: function() {
        let hash = this.getHash()
        let params = hash.split('/')

        if ( params.length === 1 )
            return false

        params.shift()
        return params
    },

    getHash: function() {
        return location.hash.substring(1)
    },

    getRoute: function() {
        let self = this
        function getRouteName() {
            return self.getHash().split('/')[0]
        }

        return ( location.hash === '' ) ? false : getRouteName()
    },

    getTemplate: function( template ) {
        return $.ajax(`http://localhost:8080${template}`)
    },

    setPage: function() {
        let route = this.getRoute()
        let d = $.Deferred()
        let config = this.routes[ route ]
        let redirect = false

        if ( !config ) {
            config = this.default
            redirect = true
        }

        this.getTemplate( config.template ).then((html => {
            $('#main-container').html( html )

            if ( typeof config.callback === 'function' )
                config.callback()

            if ( redirect )
                this.redirect( config.path )

            d.resolve()
        }), xhr => d.reject( xhr ))

        return d.promise()
    },

    redirect: function( path = 'all-albums' ) {
        window.location.href = 'http://localhost:8080/#' + path
    },

    bindEvents: function () {
        window.onhashchange = this.setPage.bind( this )
    },

    init: function() {
        this.setPage().then( this.bindEvents.bind( this ) )
    }
}

export default Router