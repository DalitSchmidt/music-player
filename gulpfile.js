const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const babelify = require('babelify')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
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

gulp.task('connect', () => connect.server({ livereload: true, root: './public' }))
gulp.task('scripts', () => bundleApp())

gulp.task('sass', () => {
    return gulp.src('./src/sass/style.scss')
    .pipe( sass({ expended: true }).on('error', sass.logError))
    .pipe( gulp.dest('./public/dist/css') )
    .pipe( connect.reload() )
})

gulp.task('watch', () => {
    gulp.watch(['./src/sass/**/*.scss'], ['sass'])
    gulp.watch(['./src/js/*.js'], ['scripts'])
})

// משימת ברירת המחדל מכילה מערך של כל המשימות הקיימות בקובץ ה- gulp ('start-server', 'sass', 'scripts', 'watch', 'connect') ובכך המשימה של ברירת המחדל מכילה את כל המשימות על מנת שאפשר יהיה להשתמש בכולן
gulp.task('default', ['sass', 'scripts', 'watch', 'connect'])