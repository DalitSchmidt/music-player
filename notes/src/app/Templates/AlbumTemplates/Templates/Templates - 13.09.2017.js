// ה- class Templates המתפקד "כמעין" מחלקת שירות מכיל את כל הפונקציות המאפשרות לנו להציג מידע ב- DOM
// הגדרת ה- class בשם Templates וייצוא היכולות שלו
export default class Templates {
    // באמצעות הפונקציה album המקבלת את הפרמטר album אנו יוצרים תבנית html של האלבום להצגה ב- DOM
    static album( album ) {
        // המשתנה html מכיל תבנית html של האלבום להצגה ב- DOM
        let html =
            `
            <div class="col-md-3">
                <div class="record" data-album-id="${album.id}">
                    <div class="curved-container">
                        <h4 class="album-name text-center curved-text" data-album-id="${album.id}">${album.name} - ${album.artist}</h4>
                    </div>
                    <img src="${album.img}" alt="${album.name}" class="img-responsive img-circle">
                    <a href="#" class="play-icon" data-album-id="${album.id}">
                        <i class="fa fa-play"></i>
                    </a>
                    
                    <a href="#" class="remove-icon" data-album-id="${album.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                    
                    <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum" data-album-id="${album.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                </div>
            </div>
            `

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של האלבום להצגה ב- DOM
        return html
    }

    // באמצעות הפונקציה searchResults המקבלת את הפרמטר results אנו יוצרים תבנית html של תוצאות החיפוש להצגה ב- DOM
    static searchResults( results ) {
        // המשתנה html מכיל את התגית ul ואליו נשרשר נתונים שיאפשרו להציג את תוצאות החיפוש ב- DOM
        let html = '<ul>'

        // הלולאת forEach עוברת על המשתנה results ומוציאה נתונים מהאיברים בהתאם ולמיקום ב- index
        results.forEach((result, index) => {
            // המשתנה html משרשר אליו את השורות עם תוצאות החיפוש להצגה ב- DOM
            html += `<li data-album-id="${result.id}">${result.name}</li>`
        })

        // המשתנה html משרשר אליו את התגית הסוגרת של ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של תוצאות החיפוש להצגה ב- DOM
        return html
    }

    // באמצעות הפונקציה songItem אנו יוצרים תבנית html של השדות להוספת שירים לאלבום
    static songItem() {
        // המשתנה html מכיל תבנית html של השדות להוספת שירים לאלבום
        let html = `
        <div class="form-group song">
            <input type="text" class="form-control" value="Song" placeholder="Song name">
            <input type="text" class="form-control" value="http://lll.mp3" placeholder="Song URL">
        </div>`

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html של של השדות להוספת שירים לאלבום
        return html
    }
}