module.exports = function( sequelize, DataTypes ) {
    const AlbumToGenres = sequelize.define('AlbumToGenres', {
            album_id: {
                type: DataTypes.INTEGER(7).UNSIGNED,
                allowNull: false
            },
            genre_id: {
                type: DataTypes.INTEGER(7).UNSIGNED,
                allowNull: false
            },
        },
        {
            underscored: true,
            timestamp: false,
            timestamps: false,
            tableName: 'albums_to_genres',
        },
        {
            classMethods: {
                associate: function ( models ) {
                    albumToGenre.hasOne( models.Album, {foreignKey: 'album_id'} )
                    albumToGenre.hasOne( models.Genre, {foreignKey: 'genre_id'} )
                }
            }
        }
    )

    AlbumToGenres.removeAttribute('id')

    return AlbumToGenres
}