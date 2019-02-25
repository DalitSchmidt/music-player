// ייבוא היכולות של jQuery על-מנת שהאובייקט Player יוכל להשתמש בהן
import $ from 'jquery'
// ייבוא היכולות של האובייקט Router על-מנת שהאובייקט Player יוכל להשתמש בהן
import Router from './Router'
// ייבוא היכולות של האובייקט Utils על-מנת שהאובייקט Player יוכל להשתמש בהן
import Utils from './Utils'

// האובייקט Player מכיל את כל הפונקציות שבאמצעותן מתאפשר לתקשר אל מול נגן המוסיקה
// הגדרה של האובייקט Player כקבוע
const Player = {
    // הפרופרטי playing מכיל כברירת מחדל את הערך הבוליאני true
    playing: true,
    // הפרופרטי defaultTitle מכיל כברירת מחדל את הטקסט Music Player על-מנת שהטקסט המצוי בכותרת של הכרטיסייה בדפדפן יהיה מוגדר באופן קבוע
    defaultTitle: 'Music Player',
    // הפרופרטי timer מכיל כברירת מחדל את המספר 0
    timer: 0,
    // הפרופרטי interval מכיל כברירת מחדל את הערך הבוליאני false
    interval: false,

    // באמצעות הפונקציה setSong (שמקבלת את המשתנה el המסמל אלמנט) מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
    setSong: function ( el ) {
        // המשתנה el מכיל את האלמנט הקרוב ביותר לאלמנט li
        el = el.closest('li')
        // הסרה של ה- classים בשם playing ו- pause מהאלמנט li המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        $('#player-playlist li').removeClass('playing pause')
        // הוספה של ה- class בשם pause למשתנה el
        el.addClass('pause')

        // המשתנה youtube_id מכיל את ה- attribute מסוג data בשם code
        let youtube_id = el.data('code')
        // המשתנה song_name מכיל את שם השיר המתנגן בנגן המוסיקה באמצעות הפעלה של הפונקציה clone המשכפלת את הקבוצה של האלמנטים בהתאמה ומוצאת את כל הטקסט המצוי בו ומסירה ממנו טקסט המצוי בתוך אלמנט אחר, במקרה זה את זמן השיר המצוי בתוך אלמנט span
        let song_name = el.clone().find('>*').remove().end().text()
        // המשתנה album_artist מכיל את האלמנט h1 שיש לו מזהה ייחודי בשם album-info-menu ושיש לו attribute מסוג data בשם name המכיל את שם האמן שיצר את האלבום
        let album_artist = $('#album-info-name').data('name')
        // המשתנה time$ מכיל את האלמנט time שיש לו מזהה ייחודי בשם timer
        let $time = $('#timer')
        // המשתנה song_time מכיל את אורכו של השיר המתנגן בנגן המוסיקה המצוי בתוך אלמנט span שיש לו attribute מסוג data בשם duration
        let song_time = el.find('span').data('duration')

        // החלפה של הטקסט המצוי בתוך אלמנט span שיש לו מזהה ייחודי בשם song-name המצוי בתוך אלמנט span שיש לו מזהה ייחודי בשם now-playing-song בטקסט המצוי במשתנה song_name
        $('#now-playing-song #song-name').text( song_name )
        // החלפה של הטקסט המצוי בתוך אלמנט title לטקסט המצוי במשתנה song_name ובמשתנה album_artist, ובכך מתאפשר שהאלמנט title יציג בשם הכרטיסייה את הטקסט Now Playing - עם שם השיר ושם האמן שיצר את האלבום המתנגן בנגן המוסיקה
        $('title').text('Now Playing - ' + song_name + 'by ' + album_artist)
        // הפעלה של הפונקציה cueVideoById (שמקבלת את המשתנה youtube_id המכיל את ה- attribute מסוג data בשם code) שבאמצעותה מתאפשר להציג ולנגן את סרטון ה- YouTube לפי המזהה הייחודי שלו
        youtubeplayer.cueVideoById( youtube_id )
        // הפרופרטי timer מכיל את המספר 0
        this.timer = 0
        // הפעלה של הפונקציה clearInterval (שמקבלת את הפרופרטי interval המכיל את ה- interval) שבאמצעותה מתאפשר לנקות את הפעילות של הפרופרטי interval שרץ עד עכשיו
        clearInterval( this.interval )
        // הפרופרטי interval מכיל את הערך הבוליאני false
        this.interval = false
        // הכנסה של הטקסט המצוי בפרופרטי timer ל- DOM והצגתו באמצעות ההפעלה של הפונקציה calculateTime (שמקבלת את הפרופרטי timer המכיל את זמן השיר) המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר לתוך המשתנה time$
        $time.text( Utils.calculateTime( this.timer ) )
        // איפוס הערך המצוי באלמנט מסוג input שיש לו מזהה ייחודי בשם song-duration והוספה של ה- attribute מסוג max עם הערך המצוי במשתנה song_time לאותו אלמנט
        $('#song-duration').val(0).attr('max', song_time)
    },

    // באמצעות הפונקציה playSong מתאפשר לנגן שיר בנגן המוסיקה
    playSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני true
        this.playing = true
        // הפעלה של הפונקציה playVideo שבאמצעותה מתאפשר בעת לחיצה על הכפתור Play בנגן המוסיקה להפעיל את סרטון ה- YouTube
        youtubeplayer.playVideo()
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן המוסיקה
        this.toggleControls()
    },

    // באמצעות הפונקציה pauseSong מתאפשר להשהות את הנגינה של השיר המתנגן בנגן המוסיקה
    pauseSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני false
        this.playing = false
        // הפעלה של הפונקציה pauseVideo שבאמצעותה מתאפשר בעת לחיצה על הכפתור Pause בנגן המוסיקה להשהות את הנגינה של סרטון ה- YouTube
        youtubeplayer.pauseVideo()
        // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן המוסיקה
        this.toggleControls()
    },

    // באמצעות הפונקציה stopSong מתאפשר לעצור את ניגון השיר המתנגן בנגן המוסיקה
    stopSong: function () {
        // הפרופרטי playing מכיל את הערך הבוליאני false
        this.playing = false
        // הפעלה של הפונקציה stopVideo שבאמצעותה מתאפשר בעת לחיצה על הכפתור Stop בנגן המוסיקה לעצור את הנגינה של סרטון ה- YouTube
        youtubeplayer.stopVideo()
    },

    // באמצעות הפונקציה playPreviousSong מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לפני השיר המתנגן בנגן המוסיקה
    playPreviousSong: function () {
        // המשתנה previous_song מכיל את האלמנט li הראשון שלפני אלמנט li שיש לו class בשם playing או pause, ולמעשה המשתנה previous_song מכיל את השיר המצוי ברשימת ההשמעה לפני השיר המתנגן בנגן המוסיקה
        let previous_song = $('li.playing, li.pause').prev('li')

        // נבדוק את אורך הערך המצוי במשתנה previous_song ואם אורך הערך הוא 0, אז נבצע מספר פעולות
        if ( previous_song.length === 0 )
            // הפעלה של הפונקציה stopPlaylist שבאמצעותה מתאפשר לבצע פעולות בנגן המוסיקה בעת עצירת רשימת ההשמעה
            this.stopPlaylist()
        // אחרת, כלומר ישנם תווים במשתנה previous_song, אז נבצע מספר פעולות
        else {
            // הפעלה של הפונקציה setSong (שמקבלת את המשתנה previous_song המכיל את השיר המצוי ברשימת ההשמעה לפני השיר המתנגן בנגן המוסיקה) שבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
            this.setSong( previous_song )
            // הפעלה של הפונקציה playSong שבאמצעותה מתאפשר לנגן שיר בנגן המוסיקה
            this.playSong()
        }
    },

    // באמצעות הפונקציה playNextSong מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה
    playNextSong: function () {
        // המשתנה next_song מכיל את האלמנט li הראשון שלאחר אלמנט li שיש לו class בשם playing או pause, ולמעשה המשתנה next_song מכיל את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה
        let next_song = $('li.playing, li.pause').next('li')

        // נבדוק את אורך הערך המצוי במשתנה next_song ואם אורך הערך הוא לא 0, אז נבצע מספר פעולות
        if ( next_song.length !== 0 ) {
            // הפעלה של הפונקציה setSong (שמקבלת את המשתנה next_song המכיל את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה) שבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
            this.setSong( next_song )
            // הפעלה של הפונקציה playSong שבאמצעותה מתאפשר לנגן שיר בנגן המוסיקה
            this.playSong()
        // אחרת, כלומר אורך התווים במשתנה next_song הוא 0, אז נבצע מספר פעולות
        } else
            // הפעלה של הפונקציה stopPlaylist שבאמצעותה מתאפשר לבצע פעולות בנגן המוסיקה בעת עצירת רשימת ההשמעה
            this.stopPlaylist()
    },

    // באמצעות הפונקציה updateTimer מתאפשר לעדכן את זמן ניגון השיר
    updateTimer: function () {
        // המשתנה time$ מכיל את האלמנט time שיש לו מזהה ייחודי בשם timer
        let $time = $('#timer')

        // נבדוק אם הפרופרטי interval אינו מכיל את הערך הבוליאני false, אז נבצע מספר פעולות
        if ( !this.interval ) {
            // נבדוק אם נגן ה- YouTube מצוי במצב 1, כלומר במצב נגינה של סרטון ה- YouTube, באמצעות הפעלה של הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube, אז נבצע מספר פעולות
            if ( youtubeplayer.getPlayerState() === 1 ) {
                // הפרופרטי interval מפעיל את הפונקציה setInterval שבאמצעותה מתאפשר לקדם את הפרופרטי timer במספר אחד כל שנייה ושפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת מספר פעולות
                this.interval = window.setInterval(() => {
                    // הבאה של הערך המצוי בפרופרטי timer מהאלמנט מסוג input שיש לו מזהה ייחודי בשם song-duration וקידומו בספרה אחת
                    $('#song-duration').val( this.timer++ )
                    // הכנסה של הטקסט המצוי בפרופרטי timer ל- DOM והצגתו באמצעות ההפעלה של הפונקציה calculateTime (שמקבלת את הפרופרטי timer המכיל את זמן השיר) המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר לתוך המשתנה time$
                    $time.text( Utils.calculateTime( this.timer ) )
                }, 1000)
            // אחרת, נבדוק אם נגן ה- YouTube מצוי במצב 5, כלומר במצב הפסקה של נגינת סרטון ה- YouTube, באמצעות הפעלה של הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube, אז נבצע מספר פעולות
            } else if ( youtubeplayer.getPlayerState() === 5 ) {
                // הפרופרטי timer מכיל את המספר 0
                this.timer = 0
                // הבאה של הערך המצוי בפרופרטי timer מהאלמנט מסוג input שיש לו מזהה ייחודי בשם song-duration
                $('#song-duration').val( this.timer )
                // הכנסה של הטקסט המצוי בפרופרטי timer ל- DOM והצגתו באמצעות ההפעלה של הפונקציה calculateTime (שמקבלת את הפרופרטי timer המכיל את זמן השיר) המצויה תחת האובייקט Utils ושבאמצעותה מתאפשר לבצע חישוב של זמן השיר לתוך המשתנה time$
                $time.text( Utils.calculateTime( this.timer ) )
            }
        // אחרת, נבדוק אם נגן ה- YouTube מצוי במצב 2, כלומר במצב השהייה של נגינת סרטון ה- YouTube, באמצעות הפעלה של הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube, אז נבצע מספר פעולות
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            // הפעלה של הפונקציה clearInterval (שמקבלת את הפרופרטי interval המכיל את ה- interval) שבאמצעותה מתאפשר לנקות את הפעילות של הפרופרטי interval שרץ עד עכשיו
            clearInterval( this.interval )
            // הפרופרטי interval מכיל את הערך הבוליאני false
            this.interval = false
        }
    },

    // באמצעות הפונקציה changeCurrentTime (שמקבלת את המשתנה e המסמל event) מתאפשר לשנות את הזמן הנוכחי של ניגון השיר בהתאם לזמן שנגרר בסרגל של טווח הזמן
    changeCurrentTime: function ( e ) {
        // המשתנה current_time מכיל את הערך המצוי באלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let current_time = $( e.target ).val()

        // הפעלה של הפונקציה seekTo (שמקבלת את המשתנה current_time המכיל את הערך המצוי באלמנט שהפעיל את ה- event ואת הערך הבוליאני true) שבאמצעותה מתאפשר להעביר את סרטון ה- YouTube המתנגן בנגן המוסיקה לנקודת הזמן המבוקשת
        youtubeplayer.seekTo( current_time, true )
        // הפרופרטי timer מכיל את המשתנה current_time
        this.timer = current_time

        // נבדוק אם הנתונים של נגן ה- YouTube מצויים במצב נגינה, אז נבצע מספר פעולות
        if ( e.data == YT.PlayerState.PLAYING ) {
            // המשתנה current_time מפעיל את הפונקציה getCurrentTime שבאמצעותה מתאפשר להחזיר את הזמן שחלף בשניות מאז ההפעלה של סרטון ה- YouTube המתנגן בנגן המוסיקה
            let current_time = youtubeplayer.getCurrentTime()
            // המשתנה duration מפעיל את הפונקציה getDuration שבאמצעותה מתאפשר להחזיר את הזמן הנוכחי בשניות של סרטון ה- YouTube המתנגן בנגן המוסיקה
            let duration = youtubeplayer.getDuration()

            // נבדוק אם הנתונים המצויים במשתנה current_time גדולים מהנתונים המצויים במשתנה duration פחות חצי מאית השנייה, אז נבצע מספר פעולות
            if ( current_time > ( duration-.5 ) ) {
                // הפעלה של הפונקציה seekTo (שמקבלת את המספר 0 ואת הערך הבוליאני true) שבאמצעותה מתאפשר להעביר את סרטון ה- YouTube המתנגן בנגן המוסיקה לנקודת הזמן המבוקשת
                youtubeplayer.seekTo( 0, true )
            }
        }
    },

    // באמצעות הפונקציה changeVolume (שמקבלת את המשתנה e המסמל event) מתאפשר לשנות את עוצמת השמע של השיר המתנגן בנגן המוסיקה
    changeVolume: function ( e ) {
        // המשתנה volume מכיל את הערך המצוי באלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו
        let volume = $( e.target ).val()
        // המשתנה volume$ מכיל את האלמנט i המצוי בתוך אלמנט a שיש לו מזהה ייחודי בשם volume-up
        let $volume = $('#volume-up i')

        // הפעלה של הפונקציה setVolume (שמקבלת את המשתנה volume המכיל את הערך המצוי באלמנט שהפעיל את ה- event המאפשר לבצע פעולות עליו) שבאמצעותה מתאפשר להגדיר את עוצמת השמע של סרטון ה- YouTube המתנגן בנגן המוסיקה
        youtubeplayer.setVolume( volume )

        // נבדוק אם הערך של המשתנה volume הוא 0, אז נבצע מספר פעולות
        if ( volume == 0 ) {
            // הוספה של ה- attribute מסוג class בשם fa fa-volume-off והפעלה של הפונקציית CSS של jQuery על האלמנט המצוי במשתנה volume$, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם margin-left שהערך שלה הוא 8px
            $volume.attr('class', 'fa fa-volume-off').css('margin-left', '8px')
            // הוספה של ה- attribute מסוג media שהערך שלו הוא (screen and (min-width:320px והפעלה של הפונקציית CSS של jQuery על האלמנט המצוי במשתנה volume$, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם margin-left שהערך שלה הוא 4px
            $volume.attr('media', 'screen and (min-width:320px)').css('margin-left', '4px')
        // אחרת, נבדוק אם הערך של המשתנה volume הוא קטן או שווה ל- 50, כלומר בעוצמת שמע נמוכה או שווה ל- 50, אז נבצע מספר פעולות
        } else if ( volume <= 50 ) {
            // הוספה של ה- attribute מסוג class בשם fa fa-volume-down והפעלה של הפונקציית CSS של jQuery על האלמנט המצוי במשתנה volume$, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם margin-left שהערך שלה הוא 8px
            $volume.attr('class', 'fa fa-volume-down').css('margin-left', '8px')
            // הוספה של ה- attribute מסוג media שהערך שלו הוא (screen and (min-width:320px והפעלה של הפונקציית CSS של jQuery על האלמנט המצוי במשתנה volume$, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם margin-left שהערך שלה הוא 2px
            $volume.attr('media', 'screen and (min-width:320px)').css('margin-left', '2px')
        // אחרת, נבדוק אם הערך של המשתנה volume הוא גדול מ- 50, כלומר בעוצמת שמע גבוהה מ- 50, אז נבצע מספר פעולות
        } else if ( volume > 50 )
            // הוספה של ה- attribute מסוג class בשם fa fa-volume-up והפעלה של הפונקציית CSS של jQuery על האלמנט המצוי במשתנה volume$, ובכך מתאפשר להוסיף לאלמנט זה את תכונת ה- CSS בשם margin-left שהערך שלה הוא 0
            $volume.attr('class', 'fa fa-volume-up').css('margin-left', '0')
    },

    // באמצעות הפונקציה toggleVolumeBar מתאפשר להציג את הרצועה השולטת על עוצמת השמע של השיר המתנגן בנגן המוסיקה
    toggleVolumeBar: function () {
        // הפעלה של הפונקציה animate על ההצגה של האלמנט מסוג input שיש לו מזהה ייחודי בשם volume במשך 3.5 מאיות השנייה, ובכך מתאפשר להציג למשתמש ב- DOM את הרצועה השולטת על עוצמת השמע של השיר המתנגן בנגן המוסיקה
        $('#volume').animate({ width:'toggle' }, 350)
        // הפעלה של הפונקציה toggleClass שבאמצעותה מתאפשר להוסיף או להסיר את ה- class בשם volume-width מהאלמנט div שיש לו מזהה ייחודי בשם controls
        $('#controls').toggleClass('volume-width')
    },

    // באמצעות הפונקציה startPlaylist מתאפשר לבצע פעולות בנגן המוסיקה בעת הפעלת רשימת ההשמעה
    startPlaylist: function () {
        // נבדוק אם אורך האלמנט div שיש לו מזהה ייחודי בשם player המכיל את כל ההגדרות של נגן ה- YouTube הוא 0, אז נבצע מספר פעולות
        if ( $('#player').length === 0 )
            // ביצוע חזרה להמשך פעולות הפונקציה
            return

        // המשתנה el מכיל את האלמנט li הראשון (מאחר והאינדקס שלו במערך הוא 0) המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        let el = $( $('#player-playlist li')[0] )

        // הפעלה של הפונקציה setSong (שמקבלת את המשתנה el המכיל את האלמנט li הראשון המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist) שבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
        this.setSong( el )
        // הפעלה של הפונקציה playSong שבאמצעותה מתאפשר לנגן שיר בנגן המוסיקה
        this.playSong()
    },

    // באמצעות הפונקציה stopPlaylist מתאפשר לבצע פעולות בנגן המוסיקה בעת עצירת רשימת ההשמעה
    stopPlaylist: function () {
        // הפעלה של הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר המתנגן בנגן המוסיקה
        this.stopSong()
        // הסרה של ה- class בשם playing מהאלמנט li שיש לו class בשם playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        $('#player-playlist li.playing').removeClass('playing')
        // הכנסה של ערך ריק לתוך אלמנט span שיש לו מזהה ייחודי בשם song-name המצוי בתוך אלמנט span שיש לו מזהה ייחודי בשם now-playing-song על-מנת שלא יוצג טקסט ב- 'NOW PLAYING:' כאשר מסתיים הניגון של רשימת ההשמעה
        $('#now-playing-song #song-name').text('')
        // הכנסה של הטקסט המצוי בפרופרטי defaultTitle לאלמנט title על-מנת שעם עצירת רשימת ההשמעה יהיה בכותרת של הכרטיסיה הטקסט המוגדר כברירת מחדל
        $('title').text( this.defaultTitle )

        // המשתנה el מכיל את האלמנט li הראשון (מאחר והאינדקס שלו במערך הוא 0) המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist
        let el = $( $('#player-playlist li')[0] )

        // הפעלה של הפונקציה setSong (שמקבלת את המשתנה el המכיל את האלמנט li הראשון המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist) שבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
        this.setSong( el )
    },

    // באמצעות הפונקציה executePlaying (שמקבלת את המשתנה e המסמל event) מתאפשר לבצע נגינה של השיר בנגן המוסיקה
    executePlaying: function ( e ) {
        // הפעלה של הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר המתנגן בנגן המוסיקה
        this.stopSong()

        // המשתנה el מאפשר לבצע פעולות על האלמנט שהפעיל את ה- event
        let el = $( e.target )

        // הפעלה של הפונקציה setSong (שמקבלת את המשתנה el המאפשר לבצע פעולות על האלמנט שהפעיל את ה- event) שבאמצעותה מתאפשר לשלוט על כל הפעולות הקורות ברשימת ההשמעה עם ניגון השיר כגון הדגשת שם השיר המתנגן בנגן המוסיקה ובעת מעבר לשיר חדש ביטול ההדגשה, החלפה של סרטון ה- YouTube ושם השיר בהתאם לשיר המתנגן בנגן המוסיקה וכו'
        this.setSong( el )
        // הפעלה של הפונקציה playSong שבאמצעותה מתאפשר לנגן שיר בנגן המוסיקה
        this.playSong()
    },

    // באמצעות הפונקציה togglePlaying מתאפשר להחליף בין מצבי הנגינה של נגן המוסיקה
    togglePlaying: function () {
        // המשתנה current_player_state מפעיל את הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube
        let current_player_state = youtubeplayer.getPlayerState()

        // נבדוק מהו המצב הנוכחי בו מצוי המשתנה current_player_state, אז נבצע מספר פעולות
        switch ( current_player_state ) {
            // המקרה 0 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 0, כלומר במצב סיום נגינה של סרטון ה- YouTube, אז נבצע מספר פעולות
            case 0:
                // הפעלה של הפונקציה playNextSong שבאמצעותה מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה
                this.playNextSong()
                // ביצוע הפסקה של בדיקת המקרה
                break
            // המקרה 1 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 1, כלומר במצב נגינה של סרטון ה- YouTube, אז נבצע מספר פעולות
            case 1:
                // הפעלה של הפונקציה pauseSong שבאמצעותה מתאפשר להשהות את הנגינה של השיר המתנגן בנגן המוסיקה
                this.pauseSong()
                // ביצוע הפסקה של בדיקת המקרה
                break
            // המקרה 2 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 2, כלומר במצב השהייה של נגינת סרטון ה- YouTube, אז נבצע מספר פעולות
            case 2:
                // הפעלה של הפונקציה playSong שבאמצעותה מתאפשר לנגן שיר בנגן המוסיקה
                this.playSong()
                // ביצוע הפסקה של בדיקת המקרה
                break
        }
    },

    // באמצעות הפונקציה toggleControls מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן המוסיקה
    toggleControls: function () {
        // נבדוק אם נגן ה- YouTube מצוי במצב 1, כלומר במצב נגינה של סרטון ה- YouTube, באמצעות הפעלה של הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube, אז נבצע מספר פעולות
        if ( youtubeplayer.getPlayerState() === 1 ) {
            // הסרה של ה- class בשם fa-play מהאלמנט i המצוי בתוך אלמנט a שיש לו מזהה ייחודי בשם play והוספה של ה- class בשם fa-pause וה- attribute מסוג title עם הערך Pause לאותו אלמנט
            $('#play i').removeClass('fa-play').addClass('fa-pause').attr('title', 'Pause')
            // הסרה של ה- class בשם pause מהאלמנט li שיש לו class בשם pause המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist והוספה של ה- class בשם playing לאותו אלמנט
            $('#player-playlist li.pause').removeClass('pause').addClass('playing')
        // אחרת, נבדוק אם נגן ה- YouTube מצוי במצב 2, כלומר במצב השהייה של נגינת סרטון ה- YouTube, באמצעות הפעלה של הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube, אז נבצע מספר פעולות
        } else if ( youtubeplayer.getPlayerState() === 2 ) {
            // הסרה של ה- class בשם fa-pause מהאלמנט i המצוי בתוך אלמנט a שיש לו מזהה ייחודי בשם play והוספה של ה- class בשם fa-play וה- attribute מסוג title עם הערך Play לאותו אלמנט
            $('#play i').removeClass('fa-pause').addClass('fa-play').attr('title', 'Play')
            // הסרה של ה- class בשם playing מהאלמנט li שיש לו class בשם playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist והוספה של ה- class בשם pause לאותו אלמנט
            $('#player-playlist li.playing').removeClass('playing').addClass('pause')
        }
    },

    // באמצעות הפונקציה detectStateChange מתאפשר לזהות שינוי במצב ההפעלה של נגן המוסיקה ולפעול בהתאם
    detectStateChange: function () {
        // המשתנה player_state מפעיל את הפונקציה getPlayerState שבאמצעותה מתאפשר להחזיר את המצב הנוכחי שמצוי בו נגן ה- YouTube
        let player_state = youtubeplayer.getPlayerState()

        // נבדוק מהו המצב הנוכחי בו מצוי המשתנה player_state, אז נבצע מספר פעולות
        switch ( player_state ) {
            // המקרה 0 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 0, כלומר במצב סיום נגינה של סרטון ה- YouTube, אז נבצע מספר פעולות
            case 0:
                // הפעלה של הפונקציה playNextSong שבאמצעותה מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה
                this.playNextSong()
                // ביצוע הפסקה של בדיקת המקרה
                break
            // המקרה 1 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 1, כלומר במצב נגינה של סרטון ה- YouTube או המקרה 2 מבצע בדיקה אם נגן ה- YouTube מצוי במצב 2, כלומר במצב השהייה של נגינת סרטון ה- YouTube, אז נבצע מספר פעולות
            case 1:
            case 2:
                // הפעלה של הפונקציה toggleControls שבאמצעותה מתאפשר לבצע החלפה בין הכפתורים של הפעלה והשהייה המצויים בנגן המוסיקה
                this.toggleControls()
                // ביצוע הפסקה של בדיקת המקרה
                break
        }
    },

    // באמצעות הפונקציה initYouTube מתאפשר לאתחל את הטעינה של נגן ה- YouTube עם הטעינה של העמוד
    initYouTube: function () {
        // המשתנה tag יוצר ב- DOM אלמנט חדש מסוג script
        let tag = document.createElement('script')
        // הוספה של ה- attribute מסוג src המכיל את כתובת ה- URL 'https://www.youtube.com/iframe_api' לאלמנט המצוי במשתנה tag
        tag.src = 'https://www.youtube.com/iframe_api'

        // המשתנה first_script_tag מכיל את האלמנט הראשון מסוג script המצוי ב- DOM באמצעות ההגדרה של document.getElementsByTagName ולמיקום של האינדקס 0 במערך של התגי שם המכילים את השם script
        let first_script_tag = document.getElementsByTagName('script')[0]
        // הכנסה של המשתנה tag ושל המשתנה first_script_tag לפני הצומת הראשית של האלמנטים ב- DOM
        first_script_tag.parentNode.insertBefore( tag, first_script_tag )

        // הפעלה של הפונקציה bindEvents המצויה תחת האובייקט Router המכילה את כל ה- eventים המתרחשים באובייקט Router
        Router.bindEvents()

        // נבדוק אם הפרופרטי isPlayerInit קיים ב- window, אז נבצע מספר פעולות
        if ( isPlayerInit )
            // הפעלה של הפונקציה onYouTubeIframeAPIReady שבאמצעותה מתאפשר להפעיל את האלמנט iframe כשה- API של YouTube מוכן
            onYouTubeIframeAPIReady()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים באובייקט Player
    bindEvents: function () {
        // כאשר מתבצעת לחיצה על האלמנט a שיש לו מזהה ייחודי בשם stop, נפעיל את הפונקציה stopSong שבאמצעותה מתאפשר לעצור את ניגון השיר המתנגן בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם stopSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם stop), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה stopSong יתייחס בכל מקרה לאובייקט Player
        $('#stop').on('click', $.proxy( this.stopSong, this ))
        // כאשר מתבצעת לחיצה על האלמנט a שיש לו מזהה ייחודי בשם step-backward, נפעיל את הפונקציה playPreviousSong שבאמצעותה מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לפני השיר המתנגן בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playPreviousSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם step-backward), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה playPreviousSong יתייחס בכל מקרה לאובייקט Player
        $('#step-backward').on('click', $.proxy( this.playPreviousSong, this ))
        // כאשר מתבצעת לחיצה על האלמנט a שיש לו מזהה ייחודי בשם step-forward, נפעיל את הפונקציה playNextSong שבאמצעותה מתאפשר לנגן את השיר המצוי ברשימת ההשמעה לאחר השיר המתנגן בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם playNextSong יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם step-forward), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה playNextSong יתייחס בכל מקרה לאובייקט Player
        $('#step-forward').on('click', $.proxy( this.playNextSong, this ))
        // כאשר המשתנה youtubeplayer מפעיל את ה- event מסוג onStateChange, נפעיל את הפונקציה updateTimer שבאמצעותה מתאפשר לעדכן את זמן ניגון השיר, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם updateTimer יתייחס לאלמנט עצמו (במקרה זה לאלמנט time המעדכן את זמן ניגון השיר), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה updateTimer יתייחס בכל מקרה לאובייקט Player
        youtubeplayer.addEventListener('onStateChange', $.proxy( this.updateTimer, this ))
        // כאשר מתבצע שינוי של הערך באלמנט מסוג input שיש לו מזהה ייחודי בשם song-duration, נפעיל את הפונקציה changeCurrentTime שבאמצעותה מתאפשר לשנות את הזמן הנוכחי של ניגון השיר בהתאם לזמן שנגרר בסרגל של טווח הזמן, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeCurrentTime יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם song-duration), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeCurrentTime יתייחס בכל מקרה לאובייקט Player
        $('#song-duration').on('change', $.proxy( this.changeCurrentTime, this ))
        // כאשר מתבצע שינוי של הערך באלמנט מסוג input שיש לו מזהה ייחודי בשם volume, נפעיל את הפונקציה changeVolume שבאמצעותה מתאפשר לשנות את עוצמת השמע של השיר המתנגן בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם changeVolume יתייחס לאלמנט עצמו (במקרה זה לאלמנט מסוג input שיש לו מזהה ייחודי בשם volume), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה changeVolume יתייחס בכל מקרה לאובייקט Player
        $('#volume').on('change', $.proxy( this.changeVolume, this ))
        // כאשר מתבצעת לחיצה על האלמנט a שיש לו מזהה ייחודי בשם volume-up, נפעיל את הפונקציה toggleVolumeBar שבאמצעותה מתאפשר להציג את הרצועה השולטת על עוצמת השמע של השיר המתנגן בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם toggleVolumeBar יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם volume-up), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה toggleVolumeBar יתייחס בכל מקרה לאובייקט Player
        $('#volume-up').on('click', $.proxy( this.toggleVolumeBar, this ))
        // כאשר מתבצעת לחיצה על האלמנט li שהוא ללא class בשם pause או playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist, נפעיל את הפונקציה executePlaying שבאמצעותה מתאפשר לבצע נגינה של השיר בנגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם executePlaying יתייחס לאלמנט עצמו (במקרה זה לאלמנט li שהוא ללא class בשם pause או playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה executePlaying יתייחס בכל מקרה לאובייקט Player
        $('#player-playlist').on('click', 'li:not(.pause, .playing)', $.proxy( this.executePlaying, this ))
        // כאשר מתבצעת לחיצה על האלמנט a שיש לו מזהה ייחודי בשם play או על אלמנט li שיש לו class בשם playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist או על אלמנט li שיש לו class בשם pause המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם player-controls, נפעיל את הפונקציה togglePlaying שבאמצעותה מתאפשר להחליף בין מצבי הנגינה של נגן המוסיקה, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם togglePlaying יתייחס לאלמנט עצמו (במקרה זה לאלמנט a שיש לו מזהה ייחודי בשם play או על אלמנט li שיש לו class בשם playing המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist או על אלמנט li שיש לו class בשם pause המצוי בתוך אלמנט ol שיש לו מזהה ייחודי בשם player-playlist המצויים בתוך אלמנט div שיש לו מזהה ייחודי בשם player-controls), נשתמש ב- proxy כדי שההקשר של this בתוך הפונקציה togglePlaying יתייחס בכל מקרה לאובייקט Player
        $('#player-controls').on('click', '#play, #player-playlist li.playing, #player-playlist li.pause', $.proxy( this.togglePlaying, this ))
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Player
    init: function () {
        // הפעלה של הפונקציה startPlaylist שבאמצעותה מתאפשר לבצע פעולות בנגן המוסיקה בעת הפעלת רשימת ההשמעה
        this.startPlaylist()
        // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים באובייקט Player
        this.bindEvents()
    }
}

// ייצוא האובייקט Player ל- window
window.Player = Player
// ייצוא היכולות של האובייקט Player החוצה
export default Player