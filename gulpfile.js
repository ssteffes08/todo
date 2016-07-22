var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var jshint = require('gulp-jshint');
var jsSource = "./assets/js/";

gulp.task('js', function(){
	return gulp.src([jsSource + 'app.js',
					jsSource + 'edit_controller.js',
					jsSource + 'view_controller.js'])
			  .pipe(concat('main.js'))
			  .pipe(wrap('(function(a, window){<%= contents %>}(angular, window));'))
			  .pipe(jshint({
			  	predef: ['window', 'angular']
			  }))
			  .pipe(jshint.reporter('default'))
			  .pipe(gulp.dest('./public/javascript'))
			  .pipe(rename({
			  	suffix: '.min'
			  }))
			  .pipe(uglify())
			  .pipe(gulp.dest('./public/javascript'));
});

gulp.task('default', function(){
	gulp.start('js');
});

gulp.task('watch', function(){
	gulp.watch('./assets/js/*.js', ['js']);
});