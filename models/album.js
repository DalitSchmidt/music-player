module.exports = function( sequelize, DataTypes ) {
    const Album = sequelize.define('Album', {
        album_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        album_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },
        album_artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },
        album_image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/
            }
        },
        album_year: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1900,
                max: new Date().getFullYear()
            }
        },
        album_description: DataTypes.TEXT
    },
    {
        underscored: true,
        timestamp: false,
        timestamps: false
    }//,
    // {
    //     classMethods: {
    //         timestamps: false,
    //         associate: function(models) {
    //             Album.hasOne(models.Song, {foreignKey: 'song_youtube'})
    //         }
    //     },
    // }
    )

    return Album
}