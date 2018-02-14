module.exports = function ( sequelize, DataTypes ) {
    const Album = sequelize.define('Album', {
        album_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        album_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/
            }
        },
        album_artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Z][A-Za-z0-9.-_ ,:=+!?@#$%&*(){}|~^<>`']+$]*/
            }
        },
        album_image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^https|http|ftp?:\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp|tif?f)$/
            }
        },
        album_year: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                min: 1900,
                max: new Date().getFullYear()
            }
        },
        album_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        underscored: true,
        timestamp: false,
        timestamps: false
    }
    )

    return Album
}