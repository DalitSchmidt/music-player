// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchResultsTemplates יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט SearchResultsTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר להציג מידע ב- DOM וקשורות לתוצאות החיפוש
// הגדרה של האובייקט SearchResultsTemplates כקבוע
const SearchResultsTemplates = {
    // באמצעות הפונקציה suggestions (שמקבלת את המשתנה suggestions המכיל את ההצעות האפשריות של תוצאות החיפוש) מתאפשר ליצור תבנית html המציגה ב- DOM את ההצעות האפשריות של תוצאות החיפוש
    suggestions: function ( suggestions ) {
        // המשתנה html מכיל את האלמנט ul שאליו נשרשר אלמנטים המאפשרים להציג ב- DOM את ההצעות האפשריות של תוצאות החיפוש
        let html = '<ul>'

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה suggestions, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- album ומבצעת מספר פעולות
        $.each(suggestions, ( index, album ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל את ההצעות האפשריות של תוצאות החיפוש
            html += `
                     <li title="${album.album_name}">
                        <a href="#single-album/${album.album_id}">${album.album_name}</a>
                     </li>
                    `
        })

        // המשתנה html משרשר אליו את האלמנט הסוגר של האלמנט ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את ההצעות האפשריות של תוצאות החיפוש
        return html
    },

    // באמצעות הפונקציה noSuggestions מתאפשר ליצור תבנית html המציגה בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
    noSuggestions: function () {
        // הפונקציה מחזירה אלמנט ul שבתוכו מצוי אלמנט li המכיל טקסט האומר ש"אין הצעות", ובכך מתאפשר להציג בתוצאות החיפוש ב- DOM הצעה מתאימה כאשר אין הצעות העונות לחיפוש המתבצע
        return `
                <ul>
                    <li title="No Suggestions">No Suggestions</li>
                </ul>
               `
    },

    // באמצעות הפונקציה title (שמקבלת את המשתנה term המכיל את הערך המצוי בתיבת החיפוש ואת המשתנה count המכיל את הספירה של תוצאות החיפוש) מתאפשר ליצור תבנית html המציגה ב- DOM כותרת המציינת את כמות התוצאות שנמצאו לגבי הערך שבוצע חיפוש לגביו
    title: function ( term, count ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
        return `<h1>Found ${count} results for "${term}"</h1>`
    },

    // באמצעות הפונקציה emptyResults (שמקבלת את המשתנה term המכיל את הערך המצוי בתוצאות החיפוש) מתאפשר ליצור תבנית html המציגה ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
    emptyResults: function ( term ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הערך שבוצע חיפוש לגביו
        return `<h1>No results for term "${term}"</h1>`
    },

    // באמצעות הפונקציה result (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את תוצאת החיפוש
    result: function ( album ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את תוצאת החיפוש
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

    // באמצעות הפונקציה results (שמקבלת את המשתנה albums המכיל את כל הפרטים של האלבומים) מתאפשר להכניס ל- DOM את התבנית html של תוצאות החיפוש
    results: function ( albums ) {
        // המשתנה html מכיל ערך ריק על-מנת שנוכל לשרשר אותו ולהוסיף אלמנטים ל- DOM
        let html = ''

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה albums, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- album ומבצעת מספר פעולות
        $.each(albums, ( index, album ) => {
            // המשתנה html משרשר אליו את הפונקציה result (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) שבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את תוצאת החיפוש
            html += this.result( album )
        })

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את תוצאות החיפוש
        return html
    }
}

// ייצוא היכולות של האובייקט SearchResultsTemplates החוצה
export default SearchResultsTemplates