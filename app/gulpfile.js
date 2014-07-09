var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');

var paths = {
	css: './css/*.scss',
	minified: './css/*.min.css',
	images: './img/',
	scripts: './js/*.js',
	html: ['*.html', './partials/*.html'],
	php: './*.php'
};

gulp.task('process-css', function(){
	return gulp.src(paths.css)
		.pipe(sass({style: 'expanded'}))
		.pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
		.pipe(gulp.dest('./css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minify())
		.pipe(gulp.dest('./css/'));
});

gulp.task('html-reload', function(){
	return gulp.src('./')
		.pipe(livereload());
});

gulp.task('watch', function() {
	gulp.watch(paths.css, ['process-css']);
	gulp.watch(paths.minified, ['html-reload']);
	gulp.watch(paths.scripts, ['html-reload']);
	gulp.watch(paths.html, ['html-reload']);
	gulp.watch(paths.php, ['html-reload']);
});

gulp.task('default', ['watch']);