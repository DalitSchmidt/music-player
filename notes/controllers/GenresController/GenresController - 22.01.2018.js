// האובייקט GenresController מכיל פונקציות המאפשרות לנו לבצע בקרה על הז'אנרים של האלבומים
// הגדרת האובייקט GenresController כקבוע
const GenresController = {
    // באמצעות הפונקציה getNewGenres המסומנת כפונקציית חץ ומקבלת את המשתנה genres מתאפשר לבצע בקרה על קבלת ז'אנרים חדשים
    getNewGenres: ( genres ) => {
        // הפונקציה מחזירה את המערך החדש שנוצר על-ידי שימוש בפונקציה filter שמפעילה פונקציית callback בה היא בודקת אם יש ערך חדש של ז'אנר, מחזירה סטרינג של הז'אנר ומפעילה את הפונקציה map שיוצרת מערך חדש של ז'אנר ומחזירה את שם הז'אנר החדש ואת ה- slug שלו שאותו אנו הופכים לאותיות קטנות ובמקום רווחים אנו שמים מקפים שמפרידים בין המילים
        return genres.filter(genre => isNaN( parseInt( genre ) )).map(genre => {
            return {
                genre_name: genre,
                genre_slug: genre.toLowerCase().replace(' ', '-')
            }
        })
    },

    // באמצעות הפונקציה getExistingGenresIds המסומנת כפונקציית חץ ומקבלת את המשתנה genres מתאפשר לקבל את המספר הייחודי של הז'אנרים הקיימים
    getExistingGenresIds: ( genres ) => {
        // הפונקציה מחזירה את המרך החדש שנוצר על-ידי שימוש בפונקציה filter שמפעילה פונקציית callback בה היא בודקת אם הערך של הז'אנר הוא לא חדש, מחזירה סטרינג של הז'אנר ומפעילה את הפונקציה map שיוצרת מערך של ז'אנר והופכת את הז'אנר שהתקבל למספר
        return genres.filter(genre => !isNaN( parseInt( genre ) )).map(genre => parseInt( genre ))
    }
}

// ייצוא היכולות של המודול GenresController החוצה
module.exports = GenresController