import $ from 'jquery'

const AlbumFormTemplates = {
    genres: function (genres) {
        let html = ''
        $.each(genres, (i, genre) => {
            if (i > 3)
                return

            html += `
            <label for="genre-${genre.genre_id}">
                <input type="checkbox" id="genre-${genre.genre_id}" name="${genre.genre_name}" value="${genre.genre_id}" title="${genre.genre_name}"> ${genre.genre_name}
            </label>
            `
        })

        return html
    },

    songItem: function () {
        let html = `
        <div class="col-md-12">
            <div class="form-group song">
                <label class="song-name-label control-label">Song Name:</label>
                <input type="text" class="form-control" name="song-name" placeholder="The Power of Equality" title="Song Name" required>
            </div>

            <div class="form-group song">
                <label class="youtube-url-label control-label">YouTube URL:</label>
                <input type="text" class="form-control" name="youtube-url" placeholder="https://www.youtube.com/embed/JT6UCvR7kgU" title="YouTube URL" required>
            </div>

            <div class="form-group song">
                <label class="song-time-label control-label">Song Time:</label>
                <input type="text" class="form-control" name="song-time" placeholder="01:23" title="Song Time" required>
                <a href="#" class="remove-icon" data-album-id="">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        </div>
        <div class="row"></div>
    `

        return html
    }
}

export default AlbumFormTemplates