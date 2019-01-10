// באמצעות האובייקט 'Router' מתבצעת שליטה על ניתוב הדפים ב- DOM, על-מנת שהדף יהיה SPA (Single Page Application)
// הגדרת האובייקט 'Router' כקבוע
const Router = {
    // באמצעות הפונקציה 'getPageName' מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
    getPageName: function () {
        // הפונקציה מחזירה את הסטרינג המצוי ב- URL לאחר הסימן # (לדוגמה, אם נלחץ על הכפתור Add New Album יחזור הסטרינג add-new-album, ואם נלחץ על הכפתור All Albums יחזור הסטרינג all-albums וכו')
        return location.hash.substring(1)
    },

    // באמצעות הפונקציה 'checkURLHash' אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא
    checkURLHash: function() {
        // אם 'location.hash' לא מכיל נתונים, כלומר, אין נתונים לאחר הסימן #, הפונקציה מחזירה את הערך הבוליאני 'false'
        if ( location.hash === '' )
            return false

        else
            // אחרת, כלומר ישנם נתונים לאחר הסימן #, הפונקציה מחזירה את הנתונים שמצויים בפונקציה 'getPageName', המאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
            return this.getPageName()
    },

    // באמצעות הפונקציה 'getHTML' המקבלת את הפרמטר 'page', מתאפשר לקבל את התבנית HTML של הדף שנשלחה אליו בקשת ajax
    getHTML: function( page ) {
        // הפונקציה מחזירה בקשת 'ajax' המתבצעת לכתובת ה- URL 'http://localhost:8080/dist/js/_templates/_${page}.html', כך שלמעשה הפונקציה מחזירה את התבנית HTML של הדף שנשלחה אליו הבקשה
        return $.ajax(`http://localhost:8080/dist/js/_templates/_${page}.html`)
    },

    // באמצעות הפונקציה 'setPage' מתאפשר להציג את הדף הרלוונטי ב- DOM
    setPage: function() {
        // המשתנה 'page' מפעיל את הפונקציה 'getPageName', המאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
        let page = this.getPageName()
        // הפעלה של הפונקציה 'getHTML' המקבלת את הפרמטר 'page', שלמעשה היא מכילה את התבנית HTML של הדף שנשלחה אליו בקשת ajax ולאחר ביצוע הבקשה, הפונקציה מפעילה 'promise' המציג ב- DOM היכן שיש תגית <div> המכילה מזהה ייחודי בשם 'main-container' את הנתונים המצויים במשתנה 'html'
        this.getHTML( page ).then(html => {
            $('#main-container').html( html )
        })
    },

    // הפונקציה 'bindEvents' מכילה את כל ה- eventים הקורים באובייקט 'Router'
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שלמעשה הוא ה- DOM), אז תופעל הפונקציה 'setPage' המאפשרת להציג את הדף הרלוונטי ב- DOM
        window.onhashchange = this.setPage.bind( this )
    },

    // הפונקציה 'init' מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט 'Router'
    init: function () {
        // המשתנה 'page' מפעיל את הפונקציה 'checkURLHash' שבאמצעותה אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא
        let page = this.checkURLHash()
        //אם המשתנה 'page' המפעיל את הפונקציה 'checkURLHash' שבאמצעותה אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא, מחזיר את הנתונים שמצויים בפונקציה 'getPageName', המאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
        if ( page )
            // נפעיל את הפונקציה 'setPage' המקבלת את המשתנה 'page' המפעיל את הפונקציה 'checkURLHash' שבאמצעותה אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא ושמאפשרת להציג את הדף הרלוונטי ב- DOM
            this.setPage( page )

        // הפעלה של הפונקציה 'bindEvents' המכילה את כל ה- eventים הקורים באובייקט 'Router'
        this.bindEvents()
    }
}

// הגדרה של כל הנתונים שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט 'Router'
// הפעלה של הפונקציה 'init' המצויה תחת האובייקט 'Router' ומכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט 'Router'
$(document).ready(() => Router.init())