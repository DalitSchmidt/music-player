// האובייקט GenresController מכיל פונקציות שבאמצעותן מתאפשר לבצע בקרה על הז'אנרים של האלבומים
// הגדרה של האובייקט GenresController כקבוע
const GenresController = {
    // באמצעות הפונקציה getNewGenres (שמקבלת את המשתנה genres המכיל את כל הפרטים של הז'אנרים המצויים באלבום) מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    getNewGenres: function ( genres ) {
        // הפונקציה מחזירה את המערך החדש של הז'אנרים שנוצר באמצעות הפעלה של הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש של ז'אנר במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ומפעילה את הפונקציה isNaN שבאמצעותה מתאפשר לבדוק אם הערך של הז'אנר הוא לא מספר שמפעילה את הפונקציה parseInt המקבלת את המשתנה genre ושבאמצעותה מתאפשר לנתח סטרינג ולהחזיר מספר שלם, ולאחר מכן הפונקציה מפעילה את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של הז'אנר ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ומבצעת מספר פעולות
        return genres.filter(genre => isNaN( parseInt( genre ) )).map(genre => {
            // הפונקציה מחזירה אובייקט המכיל את הפרופרטי genre_name המכיל את שם הז'אנר החדש שנוצר ואת הפרופרטי genre_slug המכיל את ה- slug של הז'אנר החדש שנוצר באמצעות שימוש בפונקציה toLowerCase המאפשרת לבצע המרה של הטקסט לאותיות קטנות ובאמצעות שימוש בפונקציה replace המאפשרת להחליף את הרווחים המפרידים בין המילים למקפים
            return {
                genre_name: genre,
                genre_slug: genre.toLowerCase().replace(' ', '-')
            }
        })
    },

    // באמצעות הפונקציה getExistingGenresIds (שמקבלת את המשתנה genres המכיל את כל הפרטים של הז'אנרים המצויים באלבום) מתאפשר לקבל את המזהה הייחודי של הז'אנרים השמורים במסד הנתונים
    getExistingGenresIds: function ( genres ) {
        // הפונקציה מחזירה את המערך החדש של הז'אנרים שנוצר באמצעות הפעלה של הפונקציה filter שבאמצעותה מתאפשר לבדוק אם יש ערך חדש של ז'אנר במערך ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ומפעילה את הפונקציה isNaN שבאמצעותה מתאפשר לבדוק אם הערך של הז'אנר הוא מספר שמפעילה את הפונקציה parseInt המקבלת את המשתנה genre ושבאמצעותה מתאפשר לנתח סטרינג ולהחזיר מספר שלם, ולאחר מכן הפונקציה מפעילה את הפונקציה map שבאמצעותה מתאפשר ליצור מערך חדש של הז'אנר ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנה genre המכיל את כל הפרטים של הז'אנר המצוי באלבום ומפעילה את הפונקציה parseInt המקבלת את המשתנה genre ושבאמצעותה מתאפשר לנתח סטרינג ולהחזיר מספר שלם
        return genres.filter(genre => !isNaN( parseInt( genre ) )).map(genre => parseInt( genre ))
    }
}

// ייצוא היכולות של המודול GenresController החוצה
module.exports = GenresController