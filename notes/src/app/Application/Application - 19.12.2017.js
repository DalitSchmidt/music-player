// ייבוא היכולות של jQuery על-מנת שהאובייקט App יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט AlbumForm על-מנת שהאובייקט App יוכל להשתמש בהן
import AlbumForm from './Album/AlbumForm'
// ייבוא היכולות של האובייקט AlbumPlayer על-מנת שהאובייקט App יוכל להשתמש בהן
import SingleAlbum from './Album/SingleAlbum'
// ייבוא היכולות של האובייקט AlbumsBoard על-מנת שהאובייקט App יוכל להשתמש בהן
import AlbumsBoard from './Album/AlbumsBoard'
// ייבוא היכולות של האובייקט DeleteAlbum על-מנת שהאובייקט App יוכל להשתמש בהן
import DeleteAlbum from './Album/DeleteAlbum'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט App יוכל להשתמש בהן
import Router from './Router'
// ייבוא היכולות של האובייקט Search על-מנת שהאובייקט App יוכל להשתמש בהן
import Search from './Search/Search'
// ייבוא היכולות של האובייקט SearchBar על-מנת שהאובייקט App יוכל להשתמש בהן
import SearchBar from './Search/SearchBar'

// האובייקט App המתפקד כ"מעין" מחלקת שירות מכיל את כל היכולות של האפליקציה
// הגדרת האובייקט App כקבוע
const App = {
    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט App
    init: function() {
        // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט App
        Router.when({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/all-albums')
            path: '/all-albums',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_all-albums.html')
            template: '/js/_templates/_all-albums.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט AlbumsBoard ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumsBoard)
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        // שרשור והפעלה של הפונקציה when (המאפשרת לבצע ניתוב בין הדפים) המפעילה אובייקט שיש בו פרופרטיס שונים
        }).when({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/add-new-album')
            path: '/add-new-album',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_add-new-album.html')
            template: '/js/_templates/_add-new-album.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט AlbumForm ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumForm)
            callback: AlbumForm.init.bind( AlbumForm )
        // שרשור והפעלה של הפונקציה when (המאפשרת לבצע ניתוב בין הדפים) המפעילה אובייקט שיש בו פרופרטיס שונים
        }).when({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/edit-album')
            path: '/edit-album',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_add-new-album.html')
            template: '/js/_templates/_add-new-album.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט AlbumForm ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumForm ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumForm)
            callback: AlbumForm.init.bind( AlbumForm, true )
        // שרשור והפעלה של הפונקציה when (המאפשרת לבצע ניתוב בין הדפים) המפעילה אובייקט שיש בו פרופרטיס שונים
        }).when({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/search')
            path: '/search',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_search-results.html')
            template: '/js/_templates/_search-results.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט Search ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Search ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט Search)
            callback: Search.init.bind( Search )
        // שרשור והפעלה של הפונקציה when (המאפשרת לבצע ניתוב בין הדפים) המפעילה אובייקט שיש בו פרופרטיס שונים
        }).when({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/single-album')
            path: '/single-album',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_single-album.html')
            template: '/js/_templates/_single-album.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט AlbumPlayer ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumPlayer ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumPlayer)
            callback: SingleAlbum.init.bind( SingleAlbum )
        // הפעלה של הפונקציה otherwise המאפשרת לבצע ניתוב לדף המוגדר כברירת מחדל
        }).otherwise({
            // הפרופרטיס path מכיל את שם הנתיב (במקרה זה '/all-albums')
            path: 'all-albums',
            // הפרופרטיס template מכיל את הנתיב לקובץ html שיש בו את התבנית html של הדף הרלוונטי (במקרה זה '/js/_templates/_all-albums.html')
            template: '/js/_templates/_all-albums.html',
            // הפרופרטי callback מכיל פונקציית callback (שבמקרה זה מפעילה את הפונקציה init שמצויה תחת האובייקט AlbumsBoard ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumsBoard ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם init יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה init) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה init יתייחס בכל מקרה לאובייקט AlbumsBoard)
            callback: AlbumsBoard.init.bind( AlbumsBoard )
        // הפעלה של הפונקציה init המצויה תחת האובייקט Router המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
        }).init()

        // הפעלה של הפונקציה init המצויה תחת האובייקט SearchBar ושמכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט SearchBar
        SearchBar.init()
        // הפעלה של הפונקציה init המצויה תחת האובייקט DeleteAlbum ושמכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט DeleteAlbum
        DeleteAlbum.init()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיעלו עם העלאת הדף והפעלת הפונקציה init המצויה תחת האובייקט App המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט
$( document ).ready( App.init )