export default Templates = {
    album: function( album ) {
        var html =
            `
            <div class="col-md-3">
                <div class="record" data-album-id="${album.id}">
                    <div class="curved-container">
                        <h4 class="album-name text-center curved-text">${album.name}</h4>
                    </div>
                    <img src="${album.img}" alt="${album.name}" class="img-responsive img-circle">
                    <a href="#" class="remove-icon" data-album-id="${album.id}">
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
            `;

        return html;
    },
};