'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: './'
    });

    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('imagemin', () => {
    gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('bundle', () =>
    gulp.src(['js/idb.js', 'js/dbhelper.js', 'js/main.js', 'js/restaurant_info.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
);