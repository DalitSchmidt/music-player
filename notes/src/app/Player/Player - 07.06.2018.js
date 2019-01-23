// ייבוא היכולות של jQuery על-מנת שהאובייקט Player יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Player יוכל להשתמש בהן
import Router from './Router'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט Player יוכל להשתמש בהן
import Utils from './Utils'

// האובייקט Player מכיל את כל הפונקציות המאפשרות לנו לתקשר אל מול הנגן המוסיקה
// הגדרת האובייקט Player כקבוע
const Player = {
    // הפרופרטי playing מוגדר כברירת מחדל בערך הבוליאני true
    playing: true,
    // הפרופרטי defaultTitle מכיל כברירת מחדל את הטקסט 'Music Player' על-מנת שהטקסט המצוי בכותרת של הכרטיסייה בדפדפן יהיה מוגדר באופן קבוע
    defaultTitle: 'Music Player',
    // הפרופרטי timer מוגדר כברירת מחדל על המספר 0
    timer: 0,
    // הפרופרטי interval מוגדר כברירת מחדל בערך הבוליאני false
    interval: false,

    // באמצעות הפונקציה setSong המקבלת את המשתנה el המכיל שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר כגון הדגשת שם השיר שמתנגן ובעת מעבר לשיר חדש ביטול ההדגשה, החלפת הקליפ של השיר ושם השיר בהתאם לשיר שמתנגן בנגן וכו'
    setSong: function ( el ) {
        // המשתנה el מכיל את האלמנט הקרוב ביותר לאלמנט li
        el = el.closest('li')
        // הסרת ה- classים בשם playing ו- pause מהאלמנט li שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        $('#player-playlist li').removeClass('playing pause')
        // הוספת ה- class בשם pause למשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        el.addClass('pause')

        // המשתנה youtube_id מכיל את ה- attribute מסוג data בשם code של המשתנה el המאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event, כך שלמעשה הוא מכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        let youtube_id = el.data('code')
        // המשתנה song_name מכיל את שם השיר שמתנגן כעת באמצעות הפעלת הפונקציה clone המשכפלת קבוצה של אלמנטים בהתאמה ומוצאת בו את כל הטקסט המצוי ומוחקת ממנו טקסט שמצוי באלמנט אחר, במקרה שלנו את הזמן של השיר המצוי באלמנט span, כך שלמעשה המשתנה song_name מכיל את שם השיר שמתנגן כעת בנגן
        let song_name = el.clone().find('>*').remove().end().text()
        // המשתנה album_artist מכיל את האלמנט h1 שיש לו מזהה ייחודי בשם album-info-menu ושיש לו את ה- attribute מסוג data בשם name, כך שלמעשה המשתנה album_artist מכיל את שם האמן שיצר את האלבום
        let album_artist = $('#album-info-name').data('name')
        // המשתנה time$ מכיל את האלמנט time שיש לו מזהה ייחודי בשם timer
        let $time = $('#timer')
        // המשתנה song_time מוצא את האלמנט span שיש לו attribute מסוג data בשם duration, כך שלמעשה המשתנה song_time מכיל את אורכו של השיר שמתנגן
        let song_time = el.find('span').data('duration')

        // החלפת הטקסט המצוי באלמנט span שיש לו מזהה ייחודי בשם song-name ושמצוי תחת האלמנט span שיש לו מזהה ייחודי בשם now-playing-song בטקסט המצוי במשתנה song_name המכיל את שם השיר שמתנגן כעת בנגן
        $('#now-playing-song #song-name').text( song_name )
        // החלפת הטקסט המצוי באלמנט title לטקסט המצוי במשתנים song_name ו- album_artist, כך שלמעשה האלמנט title מציג בשם הכרטיסייה את הטקסט 'Now Playing - ' עם שם השיר ושם האמן של האלבום שמתנגן כעת בנגן
        $('title').text('Now Playing - ' + song_name + 'by ' + album_artist)
        // המשתנה youtubeplayer מפעיל את הפונקציה cueVideoById שבאמצעותה מתאפשר להציג ולנגן סרטון לפי המזהה הייחודי שלו ולצורך כך היא מקבלת את המשתנה youtube_id המכיל את המזהה הייחודי של הסרטון המצוי באלמנט
        youtubeplayer.cueVideoById( youtube_id )
        // איפוס הפרופרטי timer בחזרה ל- 0
        this.timer = 0
        // הפעלה של הפונקציה clearInterval המפסיקה את פעילות ה- interval שרץ עד עכשיו
        clearInterval( this.interval )
        // החזרת הפרופרטי interval לערך הבוליאני false (המוגדר כברירת המחדל של הפרופרטי)
        this.interval = false
        // המשתנה time$ מכניס לתוך האלמנט time שיש לו מזהה ייחודי בשם timer את הטקסט המצוי בפונקציה calculateTime המקבלת את הפרופרטי timer שמצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר
        $time.text( Utils.calculateTime( this.timer ) )
        // איפוס הערך המצוי באלמנט input שיש לו מזהה ייחודי בשם song-duration והוספת ה- attribute מסוג max עם הערך המצוי במשתנה song_time שמכיל את אורכו של השיר שמתנגן לאלמנט input שיש לו מזהה ייחודי בשם song-duration
        $('#song-duration').val(0).attr('max', song_time)
    },

    // באמצעות הפונקציה playSong מתאפשר לנגן שיר בנגן
    playSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני true
        this.playing = true
        // המשתנה youtubeplayer מפעיל את הפונקציה playVideo אשר בעת לחיצה על הכפתור Play היא מפעילה את הסרטון בנגן
        youtubeplayer.playVideo()
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן
        this.toggleControls()
    },

    // באמצעות הפונקציה pauseSong מתאפשר להשהות את השיר שמתנגן בנגן
    pauseSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני false
        this.playing = false
        // המשתנה youtubeplayer מפעיל את הפונקציה pauseVideo אשר בעת לחיצה על הכפתור Pause היא משהה את הנגינה של השיר שמתנגן בנגן
        youtubeplayer.pauseVideo()
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן
        this.toggleControls()
    },

    // באמצעות הפונקציה stopSong מתאפשר לעצור את ניגון השיר
    stopSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני false
        this.playing = false
        // המשתנה youtubeplayer מפעיל את הפונקציה stopVideo אשר בעת לחיצה על הכפתור stop היא עוצרת את ניגון השיר
        youtubeplayer.stopVideo()
    },

    // באמצעות הפונקציה playPreviousSong מתאפשר לנגן את השיר המצוי ברשימת השירים לפני השיר שמתנגן
    playPreviousSong: function () {
        // המשתנה previous_song מכיל את האלמנט li הראשון שלפני אלמנט li שיש לו class בשם playing או pause, כך שלמעשה המשתנה previous_song מכיל את השיר המצוי ברשימת השירים לפני השיר שמתנגן
        let previous_song = $('li.playing, li.pause').prev('li')

        // אם אורך המשתנה previous_song הוא 0, כלומר שאין תווים במשתנה previous_song
        if ( previous_song.length === 0 )
        // נפעיל את הפונקציה stopPlaylist המבצעת פעולות בעת עצירת רשימת השירים
            this.stopPlaylist()
        else {
            // אחרת, כלומר ישנם תווים במשתנה previous_song, נפעיל את הפונקציה setSong המקבלת את המשתנה previous_song המכיל את השיר המצוי ברשימת השירים לפני השיר שמתנגן ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
            this.setSong( previous_song )
            // הפעלה של הפונקציה playSong המאפשרת לנגן שיר בנגן
            this.playSong()
        }
    },

    // באמצעות הפונקציה playNextSong מתאפשר לנגן את השיר המצוי ברשימת השירים לאחר השיר שמתנגן
    playNextSong: function () {
        // המשתנה next_song מכיל את האלמנט li הראשון שלאחר אלמנט li שיש לו class בשם playing, כך שלמעשה הוא מכיל את השיר המצוי ברשימת השירים לאחר השיר שמתנגן
        let next_song = $('li.playing, li.pause').next('li')

        // אם ישנם תווים במשתנה next_song, כלומר שאורך התווים במשתנה next_song הוא לא 0
        if ( next_song.length !== 0 ) {
            // נפעיל את הפונקציה setSong המקבלת את המשתנה next_song המכיל את השיר המצוי ברשימת השירים לאחר השיר שמתנגן ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
            this.setSong( next_song )
            // הפעלה של הפונקציה playSong המאפשרת לנגן שיר בנגן
            this.playSong()
        } else
        // אחרת, כלומר שאורך התווים במשתנה next_song הוא 0ת נפעיל את הפונקציה stopPlaylist המבצעת פעולות בעת עצירת רשימת ההשמעה
            this.stopPlaylist()
    },

    // באמצעות הפונקציה updateTimer מתאפשר לעדכן את הזמן של ניגון השיר
    updateTimer: function () {
        // המשתנה time$ מכיל את האלמנט time שיש לו מזהה ייחודי בשם timer
        let $time = $('#timer')

        // אם הפרופרטי interval לא מכיל את הערך הבוליאני false, כלומר שהוא מכיל את הערך הבוליאני true
        if ( !this.interval ) {
            //אם הנגן של YouTube מצוי במצב 1, כלומר במצב נגינה של הסרטון
            if ( youtubeplayer.getPlayerState() === 1 ) {
                // אז הפרופרטי interval מפעיל את הפונקציה setInterval המקדמת את הפרופרטי timer במספר אחד כל שנייה
                this.interval = window.setInterval(() => {
                    // הבאת הערך המצוי בפרופרטי timer מהאלמנט input שיש לו מזהה ייחודי בשם song-duration
                    $('#song-duration').val( this.timer++ )
                    // המשתנה time$ מכניס לתוך האלמנט time שיש לו מזהה ייחודי בשם timer את הטקסט המצוי בפונקציה calculateTime המקבלת את הפרופרטי timer שמצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר
                    $time.text( Utils.calculateTime( this.timer ) )
                }, 1000)
                // אם הנגן של YouTube מצוי במצב 5, כלומר במצב של הפסקת הנגינה
            } else if ( youtubeplayer.getPlayerState() === 5 ) {
                // נאפס את הפרופרטי timer בחזרה ל- 0
                this.timer = 0
                // הבאת הערך המצוי בפרופרטי timer מהאלמנט input שיש לו מזהה ייחודי בשם song-duration
                $('#song-duration').val( this.timer )
                // המשתנה time$ מכניס לתוך האלמנט time שיש לו מזהה ייחודי בשם timer את הטקסט המצוי בפונקציה calculateTime המקבלת את הפרופרטי timer שמצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר
                $time.text( Utils.calculateTime( this.timer ) )
            }
        } else {
            // אם הנגן של YouTube מצוי במצב 2, כלומר במצב השהייה של הסרטון
            if ( youtubeplayer.getPlayerState() === 2 ) {
                // הפעלה של הפונקציה clearInterval המנקה את - interval שרץ עד עכשיו
                clearInterval( this.interval )
                // החזרת הפרופרטי interval לערך הבוליאני false (המוגדר כברירת המחדל של הפרופרטי)
                this.interval = false
            }
        }
    },

    // באמצעות הפונקציה changeCurrentTime המקבלת את המשתנה e (המסמל event) מתאפשר לשנות את הזמן הנוכחי של ניגון הסרטון בהתאם לזמן שנגרר בסרגל של טווח הזמן
    changeCurrentTime: function ( e ) {
        // המשתנה current_time מכיל את הערך המצוי באלמנט שהפעיל את ה- event
        let current_time = $( e.target ).val()

        // המשתנה youtubeplayer מפעיל את הפונקציה seekTo המאפשרת להעביר את הסרטון לנקודת הזמן המבוקשת, ולצורך כך היא מקבלת את המשתנה current_time המכיל את הערך המצוי באלמנט שהפעיל את ה- event ואת הערך הבוליאני true
        youtubeplayer.seekTo( current_time, true )
        // הפרופרטי timer מכיל את המשתנה current_time המכיל את הערך המצוי באלמנט שהפעיל את ה- event
        this.timer = current_time

        // נבדוק אם הנתונים של הנגן YouTube מצויים במצב נגינה
        if ( e.data == YT.PlayerState.PLAYING ) {
            // המשתנה current_time מכיל את הזמן שחלף בשניות מאז הפעלת הסרטון באמצעות הפעלה של הפונקציה getCurrentTime שמחזירה את הזמן שחלף בשניות מאז הפעלת הסרטון בנגן על-ידי המשתנה youtubeplayer
            let current_time = youtubeplayer.getCurrentTime()
            // המשתנה duration מכיל את הזמן הנוכחי בשניות של הסרטון שמתנגן בנגן באמצעות הפעלה של הפונקציה getDuration שמחזירה את הזמן הנוכחי בשניות של הסרטון שמתנגן בנגן על-ידי המשתנה youtubeplayer
            let duration = youtubeplayer.getDuration()

            // נבדוק אם הנתונים המצויים במשתנה current_time המכיל את הזמן שחלף בשניות מאז הפעלת הסרטון גדול מהנתונים המצויים במשתנה duration המכיל את הזמן הנוכחי בשניות של הסרטון שמתנגן בנגן פחות חצי מאית השנייה
            if ( current_time > ( duration-.5 ) ) {
                // נפעיל את הפונקציה seekTo המאפשרת להעביר את הסרטון לנקודת הזמן המבוקשת, ולצורך כך היא מקבלת את המספר 0 ואת הערך הבוליאני true על-ידי המשתנה youtubeplayer
                youtubeplayer.seekTo( 0, true )
            }
        }
    },

    // באמצעות הפונקציה changeVolume המקבלת את המשתנה e (המסמל event) מתאפשר לשנות את עוצמת השמע של הסרטון שמתנגן בנגן
    changeVolume: function ( e ) {
        // המשתנה volume מכיל את הערך המצוי באלמנט שהפעיל את ה- event
        let volume = $( e.target ).val()
        // המשתנה volume$ מכיל את האלמנט i שמצוי בתוך האלמנט a שיש לו מזהה ייחודי בשם volume-up
        let $volume = $('#volume-up i')

        // המשתנה youtubeplayer מפעיל את הפונקציה setVolume שבאמצעותה מתאפשר להגדיר את עוצמת השמע של הסרטון שמתנגן ולצורך כך היא מקבלת את המשתנה volume שמכיל את הערך המצוי באלמנט שהפעיל את ה- event
        youtubeplayer.setVolume( volume )

        // נבדוק אם הערך של המשתנה volume הוא 0
        if ( volume == 0 ) {
            // אז המשתנה $volume מוסיף את ה- attribute מסוג class בשם 'fa fa-volume-off' ואת ה- property בשם margin-left עם הערך 8px לאלמנט
            $volume.attr('class', 'fa fa-volume-off').css('margin-left', '8px')
            // הוספת ה- attribute מסוג media שהערך שלו הוא 'screen and (min-width:320px)' ואת תכונת ה- CSS בשם 'margin-left' שהערך שלה הוא 4px לאלמנט המצוי במשתנה volume$
            $volume.attr('media', 'screen and (min-width:320px)').css('margin-left', '4px')
            // אחרת, נבדוק אם הערך של המשתנה volume הוא קטן או שווה ל- 50
        } else if ( volume <= 50 ) {
            // אז המשתנה $volume מוסיף את ה- attribute מסוג class בשם 'fa fa-volume-down' ואת ה- property בשם margin-left עם הערך 8px לאלמנט
            $volume.attr('class', 'fa fa-volume-down').css('margin-left', '8px')
            // הוספת ה- attribute מסוג media שהערך שלו הוא 'screen and (min-width:320px)' ואת תכונת ה- CSS בשם 'margin-left' שהערך שלה הוא 2px לאלמנט המצוי במשתנה volume$
            $volume.attr('media', 'screen and (min-width:320px)').css('margin-left', '2px')
            // אחרת, נבדוק אם הערך של המשתנה volume הוא גדול מ- 50
        } else if ( volume > 50 )
        // אז המשתנה $volume מוסיף את ה- attribute מסוג class בשם 'fa fa-volume-up' ואת ה- property בשם margin-left עם הערך 0 לאלמנט
            $volume.attr('class', 'fa fa-volume-up').css('margin-left', '0')
    },

    // באמצעות הפונקציה toggleVolumeBar מתאפשר להציג את הרצועה השולטת על עוצמת הקול של השיר המתנגן בנגן
    toggleVolumeBar: function () {
        // הפעלת הפונקציה animate למשך 3.5 מאיות השנייה על הצגת אלמנט מסוג input שיש לו מזהה ייחודי בשם volume, כך שלמעשה היא מאפשרת להציג את הרצועה השולטת על עוצמת הקול של השיר המתנגן בנגן
        $('#volume').animate({ width:'toggle' }, 350)
        // הוספה או הסרה של ה- class בשם volume-width מהאלמנט div שיש לו מזהה ייחודי בשם controls
        $('#controls').toggleClass('volume-width')
    },

    // באמצעות הפונקציה startPlaylist אנו שולטים על הפעלת רשימת ההשמעה של הנגן
    startPlaylist: function () {
        // אם אורך הנתונים של האלמנט div שיש לו מזהה ייחודי בשם player, המכיל את כל ההגדרות של נגן ה- YouTube, הוא 0, כלומר שאין נתונים, אז הפונקציה מבצעת חזרה
        if ( $('#player').length === 0 )
            return

        // המשתנה el מכיל את האלמנט li הראשון (מאחר והאינדקס שלו במערך הוא 0) שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        let el = $( $('#player-playlist li')[0] )

        // הפעלה של הפונקציה setSong המקבלת את המשתנה el המכיל את המשתנה li הראשון שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
        this.setSong( el )
        // הפעלה של הפונקציה playSong המאפשרת לנגן שיר בנגן
        this.playSong()
    },

    // באמצעות הפונקציה stopPlaylist מתאפשר לשלוט על עצירת רשימת ההשמעה באמצעות ביצוע פעולות שונות
    stopPlaylist: function () {
        // הפעלה של הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר
        this.stopSong()
        // מחיקת ה- class בשם playing מהאלמנט li שיש לו את ה- class בשם playing ושמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        $('#player-playlist li.playing').removeClass('playing')
        // הכנסת טקסט ריק לאלמנט span שיש לו מזהה ייחודי בשם song-name ושמצוי בתוך האלמנט span שיש לו מזהה ייחודי בשם now-playing-song, כך שלמעשה לא יוצג טקסט ב- 'NOW PLAYING:' כאשר מסתיים הניגון של רשימת ההשמעה
        $('#now-playing-song #song-name').text('')
        // החזרת הטקסט המצוי בפרופרטי defaultTitle לאלמנט title, כך שעם עצירת רשימת ההשמעה יהיה בכותרת של הכרטיסיה הטקסט המוגדר כברירת מחדל
        $('title').text( this.defaultTitle )

        // המשתנה el מכיל את האלמנט li הראשון (מאחר והאינדקס שלו במערך הוא 0) שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        let el = $( $('#player-playlist li')[0] )

        // הפעלה של הפונקציה setSong המקבלת את המשתנה el המכיל את המשתנה li הראשון שמצוי תחת האלמנט ol שיש לו מזהה ייחודי בשם player-playlist ושבאמצעותה אנו שולטים על כל הפעולות שקורות בפלייליסט עם ניגון השיר
        this.setSong( el )
    },

    // באמצעות הפונקציה executePlaying המקבלת את המשתנה e המסמל event מתאפשר לבצע נגינה של השיר
    executePlaying: function ( e ) {
        // הפעלה של הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר
        this.stopSong()

        // המשתנה el מאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )

        // הפעלה של הפונקציה setSong המקבלת את המשתנה el שמאפשר לנו לבצע פעולות על האלמנט שהפעיל את ה- event
        this.setSong( el )
        // הפעלה של הפונקציה playSong המאפשרת לנגן שיר בנגן
        this.playSong()
    },

    // באמצעות הפונקציה togglePlaying מתאפשר להחליף בין מצבי הנגינה של הסרטון
    togglePlaying: function () {
        // המשתנה current_player_state מכיל את המצב הנוכחי שמצוי בו הנגן באמצעות הפעלה של הפונקציה getPlayerState שמחזירה את המצב שמצוי בו הנגן על-ידי המשתנה youtubeplayer
        let current_player_state = youtubeplayer.getPlayerState()

        // נבצע בדיקה בה נבדוק מהו המצב הנוכחי בו מצוי המשתנה current_player_state שמכיל את המצב הנוכחי שמצוי בו הנגן באמצעות הפעלה של הפונקציה getPlayerState שמחזירה את המצב שמצוי בו הנגן על-ידי המשתנה youtubeplayer
        switch ( current_player_state ) {
            // אם הנגן של YouTube מצוי במצב 0, כלומר במצב סיום נגינה של הסרטון
            case 0:
                // נפעיל את הפונקציה playNextSong שבאמצעותה מתאפשר למגן את השיר המצוי ברשימת השירים לאחר השיר שהתנגן
                this.playNextSong()
                break
            //אם הנגן של YouTube מצוי במצב 1, כלומר במצב נגינה של הסרטון
            case 1:
                // אז נפעיל את הפונקציה pauseSong המאפשרת להשהות את הנגינה של השיר שמתנגן בנגן
                this.pauseSong()
                break
            // אם הנגן של YouTube מצוי במצב 2, כלומר במצב השהייה של הסרטון
            case 2:
                // אז נפעיל את הפונקציה playSong המאפשרת לנגן שיר בנגן
                this.playSong()
                break
        }
    },

    // באמצעות הפונקציה toggleControls מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן
    toggleControls: function () {
        // אם הנגן של YouTube מצוי במצב 1, כלומר במצב נגינה של הסרטון
        if ( youtubeplayer.getPlayerState() === 1 ) {
            // נמחק את ה- class בשם fa-play מהאלמנט i שמצוי בתוך האלמנט a שיש לו מזהה ייחודי בשם play ונוסיף את ה- class בשם fa-pause ואת ה- attribute מסוג title עם הערך Pause לאותו אלמנט
            $('#play i').removeClass('fa-play').addClass('fa-pause').attr('title', 'Pause')
            // הסרת ה- class בשם pause מהאלמנט li שיש לו class בשם pause שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist והוספת ה- class בשם playing לאותו אלמנט
            $('#player-playlist li.pause').removeClass('pause').addClass('playing')
            // אם הנגן של YouTube מצוי במצב 2, כלומר במצב השהייה של הסרטון
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            // נמחק את ה- class בשם fa-pause מהאלמנט i שמצוי בתוך האלמנט a שיש לו מזהה ייחודי בשם play ונוסיף את ה- class בשם fa-play ואת ה- attribute מסוג title עם הערך Play לאותו אלמנט
            $('#play i').removeClass('fa-pause').addClass('fa-play').attr('title', 'Play')
            // הסרת ה- class בשם playing מהאלמנט li שיש לו class בשם playing שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist והוספת ה- class בשם pause לאותו אלמנט
            $('#player-playlist li.playing').removeClass('playing').addClass('pause')
        }
    },

    // באמצעות הפונקציה detectStateChange מתאפשר לזהות שינוי במצב ההפעלה של הנגן ולפעול בהתאם
    detectStateChange: function () {
        // המשתנה player_state מכיל את המצב שמצוי בו הנגן באמצעות הפעלה של הפונקציה getPlayerState שמחזירה את המצב שמצוי בו הנגן על-ידי המשתנה youtubeplayer
        let player_state = youtubeplayer.getPlayerState()

        // נבצע בדיקה בה נבדוק באיזה מצב מצוי המשתנה player_state שמכיל את המצב שמצוי בו הנגן באמצעות הפעלה של הפונקציה getPlayerState שמחזירה את המצב שמצוי בו הנגן על-ידי המשתנה youtubeplayer
        switch ( player_state ) {
            // אם הנגן של YouTube מצוי במצב 0, כלומר במצב סיום נגינה של הסרטון
            case 0:
                // נפעיל את הפונקציה playNextSong שבאמצעותה מתאפשר למגן את השיר המצוי ברשימת השירים לאחר השיר שהתנגן
                this.playNextSong()
                break
            // אם הנגן של YouTube מצוי במצב 1, כלומר במצב נגינה של הסרטון או במצב 2, כלומר במצב השהייה של הסרטון
            case 1:
            case 2:
                // נפעיל את הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים המצויים בנגן
                this.toggleControls()
                break
        }
    },

    // באמצעות הפונקציה initYoutube מתאפשר לאתחל את הטעינה של נגן ה- YouTube עם הטעינה של הדף
    initYoutube: function () {
        // המשתנה tag יוצר ב- DOM אלמנט חדש מסוג script
        let tag = document.createElement('script')
        // הוספת ה- attribute מסוג src המכיל את כתובת ה- URL 'https://www.youtube.com/iframe_api' לאלמנט המצוי במשתנה tag
        tag.src = 'https://www.youtube.com/iframe_api'
        // המשתנה first_script_tag מכיל את האלמנט הראשון מסוג 'script' המצוי ב- DOM באמצעות ההגדרה של document.getElementsByTagName ולמיקום של האינדקס 0 במערך של התגי שם המכילים את השם script
        let first_script_tag = document.getElementsByTagName('script')[0]
        // הכנסת המשתנים tag ו- first_script_tag לפני הצומת הראשית של האלמנטים ב- DOM
        first_script_tag.parentNode.insertBefore( tag, first_script_tag )
        // הפעלה של הפונקציה bindEvents המצויה תחת האובייקט Router ושבאמצעותה מתאפשר לבצע את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
        Router.bindEvents()

        // נבדוק אם הפרופרטי isPlayerInit קיים ב- window, אז נפעיל את הפונקציה onYouTubeIframeAPIReady שבאמצעותה אנו מפעילים את האלמנט מסוג iframe כשה- API של YouTube מוכן
        if ( isPlayerInit )
            onYouTubeIframeAPIReady()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Player
    bindEvents: function () {
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם stop, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם stopSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם stop) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה stopSong יתייחס בכל מקרה לאובייקט Player
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם step-backward, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playPreviousSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם step-backward) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playPreviousSong יתייחס בכל מקרה לאובייקט Player
        $('#step-backward').on('click', $.proxy( this.playPreviousSong, this ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם step-forward, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playNextSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם step-forward) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה playNextSong יתייחס בכל מקרה לאובייקט Player
        $('#step-forward').on('click', $.proxy( this.playNextSong, this ))
        // המשתנה youtubeplayer מוסיף את ה- event onStateChange שלו הוא מבצע האזנה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם updateTimer יתייחס לאלמנט עצמו (במקרה זה לאלמנט המעדכן את הזמן של ניגון השיר) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה updateTimer יתייחס בכל מקרה לאובייקט Player
        youtubeplayer.addEventListener('onStateChange', $.proxy( this.updateTimer, this ))
        // בעת ביצוע לחיצה על האלמנט input שיש לו מזהה ייחודי בשם song-duration, נפעיל את ה- event change, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCurrentTime יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם song-duration) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה changeCurrentTime יתייחס בכל מקרה לאובייקט Player
        $('#song-duration').on('change', $.proxy( this.changeCurrentTime, this ))
        // בעת ביצוע לחיצה על האלמנט input שיש לו מזהה ייחודי בשם volume, נפעיל את ה- event change, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeVolume יתייחס לאלמנט עצמו (במקרה זה לאלמנט input שיש לו מזהה ייחודי בשם volume) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה changeVolume יתייחס בכל מקרה לאובייקט Player
        $('#volume').on('change', $.proxy( this.changeVolume, this ))
        // בעת ביצוע לחיצה על האלמנט a שיש לו מזהה ייחודי בשם volume-up, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם toggleVolumeBar יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם volume-up) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה toggleVolumeBar יתייחס בכל מקרה לאובייקט Player
        $('#volume-up').on('click', $.proxy( this.toggleVolumeBar, this ))
        // בעת ביצוע לחיצה על הנתונים המצויים באלמנט li שהוא ללא class בשם pause או playing ושמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם executePlaying יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שהוא ללא class בשם pause או playing ושמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה executePlaying יתייחס בכל מקרה לאובייקט Player
        $('#player-playlist').on('click', 'li:not(.pause, .playing)', $.proxy( this.executePlaying, this ))
        // בעת ביצוע לחיצה על אלמנט a שיש לו מזהה ייחודי בשם play או על אלמנט li שיש לו class בשם playing שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist או על אלמנט li שיש לו class בשם pause שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist שמצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם player-controls, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם togglePlaying יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם play או על אלמנט li שיש לו class בשם playing שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist או על אלמנט li שיש לו class בשם pause שמצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist שמצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם player-controls) נשתמש ב- proxy, כדי שההקשר של this בתוך הפונקציה togglePlaying יתייחס בכל מקרה לאובייקט Player
        $('#player-controls').on('click', '#play, #player-playlist li.playing, #player-playlist li.pause', $.proxy( this.togglePlaying, this ))
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
// ייצוא היכולות של האובייקט Player החוצה
export default Player