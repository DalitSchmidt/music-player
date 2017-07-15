import $ from 'jquery';

export default AlbumForm = {
    // Using the function 'collectValues' we bring all the values in the inputs and textarea related to album (name, artist, image, year and description)
    collectValues: function() {
        var regexes = {
            name: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*"),
            artist: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*"),
            img: new RegExp("^https|http|ftp?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$"),
            year: new RegExp("^[0-9]{4}$"),
            description: new RegExp("[A-Z][A-Za-z\s?:\s[A-Za-z0-9.-_ ,:;=+!?@#$%&*(){}|~^<>`']+$]*")
        },
            errors = false,
            inputs = $('#album-form input, #album-form textarea'),
            album = {},
            i, input, input_name, input_value;

        inputs.removeClass('error-value');

        for ( i = 0; i < inputs.length; i++ ) {
            input = $( inputs [ i ] );
            input_name = input.attr('name');
            input_value = input.val();

            if ( !regexes[ input_name ].test( input_value ) ) {
                errors = true;
                input.addClass('error-value');
            }

            album[ input_name ] = input_value;
        }

        if ( errors )
            return false;

        return album;
    },

    setSuccessMessage: function() {
        alert('Album has been created :)');
    },

    // Using the function 'collectSongs' we bring all the values from thr window of adding songs
    collectSongs: function() {
        // The variable 'songs_container will be array of all the '#songs-form' and '.song' divs
        let songs_container = $('#songs-form .song');

        // Declare of some variables that we are gonna use
        let songs_inputs, i, songs = [];

        // Now we want to iterate on all the divs array and find the inputs
        for ( i = 0; i < songs_container.length; i++ ) {
            // Search for the inputs inside the div
            songs_inputs = $( songs_container[ i ] ).find('input');

            // Push a new object with the song name and the song url
            songs.push({
                // We know that the first input is the name
                name: $(songs_inputs[0]).val(),
                // And the second is the URL
                url: $(songs_inputs[1]).val()
            });
        }

        // The function returns the array containing the values of the name and URL of the song
        return songs;
    },

    // Using the function 'saveAlbum' we reserve this album with songs created
    saveAlbum: function( e ) {
        e.preventDefault();
        let el = $(e.target),
            album = this.collectValues(),
            songs = this.collectSongs();

        if ( !album || !songs )
            return;

        album.songs = songs;
        DataService.saveAlbum( album ).then( this.setSuccessMessage );
    },

    // The function 'addSong' allows to add fields to add a new song to a form when you click the button 'Add another song'
    addSong: function( e ) {
        // Prevent the default action
        e.preventDefault();
        // The variable 'html' contains html text with the fields to add a new song
        let html = `
        <div class="form-group song">
            <input type="text" class="form-control" value="Song4" placeholder="Song name">
            <input type="text" class="form-control" value="http://lll.mp3" placeholder="Song URL">
        </div>`;

        // Performing insert div containing a unique id (#songs-form) and we allow adding a new songs for the album by the user (if necessary)
        $('#songs-form').append( html );
    },

    /**
     * The function 'bindEvents' allow to activate all the events in the window 'Add New Album'
     * The function 'bindEvents' must write each object so that it will work
     */
    bindEvents: function() {
        // When you click the button that has a unique id ('#save-album'), we want contect of 'this' in the callback function ('saveAlbum') treats the element itself (button) and not to object 'AlbumForm', therefore we use a 'proxy' to the context of 'this' within the function 'saveAlbum' treats anyway to 'AlbumForm' object
        $('#save-album').on('click', $.proxy( this.saveAlbum, this ));
        // When you click the button that has a unique id (#add-song), the object 'AlbumForm' activates the function 'addSong'
        $('#add-song').on('click', this.addSong);
    },

    /**
     * Using a function 'init' we actually triggers the object 'AlbumForm'
     * The function 'init' must write each object so that it will work
     */
    init: function() {
        // 'this' in the 'init' function refers to the object 'AlbumForm' that called the 'init' function, and he actually starts the 'bindEvents' function containing all the events
        this.bindEvents();
    }
};