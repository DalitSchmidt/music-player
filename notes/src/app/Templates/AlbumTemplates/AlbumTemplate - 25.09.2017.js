// האובייקט בשם AlbumTemplate המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות לנו להציג מידע ב- DOM וקשורות לאלבום
// הגדרת האובייקט בשם AlbumTemplate כקבוע
const AlbumTemplate = {

    // באמצעות הפונקציה albumInfo המקבלת את המשתנה album המכיל את כל הפרטים של האלבום, אנו יוצרים תבנית html המציגה ב- DOM את כל המידע של האלבום
    albumInfo: function( album ) {
        // הפונקציה מחזירה תבנית html המכילה את כל הפרטים של האלבום להצגה ב- DOM
        return `
            <h2 id="album-name">Album name: ${album.album_name}</h2>
            <h4 id="album-artist">Artist: ${album.album_artist}</h4>
            <h4>Year: <span id="album-year">${album.album_year}</span></h4>
            <img id="album-image" src="${album.album_img}" alt="">
            <h4>Description:</h4>
            <p id="album-description">${album.album_description}</p>
        `
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

    // באמצעות הפונקציה getTemplate המקבלת את המשתנה album המכיל את כל הפרטים של האלבום, אנו מציגים ב- DOM את כל התבנית של האלבום
    getTemplate: function( album ) {
        //המשתנה info מפעיל את הפונקציה albumInfo (היוצרת תבנית html המציגה ב- DOM את כל המידע של האלבום) שמקבלת את המשתנה album (המכיל את כל הפרטים של האלבום)
        let info = this.albumInfo( album )
        //המשתנה genres מפעיל את הפונקציה albumGenres (היוצרת תבנית html המציגה ב- DOM את כל הז'אנרים של האלבום) שמקבלת את הערך של genres המצוי תחת album (המכיל את כל הפרטים של הז'אנרים הרלוונטיים לאלבום)
        let genres = this.albumGenres( album.genres )
    }

}

// ייצוא היכולות של האובייקט AlbumTemplate החוצה
export default AlbumTemplate