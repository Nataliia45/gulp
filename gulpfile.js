const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const minify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const scss = gulpSass(sass);

const BUILD_JS_FOLDER = './dist/js';
const BUILD_CSS_FOLDER = './dist/styles';
const SRC_FOLDER = './src/js/*.js';
const SRC_FOLDER_SCSS = './src/styles/*.scss';

function watcher() {
    return gulp.watch(SRC_FOLDER, jsBuild);
}

function jsBuild() {
    return gulp.src(SRC_FOLDER)
    .pipe(minify())
    .pipe(concat('build.js'))
    .pipe(gulp.dest(BUILD_JS_FOLDER));
}

function scssTask(){
    return gulp.src(SRC_FOLDER_SCSS)
    .pipe(scss())
    .pipe(gulp.dest(BUILD_CSS_FOLDER));
}

gulp.task('default', gulp.series(jsBuild, scssTask, watcher));