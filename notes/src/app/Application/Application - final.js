// ייבוא היכולות של jQuery על-מנת שהאובייקט Application יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט Application יוכל להשתמש בהן
import AlbumForm from './Album/AlbumForm'
// ייבוא היכולות של האובייקט AlbumsBoard על-מנת שהאובייקט Application יוכל להשתמש בהן
import AlbumsBoard from './Album/AlbumsBoard'
// ייבוא היכולות של האובייקט DeleteAlbum על-מנת שהאובייקט Application יוכל להשתמש בהן
import DeleteAlbum from './Album/DeleteAlbum'
// ייבוא היכולות של האובייקט SingleAlbum על-מנת שהאובייקט Application יוכל להשתמש בהן
import SingleAlbum from './Album/SingleAlbum'
// ייבוא היכולות של האובייקט Search על-מנת שהאובייקט Application יוכל להשתמש בהן
import Search from './Search/Search'
// ייבוא היכולות של האובייקט SearchBar על-מנת שהאובייקט Application יוכל להשתמש בהן
import SearchBar from './Search/SearchBar'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Application יוכל להשתמש בהן
import Router from './Router'

// האובייקט Application המתפקד כ"מעין" מחלקת שירות מכיל את כל היכולות של האפליקציה
// הגדרה של האובייקט Application כקבוע
const Application = {
    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Application
    init: function () {
        // הפעלה של הפונקציה when המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב בין העמודים השונים
        Router.when({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה all-albums/)
            path: '/all-albums',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה js/_templates/_all-albums.html/)
            template: '/js/_templates/_all-albums.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט AlbumsBoard המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumsBoard
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        // שרשור והפעלה של הפונקציה when המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב בין העמודים השונים
        }).when({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה add-new-album/)
            path: '/add-new-album',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה js/_templates/_add-new-album.html/)
            template: '/js/_templates/_add-new-album.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט AlbumForm המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumForm
            callback: AlbumForm.init.bind( AlbumForm )
        // שרשור והפעלה של הפונקציה when המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב בין העמודים השונים
        }).when({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה edit-album/)
            path: '/edit-album',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה /js/_templates/_add-new-album.html)
            template: '/js/_templates/_add-new-album.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט AlbumForm המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumForm
            callback: AlbumForm.init.bind( AlbumForm, true )
        // שרשור והפעלה של הפונקציה when המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב בין העמודים השונים
        }).when({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה search/)
            path: '/search',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה js/_templates/_search-results.html/)
            template: '/js/_templates/_search-results.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט Search המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט Search
            callback: Search.init.bind( Search )
        // שרשור והפעלה של הפונקציה when המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב בין העמודים השונים
        }).when({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה single-album/)
            path: '/single-album',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה js/_templates/_single-album.html/)
            template: '/js/_templates/_single-album.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט SingleAlbum המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SingleAlbum ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט SingleAlbum
            callback: SingleAlbum.init.bind( SingleAlbum )
        // הפעלה של הפונקציה otherwise המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע ניתוב לעמוד המוגדר כברירת מחדל
        }).otherwise({
            // הפרופרטי path מכיל את שם הנתיב (במקרה זה all-albums/)
            path: 'all-albums',
            // הפרופרטי template מכיל את הנתיב לקובץ html שיש בו את התבנית html של העמוד הרלוונטי (במקרה זה js/_templates/_all-albums.html/)
            template: '/js/_templates/_all-albums.html',
            // הפרופרטי callback מכיל פונקציית callback, שבמקרה זה מפעילה את הפונקציה init המצויה תחת האובייקט AlbumsBoard המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumsBoard
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        // הפעלה של הפונקציה init המצויה תחת האובייקט Router המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
        }).init()

        // הפעלה של הפונקציה init המצויה תחת האובייקט SearchBar המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
        SearchBar.init()
        // הפעלה של הפונקציה init המצויה תחת האובייקט DeleteAlbum המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט DeleteAlbum
        DeleteAlbum.init()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיעלו עם העלאת העמוד והפעלה של הפונקציה init המצויה תחת האובייקט Application המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Application
$( document ).ready( Application.init )