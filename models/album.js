module.exports = function( sequelize, DataTypes ) {
    let Album = sequelize.define('Album', {
        album_id: {
            type: DataTypes.INTEGER(5).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        album_name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },
        album_artist: {
            type: DataTypes.STRING,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },
        album_image: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
                is: /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/
            }
        },
        album_year: {
            type: DataTypes.STRING,
            validate: {
                min: 1900,
                max: new Date().getFullYear()
            }
        },
        album_description: DataTypes.TEXT
    })

    return Album
}