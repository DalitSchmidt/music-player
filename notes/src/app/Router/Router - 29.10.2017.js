// ייבוא היכולות של jQuery על-מנת שהאובייקט Router יוכל להשתמש בהן
import $ from 'jquery'

// באמצעות האובייקט Router מתבצעת שליטה על ניתוב הדפים ב- DOM, על-מנת שהדף יהיה SPA (Single Page Application)
// הגדרת האובייקט Router כקבוע
const Router = {
    // הפרופרטי routes מכיל אובייקט ריק
    routes: {},

    // באמצעות הפונקציה when מתאפשר לבצע את הניתוב בין הדפים
    when: function( route ) {
        // let callback = eval( route.callback )
        // let context = eval( route.callback.split('.')[0] )

        // הפרופרטי routes מכניס לתוך האובייקט מערך המכיל את שם הנתיב מה- URL שנמצא לאחר הסימן # ואובייקט המכיל את הפרופרטיס fn המפעיל פונקציית callback ו- template המביא את התבנית html של הנתיב
        this.routes[ route.path.substring(1) ] = {
            fn: route.callback,
            template: route.template
        }

        // הפונקציה מחזירה את ההקשר של האובייקט Router
        return this
    },

    // באמצעות הפונקציה getParams מתאפשר לקבל את השם של הנתיב
    getParams: function() {
        // המשתנה hash מפעיל את הפונקציה getHash המביאה את הנתון שמצוי ב- index מספר 1 במערך לאחר הסימן #
        let hash = this.getHash()
        // המשתנה params מפצל את הנתונים המצויים במשתנה hash למערך שהאינדקסים שלו מופרדים באמצעות הסימן '/', כך שלמעשה המשתנה params מכיל מערך של הנתונים המצויים ב- URL
        let params = hash.split('/')

        // אם האורך של המשתנה params הוא 1, נחזיר את הערך הבוליאני false
        if ( params.length === 1 )
            return false

        // המשתנה params מפעיל את הפונקציה shift המסירה את הפריט הראשון במערך (במקרה שלנו, הפריט הראשון במערך שמצוי לאחר הסימן #) ומחזירה אותו
        params.shift()
        // הפונקציה מחזירה את המשתנה params המכיל את הפריט הראשון במערך שמצוי לאחר הסימן #
        return params
    },

    // באמצעות הפונקציה getHash מתאפשר לקבל את הסטרינג המצוי ב- URL לאחר הסימן #
    getHash: function() {
        // הפונקציה מחזירה את הסטרינג המצוי ב- URL לאחר הסימן #
        return location.hash.substring(1)
    },

    // באמצעות הפוקציה getRoute מתאפשר לקבל את הנתיב
    getRoute: function() {
        // המשתנה self מכיל את ההקשר של האובייקט Router
        let self = this
        // באמצעות הפונקציה getRouteName מתאפשר לקבל את השם של הנתיב
        function getRouteName() {
            // הפונקציה מחזירה את הנתון המצוי באינדקס 0 של המערך המצוי בפונקציה getHash (המאפשרת לקבל את הסטרינג המצוי ב- URL לאחר הסימן #) כאשר ה- indexים של המערך מופרדים באמצעות הסימן '/'
            return self.getHash().split('/')[0]
        }

        // אם location.hash לא מכיל נתונים, כלומר אין נתונים לאחר הסימן #, הפונקציה מחזירה את הערך הבוליאני false, אחרת, כלומר יש נתונים לאחר הסימן #, הפונקציה מחזירה את הנתונים שמצויים בפונקציה getRouteName המאפשרת לקבל את השם של הנתיב
        return ( location.hash === '' ) ? false : getRouteName()
    },

    // באמצעות הפונקציה getTemplate המקבלת את המשתנה template מתאפשר לקבל את התבנית html של העמוד הרלוונטי
    getTemplate: function( template ) {
        // הפונקציה מחזירה בקשת ajax המתבצעת לנתיב 'http://localhost:8080${template}' המביאה את התבנית html של העמוד הרלוונטי
        return $.ajax(`http://localhost:8080${template}`)
    },

    // באמצעות הפונקציה setPage מתאפשר להציג את הדף הרלוונטי ב- DOM
    setPage: function() {
        // המשתנה route מפעיל את הפונקציה getRoute המאפשרת לקבל את הנתיב
        let route = this.getRoute()
        // המשתנה d מפעיל את הפונקציה Deferred, שהיא פונקציה מובנית של promise המאפשרת לדחות ביצוע פעולה מסוימת
        let d = $.Deferred()
        // המשתנה config מכיל את הפרופרטי routes המכניס לתוך האובייקט שלו מערך עם המשתנה route המפעיל את הפונקציה getRoute המאפשרת לקבל את הנתיב, כך שלמעשה המשתנה config מכיל את החיבור לנתיב
        let config = this.routes[ route ]

        // הפעלה של הפונקציה getTemplate (המאפשרת לקבל את התבנית html של העמוד הרלוונטי) אשר מקבלת את המשתנה config המפעיל את הפרופרטי template, ולאחר מכן הפונקציה מפעילה promise המציג ב- DOM היכן שיש אלמנט div שיש לו מזהה ייחודי בשם main-container את הנתונים המצויים במשתנה html
        this.getTemplate( config.template ).then((html => {
            $('#main-container').html( html )
            // המשתנה config המכיל את החיבור לנתיב מפעיל את הפרופרטי fn
            config.fn()

            // לאחר סיום ביצוע הפעולה המוגדרת ב- promise (במקרה זה, הצגת הנתונים ב- DOM היכן שיש תגית <div> המכילה מזהה ייחודי בשם main-container), המשתנה d מפעיל את הפונקציה resolve שהיא פונקציה מובנית של promise המודיעה שהפעולה שהתבצעה הסתיימה
            d.resolve()
            // הפונקציה xhr שהיא למעשה פונקציית callback (המסומנת כפונקציית החץ), מכילה את המשתנה d המפעיל את הפונקציה reject המקבלת את המשתנה xhr, שהיא פונקציה מובנית של promise המחזירה את ה- promise שנדחה עם הסיבה הנתונה
        }), xhr => d.reject( xhr ))

        // הפונקציה מחזירה את המשתנה d המפעיל את הפונקציה promise, כך שבכל מקרה הפונקציה מחזירה הבטחה כלשהי המאפשרת לפונקציה לשלוט על הנתונים בצורה סינכרונית
        return d.promise()
    },

    // באמצעות הפונקציה redirect המקבלת את המשתנה path אנו מבצעים הפניה מחדש לנתיב
    redirect: function( path ) {

    },

    // הפונקציה bindEvents מכילה את כל ה- eventים הקורים באובייקט Router
    bindEvents: function () {
        // כאשר יש שינוי של הסימן # ב- window (שלמעשה הוא ה- DOM), אז נפעיל את הפונקציה setPage המאפשרת להציג את הדף הרלוונטי ב- DOM ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם setPage יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים ב- window) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה setPage יתייחס בכל מקרה לאובייקט Router
        window.onhashchange = this.setPage.bind( this )
    },

    // הפונקציה init מכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router
    init: function() {
        // הפעלה של הפונקציה setPage המאפשרת להציג את הדף הרלוונטי ב- DOM, לאחר מכן הפונקציה מפעילה promise שבו היא מפעילה את הפונקציה bindEvents המכילה את כל הפעולות שאנו מעוניינים שיבוצעו עם הפעלתו של האובייקט Router, ומאחר ואנו רוצים שההקשר של this בתוך פונקציית ה- callback בשם bindEvents יתייחס לאלמנט עצמו (במקרה זה לאלמנטים המצויים בפונקציה bindEvents) נשתמש ב- bind כדי שההקשר של this בתוך הפונקציה bindEvents יתייחס בכל מקרה לאובייקט Router
        this.setPage().then( this.bindEvents.bind( this ) )
    }
}

// ייצוא היכולות של האובייקט Router החוצה
export default Router