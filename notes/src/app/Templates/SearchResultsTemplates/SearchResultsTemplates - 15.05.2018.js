// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchResultsTemplates יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט SearchResultsTemplates מתפקד כ"מעין" מחלקת שירות ומכיל את כל הפונקציות המאפשרות לנו להציג את תוצאות החיפוש ב- DOM
// הגדרת האובייקט SearchResultsTemplates כקבוע
const SearchResultsTemplates = {
    // באמצעות הפונקציה suggestions המקבלת את המשתנה suggestions אנו יוצרים תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
    suggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר נתונים שיאפשרו להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
        let html = '<ul>'

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה suggestions (המכיל מערך עם הנתונים של ההצעות האפשריות לתוצאות החיפוש) ומוציאה ממנו את ה- index והפרטים של האלבום הרלוונטי להצעות האפשריות לתוצאות החיפוש, ולאחר מכן תופעל פונקציית callback (המסומנת כפונקציית חץ) שבה המשתנה html משרשר אליו את האלמנט li שיש בו את ההצעות האפשריות לתוצאות החיפוש
        $.each(suggestions, ( index, album ) => {
            html += `
                     <li title="${album.album_name}">
                        <a href="#single-album/${album.album_id}">${album.album_name}</a>
                     </li>
                    `
        })

        // המשתנה html משרשר אליו את התגית הסוגרת של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המאפשרת להציג ב- DOM את ההצעות האפשריות לתוצאות החיפוש
        return html
    },

    // באמצעות הפונקציה noSuggestions מתאפשר להציג בתוצאות החיפוש כאשר אין הצעות העונות לחיפוש המבוקש הודעה מתאימה
    noSuggestions: function () {
        // הפונקציה מחזירה אלמנט ul שבתוכו מצוי אלמנט li המכיל טקסט האומר ש"אין הצעות", ובכך למעשה יתאפשר להציג ברשימת ההצעות הצעה מתאימה ככל ואין הצעות העונות לחיפוש המתבצע
        return `
                <ul>
                    <li title="No Suggestions">No Suggestions</li>
                </ul>
               `
    },

    // באמצעות הפונקציה title המקבלת את המשתנים term ו- count מתאפשר להציג ב- DOM תבנית html המכילה כותרת המציינת את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם (ככל ואכן נמצאו תוצאות)
    title: function ( term, count ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
        return `<h1>Found ${count} results for "${term}"</h1>`
    },

    // באמצעות הפונקציה emptyResults המקבלת את המשתנה term מתאפשר להציג ב- DOM תבנית html המכילה כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם (ככל ואכן לא נמצאו תוצאות)
    emptyResults: function ( term ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
        return `<h1>No results for term "${term}"</h1>`
    },

    // באמצעות הפונקציה result המקבלת את המשתנה album המכיל את כל הפרטים של האלבום מתאפשר ליצור תבנית html שתציג ב- DOM את התוצאה של החיפוש
    result: function ( album ) {
        // הפונקציה מחזירה את התבנית html שתציג ב- DOM את התוצאה של החיפוש
        return `
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="search-results-record">
                                <img src="${album.album_image}" alt="${album.album_name}">
                                <a href="#single-album/${album.album_id}" class="play-icon" data-album-id="${album.album_id}">
                                    <i class="fa fa-play" title="Play" aria-hidden="true"></i>
                                </a>
                                <a class="remove-icon" title="Remove Album" data-album-id="${album.album_id}">
                                    <i class="fa fa-remove" aria-hidden="true"></i>
                                </a>
                                <a href="#edit-album/${album.album_id}" class="edit-icon" title="Edit Album">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
            
                        <div class="col-md-9">
                            <h3 class="search-results-album-name">${album.album_name} - ${album.album_artist}</h3>
                            <p class="search-results-album-description">${album.album_description}</p>
                            <a href="#single-album/${album.album_id}" class="search-results-full-album-button" title="TO FULL ALBUM..." data-album-id="${album.album_id}">TO FULL ALBUM...</a>
                        </div>
                    </div>
                </div>
               `
    },

    // באמצעות הפונקציה results המקבלת את המשתנה albums מתאפשר להציג את תוצאות החיפוש ב- DOM
    results: function ( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו כדי שתוצאות החיפוש יוצגו ב- DOM
        let html = ''

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה albums (המכיל מערך עם הנתונים של האלבום) ומוציאה ממנו את ה- index והפרטים של האלבום הרלוונטי לתוצאת החיפוש, ולאחר מכן תופעל פונקציית callback (המסומנת כפונקציית חץ) שבה המשתנה html משרשר אליו את הנתונים המצויים בפונקציה result (המאפשרת ליצור תבנית html שתציג ב- DOM את התוצאה של החיפוש) שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום
        $.each(albums, ( index, album ) => {
            html += this.result(album)
        })

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המאפשרת להציג את תוצאות החיפוש ב- DOM
        return html
    }
}

// ייצוא היכולות של האובייקט SearchResultsTemplates החוצה
export default SearchResultsTemplates