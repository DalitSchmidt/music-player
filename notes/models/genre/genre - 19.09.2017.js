// קובץ זה מכיל את הסכימה של Genre המצויה במסד הנתונים, אשר נבנית במסד הנתונים בעזרת שימוש ב- sequelize שהוא מודול המאפשר לנו לתקשר אל מול מסד הנתונים
// ייצוא היכולות של המודול המבצע שימוש ב- sequelize שזהו מודול העוזר לנו לתקשר אל מול מסד הנתונים
module.exports = function( sequelize, DataTypes ) {
    // המשתנה Genre מכיל את שם המודול (במקרה זה Genre) ואובייקט המכיל את הפרופרטיס genre_id ו- genre_name שבאמצעות שימוש ב- sequelize הם מאפשרים לנו לתקשר אל מול מסד הנתונים ולמעשה הם מכילים את העמודות של הטבלאות במסד הנתונים בהתאם לסוג הנתונים שצריכים להיות מצויים בכל עמודה בטבלה לרבות ביצוע ולידציה על הנתונים המצויים בטבלה, כך שלמעשה המשתנה Genre מכיל את הסכימה שלפיה נבנה המודל של Genre במסד הנתונים
    let Genre = sequelize.define('Genre', {
        genre_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        genre_name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
            }
        }
    })

    // הפונקציה מחזירה את המשתנה Genre המכיל את הסכימה שלפיה נבנה המודל של Genre במסד הנתונים
    return Genre
}