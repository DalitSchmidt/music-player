// בקובץ זה אנו מגדירים את כל הפעולות המתבצעות בנגן באמצעות שימוש ב- API של YouTube
// באמצעות הפונקציה onYouTubeIframeAPIReady אנו מפעילים את האלמנט iframe כשה- API של YouTube מוכן
function onYouTubeIframeAPIReady() {
    // המשתנה youtubeplayer יוצר אינסטנס חדש של Player בשם song-youtube המכיל אובייקט חדש שבו יש פרופרטיס שונים המגדירים את התכונות שלו
    youtubeplayer = new YT.Player('song-youtube', {
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
            modestbranding: 1,  // Hide the YouTube Logo
            // מניעת הרצת רשימת ההשמעה של הנגן באופן אוטומטי מההתחלה לאחר סיום הנגינה של כל רשימת ההשמעה
            loop: 0,            // Run the video in a loop
            // הסתרת הכפתור של תצוגת הסרטון במסך מלא
            fs: 0,              // Hide the full screen button
            // הסתרת כתוביות מהסרטון (במידה ויש)
            cc_load_policy: 0,  // Hide closed captions
            // הסתרת הערות של הסרטון (במידה ויש)
            iv_load_policy: 3,  // Hide the Video Annotations
        },
        // הגדרת המאפיינים המזהים את האירועים שקורים ב- API ואת הפונקציות שמאזינות ל- API כאשר ה- events האלה מתרחשים
        events: {
            // הפונקציה onPlayerReady מתבצעת כאשר האירוע 'onReady' מתרחש
            'onReady': onPlayerReady,
            // כאשר ה- event onStateChange מתרחש, אנו מפעילים את הפונקציה detectStateChange המצויה תחת האובייקט Player ושבאמצעותה מתאפשר לזהות שינוי במצב ההפעלה של הנגן ולפעול בהתאם, ומאחר ואנו רוצים לשמור על ההקשר של this באובייקט Player נשתמש ב- proxy
            'onStateChange': $.proxy( Player.detectStateChange, Player )
        },
    })
}

// באמצעות הפונקציה onPlayerReady אנו מפעילים את כל הפעולות שהנגן יכול לבצע
// ממשק ה- API קורא לפונקציה זו כאשר הנגן מוכן
function onPlayerReady() {
    // הפעלה של הפונקציה init המצויה תחת האובייקט Player ולמעשה מכילה את כל היכולות שהנגן יכול לבצע
    Player.init()
    // הפרופרטי isPlayerInit המצוי ב- window מוגדר כברירת מחדל בערך הבוליאני true
    window.isPlayerInit = true
}