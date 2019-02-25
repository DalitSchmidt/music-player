// ייבוא היכולות של jQuery על-מנת שהאובייקט SingleAlbumTemplates יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט SingleAlbumTemplates יוכל להשתמש בהן
import Utils from '../Utils'

// האובייקט בשם SingleAlbumTemplates המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר להציג מידע ב- DOM וקשורות לאלבום המתנגן בנגן המוסיקה
// הגדרה של האובייקט בשם SingleAlbumTemplates כקבוע
const SingleAlbumTemplates = {
    // באמצעות הפונקציה albumInfoMenu מתאפשר ליצור תבנית html המציגה ב- DOM את התפריט שליטה על המידע של האלבום
    albumInfoMenu: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את התפריט שליטה על המידע של האלבום
        return `
                <div class="album-info-links" title="Description">Description</div>
                <div class="album-info-links active" title="Playlist">Playlist</div>
               `
    },

    // באמצעות הפונקציה albumInfoControls (שמקבלת את המשתנה albumId המכיל את המזהה הייחודי של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את המקשים השולטים על המידע של האלבום
    albumInfoControls: function ( albumId ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את המקשים השולטים על המידע של האלבום
        return `
                <a class="remove-icon" title="Remove Album" data-album-id="${albumId}">
                    <i class="fa fa-remove" aria-hidden="true"></i>
                </a>
                <a href="#edit-album/${albumId}" class="edit-icon" title="Edit Album" data-album-id="${albumId}">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>
               `
    },

    // באמצעות הפונקציה albumInfoImage (שמקבלת את המשתנה img המכיל את התמונת Cover של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את התמונת Cover של האלבום
    albumInfoImage: function ( img ) {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את התמונת Cover של האלבום
        return `
                <img src="${img}">
                <span></span>
               `
    },

    // באמצעות הפונקציה albumInfo (שמקבלת את המשתנה album המכיל את כל הפרטים של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את כל המידע של האלבום
    albumInfo: function ( album ) {
        // המשתנה genresHTML מפעיל את הפונקציה albumGenres (שמקבלת את הפרופרטי genres המצוי בתוך המשתנה album המכיל את הז'אנרים של האלבום השמורים במסד הנתונים) שבאמצעותה מתאפשר ליצור תבנית html המציגה ב- DOM את כל הז'אנרים הרלוונטיים של האלבום
        let genresHTML = this.albumGenres( album.genres )

        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את כל המידע של האלבום
        return `
                <h1 id="album-info-name" data-name="${album.album_artist}">${album.album_name} - ${album.album_artist}</h1>
                <h4 id="album-info-year">${album.album_year}</h4>
                <ul id="album-info-genres">${genresHTML}</ul>
                <p id="album-info-description">${album.album_description}</p>
               `
    },

    // באמצעות הפונקציה albumGenres (שמקבלת את המשתנה genres המכיל את כל הפרטים של הז'אנרים המצויים באלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את כל הז'אנרים הרלוונטיים של האלבום
    albumGenres: function ( genres ) {
        // המשתנה html מכיל ערך ריק על-מנת שנוכל לשרשר אותו ולהוסיף אלמנטים ל- DOM
        let html = ''

        // כדי לקבל את כל הערכים המצויים במשתנה genres, נעבור עליהם באמצעות לולאת for כדי שניתן יהיה להציג את כל הז'אנרים ב- DOM
        for ( let i = 0; i < genres.length; i++ )
            // המשתנה html משרשר אליו את האלמנט li המכיל את שם הז'אנר בהתאם למיקום של המשתנה genres המתקבל מהלולאה
            html += `
                     <li>${genres[ i ].genre_name}</li>
                    `

        // המשתנה html משרשר אליו אלמנט li המכיל ערך ריק
        html += '<li></li>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את הז'אנרים הרלוונטיים של האלבום
        return html
    },

    // באמצעות הפונקציה nowPlayingSong מתאפשר ליצור תבנית html המציגה ב- DOM את שם השיר המתנגן בנגן המוסיקה
    nowPlayingSong: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM את שם השיר המתנגן בנגן המוסיקה
        return `
                NOW PLAYING:
                <span id="song-name"></span>
               `
    },

    // באמצעות הפונקציה albumControls מתאפשר ליצור תבנית html המציגה ב- DOM את המקשים השולטים על ההפעלה של נגן המוסיקה
    albumControls: function () {
        // הפונקציה מחזירה תבנית html המכילה אלמנטים המאפשרים להציג ב- DOM מקשים השולטים על ההפעלה של נגן המוסיקה
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
                <input type="range" name="song_duration" id="song-duration">
                <time id="timer"></time>
                <div id="volume-controls">
                    <a id="volume-up" title="Volume">
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                    </a>
                    <input type="range" name="song_volume" id="volume" min="0" max="100" value="100">
                </div>
               `
    },

    // באמצעות הפונקציה albumPlaylist (שמקבלת את המשתנה playlist המכיל את רשימת ההשמעה של האלבום) מתאפשר ליצור תבנית html המציגה ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
    albumPlaylist: function ( playlist ) {
        // המשתנה html מכיל ערך ריק על-מנת שנוכל לשרשר אותו ולהוסיף אלמנטים ל- DOM
        let html = ''

        // כדי לקבל את כל הערכים המצויים במערך של המשתנה playlist, נעבור עליהם באמצעות לולאת each העוברת איבר-איבר על הערכים המצויים במערך שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מקבלת את המשתנים index ו- song ומבצעת מספר פעולות
        $.each(playlist, ( index, song ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל את הנתונים של שם השיר והזמן שלו השמורים במסד הנתונים
            html += `
                     <li title="${song.song_name} ${Utils.calculateTime( song.song_time )}" data-code="${song.song_youtube}">${song.song_name}
                        <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
                     </li>
                    `
        })

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html שבאמצעותה מתאפשר להציג ב- DOM את רשימת ההשמעה עם הזמן של כל שיר באלבום
        return html
    }
}

// ייצוא היכולות של האובייקט SingleAlbumTemplates החוצה
export default SingleAlbumTemplates