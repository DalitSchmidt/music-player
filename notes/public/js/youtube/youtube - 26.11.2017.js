// בקובץ זה אנו מגדירים את כל הפעולות המתבצעות בנגן באמצעות שימוש ב- API של YouTube
// הגדרת משתנה גלובלי בשם youtubeplayer
var youtubeplayer
// המשתנה tag יוצר אלמנט חדש ב- DOM בשם 'script'
let tag = document.createElement('script')
// הוספת ה- attribute מסוג src המכיל את כתובת ה- URL 'https://www.youtube.com/iframe_api' לאלמנט המצוי במשתנה tag
tag.src = 'https://www.youtube.com/iframe_api'
// המשתנה firstScriptTag מכיל את האלמנט הראשון מסוג 'script' המצוי ב- DOM באמצעות ההגדרה של document.getElementsByTagName ולמיקום של האינדקס 0 במערך של התגי שם המכילים את השם script
let firstScriptTag = document.getElementsByTagName('script')[0]
// הכנסת המשתנים tag ו- firstScriptTag לפני הצומת הראשית של האלמנטים ב- DOM
firstScriptTag.parentNode.insertBefore( tag, firstScriptTag )

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
        // הגדרת המאפיינים המזהים את האירועים שקורים ב- API ואת הפונקציות שמאזינות ל- API כאשר ה- events האלה מתרחשים
        events: {
            // הפונקציה onPlayerReady מתבצעת כאשר האירוע 'onReady' מתרחש
            'onReady': onPlayerReady,
            //
            'onStateChange': $.proxy(Player.toggleControls, Player)
        },
    })
}

// באמצעות הפונקציה onPlayerReady המקבלת את הפרמטר event אנו מפעילים את כל הפעולות שהנגן יכול לבצע
// ממשק ה- API קורא לפונקציה זו כאשר הנגן מוכן
function onPlayerReady( event ) {
    // הפעלה של הפונקציה init המצויה תחת האובייקט Player ולמעשה מכילה את כל היכולות שהנגן יכול לבצע
    Player.init()
}