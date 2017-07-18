const gulp = require('gulp')

const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')

const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const merge = require('utils-merge')

const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

// Nicer errors
const gutil = require('gulp-util')
const chalk = require('chalk')

function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }

    this.end()
}

gulp.task('watchify', function () {
    let args = merge(watchify.args, { debug: true })
    let bundler = watchify(browserify('./src/js/App.js', args))
    .transform(babelify.configure({
        presets: ["es2015"],
        sourceType: "module"
    }))
    bundle_js(bundler)

    bundler.on('update', function () {
        bundle_js(bundler)
    })
})

function bundle_js(bundler) {
    return bundler.bundle()
    // .on('error', map_error)
    .pipe(source('App.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/dist/js'))
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Capture source maps from transforms
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist/js'))
}

// Without watchify
gulp.task('browserify', function () {
    let bundler = browserify('./src/js/App.js', { debug: true })
    .transform(babelify.configure({
        presets: ["es2015"],
        sourceType: "module"
    }))

    return bundle_js(bundler)
})
