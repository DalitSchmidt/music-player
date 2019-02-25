// קובץ זה מכיל את הסכימה של Album המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול שבאמצעותו מתאפשר לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שהוא מודול שבאמצעותו מתאפשר לתקשר אל מול מסד הנתונים
module.exports = function ( sequelize, DataTypes ) {
    // המשתנה Album מכיל את שם המודול (במקרה זה Album) ואובייקט המכיל את הפרופרטיס album_id, album_name, album_artist, album_image, album_year ו- album_description שבאמצעות שימוש ב- sequelize מתאפשר לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלה במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה לרבות ביצוע ולידציה על הנתונים המצויים בטבלה, כך שהמשתנה Album מכיל את הסכימה שלפיה נבנה המודל של Album במסד הנתונים
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
                is: /^http?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|bmp|tif|tiff|svg))$/
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

    // הפונקציה מחזירה את המשתנה Album המכיל את הסכימה שלפיה נבנה המודל של Album במסד הנתונים
    return Album
}