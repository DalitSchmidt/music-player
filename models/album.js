// קובץ זה מכיל את הסכימה של Album המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
module.exports = function( sequelize, DataTypes ) {
    // המשתנה Album מכיל את שם המודול (במקרה זה Album) ואובייקט המכיל את הפרופרטיס album_id, album_name, album_artist, album_image, album_year ו- album_description שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלאות במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה לרבות ביצוע ולידציה על הנתונים המצויים בטבלה, כך שלמעשה המשתנה Album מכיל את הסכימה שלפיה נבנה המודל של Album במסד הנתונים
    const Album = sequelize.define('Album', {
        album_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
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

    // הפונקציה מחזירה את המשתנה Album המכיל את הסכימה שלפיה נבנה המודל של Album במסד הנתונים
    return Album
}