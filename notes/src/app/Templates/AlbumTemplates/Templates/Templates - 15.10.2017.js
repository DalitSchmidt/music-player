// ה- class Templates המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM
// הגדרת ה- class בשם Templates
class Templates {
    // באמצעות הפונקציה album המקבלת את הפרמטר album, אנו יוצרים תבנית html של האלבום להצגה ב- DOM
    static album( album ) {
        // המשתנה html מכיל תבנית html של האלבום להצגה ב- DOM
        let html =
            `
            <div class="col-md-3">
            <div class="record" data-album-id="${album.album_id}">
                <div class="text-center">
                    <h4 class="album-name" data-album-id="${album.album_id}">${album.album_name} - ${album.album_artist}</h4>
                </div>
                <img src="${album.album_image}" alt="${album.album_name}" class="img-responsive img-circle center-block">
                <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                    <i class="fa fa-play"></i>
                </a>

                <a href="#" class="remove-icon" data-album-id="${album.album_id}">
                    <i class="fa fa-remove"></i>
                </a>

                <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum" data-album-id="${album.album_id}">
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
        </div>
            `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של האלבום להצגה ב- DOM
        return html
    }

    // באמצעות הפונקציה searchResults המקבלת את הפרמטר results, אנו יוצרים תבנית html של תוצאות החיפוש להצגה ב- DOM
    static searchResults( results ) {
        // המשתנה html מכיל את התגית ul ואליו נשרשר נתונים שיאפשרו להציג את תוצאות החיפוש ב- DOM
        let html = '<ul>'

        // הלולאת forEach עוברת על איבר איבר שנמצא במשתנה results ומוציאה נתונים מהאיברים בהתאם ולמיקום ב- index
        results.forEach((result, index) => {
            // המשתנה html משרשר אליו את השורות עם תוצאות החיפוש להצגה ב- DOM
            html += `<li data-album-id="${result.id}">${result.name}</li>`
        })

        // המשתנה html משרשר אליו את התגית הסוגרת של ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של תוצאות החיפוש להצגה ב- DOM
        return html
    }

    // באמצעות הפונקציה songItem, אנו יוצרים תבנית html של השדות להוספת שירים לאלבום
    static songItem() {
        // המשתנה html מכיל תבנית html של השדות להוספת שירים לאלבום
        let html = `
        <div class="form-group song">
            <input type="text" class="form-control" value="Song" placeholder="Song name">
            <input type="text" class="form-control" value="http://lll.mp3" placeholder="Song URL">
        </div>`

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של השדות להוספת שירים לאלבום
        return html
    }
}

// ייצוא היכולות של ה- class Templates החוצה
export default Templates