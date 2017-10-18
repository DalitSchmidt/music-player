// האובייקט 'Player' מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הנגן המוסיקה
// הגדרת האובייקט 'Player' כקבוע
const Player = {
    // באמצעות הפונקציה 'playSong' המקבלת את הפרמטר 'e' המסמל event אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר כגון הדגשת שם השיר שמתנגן ובעת מעבר לשיר חדש ביטול ההדגשה, החלפת הקליפ של השיר ושם השיר בהתאם לשיר שמתנגן בנגן וכו'
    playSong: function( e ) {
        // המשתנה 'el' מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // מחיקת ה- class בשם 'playing' מהתגית 'li' המכילה את ה- class בשם 'playing' ושמצויה תחת תגית ol המכילה מזהה ייחודי בשם 'player-playlist'
        $('#player-playlist li.playing').removeClass('playing')
        // הוספת ה- class בשם 'playing' למשתנה 'el' המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('playing')
        // המשתנה 'youtube_id' מכיל את ה- attribute מסוג 'data' בשם 'code' של המשתנה 'el' המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        let youtube_id = el.data('code') // el.attr('data-code')
        // המשתנה 'youtubeplayer' מפעיל את הפונקציה 'loadVideoById' המאפשרת לטעון את הסרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה 'youtube_id' המכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        youtubeplayer.loadVideoById( youtube_id )
        // המשתנה 'song_name' מכיל את הטקסט שמצוי במשתנה 'el' המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let song_name = el.text()
        // החלפת הטקסט המצוי בתגית 'span' המכילה מזהה ייחודי בשם song-name ושמצויה תחת התגית 'span' המכילה מזהה ייחודי בשם 'now-playing-song' בטקסט המצוי במשתנה 'song_name' המכיל את הטקסט שמצוי במשתנה 'el' המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        $('#now-playing-song #song-name').text( song_name )
    },

    // באמצעות הפונקציה 'startPlayist' אנו שולטים על הפעלת רשימת ההשמעה של הנגן
    startPlaylist: function() {
        // המשתנה 'el' מכיל את התגית 'li' הראשונה (מאחר והאינדקס שלה במערך הוא 0) שמצויה תחת התגית 'ol' המכילה מזהה ייחודי בשם 'player-playlist'
        let el = $( $('#player-playlist li')[0] )
        // הוספת ה- class בשם 'playing' למשתנה 'el' המכיל את התגית 'li' הראשונה המצויה תחת התגית 'ol' המכילה מזהה ייחודי בשם 'player-playlist'
        el.addClass('playing')
        // המשתנה 'video_id' מכיל את ה- 'attribute' מסוג 'data-code' של המשתנה el המכיל את התגית 'li' הראשונה המצויה תחת התגית 'ol' המגילה מזהה ייחודי בשם 'player-playlist', כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי בתגית 'li' הראשונה
        let video_id = el.attr('data-code')
        // המשתנה 'youtubeplayer' מפעיל את הפונקציה 'loadVideoById' המאפשרת לטעון את הסרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה 'video_id' המכיל את המזהה הייחודי של הסרטון המצוי בתגית 'li' הראשונה
        youtubeplayer.loadVideoById( video_id )
    },

    // באמצעות הפונקציה 'play' אנו שולטים על הפעלת הסרטון בנגן
    play: function() {
        // הוספת ה- 'attribute' בשם 'disabled' המכיל ערך זהה לכפתור שנלחץ
        $(this).attr('disabled', 'disabled')
        // מחיקת ה- 'attribute' בשם 'disabled' מהכפתור המכיל מזהה ייחודי בשם 'pause'
        $('#pause').removeAttr('disabled')
        // המשתנה 'youtubeplayer' מפעיל את הפונקציה 'playVideo' אשר בעת לחיצה על הכפתור 'Play' היא מפעילה את הסרטון בנגן
        youtubeplayer.playVideo()
    },

    // באמצעות הפונקציה 'pause' אנו שולטים על השהיית הניגון של הסרטון בנגן
    pause: function() {
        // הוספת ה- 'attribute' בשם 'disabled' המכיל ערך זהה לכפתור שנלחץ
        $(this).attr('disabled', 'disabled')
        // מחיקת ה- 'attribute' בשם 'disabled' מהכפתור המכיל מזהה ייחודי בשם 'play'
        $('#play').removeAttr('disabled')
        //המשתנה 'youtubeplayer' מפעיל את הפונקציה 'pauseVideo' אשר בעת לחיצה על הכפתור 'Pause' היא משהה את הניגון של הסרטון בנגן
        youtubeplayer.pauseVideo()
    },

    // הפונקציה 'bindEvents' מכילה את כל ה- eventים הקורים באובייקט 'Player'
    bindEvents: function() {
        // בעת ביצוע לחיצה על הנתונים המצויים בתגית 'li' שמצויה תחת התגית ol המכילה מזהה ייחודי בשם 'player-playlist', ומאחר ואנו רוצים שההקשר של 'this' בתוך פונקציית ה- callback בשם 'playSong' יתייחס לאלמנט עצמו (במקרה זה לאלמנט 'li' שמצוי תחת התגית 'ol' המכילה מזהה ייחודי בשם 'player-playlist') נשתמש ב- 'proxy', כדי שההקשר של 'this' בתוך הפונקציה 'playSong' יתייחס בכל מקרה לאובייקט 'Player'
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        // ביצוע קריאה לפונקציה 'play' (השולטת על הפעלת הסרטון בנגן) בעת לחיצה על הכפתור המכיל מזהה ייחודי בשם 'play'
        $('#play').on('click', this.play)
        // ביצוע קריאה לפונקציה 'pause' (השולטת על השהיית הניגון של הסרטון בנגן) בעת לחיצה על הכפתור המכיל מזהה ייחודי בשם 'pause'
        $('#pause').on('click', this.pause)
    },

    // הפונקציה 'init' מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט 'Player'
    init: function () {
        // הפעלה של הפונקציה 'startPlaylist' שבאמצעותה אנו שולטים על הפעלת רשימת ההשמעה של הנגן
        this.startPlaylist()
        // הפעלה של הפונקציה 'bindEvents' שמכילה את כל ה- eventים הקורים באובייקט 'Player'
        this.bindEvents()
    }
}