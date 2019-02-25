// ייבוא היכולות של jQuery על-מנת שהאובייקט Router יוכל להשתמש בהן
import $ from 'jquery'

// האובייקט Router המתפקד כ"מעין" מחלקת שירות מכיל את כל הפונקציות שבאמצעותן מתאפשר לבצע שליטה על ניתוב העמודים ב- DOM על-מנת שהעמוד יהיה SPA (Single Page Application)
// הגדרה של האובייקט Router כקבוע
const Router = {
    // הפרופרטי routes מכיל כברירת מחדל אובייקט ריק
    routes: {},
    // הפרופרטי default מכיל כברירת מחדל אובייקט ריק
    default: {},

    // באמצעות הפונקציה when (שמקבלת את המשתנה route המכיל את הנתיב) מתאפשר לבצע ניתוב בין העמודים השונים
    when: function ( route ) {
        // הפרופרטי routes מכניס לתוך האובייקט מערך המכיל את שם הנתיב מה- URL שנמצא לאחר הסימן # ואובייקט המכיל את הפרופרטי template המביא את התבנית html של הנתיב ואת הפרופרטי callback המפעיל פונקציית callback
        this.routes[ route.path.substring(1) ] = {
            template: route.template,
            callback: route.callback
        }

        // הפונקציה מחזירה את ההקשר של האובייקט Router
        return this
    },

    // באמצעות הפונקציה otherwise (שמקבלת את המשתנה route המכיל את הנתיב) מתאפשר לבצע ניתוב לעמוד המוגדר כברירת מחדל
    otherwise: function ( route ) {
        // הפרופרטי default מכיל את המשתנה route
        this.default = route

        // הפונקציה מחזירה את ההקשר של האובייקט Router
        return this
    },

    // באמצעות הפונקציה getParams מתאפשר לקבל את שם הנתיב
    getParams: function () {
        // המשתנה hash מפעיל את הפונקציה getHash שבאמצעותה מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
        let hash = this.getHash()
        // המשתנה params מכיל מערך עם הערך המצוי ב- URL באמצעות פיצול הערך המצוי במשתנה hash למערך שהאינדקסים שלו מופרדים באמצעות הסימן '/'
        let params = hash.split('/')

        // נבדוק אם אורך הערך המצוי במשתנה params הוא 1, אז נבצע מספר פעולות
        if ( params.length === 1 )
            // החזרה של הערך הבוליאני false
            return false

        // המשתנה params מפעיל את הפונקציה shift המסירה את הפריט הראשון במערך (במקרה זה, את הפריט הראשון במערך המצוי לאחר הסימן #) ומחזירה אותו
        params.shift()

        // הפונקציה מחזירה את המשתנה params המכיל את הפריט הראשון במערך המצוי לאחר הסימן #
        return params
    },

    // באמצעות הפונקציה getHash מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
    getHash: function () {
        // הפונקציה מחזירה את הסטרינג המצוי ב- URL לאחר הסימן # באמצעות הפעלה של הפונקציה (1)location.hash.substring
        return location.hash.substring(1)
    },

    // באמצעות הפונקציה getRoute מתאפשר לקבל את הנתיב
    getRoute: function () {
        // המשתנה self מכיל את ההקשר של האובייקט Router
        let self = this

        // באמצעות הפונקציה getRouteName מתאפשר לקבל את שם הנתיב
        function getRouteName() {
            // הפונקציה מחזירה את הערך המצוי באינדקס 0 של המערך המצוי בפונקציה getHash שבאמצעותה מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן # ואת התוצאה מפצלים למערך לאחר שמורידים ממנו את הסימן '/', ובכך מתאפשר לקבל את שם הנתיב
            return self.getHash().split('/')[0]
        }

        // אם הפונקציה location.hash אינה מכילה ערך, כלומר אין ערך לאחר הסימן #, הפונקציה מחזירה את הערך הבוליאני false, אחרת, כלומר יש ערך לאחר הסימן #, הפונקציה מחזירה את הערך המצוי בפונקציה getRouteName שבאמצעותה מתאפשר לקבל את שם הנתיב
        return ( location.hash === '' ) ? false : getRouteName()
    },

    // באמצעות הפונקציה getTemplate (שמקבלת את המשתנה template המכיל את התבנית html) מתאפשר לקבל את התבנית html של העמוד הרלוונטי
    getTemplate: function ( template ) {
        // הפונקציה מחזירה בקשת ajax לנתיב '{http://localhost:8080${template' המביאה את התבנית html של העמוד הרלוונטי
        return $.ajax(`http://localhost:8080${template}`)
    },

    // באמצעות הפונקציה setPage מתאפשר להציג את העמוד הרלוונטי ב- DOM
    setPage: function () {
        // המשתנה route מפעיל את הפונקציה getRoute שבאמצעותה מתאפשר לקבל את הנתיב
        let route = this.getRoute()
        // המשתנה d מפעיל את הפונקציה Deferred שהיא פונקציה מובנית של promise שבאמצעותה מתאפשר לדחות ביצוע פעולה מסוימת
        let d = $.Deferred()
        // המשתנה config מכיל את הפרופרטי routes המכניס לתוך האובייקט שלו מערך המכיל את המשתנה route, ולמעשה המשתנה config מכיל את החיבור לנתיב
        let config = this.routes[ route ]
        // המשתנה redirect מכיל את הערך הבוליאני false
        let redirect = false

        // נבדוק אם המשתנה config מכיל את הנתיב הלא קיים שניסינו להתחבר אליו, אז נבצע מספר פעולות
        if ( !config ) {
            // המשתנה config מכיל את האובייקט המצוי בפרופרטי default
            config = this.default
            // הפעלה של הפונקציה getTemplate (שמקבלת את הפרופרטי template המצוי במשתנה config המכיל את התבנית html) שבאמצעותה מתאפשר לקבל את התבנית html של העמוד הרלוונטי, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה html המכיל את התבנית html ומבצעת מספר פעולות
            redirect = true
        }

        // הפעלה של הפונקציה getTemplate (שמקבלת את הפרופרטי template המצוי במשתנה config המכיל את התבנית html) שבאמצעותה מתאפשר לקבל את התבנית html של העמוד הרלוונטי, ולאחר מכן נפעיל promise שפונקציית ה- callback שלו (המסומנת כפונקציית חץ) מקבלת את המשתנה html המכיל את התבנית html ומבצעת מספר פעולות
        this.getTemplate( config.template ).then(( html => {
            // נבדוק אם המשתנה route אינו מכיל את הנתיב single-album, אז נבצע מספר פעולות
            if ( route !== 'single-album' )
                // הכנסה של הטקסט Music Player לתוך אלמנט title על-מנת שהטקסט המצוי בכותרת של הכרטיסייה בדפדפן יהיה מוגדר באופן קבוע
                $('title').text('Music Player')

            // הכנסה של המשתנה html לתוך אלמנט div שיש לו מזהה ייחודי בשם main-container, ובכך מתאפשר להציג למשתמש ב- DOM את התבנית html של העמוד הרלוונטי
            $('#main-container').html( html )

            // נבדוק אם הפרופרטי callback המצוי במשתנה config הוא מסוג פונקציה, אז נבצע מספר פעולות
            if ( typeof config.callback === 'function' )
                // הפעלה של פונקציית ה- callback
                config.callback()

            // נבדוק אם המשתנה redirect מכיל את הערך הבוליאני false, אז נבצע מספר פעולות
            if ( redirect )
                // הפעלה של הפונקציה redirect (שמקבלת את הפרופרטי path המצוי במשתנה config המכיל את הנתיב שבוצע אליו חיבור) שבאמצעותה מתאפשר לבצע הפניה מחדש לנתיב
                this.redirect( config.path )

            // לאחר סיום ביצוע הפעולה המוגדרת ב- promise (במקרה זה, הצגה של הנתונים ב- DOM היכן שיש אלמנט div שיש לו מזהה ייחודי בשם main-container), המשתנה d מפעיל את הפונקציה resolve שהיא פונקציה מובנית של promise המודיעה שהפעולה שהתבצעה הסתיימה
            d.resolve()
        // הפעלה של פונקציית callback (המסומנת כפונקציית חץ) ובה המשתנה d מפעיל את הפונקציה reject (שמקבלת את המשתנה xhr המכיל אובייקט המבצע אינטרקציה עם השרת ושבאמצעותו מתאפשר לאחזר נתונים מכתובת האתר מבלי לבצע רענון מלא של העמוד ולהפריע לפעולות המשתמש ובכך לעדכן רק את החלק הרלוונטי בעמוד) שהיא פונקציה מובנית של promise המחזירה את ה- promise שנדחה עם הסיבה הנתונה
        }), xhr => d.reject( xhr ))

        // הפונקציה מחזירה את המשתנה d המפעיל את הפונקציה promise, כך שהפונקציה מחזירה הבטחה כלשהי שבאמצעותה מתאפשר לפונקציה לשלוט על הנתונים בצורה סינכרונית
        return d.promise()
    },

    // באמצעות הפונקציה redirect (שמקבלת את המשתנה path המכיל כברירת מחדל את הערך של הנתיב all-albums) מתאפשר לבצע הפניה מחדש לנתיב
    redirect: function ( path = 'all-albums' ) {
        // הפרופרטי window.location.href מכיל את כתובת ה- URL של הנתיב שבוצעה אליו הפניה מחדש
        window.location.href = 'http://localhost:8080/#' + path
    },

    // הפונקציה bindEvents מכילה את כל ה- eventים המתרחשים באובייקט Router
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שלמעשה הוא ה- DOM), נפעיל את הפונקציה setPage שבאמצעותה מתאפשר להציג את העמוד הרלוונטי ב- DOM ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setPage יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים ב- window), נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה setPage יתייחס בכל מקרה לאובייקט Router
        window.onhashchange = this.setPage.bind( this )
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
    init: function () {
        // הפעלה של הפונקציה setPage שבאמצעותה מתאפשר להציג את העמוד הרלוונטי ב- DOM, ולאחר מכן נפעיל promise שבו נפעיל את הפונקציה bindEvents המכילה את כל ה- eventים המתרחשים באובייקט Router, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם bindEvents יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה bindEvents), נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה bindEvents יתייחס בכל מקרה לאובייקט Router
        this.setPage().then( this.bindEvents.bind( this ) )
    }
}

// ייצוא היכולות של האובייקט Router החוצה
export default Router