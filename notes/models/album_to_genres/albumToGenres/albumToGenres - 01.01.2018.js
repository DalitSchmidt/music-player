// קובץ זה מכיל את הסכימה של AlbumToGenres המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
module.exports = function( sequelize, DataTypes ) {
    // המשתנה AlbumToGenres מכיל את שם המודול (במקרה זה AlbumTOGenres) ואובייקט המכיל את הפרופרטיס album_id ו- genre_id שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלה במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה, כך שלמעשה המשתנה AlbumToGenres מכיל את הסכימה שלפיה נבנה המודל של AlbumToGenres במסד הנתונים
    const AlbumToGenres = sequelize.define('AlbumToGenres', {
            album_id: {
                type: DataTypes.INTEGER(7).UNSIGNED,
                allowNull: false
            },
            genre_id: {
                type: DataTypes.INTEGER(7).UNSIGNED,
                allowNull: false
            },
        },
        {
            underscored: true,
            timestamp: false,
            timestamps: false,
            tableName: 'albums_to_genres',
        },
        {
            classMethods: {
                associate: function ( models ) {
                    albumToGenre.hasOne( models.Album, {foreignKey: 'album_id'} )
                    albumToGenre.hasOne( models.Genre, {foreignKey: 'genre_id'} )
                }
            }
        }
    )

    // הסרת ה- attribute בשם id מהאובייקט AlbumToGenres
    AlbumToGenres.removeAttribute('id')

    // הפונקציה מחזירה את המשתנה AlbumToGenres המכיל את הסכימה שלפיה נבנה המודל של AlbumToGenres במסד הנתונים
    return AlbumToGenres
}