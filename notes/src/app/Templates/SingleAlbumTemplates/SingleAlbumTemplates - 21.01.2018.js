// ייבוא היכולות של jQuery על-מנת שהאובייקט SingleAlbumTemplates יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט SingleAlbumTemplates יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט בשם SingleAlbumTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות לנו להציג מידע ב- DOM וקשורות לאלבום
// הגדרת האובייקט בשם SingleAlbumTemplates כקבוע
const SingleAlbumTemplates = {
    // באמצעות הפונקציה albumInfo המקבלת את המשתנה album המכיל את כל הפרטים של האלבום, אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
    albumInfo: function( album ) {
        // המשתנה genresHTML מפעיל את הפונקציה albumGenres המקבלת את המשתנה album.genres המכיל את הז'אנרים של האלבום המצויים במסד הנתונים שבאמצעותה שאנו יוצרים תבנית html המציגה ב- DOM את כל הז'אנרים של האלבום
        let genresHTML = this.albumGenres( album.genres )

        // הפונקציה מחזירה תבנית html המכילה את כל הפרטים של האלבום להצגה ב- DOM
        return `
            <h1 id="album-info-name" data-name="${album.album_artist}">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">${genresHTML}</ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    // באמצעות הפונקציה albumInfoControls המקבלת את המשתנה album_id אנו יוצרים תבנית html המציגה ב- DOM את המקשים השולטים על המידע של האלבום
    albumInfoControls: function ( album_id ) {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את המקשים השולטים על המידע של האלבום
        return `
            <a class="remove-icon" title="Remove Album" data-album-id="${album_id}">
                <i class="fa fa-remove" aria-hidden="true"></i>
            </a>
            <a href="#edit-album/${album_id}" class="edit-icon" title="Edit Album" data-album-id="${album_id}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
        `
    },

    // באמצעות הפונקציה albumInfoMenu אנו יוצרים תבנית html המציגה ב- DOM את התפריט שליטה על המידע של האלבום
    albumInfoMenu: function () {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את התפריט שליטה על המידע של האלבום
        return `
            <div class="album-info-links" title="Description">Description</div>
            <div class="album-info-links active" title="Playlist">Playlist</div>
        `
    },

    // באמצעות הפונקציה albumImage המקבלת את המשתנה img המכיל את הפרטים של תמונת האלבום, אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
    albumImage: function( img ) {
        // הפונקציה מחזירה תבנית html המכילה את התמונת cover של האלבום להצגה ב- DOM
        return `<img src="${img}">`
    },

    // באמצעות הפונקציה albumGenres המקבלת את המשתנה genres המכיל את כל הפרטים של הז'אנרים, אנו יוצרים תבנית html המציגה ב- DOM את כל הז'אנרים של האלבום
    albumGenres: function( genres ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // הלולאת for עוברת על המערך של הז'אנרים
        for ( let i = 0; i < genres.length; i++ )
            // המשתנה html משרשר אליו תגית li המכילה את שם הז'אנר בהתאם למיקום של הז'אנר שהתקבל מהלולאה
            html += `<li>${genres[ i ].genre_name}</li>`

        // המשתנה html משרשר אליו אלמנט li ללא נתונים
        html += '<li></li>'
        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המציגה ב- DOM את הז'אנרים של האלבום
        return html
    },

    // באמצעות הפונקציה albumPlaylist המקבלת את המשתנה playlist המכיל את רשימת השירים של האלבום, אנו יוצרים תבנית html המציגה ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
    albumPlaylist: function( playlist ) {
        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה playlist (המכיל מערך עם רשימת השירים של האלבום) ומוציאה ממנו את ה- index ואת השיר המצוי ברשימת השירים
        $.each(playlist, ( index, song ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל נתונים של שם השיר והזמן שלו לצורך הצגה ב- DOM של התבנית html המכילה את רשימת השירים של האלבום
            html += `<li data-code="${song.song_youtube}" title="${song.song_name} ${Utils.calculateTime( song.song_time )}">${song.song_name}
                        <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
                     </li>`
        })

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המכילה את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
        return html
    },

    // באמצעות הפונקציה nowPlayingSong אנו יוצרים תבנית html המציגה ב- DOM את השם של השיר שמתנגן כעת בנגן
    nowPlayingSong: function () {
        // הפונקציה מחזירה תבנית html המכילה את האלמנטים המאפשרים להציג ב- DOM את השם של השיר שמתנגן כעת בנגן
        return `<strong>
                    NOW PLAYING:
                    <span id="song-name"></span>
                </strong>`
    },

    // באמצעות הפונקציה albumControls אנו יוצרים תבנית html המציגה ב- DOM את המקשים השולטים על ההפעלה של הנגן
    albumControls: function () {
        // הפונקציה מחזירה תבנית html המכילה את המקשים השולטים על ההפעלה של הנגן המוצגים ב- DOM
        return `
            <a id="step-backward" title="Previous">
                <i class="fa fa-step-backward" aria-hidden="true"></i>
            </a>
            <a id="play">
                <i class="fa fa-play" aria-hidden="true"></i>
            </a>
            <a id="stop" title="Stop">
                <i class="fa fa-stop" aria-hidden="true"></i>
            </a>
            <a id="step-forward" title="Next">
                <i class="fa fa-step-forward" aria-hidden="true"></i>
            </a>
            <input type="range" name="song-duration" id="song-duration">
            <time id="timer"></time>
            <a id="volume-up" title="Volume">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
            </a>
            <input type="range" name="volume" id="volume" min="0" max="100" value="100">
        `
    }
}

// ייצוא היכולות של האובייקט SingleAlbumTemplates החוצה
export default SingleAlbumTemplates