'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');

gulp.task('serve', ['style'], () => {
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch('*.html').on('change', browserSync.reload);

    browserSync.init({
        server: './'
    });
});

gulp.task('imagemin', () => {
    gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('bundle', () =>
    gulp.src(['js/idb.js', 'js/dbhelper.js', 'js/main.js', 'js/restaurant_info.js','js/dlib.js','js/main-ui.js', 'js/restaurant-ui.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
);

gulp.task('style', () => {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});