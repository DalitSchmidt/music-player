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
            <h1 id="album-info-name">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">${genresHTML}</ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    // באמצעות הפונקציה albumImage המקבלת את המשתנה img המכיל את הפרטים של תמונת האלבום, אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
    albumImage: function( img ) {
        // הפונקציה מחזירה תבנית html המכילה את התמונת cover של האלבום להצגה ב- DOM
        return `<img src="${img}" class="img-circle">`
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
            html += `<li data-code="${song.song_youtube}">${song.song_name} <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span></li>`

            // html += `<li data-code="${song.song_youtube}">
            //             <span>${song.song_name}</span>
            //             <span data-duration="${song.song_time}">(${Utils.calculateTime( song.song_time )})</span>
            //          </li>`
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
            <a id="step-backward" data-album-id="">
                <i class="fa fa-step-backward"></i>
            </a>
            <a id="play" data-album-id="">
                <i class="fa fa-play"></i>
            </a>
            <a id="stop" data-album-id="">
                <i class="fa fa-stop"></i>
            </a>
            <a id="step-forward" data-album-id="">
                <i class="fa fa-step-forward"></i>
            </a>
            <div id="song-duration-controls">
                <input type="range" id="song-duration" name="song-duration">
                <time id="timer"></time>            
            </div>
            <div id="volume-controls">
                <a id="volume-up" data-album-id="">
                    <i class="fa fa-volume-up"></i>
                </a>            
                <input type="range" id="volume" name="volume" min="0" max="100" value="100">
                
                <!--<a id="volume-off" data-album-id="">-->
                    <!--<i class="fa fa-volume-off"></i>-->
                <!--</a>-->
                <!--<a id="volume-down" data-album-id="">-->
                    <!--<i class="fa fa-volume-down"></i>-->
                <!--</a>-->
            </div>
        `
    }
}

// ייצוא היכולות של האובייקט SingleAlbumTemplates החוצה
export default SingleAlbumTemplates