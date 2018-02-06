module.exports = function( sequelize, DataTypes ) {
    const Song = sequelize.define('Song', {
        song_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        song_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[A-Z0-9][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },
        song_time: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
            validate: {
                is: /([0-9]*.[0-9]{2})/
            }
        },
        song_youtube: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                is: /([A-Za-z0-9\-_]{11})/
            }
        },
        album_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            allowNull: false
        },
    },
    {
        underscored: true,
        timestamp: false,
        timestamps: false
    },
    {
        classMethods: {
            // timestamps: false,
            associate: function( models ) {
                Song.hasOne( models.Album, { foreignKey: 'album_id' } )
            }
        },
    })

    return Song
}