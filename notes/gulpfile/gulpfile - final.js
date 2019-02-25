// קובץ זה מכיל משימות שונות שיתבצעו באופן קבוע עם הרצת הקובץ של ה- gulp
// המשתנה gulp מכיל את כל היכולות של המודול באמצעות חיבורו
const gulp = require('gulp')
// המשתנה browserify מכיל את כל היכולות של המודול באמצעות חיבורו
const browserify = require('browserify')
// המשתנה source מכיל את כל היכולות של המודול vinyl-source-stream באמצעות חיבורו
const source = require('vinyl-source-stream')
// המשתנה gutil מכיל את כל היכולות של המודול gulp-util באמצעות חיבורו
const gutil = require('gulp-util')
// המשתנה babelify מכיל את כל היכולות של המודול באמצעות חיבורו
const babelify = require('babelify')
// המשתנה connect מכיל את כל היכולות של המודול gulp-connect באמצעות חיבורו
const connect = require('gulp-connect')
// המשתנה sass מכיל את כל היכולות של המודול gulp-sass באמצעות חיבורו
const sass = require('gulp-sass')

// המשתנה scripts מכיל את המספר 0
let scripts = 0

// הפונקציה bundleApp מאגדת את כל היכולות של האפליקציה המצויות בקבצים שונים
function bundleApp() {
    // קידום המשתנה scripts בספרה אחת כל פעם
    scripts++

    // המשתנה app_bundler מכיל את כל היכולות של האפליקציה באמצעות חיבור הקובץ Application.js המכיל את האובייקט Application המתפקד כ"מעין" מחלקת שירות ומכיל את כל היכולות של האפליקציה
    let app_bundler = browserify({
        entries: './src/app/Application.js',
        debug: true
    })

    // המשתנה app_bundler מפעיל את הפונקציה transform שבאמצעותה מתאפשר לאגד את כל היכולות של האפליקציה המצויות בקבצים שונים
    app_bundler.transform('babelify', { presets: ['es2015'] })
        .bundle().on('error', gutil.log)
        .pipe( source('app.min.js') )
        .pipe( gulp.dest('./public/js/') )
        .pipe( connect.reload() )
}

// משימה עבור השימוש ב- connect שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת חיבור לשרת ולתיקייה הראשית שהיא public/.
gulp.task('connect', () => connect.server({ livereload: true, root: './public' }))
// משימה עבור השימוש ב- scripts שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מפעילה את הפונקציה bundleApp המאגדת את כל היכולות של האפליקציה המצויות בקבצים שונים
gulp.task('scripts', () => bundleApp())

// משימה עבור השימוש ב- sass שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת מספר פעולות
gulp.task('sass', () => {
    // הפונקציה מחזירה קישור לקובץ style.scss המכיל את כל יכולות העיצוב של האפליקציה ומבצעת מספר פעולות הקשורות לשימוש ב- sass
    return gulp.src('./src/sass/style.scss')
        .pipe( sass({ expended: true }).on('error', sass.logError))
        .pipe( gulp.dest('./public/css') )
        .pipe( connect.reload() )
})

// משימה עבור השימוש ב- watch שפונקציית ה- callback שלה (המסומנת כפונקציית חץ) מבצעת מספר פעולות
gulp.task('watch', () => {
    // ביצוע שימוש במשימה sass עבור כל שינוי המתבצע בקבצי sass
    gulp.watch( ['./src/sass/**/*.scss'], ['sass'] )
    // ביצוע שימוש במשימה scripts עבור כל שינוי המתבצע בקבצי js
    gulp.watch( ['./src/app/**/*.js'], ['scripts'] )
})

// משימת ברירת המחדל המכילה מערך עם כל המשימות הקיימות בקובץ ה- gulp (connect, scripts, sass ו- watch), ובכך המשימה של ברירת המחדל מכילה את כל המשימות המצויות בקובץ ה- gulp על-מנת שאפשר יהיה להשתמש בכולן
gulp.task('default', ['connect', 'scripts', 'sass', 'watch'])