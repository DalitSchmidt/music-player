// ייבוא היכולות של jQuery על-מנת שהאובייקט SearchResultsTemplate יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט SearchResultsTemplate מתפקד כ"מעין" מחלקת שירות ומכיל את כל הפונקציות המאפשרות לנו להציג את תוצאות החיפוש ב- DOM
// הגדרת האובייקט SearchResultsTemplate כקבוע
const SearchResultsTemplate = {
    // באמצעות הפונקציה result המקבלת את המשתנה album המכיל את כל הפרטים של האלבום מתאפשר ליצור תבנית html שתציג ב- DOM את התוצאה של החיפוש
    result: function( album ) {
        // הפונקציה מחזירה את התבנית html שתציג ב- DOM את התוצאה של החיפוש
        return `
            <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="search-results-record">
                                <img src="${album.album_image}" alt="${album.album_name}" class="img-responsive img-circle center-block">
                                <a href="#" class="play-icon">
                                    <i class="fa fa-play"></i>
                                </a>
                                <a href="#" class="remove-icon">
                                    <i class="fa fa-remove"></i>
                                </a>
                                <a href="#" class="edit-icon" data-toggle="modal" data-target="#addNewAlbum">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </div>
                        </div>
            
                        <div class="col-md-9">
                            <h3 class="search-results-album-name">${album.album_artist} - ${album.album_name}</h3>
                            <p class="search-results-album-description">${album.album_description}</p>
                            <button class="search-results-description-button pull-right">MORE DESCRIPTION...</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // באמצעות הפונקציה results המקבלת את המשתנה albums מתאפשר להציג את תוצאות החיפוש ב- DOM
    results: function( albums ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו כדי שתוצאות החיפוש יוצגו ב- DOM
        let html = ''

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה albums (המכיל מערך עם הנתונים של האלבום) ומוציאה ממנו את ה- index והפרטים של האלבום הרלוונטי לתוצאת החיפוש, ולאחר מכן תופעל פונקציית callback (המסומנת כפונקציית חץ) שבה המשתנה html משרשר אליו את הנתונים המצויים בפונקציה result (המאפשרת ליצור תבנית html שתציג ב- DOM את התוצאה של החיפוש) שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום
        $.each(albums, ( index, album ) => html += this.result( album ))

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המאפשרת להציג את תוצאות החיפוש ב- DOM
        return html
    },

    // באמצעות הפונקציה title המקבלת את המשתנים term ו- count מתאפשר להציג ב- DOM תבנית html המכילה כותרת המציינת את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם (ככל ואכן נמצאו תוצאות)
    title: function( term, count ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM את כמות התוצאות שנמצאו לגבי הנתונים שבוצע חיפוש לגביהם
        return `<h1 class="text-center">Found ${count} results for "${term}"</h1>`
    },

    // באמצעות הפונקציה emptyResults המקבלת את המשתנה term מתאפשר להציג ב- DOM תבנית html המכילה כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם (ככל ואכן לא נמצאו תוצאות)
    emptyResults: function( term ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנט h1 המציג ב- DOM כותרת המציינת שלא נמצאו תוצאות לגבי הנתונים שבוצע חיפוש לגביהם
        return `<h1 class="text-center">No results for term "${term}"</h1>`
    }
}

// ייצוא היכולות של האובייקט SearchResultsTemplate החוצה
export default SearchResultsTemplate