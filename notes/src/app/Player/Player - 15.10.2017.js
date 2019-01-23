// ייבוא היכולות של jQuery על-מנת שהאובייקט Player יוכל להשתמש בהן
import $ from 'jquery'

// בקובץ זה אנו מגדירים את כל הפעולות המתבצעות בנגן באמצעות שימוש ב- API של YouTube
// הגדרת משתנה גלובלי בשם youtubeplayer
var youtubeplayer
// המשתנה tag יוצר אלמנט חדש ב- DOM בשם script
var tag = document.createElement('script')
// הוספת ה- attribute מסוג src המכיל את כתובת ה- URL 'https://www.youtube.com/iframe_api' לאלמנט המצוי במשתנה tag
tag.src = 'https://www.youtube.com/iframe_api'
// המשתנה firstScriptTag מכיל את האלמנט הראשון מסוג script המצוי ב- DOM באמצעות ההגדרה של 'document.getElementsByTagName' ולמיקום של האינדקס 0 במערך של התגי שם המכילים את השם script
var firstScriptTag = document.getElementsByTagName('script')[0]
// הכנסת המשתנים tag ו- firstScriptTag לפני הצומת הראשית של האלמנטים ב- DOM
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// באמצעות הפונקציה onYouTubeIframeAPIReady אנו מפעילים את תגית ה- iframe כשה- API של YouTube מוכן
function onYouTubeIframeAPIReady() {
    // המשתנה youtubeplayer יוצר אינסטנס חדש של Player בשם song-youtube המכיל אובייקט חדש שבו יש פרופרטיס שונים המגדירים את התכונות שלו
    youtubeplayer = new YT.Player('song-youtube', {
        // הגדרת גובה התגית iframe שמוצג בה הסרטון
        height: '250',
        // הגדרת רוחב התגית iframe שמוצג בה הסרטון
        width: '250',
        // התאמת מאפיינים הקשורים להגדרות תצוגה שונות של הנגן המצוי בתגית iframe
        playerVars: {
            // ביטול האפשרות של ניגון אוטומטי של הסרטון
            autoplay: 0,
            // ביטול הצגת הלחצנים השולטים על הצגת הסרטון
            controls: 0,
            // ביטול הצורך ב- attribute בשם rel המציין אם הנגן צריך להציג סרטונים קשורים או לא בעת ההפעלה של הסרטון הראשוני
            rel : 0,
            // ביטול האפשרות של הצגת מידע אודות הסרטון כגון כותרת סרטון העולה לפני הפעלת הסרטון
            showinfo: 0,
            // הסתרת הלוגו של YouTube מסרגל הבקרה
            modestbranding: 1,  // Hide the Youtube Logo
            // מניעת הרצת רשימת ההשמעה של הנגן באופן אוטומטי מההתחלה לאחר סיום הנגינה של כל רשימת ההשמעה
            loop: 0,            // Run the video in a loop
            // הסתרת הכפתור של תצוגת הסרטון במסך מלא
            fs: 0,              // Hide the full screen button
            // הסתרת כתוביות מהסרטון (במידה ויש)
            cc_load_policy: 0, // Hide closed captions
            // הסתרת הערות של הסרטון (במידה ויש)
            iv_load_policy: 3,  // Hide the Video Annotations
            // ביטול הצגת סרגל ההתקדמות של הסרטון
            autohide: 0
        },
        // הגדרת המאפיינים המזהים את האירועים שקורים ב- API ואת הפונקציות שמאזינות ל- API כאשר האירועים האלה מתרחשים
        events: {
            // הפונקציה onPlayerReady מתבצעת כאשר האירוע onReady מתרחש
            'onReady': onPlayerReady
        },
    })
}

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
        // המשתנה video_id מכיל את ה- attribute מסוג data-code של המשתנה el המכיל את התגית li הראשונה המצויה תחת התגית ol המגילה מזהה ייחודי בשם player-playlist, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי בתגית li הראשונה
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
        // הפעלה של הפונקציה bindEvents שמכילה את כל ה- eventים הקורים באובייקט Player
        this.bindEvents()
    }
}

// ייצוא היכולות של האובייקט Player החוצה
export default Player