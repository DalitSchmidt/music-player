// ייבוא היכולות של jQuery על-מנת שהאובייקטים Player ו- AlbumPlayer יוכלו להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של ה- class DataService על-מנת שהאובייקטים Player ו- AlbumPlayer יוכלו להשתמש בהן
import DataService from './DataService'

// האובייקט Player מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הנגן המוסיקה
// הגדרת האובייקט Player כקבוע
const Player = {
    // באמצעות הפונקציה playSong המקבלת את הפרמטר e המסמל event אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר כגון הדגשת שם השיר שמתנגן ובעת מעבר לשיר חדש ביטול ההדגשה, החלפת הקליפ של השיר ושם השיר בהתאם לשיר שמתנגן בנגן וכו'
    playSong: function( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // מחיקת ה- class בשם playing מהתגית li המכילה את ה- class בשם playing ושמצויה תחת תגית ol המכילה מזהה ייחודי בשם player-playlist
        $('#player-playlist li.playing').removeClass('playing')
        // הוספת ה- class בשם playing למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('playing')
        // המשתנה youtube_id מכיל את ה- attribute מסוג data בשם code של המשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        let youtube_id = el.data('code') // el.attr('data-code')
        // המשתנה youtubeplayer מפעיל את הפונקציה loadVideoById המאפשרת לטעון את הסרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה youtube_id המכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        youtubeplayer.loadVideoById( youtube_id )
        // המשתנה song_name מכיל את הטקסט שמצוי במשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let song_name = el.text()
        // החלפת הטקסט המצוי בתגית span המכילה מזהה ייחודי בשם song-name ושמצויה תחת התגית span המכילה מזהה ייחודי בשם now-playing-song בטקסט המצוי במשתנה song_name המכיל את הטקסט שמצוי במשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        $('#now-playing-song #song-name').text( song_name )
    },

    // באמצעות הפונקציה startPlayist אנו שולטים על הפעלת רשימת ההשמעה של הנגן
    startPlaylist: function() {
        // אם אורך הנתונים של התגית div המכילה מזהה ייחודי בשם player, המכיל את כל ההגדרות של נגן ה- YouTube, הוא 0, כלומר שאין נתונים, אז הפונקציה מבצעת חזרה
        if ( $('#player').length === 0 )
            return

        // המשתנה el מכיל את התגית li הראשונה (מאחר והאינדקס שלה במערך הוא 0) שמצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist
        let el = $( $('#player-playlist li')[0] )
        // הוספת ה- class בשם playing למשתנה el המכיל את התגית li הראשונה המצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist
        el.addClass('playing')
        // המשתנה video_id מכיל את ה- attribute מסוג data-code של המשתנה el המכיל את התגית li הראשונה המצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי בתגית li הראשונה
        let video_id = el.attr('data-code')
        // המשתנה youtubeplayer מפעיל את הפונקציה loadVideoById המאפשרת לטעון את הסרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה video_id המכיל את המזהה הייחודי של הסרטון המצוי בתגית li הראשונה
        youtubeplayer.loadVideoById( video_id )
    },

    // באמצעות הפונקציה play אנו שולטים על הפעלת הסרטון בנגן
    play: function() {
        // הוספת ה- attribute בשם disabled המכיל ערך זהה לכפתור שנלחץ
        $(this).attr('disabled', 'disabled')
        // מחיקת ה- attribute בשם disabled מהכפתור המכיל מזהה ייחודי בשם pause
        $('#pause').removeAttr('disabled')
        // המשתנה youtubeplayer מפעיל את הפונקציה playVideo אשר בעת לחיצה על הכפתור Play היא מפעילה את הסרטון בנגן
        youtubeplayer.playVideo()
    },

    // באמצעות הפונקציה pause אנו שולטים על השהיית הניגון של הסרטון בנגן
    pause: function() {
        // הוספת ה- attribute בשם disabled המכיל ערך זהה לכפתור שנלחץ
        $(this).attr('disabled', 'disabled')
        // מחיקת ה- attribute בשם disabled מהכפתור המכיל מזהה ייחודי בשם play
        $('#play').removeAttr('disabled')
        // המשתנה youtubeplayer מפעיל את הפונקציה pauseVideo אשר בעת לחיצה על הכפתור Pause היא משהה את הניגון של הסרטון בנגן
        youtubeplayer.pauseVideo()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Player
    bindEvents: function() {
        // בעת ביצוע לחיצה על הנתונים המצויים בתגית li שמצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שמצוי תחת התגית ol המכילה מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playSong יתייחס בכל מקרה לאובייקט Player
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        // ביצוע קריאה לפונקציה play (השולטת על הפעלת הסרטון בנגן) בעת לחיצה על הכפתור המכיל מזהה ייחודי בשם play
        $('#play').on('click', this.play)
        // ביצוע קריאה לפונקציה pause (השולטת על השהיית הניגון של הסרטון בנגן) בעת לחיצה על הכפתור המכיל מזהה ייחודי בשם pause
        $('#pause').on('click', this.pause)
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Player
    init: function () {
        // הפעלה של הפונקציה startPlaylist שבאמצעותה אנו שולטים על הפעלת רשימת ההשמעה של הנגן
        this.startPlaylist()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט Player
        this.bindEvents()
    }
}

// ייצוא האובייקט Player ל- window
window.Player = Player

// האובייקט AlbumPlayer מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול האלבום שמתנגן בנגן המוסיקה
// הגדרת האובייקט AlbumPlayer כקבוע
const AlbumPlayer = {
    // באמצעות הפונקציה switchDetails המקבלת את הפרמטר e המסמל event, אנו מחליפים בין הנתונים המצויים בתיאור האלבום לבין הנתונים המצויים ב- playlist
    switchDetails: function( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // מחיקת ה- class בשם active מהאלמנט שיש לו class זה ומצוי בתוך תגית div המכילה מזהה ייחודי בשם album-info-menu
        $('#album-info-menu .active').removeClass('active')
        // הוספת ה- class בשם active למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('active')

        // ביצוע הצגה או החלפה בין הנתונים המצויים בתוך תגית div שיש לה מזהה ייחודי בשם album-info-description לבין הנתונים המצויים בתוך תגית div שיש לה מזהה ייחודי בשם player-controls, באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#album-info-description, #player-controls').toggle()
        // ביצוע הצגה או החלפה בין הנתונים המצויים בתןך תגית div שיש לה מזהה ייחודי בשם song-youtube לבין הנתונים המצויים באלמנט img המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-image, באמצעות הפונקציה toggle בהתאם לכפתור שנלחץ בתפריט
        $('#song-youtube, #album-info-image img').toggle()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
    bindEvents: function() {
        // כאשר לוחצים על הנתונים המצויים בתגית li שמצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שמצוי תחת התגית ol המכילה מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playSong יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        // כאשר מתבצעת לחיצה על אלמנט שיש לו class בשם album-info-links המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-menu, נשתמש ב- proxy מאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם switchDetails יתייחס לאלמנט עצמו (במקרה זה לאלמנט שיש לו class בשם album-info-links המצוי בתוך תגית div שיש לה מזהה ייחודי בשם album-info-menu) וכדי שההקשר של this בתוך הפונקציה switchDetails יתייחס בכל מקרה לאובייקט AlbumPlayer
        $('#album-info-menu .album-info-links').on('click', $.proxy( this.switchDetails, this ))
    },

    // באמצעות הפונקציה getAlbumID מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
    getAlbumID: function () {
        // המשתנה id מכיל את המספר id של האלבום המצוי ב- URL, מאחר והפעולה location.hash.substring(1) מאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה אנו מפצלים למערך לאחר שאנו מורידים ממנו את הסימן '/', כאשר אנחנו יודעים שהאינדקס 1 במערך מכיל את המספר id של האלבום המצוי ב- URL
        let id = location.hash.substring(1).split('/')[1]
        // הפונקציה מחזירה את המשתנה id המכיל את המספר id של האלבום המצוי ב- URL
        return id
    },

    // באמצעות הפונקציה getAlbum מתאפשר לקבל אלבום ספציפי לפי המספר id שלו
    getAlbum: function () {
        // המשתנה id מפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL
        let id = this.getAlbumID()
        // if ( !id ) {
        //     location.replace('/')
        //     return
        // }

        // הפעלה של הפונקציה getAlbumById (המבצעת בקשת getJSON לנתיב 'http://localhost:3000/api/albums/' + album_id, ובכך מתאפשר למעשה לקבל אלבום ספציפי לפי המספר id שלו) ושמצויה תחת ה- class בשם DataService אשר מקבלת את המשתנה id (המפעיל את הפונקציה getAlbumID שבאמצעותה מתאפשר לקבל את המספר id של האלבום המצוי ב- URL), ולאחר מכן נפעיל promise שבאמצעות המשתנה album מביא את התבנית של האלבום
        DataService.getAlbumById( id ).then(album => {

        })
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט AlbumPlayer
    init: function () {
        // הפעלה של הפונקציה getAlbum המאפשר לקבל אלבום ספציפי לפי המספר id שלו
        this.getAlbum()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט AlbumPlayer
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט AlbumPlayer החוצה
export default AlbumPlayer