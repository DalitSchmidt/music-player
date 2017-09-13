'use strict'

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        username: DataTypes.STRING,
    })

    User.associate = function(models) {
        User.hasMany(models.Task)
    }

    return User
}