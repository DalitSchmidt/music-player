// האובייקט בשם AlbumTemplate המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות לנו להציג מידע ב- DOM וקשורות לאלבום
// הגדרת האובייקט בשם AlbumTemplate כקבוע
const AlbumTemplates = {
    // באמצעות הפונקציה albumInfo המקבלת את המשתנה album המכיל את כל הפרטים של האלבום, אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
    albumInfo: function( album ) {
        // הפונקציה מחזירה תבנית html המכילה את כל הפרטים של האלבום להצגה ב- DOM
        return `
            <h1 id="album-info-name">${album.album_name} - ${album.album_artist}</h1>
            <h4 id="album-info-year">${album.album_year}</h4>
            <ul id="album-info-genres">
                <li>Baroque</li>
                <li>Pop</li>
                <li></li>
            </ul>
            <p id="album-info-description">${album.album_description}</p>
        `
    },

    // באמצעות הפונקציה albumImage המקבלת את המשתנה img המכיל את הפרטים של תמונת האלבום, אנו יוצרים תבנית html המציגה ב- DOM את התמונת cover של האלבום
    albumImage: function( img ) {
        // הפונקציה מחזירה תבנית html המכילה את התמונת cover של האלבום להצגה ב- DOM
        return `<img src="${img}">`
    },

    // באמצעות הפונקציה albumGenres המקבלת את המשתנה genres המכיל את כל הפרטים של הז'אנרים, אנו יוצרים תבנית html המציגה ב- DOM את כל הז'אנרים של האלבום
    albumGenres: function( genres ) {
        // המשתנה html מכיל את התגית ul שיש לה מזהה ייחודי בשם album-genres שאליו נשרשר את הז'אנרים של האלבום
        let html = '<ul id="album-genres">'

        // הלולאת for עוברת על המערך של הז'אנרים
        for ( let i = 0; i < genres.length; i++ )
            // המשתנה html משרשר אליו תגית li המכילה את שם הז'אנר בהתאם למיקום של הז'אנר שהתקבל מהלולאה
            html += `<li>${genres[ i ].genre_name}</li>`

        // בסיום הלולאה המשתנה html משרשר אליו את התגית הסוגרת של ul
        html += '</ul>'

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המציגה ב- DOM את הז'אנרים של האלבום
        return html
    },

    // באמצעות הפונקציה albumPlaylist המקבלת את המשתנה playlist המכיל את רשימת השירים של האלבום, אנו יוצרים תבנית html המציגה ב- DOM את רשימת השירים של האלבום עם הזמן של כל שיר באלבום
    albumPlaylist: function( playlist ) {
        // באמצעות הפונקציה calculateTime המקבלת את המשתנה seconds המכיל את אורך השיר בשניות, אנו מבצעים חישוב של זמן השיר
        function calculateTime( seconds ) {
            // הפונקציה מחזירה את החישוב שמתבצע לגבי זמן השיר
            return Math.floor( seconds / 60 ) + ':' + seconds % 60
        }

        // המשתנה html מכיל נתונים ריקים על-מנת שנוכל לשרשר אותו ולהוסיף נתונים ל- DOM
        let html = ''

        // הלולאת each עוברת איבר-איבר על הנתונים המצויים במשתנה playlist (המכיל מערך עם רשימת השירים של האלבום) ומוציאה ממנו את ה- index ואת השיר המצוי ברשימת השירים
        $.each(playlist, ( index, song ) => {
            // המשתנה html משרשר אליו את האלמנט li המכיל נתונים של שם השיר והזמן שלו לצורך הצגה ב- DOM של התבנית html המכילה את רשימת השירים של האלבום
            html += `<li data-code="${song.song_youtube}">${song.song_name} (${calculateTime( song.song_time )})</li>`
        })

        // הפונקציה מחזירה את המשתנה html המכיל תבנית html המכילה את רשימת השירים של האלבום עם הזמן של כל שירר באלבום
        return html
    },

    // באמצעות הפונקציה getTemplate המקבלת את המשתנה album המכיל את כל הפרטים של האלבום, אנו מציגים ב- DOM את כל התבנית של האלבום
    getTemplate: function( album ) {
        //המשתנה info מפעיל את הפונקציה albumInfo (היוצרת תבנית html המציגה ב- DOM את כל המידע של האלבום) שמקבלת את המשתנה album (המכיל את כל הפרטים של האלבום)
        let info = this.albumInfo( album )
        //המשתנה genres מפעיל את הפונקציה albumGenres (היוצרת תבנית html המציגה ב- DOM את כל הז'אנרים של האלבום) שמקבלת את הערך של genres המצוי תחת album (המכיל את כל הפרטים של הז'אנרים הרלוונטיים לאלבום)
        let genres = this.albumGenres( album.genres )
    }
}

// ייצוא היכולות של האובייקט AlbumTemplate החוצה
export default AlbumTemplates