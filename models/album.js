'use strict'

// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
module.exports = function(sequelize, DataTypes) {
    // המשתנה Album מכיל את האובייקטים album_id, album_name, album_image, album_artist ו- album_description שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלאות במסד הנתונים בהתאם לסוג הנתונים שצרכים להיות מצויים בכל עמודה בטבלה לרבות ביצוע ולידציה על הנתונים המצויים בטבלה
    let Album = sequelize.define('album', {
        album_id: {
            type: DataTypes.INTEGER(5).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        album_name: {
            type: DataTypes.STRING,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i,
                unique: true
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
        album_artist: {
            type: DataTypes.STRING,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        },

        album_description: DataTypes.TEXT,
    })

    // הפונקציה מחזירה את המשתנה Album שלמעשה הוא מכיל את הנתונים שלפיהם נבנה המודל של האלבום במסד הנתונים
    return Album
}