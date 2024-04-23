const gulp = require('gulp');

const BUILD_JS_FOLDER = './dist/js';
const SRC_FOLDER = './src/js/*.js';

gulp.task('default', () => {
 return gulp.src(SRC_FOLDER)
 .pipe(gulp.dest(BUILD_JS_FOLDER));
});