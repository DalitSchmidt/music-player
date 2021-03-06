// קובץ זה מכיל את הסכימה של Song המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
module.exports = function( sequelize, DataTypes ) {
    // המשתנה Song מכיל את שם המודול (במקרה זה Song) ואובייקט המכיל את הפרופרטיס song_id, song_name, song_time, song_youtube ו- album_id שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלה במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה לרבות ביצוע ולידציה על הנתונים המצויים בטבלה, כך שלמעשה המשתנה Song מכיל את הסכימה שלפיה נבנה המודל של Song במסד הנתונים
    const Song = sequelize.define('Song', {
        song_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        song_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
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
            allowNull: false,
        },
    },
    {
        classMethods: {
            timestamps: false,
            associate: function(models) {
                Song.hasOne(models.Album, {foreignKey: 'album_id'})
            }
        },
    })

    // הפונקציה מחזירה את המשתנה Song המכיל את הסכימה שלפיה נבנה המודל של Song במסד הנתונים
    return Song
}