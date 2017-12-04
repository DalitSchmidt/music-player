import $ from 'jquery'

const AlbumFormTemplates = {
    // genres: function (genres) {
    //     let html = ''
    //     $.each(genres, (i, genre) => {
    //         if (i > 3)
    //             return
    //
    //         html += `
    //         <label for="genre-${genre.genre_id}">
    //             <input type="checkbox" id="genre-${genre.genre_id}" name="${genre.genre_name}" value="${genre.genre_id}" title="${genre.genre_name}"> ${genre.genre_name}
    //         </label>
    //         `
    //     })
    //
    //     return html
    // },

    songItem: function () {
        let html = `
            <div class="col-md-12 song-item">
                <div class="form-group song">
                    <label class="youtube-url-label control-label">YouTube ID:</label>
                    <input type="text" class="form-control" name="youtube-url" placeholder="JT6UCvR7kgU" title="YouTube ID" required>
                </div>
                <div class="form-group song">
                    <label class="song-name-label control-label">Song Name:</label>
                    <input type="text" class="form-control" name="song-name" placeholder="The Power of Equality" title="Song Name" required>
                </div>
                <div class="form-group song">
                    <label class="song-time-label control-label">Song Time:</label>
                    <input type="text" class="form-control" name="song-time" placeholder="01:23" title="Song Time" required>
                </div>
                <a href="#" class="remove-icon" data-album-id="">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        `

        return html
    },

    validateInput: function () {
        return `<div class="error-message">
                    <span class="error exclamation-circle">
                        <strong>
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        </strong>
                    </span>
                </div>
                `
    }
}

export default AlbumFormTemplates