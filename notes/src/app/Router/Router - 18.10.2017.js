// באמצעות האובייקט Router מתבצעת שליטה על ניתוב הדפים ב- DOM, על-מנת שהדף יהיה SPA (Single Page Application)
// הגדרת האובייקט Router כקבוע
const Router = {
    // באמצעות הפונקציה getPageName מתאפשר לקבל את הסטרינג המצוי ב- URL, כך שלמעשה הפונקציה מקבלת את השם של הדף
    getPageName: function() {
        // המשתנה hash מכיל את הסטרינג המצוי ב- URL לאחר הסימן #
        let hash = location.hash.substring(1)
        // המשתנה url מכיל את הנתונים המצויים במשתנה hash ומוריד מהם את הסימן '/'
        let url = hash.split('/')

        // אנו מבצעים בדיקה אם ה- type של המשתנה url הוא undefined, כלומר אין ב- URL את הסימן '/', אז נחזיר את הנתונים המצויים במשתנה hash
        if ( typeof url === 'undefined' )
            return hash

        // ככל ויש את הסימן '/' ב- URL, נחזיר את הנתון המצוי במשתנה url שיש לו את האינדקס 0
        return url[0]
    },

    // באמצעות הפונקציה checkURLHash אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא
    checkURLHash: function() {
        // אם location.hash לא מכיל נתונים, כלומר, אין נתונים לאחר הסימן #, הפונקציה מחזירה את הערך הבוליאני false, אחרת, כלומר ישנם נתונים לאחר הסימן #, הפונקציה מחזירה את הנתונים שמצויים בפונקציה getPageName, המאפשרת לקבל את השם של הדף
        return ( location.hash === '' ) ? false : this.getPageName()
    },

    // באמצעות הפונקציה getHTML המקבלת את המשתנה page, מתאפשר לקבל את התבנית HTML של הדף שנשלחה אליו בקשת ajax
    getHTML: function( page ) {
        // הפונקציה מחזירה בקשת ajax המתבצעת לכתובת ה- URL 'http://localhost:8080/js/_templates/_${page}.html', כך שלמעשה הפונקציה מחזירה את התבנית HTML של הדף שנשלחה אליו הבקשה
        return $.ajax(`http://localhost:8080/js/_templates/_${page}.html`)
    },

    // באמצעות הפונקציה setPage מתאפשר להציג את הדף הרלוונטי ב- DOM
    setPage: function( page ) {
        // המשתנה page מפעיל את הפרמטר page או את הפונקציה getPageName, המאפשרת לקבל את השם של הדף
        page = page || this.getPageName()

        // המשתנה d מפעיל את הפונקציה Deferred, שהיא פונקציה מובנית של promise המאפשרת לדחות ביצוע פעולה מסוימת
        let d = $.Deferred()

        // הפעלה של הפונקציה getHTML המקבלת את המשתנה page, שלמעשה היא מכילה את התבנית HTML של הדף שנשלחה אליו בקשת ajax ולאחר ביצוע הבקשה, הפונקציה מפעילה promise המציג ב- DOM היכן שיש תגית <div> המכילה מזהה ייחודי בשם main-container את הנתונים המצויים במשתנה html
        this.getHTML( page ).then((html => {
            $('#main-container').html( html )

            // לאחר סיום ביצוע הפעולה המוגדרת ב- promise (במקרה זה, הצגת הנתונים ב- DOM היכן שיש תגית <div> המכילה מזהה ייחודי בשם main-container), המשתנה d מפעיל את הפונקציה resolve שהיא פונקציה מובנית של promise המודיעה שהפעולה שהתבצעה הסתיימה
            d.resolve()
            // הפונקציה xhr שהיא למעשה פונקציית callback (המסומנת כפונקציית החץ), מכילה את המשתנה d המפעיל את הפונקציה reject המקבלת את המשתנה xhr, שהיא פונקציה מובנית של promise המחזירה את ה- promise שנדחה עם הסיבה הנתונה
        }), xhr => d.reject( xhr ))

        // הפונקציה מחזירה את המשתנה d המפעיל את הפונקציה promise, כך שבכל מקרה הפונקציה מחזירה הבטחה כלשהי המאפשרת לפונקציה לשלוט על הנתונים בצורה סינכרונית
        return d.promise()
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Router
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שלמעשה הוא ה- DOM), אז נפעיל פונקציית callback המפעילה את הפונקציה setPage המאפשרת להציג את הדף הרלוונטי ב- DOM
        window.onhashchange = () => this.setPage()
    },

    // הפונקציה init המקבלת את המשתנה callback מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
    init: function( callback ) {
        // המשתנה page מפעיל את הפונקציה checkURLHash שבאמצעותה אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא
        let page = this.checkURLHash()

        //אם המשתנה page המפעיל את הפונקציה checkURLHash שבאמצעותה אנו בודקים אם כתובת ה- URL מכילה את הסימן # או לא, מחזיר את הנתונים שמצויים בפונקציה getPageName, המאפשרת לקבל את השם של הדף
        if ( page ) {
            // נפעיל את הפונקציה setPage שבאמצעותה מתאפשר להציג את הדף הרלוונטי ב- DOM, ולאחר מכן נפעיל promise המפעיל בפונקציית ה- callback את הנתונים המפורטים מטה
            this.setPage().then(() => {
                // הפעלה של הפונקציה bindEvents המכילה את כל ה- eventים הקורים באובייקט Router
                this.bindEvents()
                // הפעלה של פונקציית ה- callback
                callback()
            })
        }
    }
}

// ייצוא היכולות של האובייקט Router החוצה
export default Router