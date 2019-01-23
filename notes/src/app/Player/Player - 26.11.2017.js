// האובייקט Player מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הנגן המוסיקה
// הגדרת האובייקט Player כקבוע
const Player = {
    // הפרופרטי playing מוגדר כברירת מחדל בערך הבוליאני true
    playing: true,

    // באמצעות הפונקציה playSong המקבלת את המשתנה el המכיל שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר כגון הדגשת שם השיר שמתנגן ובעת מעבר לשיר חדש ביטול ההדגשה, החלפת הקליפ של השיר ושם השיר בהתאם לשיר שמתנגן בנגן וכו'
    playSong: function( el ) {
        // מחיקת ה- class בשם playing מהתגית li המכילה את ה- class בשם playing ושמצויה תחת תגית ol המכילה מזהה ייחודי בשם player-playlist
        $('#player-playlist li.playing').removeClass('playing')
        // הוספת ה- class בשם playing למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('playing')
        // המשתנה youtube_id מכיל את ה- attribute מסוג data בשם code של המשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        let youtube_id = el.data('code') // el.attr('data-code')
        // המשתנה song_name מכיל את שם השיר שמתנגן כעת באמצעות הפעלת הפונקציה clone המשכפלת קבוצה של אלמנטים בהתאמה ומוצאת בו את כל הטקסט המצוי ומוחקת ממנו טקסט שמצוי באלמנט אחר, במקרה שלנו את הזמן של השיר המצוי באלמנט span, כך שלמעשה המשתנה song_name מכיל את שם השיר שמתנגן כעת בנגן
        let song_name = el.clone().find(">*").remove().end().text()
        // החלפת הטקסט המצוי בתגית span המכילה מזהה ייחודי בשם song-name ושמצויה תחת התגית span המכילה מזהה ייחודי בשם now-playing-song בטקסט המצוי במשתנה song_name המכיל את שם השיר שמתנגן כעת בנגן
        $('#now-playing-song #song-name').text( song_name )
        // החלפת הטקסט המצוי באלמנט title לטקסט המצוי במשתנה song_name, כך שלמעשה הוא מכיל את השם של השיר שמתנגן כעת בנגן
        $('title').text( song_name )
        // המשתנה youtubeplayer מפעיל את הפונקציה loadVideoById המאפשרת לטעון את הסרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה youtube_id המכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        youtubeplayer.loadVideoById( youtube_id )
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן, כאשר הנתונים מופעלים בהתאמה אישית
        this.toggleControls({data: 'custom_activation'}, 'custom_activation')
    },

    // באמצעות הפונקציה playNextSong מתאפשר לנגן את השיר המצוי ברשימת השירים לאחר השיר שמתנגן
    playNextSong: function () {
        // המשתנה next_song מכיל את האלמנט li הראשון שלאחר האלמנט li שיש לו class בשם playing, כך שלמעשה הוא מכיל את השיר המצוי ברשימת השירים לאחר השיר שמתנגן
        let next_song = $('li.playing').next()

        // אם ישנם תווים במשתנה next_song, כלומר שאורך התווים במשתנה next_song הוא לא 0
        if ( next_song.length )
            // נפעיל את הפונקציה playSong המקבלת את המשתנה next_song המכיל את השיר המצוי ברשימת השירים לאחר השיר שמתנגן ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
            this.playSong( next_song )
        else
            // אחרת, כלומר שאורך התווים במשתנה next_song הוא 0ת נפעיל את הפונקציה stopPlaylist המבצעת פעולות בעת עצירת רשימת ההשמעה
            this.stopPlaylist()
    },

    // באמצעות הפונקציה stopSong מתאפשר לעצור את ניגון השיר
    stopSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני false
        this.playing = false
        // המשתנה youtubeplayer מפעיל את הפונקציה stopVideo אשר בעת לחיצה על הכפתור stop היא עוצרת את ניגון השיר
        youtubeplayer.stopVideo()
    },

    // באמצעות הפונקציה stopPlaylist מתאפשר לשלוט על עצירת רשימת ההשמעה באמצעות ביצוע פעולות שונות
    stopPlaylist: function () {
        // הפעלה של הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר
        this.stopSong()

        //מחיקת ה- class בשם playing מהתגית li המכילה את ה- class בשם playing ושמצויה תחת תגית ol המכילה מזהה ייחודי בשם player-playlist
        $('#player-playlist li.playing').removeClass('playing')
        // הכנסת טקסט ריק לאלמנט span שיש לו מזהה ייחודי בשם song-name ושמצוי בתוך האלמנט span שיש לו מזהה ייחודי בשם now-playing-song, כך שלמעשה לא יוצג טקסט ב- 'NOW PLAYING:' כאשר מסתיים הניגון של רשימת ההשמעה
        $('#now-playing-song #song-name').text('')
        // החזרת הטקסט המצוי בפרופרטי defaultTitle לאלמנט title, כך שעם עצירת רשימת ההשמעה יהיה בכותרת של הכרטיסיה הטקסט המוגדר כברירת מחדל
        $('title').text( this.defaultTitle )
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
    // play: function() {
           // אם בעת הפעלת הפונקציה הערך של הפרופרטי playing הוא הערך הבוליאני true, המעיד על כך שהנגן מצוי במצב נגינה, אז הערך הבוליאני של הפרופרטי playing משתנה לערך הבוליאני false המעיד על כך שהנגן מצוי במצב מושהה
    //     this.playing = !this.playing
           // ביצוע החלפה בין ה- classים fa-play ו- fa-pause היכן שיש אלמנט a שיש לו מזהה ייחודי בשם play
    //     $('#play').toggleClass('fa-play fa-pause')
           // המשתנה youtubeplayer מפעיל את הפונקציה playVideo אשר בעת לחיצה על הכפתור Play היא מפעילה את הסרטון בנגן
    //     youtubeplayer.playVideo()
    // },
    //
    // באמצעות הפונקציה pause אנו שולטים על השהיית הניגון של הסרטון בנגן
    // pause: function() {
           // אם בעת הפעלת הפונקציה הערך של הפרופרטי playing הוא הערך הבוליאני false, המעיד על כך שהנגן מצוי במצב מושהה, אז הערך הבוליאני של הפרופרטי playing משתנה לערך הבוליאני true המעיד על כך שהנגן מצוי במצב נגינה
    //     this.playing = !this.playing
           // הוספת ה- attribute בשם disabled המכיל ערך זהה לאלמנט button שיש לו מזהה ייחודי בשם pause
    //     $('#pause').attr('disabled', 'disabled')
           // מחיקת ה- attribute בשם disabled מהאלמנט button שיש לו מזהה ייחודי בשם play
    //     $('#play').removeAttr('disabled')
           // ביצוע החלפה בין ה- classים fa-play ו- fa-pause היכן שיש אלמנט a שיש לו מזהה ייחודי בשם play
    //     $('#play').toggleClass('fa-play fa-pause')
           // המשתנה youtubeplayer מפעיל את הפונקציה pauseVideo אשר בעת לחיצה על הכפתור Pause היא משהה את הניגון של הסרטון בנגן
    //     youtubeplayer.pauseVideo()
    // },

    // באמצעות הפונקציה toggleControls המקבלת את הפרמטרים param ו- e מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן
    toggleControls: function ( param, e ) {

        // אם הנגן של YouTube מצוי במצב נגינה או השהייה או מותאם אישית, נבצע חזרה
        if( YT.PlayerState.PLAYING !== e.data ||  YT.PlayerState.PAUSED !== e.data || e.data !== 'custom_activation' || param !== 'custom_activation' )
            return

        // אם הפרופרטי playing מכיל את הערך הבוליאני true, המשתנה youtubeplayer מפעיל את הפונקציה pauseVideo
        if ( this.playing )
            youtubeplayer.pauseVideo()
        else
            // אחרת, כלומר הפרופרטי playing מכיל את הערך הבוליאני false, המשתנה youtubeplayer מפעיל את הפונקציה playVideo
            youtubeplayer.playVideo()

        // אם בעת הפעלת הפונקציה הערך של הפרופרטי playing הוא הערך הבוליאני true, המעיד על כך שהנגן מצוי במצב נגינה, אז הערך הבוליאני של הפרופרטי playing משתנה לערך הבוליאני false המעיד על כך שהנגן מצוי במצב מושהה
        this.playing = !this.playing
        // ביצוע החלפה בין ה- class בשם fa-play המצוי באלמנט i שמצוי בתוך האלמנט a שיש לו מזהה ייחודי בשם play ל- class בשם fa-pause ולהיפך...
        $('#play i').toggleClass('fa-play fa-pause')
    },

    // באמצעות הפונקציה executePlaying המקבלת את המשתנה e המסמל event מתאפשר לבצע נגינה של השיר
    executePlaying: function ( e ) {
        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )
        // הפעלה של הפונקציה playSong המקבלת את המשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
        this.playSong( el )
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Player
    bindEvents: function() {
        // בעת ביצוע לחיצה על הנתונים המצויים באלמנט li שמצוי בתוך האלמנט ol יש לו מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם executePlaying יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שמצוי בתוך האלמנט ol שיש לו מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה executePlaying יתייחס בכל מקרה לאובייקט Player
        $('#player-playlist li').on('click', $.proxy( this.executePlaying, this ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחדי בשם play, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם toggleControls יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם play) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה toggleControls יתייחס בכל מקרה לאובייקט Player כאשר הנתונים מופעלים בהתאמה אישית
        $('#play').on('click', $.proxy( this.toggleControls, this, 'custom_activation' ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם stop, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם stopSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם stop) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה stopSong יתייחס בכל מקרה לאובייקט Player
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם step-forward, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playNextSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם step-forward) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה stopSong יתייחס בכל מקרה לאובייקט Player
        $('#step-forward').on('click', $.proxy( this.playNextSong, this))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Player
    init: function () {
        // הפרופרטי defaultTitle מכיל את הטקסט 'Music Player', המצוי בכותרת של הכרטיסייה בדפדפן, כך שלמעשה הכותרת הזו מוגדרת כברירת מחדל
        this.defaultTitle = 'Music Player'
        // הפעלה של הפונקציה startPlaylist שבאמצעותה אנו שולטים על הפעלת רשימת ההשמעה של הנגן
        this.startPlaylist()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט Player
        this.bindEvents()
    }
}

// ייצוא האובייקט Player ל- window
window.Player = Player
// ייצוא היכולות של האובייקט Player החוצה
export default Player