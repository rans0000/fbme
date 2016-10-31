var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var scssConfig = {outputStyle: 'compressed'};

gulp.task('sass', function () {
    return gulp.src('dev/sass/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(scssConfig).on('error', sass.logError))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dev/css'));
});


gulp.task('watch', function () {
    //gulp.watch('images/sprites/**/*.png', ['sprite']);
    gulp.watch('dev/sass/**/*.scss', ['sass']);
});