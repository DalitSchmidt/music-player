export default class Templates {
    static album( album ) {
        let html =
            `
            <div class="col-md-3">
                <div class="record" data-album-id="${album.id}">
                    <div class="curved-container">
                        <h4 class="album-name text-center curved-text" data-album-id="${album.id}">${album.name} - ${album.artist}</h4>
                    </div>
                    <img src="${album.img}" alt="${album.name}" class="img-responsive img-circle">
                    <a href="#" class="play-icon" data-album-id="${album.id}">
                        <i class="fa fa-play"></i>
                    </a>
                    
                    <a href="#" class="remove-icon" data-album-id="${album.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                    
                    <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum" data-album-id="${album.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
            </div>
            `

        return html
    }

    static searchResults( results ) {
        let html = '<ul>'

        results.forEach((result, index) => {
            html += `<li data-album-id="${result.id}">${result.name}</li>`
        })

        html += '</ul>'

        return html
    }

    static songItem() {
        let html = `
        <div class="form-group song">
            <input type="text" class="form-control" value="Song" placeholder="Song name">
            <input type="text" class="form-control" value="http://lll.mp3" placeholder="Song URL">
        </div>`

        return html
    }
}