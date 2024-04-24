const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const minify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

const scss = gulpSass(sass);

const BUILD_JS_FOLDER = './dist/js';
const BUILD_CSS_FOLDER = './dist/styles';
const SRC_FOLDER = './src/js/*.js';
const SRC_FOLDER_SCSS = './src/styles/*.scss';

function watcher() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch(SRC_FOLDER, jsBuild).on('change', browserSync.reload);
    gulp.watch(SRC_FOLDER_SCSS, scssTask).on('change', browserSync.reload);
}

function jsBuild() {
    return gulp.src(SRC_FOLDER)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(minify())
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest(BUILD_JS_FOLDER))
    .pipe(browserSync.stream());;
}

function scssTask(){
    return gulp.src(SRC_FOLDER_SCSS)
    .pipe(scss())
    .pipe(gulp.dest(BUILD_CSS_FOLDER))
    .pipe(browserSync.stream());
}


gulp.task('default', gulp.series(jsBuild, scssTask, watcher));