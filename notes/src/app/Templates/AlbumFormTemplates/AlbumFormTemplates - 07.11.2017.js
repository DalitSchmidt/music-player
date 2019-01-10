// ייבוא היכולות של jQuery על-מנת שהאובייקט AlbumFormTemplates יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט בשם AlbumFormTemplates המתפקד כ"מעין" מחלקת שירות מכל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM וקשורות לטופס הוספת אלבום חדש
// הגדרת האובייקט AlbumFormTemplates כקבוע
const AlbumFormTemplates = {
    // באמצעות הפונקציה genres המקבלת את המשתנה genres המכיל מערך עם כל הפרטים של הז'אנרים, אנו יוצרים תבנית html המאפשרת להציג ב- DOM את כל הז'אנרים המצויים במערך
    genres: function (genres) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''
        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה genres (המכיל מערך עם כל הפרטים של הז'אנרים) ומוציאה ממנו את ה- index ואת הז'אנר של האלבום
        $.each(genres, (i, genre) => {
            // הגבלת כמות התוצאות של הז'אנרים עד ל- 10 תוצאות
            if (i > 10)
                return

            // המשתנה html משרשר אליו את האלמנט label שבתוכו יש אלמנט input מסוג checkbox המכיל נתונים עם כל הפרטים של הז'אנרים
            html += `
            <label for="genre-${genre.genre_id}">
                <input type="checkbox" id="genre-${genre.genre_id}" name="${genre.genre_name}" value="${genre.genre_id}" title="${genre.genre_name}"> ${genre.genre_name}
            </label>
            `
        })

        // הפונקציה מחזירהר את המשתנה html המכיל תבנית html המכילה נתונים של הז'אנרים לצורך הצגתם ב- DOM
        return html
    },

    // באמצעות הפונקציה songItem, אנו יוצרים תבנית html של השדות להוספת שיר לאלבום
    songItem: function () {
        // המשתנה html מכיל תבנית html של השדות להוספת שיר לאלבום
        let html = `
        <div class="col-md-12">
            <div class="form-group song">
                <label class="song-name-label control-label">Song Name:</label>
                <input type="text" class="form-control" name="song-name" placeholder="The Power of Equality" title="Song Name" required>
            </div>

            <div class="form-group song">
                <label class="youtube-url-label control-label">YouTube URL:</label>
                <input type="text" class="form-control" name="youtube-url" placeholder="https://www.youtube.com/embed/JT6UCvR7kgU" title="YouTube URL" required>
            </div>

            <div class="form-group song">
                <label class="song-time-label control-label">Song Time:</label>
                <input type="text" class="form-control" name="song-time" placeholder="01:23" title="Song Time" required>
                <a href="#" class="remove-icon" data-album-id="">
                    <i class="fa fa-remove"></i>
                </a>
            </div>
        </div>
        <div class="row"></div>
    `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של השדות להוספת שיר לאלבום
        return html
    }
}

// ייצוא היכולות של האובייקט AlbumFormTemplates החוצה
export default AlbumFormTemplates