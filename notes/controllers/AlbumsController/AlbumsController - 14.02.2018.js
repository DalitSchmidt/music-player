const models = require('../models')

const AlbumsController = {
    deleteAlbum: function ( album_id ) {
        return models.sequelize.Promise.join(
            models.sequelize.query(`DELETE FROM albums WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
            models.sequelize.query(`DELETE FROM songs WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE}),
            models.sequelize.query(`DELETE FROM albums_to_genres WHERE album_id = "${album_id}"`, {type: models.sequelize.QueryTypes.DELETE})
        )
    }
}

module.exports = AlbumsController