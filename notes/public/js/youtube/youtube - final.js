// בקובץ זה מוגדרות כל הפעולות המתבצעות בנגן ה- YouTube באמצעות שימוש ב- API של YouTube
// באמצעות הפונקציה onYouTubeIframeAPIReady מתאפשר להפעיל את האלמנט iframe כשה- API של YouTube מוכן
function onYouTubeIframeAPIReady() {
    // המשתנה youtubeplayer יוצר אינסטנס חדש של Player בשם song-youtube המכיל אובייקט חדש שיש בו פרופרטיס שונים המגדירים את התכונות שלו
    youtubeplayer = new YT.Player('song-youtube', {
        // התאמה של המאפיינים הקשורים להגדרות התצוגה השונות של נגן ה- YouTube המצוי באלמנט iframe
        playerVars: {
            // ביטול האפשרות לניגון האוטומטי של סרטון ה- YouTube
            autoplay: 0,
            // ביטול ההצגה של הלחצנים השולטים על הצגת סרטון ה- YouTube
            controls: 0,
            // ביטול הצורך ב- attribute מסוג rel המציין אם נגן ה- YouTube צריך להציג סרטונים קשורים או לא בעת ההפעלה של סרטון ה- YouTube הראשוני
            rel : 0,
            // ביטול האפשרות של הצגת המידע אודות סרטון ה- YouTube כגון הכותרת של סרטון ה- YouTube העולה לפני הפעלת סרטון ה- YouTube
            showinfo: 0,
            // הסתרה של לוגו YouTube מסרגל הבקרה
            modestbranding: 1,  // Hide the YouTube Logo
            // מניעה של הרצת רשימת ההשמעה של נגן ה- YouTube באופן אוטומטי מההתחלה לאחר סיום הנגינה של כל רשימת ההשמעה
            loop: 0,            // Run the video in a loop
            // הסתרה של כפתור תצוגת סרטון ה- YouTube במסך מלא
            fs: 0,              // Hide the full screen button
            // הסתרה של כתוביות מסרטון ה- YouTube (במידה ויש)
            cc_load_policy: 0,  // Hide closed captions
            // הסתרה של הערות מסרטון ה- YouTube (במידה ויש)
            iv_load_policy: 3,  // Hide the Video Annotations
        },
        // הגדרה של המאפיינים המזהים את ה- events שמתרחשים ב- API ואת הפונקציות שמאזינות ל- API
        events: {
            // הפעלה של הפונקציה onPlayerReady שבאמצעותה מתאפשר להפעיל את כל הפעולות שנגן ה- YouTube יכול לבצע, כאשר ה- event מסוג onReady מתרחש
            'onReady': onPlayerReady,
            // הפעלה של הפונקציה detectStateChange המצויה תחת האובייקט Player ושבאמצעותה מתאפשר לזהות שינוי במצב ההפעלה של נגן המוסיקה ולפעול בהתאם, כאשר ה- event מסוג onStateChange מתרחש, ומאחר ואנו רוצים לשמור על ההקשר של this באובייקט Player נשתמש ב- proxy
            'onStateChange': $.proxy( Player.detectStateChange, Player )
        },
    })
}

// באמצעות הפונקציה onPlayerReady מתאפשר להפעיל את כל הפעולות שנגן ה- YouTube יכול לבצע
// ממשק ה- API קורא לפונקציה זו כאשר נגן ה- YouTube מוכן
function onPlayerReady() {
    // הפעלה של הפונקציה init המצויה תחת האובייקט Player המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Player
    Player.init()
    // הפרופרטי isPlayerInit המצוי ב- window מכיל את הערך הבוליאני true
    window.isPlayerInit = true
}