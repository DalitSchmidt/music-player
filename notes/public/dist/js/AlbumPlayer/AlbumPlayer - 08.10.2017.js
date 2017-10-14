// / האובייקט AlbumPlayer מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול האלבום שמתנגן בנגן המוסיקה
// הגדרת האובייקט AlbumPlayer כקבוע
const AlbumPlayer = {
    // באמצעות הפונקציה switchDetails המקבלת את הפרמטר e המסמל event, אנו מחליפים בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ב- playlist
    switchDetails: function( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // מחיקת ה- class בשם active שמצוי תחת ה- div המכיל מזהה ייחודי בשם menu
        $('#menu .active').removeClass('active')
        // הוספת ה- class בשם active למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('active')

        // ביצוע הצגה או החלפה בין הנתונים המצויים תחת div המכיל מזהה ייחודי בשם album-description ותחת ה- div המכיל מזהה ייחודי בשם player-controls באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#album-description, #player-controls').toggle()
        // ביצוע הצגה או החלפה בין הנתונים המצויים תחת div המכיל מזהה ייחודי בשם song-youtube ותחת ה- div המכיל מזהה ייחודי בשם album-image ושמצויה תחתיו תגית img באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#song-youtube, #album-image img').toggle()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
    bindEvents: function() {
        // כאשר לוחצים על הנתונים המצויים בתגית li שמצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שמצוי תחת התגית ol המכילה מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playSong יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        // כאשר לוחצים על הנתונים המצויים ב- class בשם links שמצוי תחת ה- div המכיל מזהה ייחודי בשם menu, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שמצוי ב- class בשם links שמצוי תחת ה- div המכיל מזהה ייחודי בשם menu) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#menu .links').on('click', $.proxy( this.switchDetails, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
    init: function () {
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
        this.bindEvents()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיעלו עם הפעלתו של האובייקט
$(document).ready(function () {
    // הפעלה של הפונקציה init המצויה תחת האובייקט AlbumPlayer שמכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
    AlbumPlayer.init()
})