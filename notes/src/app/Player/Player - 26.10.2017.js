// האובייקט Player מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הנגן המוסיקה
// הגדרת האובייקט Player כקבוע
const Player = {
    // הפרופרטי playing מוגדר כברירת מחדל בערך הבוליאני true
    playing: true,

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
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן
        this.toggleControls()
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
        // אם בעת הפעלת הפונקציה הערך של הפרופרטי playing הוא הערך הבוליאני true, המעיד על כך שהנגן מצוי במצב נגינה, אז הערך הבוליאני של הפרופרטי playing משתנה לערך הבוליאני false המעיד על כך שהנגן מצוי במצב מושהה
        this.playing = !this.playing
        // הוספת ה- attribute בשם disabled המכיל ערך זהה לאלמנט button שיש לו מזהה ייחודי בשם play
        $('#play').attr('disabled', 'disabled')
        // מחיקת ה- attribute בשם disabled מהאלמנט button שיש לו מזהה ייחודי בשם pause
        $('#pause').removeAttr('disabled')
        // המשתנה youtubeplayer מפעיל את הפונקציה playVideo אשר בעת לחיצה על הכפתור Play היא מפעילה את הסרטון בנגן
        youtubeplayer.playVideo()
    },

    // באמצעות הפונקציה pause אנו שולטים על השהיית הניגון של הסרטון בנגן
    pause: function() {
        // אם בעת הפעלת הפונקציה הערך של הפרופרטי playing הוא הערך הבוליאני false, המעיד על כך שהנגן מצוי במצב מושהה, אז הערך הבוליאני של הפרופרטי playing משתנה לערך הבוליאני true המעיד על כך שהנגן מצוי במצב נגינה
        this.playing = !this.playing
        // הוספת ה- attribute בשם disabled המכיל ערך זהה לאלמנט button שיש לו מזהה ייחודי בשם pause
        $('#pause').attr('disabled', 'disabled')
        // מחיקת ה- attribute בשם disabled מהאלמנט button שיש לו מזהה ייחודי בשם play
        $('#play').removeAttr('disabled')
        // המשתנה youtubeplayer מפעיל את הפונקציה pauseVideo אשר בעת לחיצה על הכפתור Pause היא משהה את הניגון של הסרטון בנגן
        youtubeplayer.pauseVideo()
    },

    // באמצעות הפונקציה toggleControls מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן
    toggleControls: function () {
        // אם הפרופרטי playing מכיל את הערך הבוליאני true, נפעיל את הפונקציה pause, אם הוא מכיל את הערך הבוליאני false נפעיל את הפונקציה play
        if ( this.playing )
            this.pause()
        else
            this.play()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Player
    bindEvents: function() {
        // בעת ביצוע לחיצה על הנתונים המצויים בתגית li שמצויה תחת התגית ol המכילה מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שמצוי תחת התגית ol המכילה מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playSong יתייחס בכל מקרה לאובייקט Player
        $('#player-playlist li').on('click', $.proxy( this.playSong, this ))
        // בעת ביצוע לחיצה על האלמנט button שיש לו מזהה ייחודי בשם play או pause, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם toggleControls יתייחס לאלמנט עצמו (במקרה זה לאלמנט button שיש לו מזהה ייחודי בשם play או pause) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה toggleControls יתייחס בכל מקרה לאובייקט Player
        $('#play, #pause').on('click', $.proxy( this.toggleControls, this ))
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