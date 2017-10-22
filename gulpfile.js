
'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');

var output = './dev/';

gulp.task('html', function () {
    return gulp.src('./dev/templates/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', () => {
    return setTimeout(() => {
    return gulp.src('./dev/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/assets/css'))
    .pipe(browserSync.reload({stream:true}));
  }, 500)
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: output
		},
		browser: ["chrome"]
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});
 
gulp.task('default', ['html','sass', 'browser-sync'], function () {
  gulp.watch('./dev/assets/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/templates/**/*.html', ['html']);
});

    
