// ייבוא היכולות של jQuery על-מנת שהאובייקט App יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט App יוכל להשתמש בהן
import AlbumForm from './AlbumForm'
// ייבוא היכולות של האובייקט AlbumPlayer על-מנת שהאובייקט App יוכל להשתמש בהן
import AlbumPlayer from './AlbumPlayer'
// ייבוא היכולות של האובייקט AlbumsBoard על-מנת שהאובייקט App יוכל להשתמש בהן
import AlbumsBoard from './AlbumsBoard'
// ייבוא היכולות של האובייקט Player על-מנת שהאובייקט App יוכל להשתמש בהן
import Player from './Player'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט App יוכל להשתמש בהן
import Router from './Router'
// ייבוא היכולות של ה- class Search על-מנת שהאובייקט App יוכל להשתמש בהן
import Search from './Search'

// האובייקט App המתפקד כ"מעין" מחלקת שירות מכיל את כל היכולות של האפליקציה
// הגדרת האובייקט App כקבוע
const App = {
    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
    init: function() {
        // הפעלה של הפונקציה setupRoutes שבאמצעותה מתאפשר "להכין" את הנתיבים לשימוש ושמצויה תחת האובייקט Router (שבאמצעותו מתבצעת שליטה על ניתוב הדפים ב- DOM על-מנת שהדף יהיה SPA)
        Router.setupRoutes({
            // הפרופרטי 'all-albums' מפעיל את הפונקציה init המצויה תחת האובייקט AlbumsBoard וקשירת כל הפעולות המבוצעות באובייקט AlbumsBoard
            'all-albums': AlbumsBoard.init.bind( AlbumsBoard ),
            // הפרופרטי 'add-new-album' מפעיל את הפונקציה init המצויה תחת האובייקט AlbumForm וקשירת כל הפעולות המבוצעות באובייקט AlbumForm
            'add-new-album': AlbumForm.init.bind( AlbumForm ),
            // הפרופרטי 'single-album' מפעיל את הפונקציה init המצויה תחת האובייקט AlbumPlayer וקשירת כל הפעולות המבוצעות באובייקט AlbumPlayer
            'single-album': AlbumPlayer.init.bind( AlbumPlayer )
        }).init()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף והפעלת הפונקציה init המצויה תחת האובייקט App המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
$( document ).ready( App.init )