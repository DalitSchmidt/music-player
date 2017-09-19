// קובץ זה מכיל את הסכימה של GenreToAlbum המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
module.exports = function( sequelize, DataTypes ) {
    // המשתנה GenreToAlbum מכיל את שם המודול (במקרה זה GenreToAlbum) ואובייקט המכיל את הפרופרטיס gener_id ו- album_id שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלאות במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה, כך שלמעשה המשתנה GenreToAlbum מכיל את הסכימה שלפיה נבנה המודל של GenreToAlbum במסד הנתונים
    let GenreToAlbum = sequelize.define('GenreToAlbum', {
        genre_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            allowNull: false,
            reference: {
                model: 'Genre',
                key: 'gener_id'
            }
        },
        album_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            allowNull: false,
            reference: {
                model: 'Album',
                key: 'album_id'
            }
        }
    })

    // הפונקציה מחזירה את המשתנה Album המכיל את הסכימה שלפיה נבנה המודל של Album במסד הנתונים
    return GenreToAlbum
}