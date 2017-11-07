// בקובץ זה אנו משתמשים עבור כל מיני משימות שאנו מעוניינים שיתבצעו באופן קבוע עם הרצת הקובץ של ה- gulp
// המשתנה gulp מכיל את כל היכולות של המודול באמצעות חיבורו
const gulp = require('gulp')
// המשתנה browserify מכיל את כל היכולות של המודול באמצעות חיבורו
const browserify = require('browserify')
// המשתנה source מכיל את כל היכולות של המודול 'vinyl-source-stream' באמצעות חיבורו
const source = require('vinyl-source-stream')
// המשתנה gutil מכיל את כל היכולות של המודול 'gulp-util' באמצעות חיבורו
const gutil = require('gulp-util')
// המשתנה babelify מכיל את כל היכולות של המודול באמצעות חיבורו
const babelify = require('babelify')
// המשתנה connect מכיל את כל היכולות של המודול 'gulp-connect' באמצעות חיבורו
const connect = require('gulp-connect')
// המשתנה sass מכיל את כל היכולות של המודול 'gulp-sass' באמצעות חיבורו
const sass = require('gulp-sass')
// המשתנה nodemon מכיל את כל היכולות של המודול 'gulp-nodemon' באמצעות חיבורו
const nodemon = require('gulp-nodemon')

let scripts = 0

function bundleApp() {
    scripts++
    let appBundler = browserify({
        entries: './src/js/App.js',
        debug: true,
    })

    appBundler.transform('babelify', {presets: ['es2015']}).
    bundle().
    on('error', gutil.log).
    pipe(source('app.min.js')).
    pipe(gulp.dest('./public/dist/js/')).
    pipe( connect.reload() )
}

// משימה עבור החיבור לשרת
gulp.task('connect', () => connect.server({ livereload: true }))
// משימה המפעילה את הפונקציה bundleApp המאגדת את כל היכולות של האפליקציה
gulp.task('scripts', () => bundleApp())

// משימה עבור השימוש ב- sass
gulp.task('sass', () => {
    return gulp.src('./src/sass/style.scss')
        .pipe( sass({ expended: true }).on('error', sass.logError))
        .pipe( gulp.dest('./public/dist/css') )
        .pipe( connect.reload() )
})

// משימה עבור העלאת השרת בעת עבודה עם המודול nodemon
gulp.task('start-server', () => {
    nodemon({
        script: './bin/www',
        env: { 'NODE_ENV': 'development' },
        ignore: './public'
    })
})

// משימה עבור שימוש ב- watch עם sass ו- scripts
gulp.task('watch', () => {
    gulp.watch(['./src/sass/**/*.scss'], ['sass'])
    gulp.watch(['./src/js/*.js'], ['scripts'])
})

// משימת ברירת המחדל מכילה מערך של כל המשימות הקיימות בקובץ ה- gulp ('start-server', 'sass', 'scripts', 'watch', 'connect') ובכך המשימה של ברירת המחדל מכילה את כל המשימות על מנת שאפשר יהיה להשתמש בכולן
gulp.task('default', ['start-server', 'sass', 'scripts', 'watch', 'connect'])