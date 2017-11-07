module.exports = function( sequelize, DataTypes ) {
    const Genre = sequelize.define('Genre', {
        genre_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        genre_slug: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                is: /^[a-z-0-9]+$/i
            }
        },
        genre_name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        }
    },
    {
        underscored: true,
        timestamp: false,
        timestamps: false
    })

    return Genre
}