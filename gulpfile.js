"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var historyApiFallback = require('connect-history-api-fallback'); //Load index.html regardless of what's in the URL

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css'
    	],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		middleware: function(connect, opt) {
			return [ historyApiFallback() ];
		},
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
	return new Promise((resolve, reject) => resolve());
});

gulp.task('open', gulp.series('connect', function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
	return new Promise((resolve, reject) => resolve());
}));

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
	return new Promise((resolve, reject) => resolve());	
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform("babelify", {presets: ["react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
	return new Promise((resolve, reject) => resolve());	
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
	return new Promise((resolve, reject) => resolve());
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
    return new Promise((resolve, reject) => resolve());
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: '.eslintrc'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, gulp.series('html'));
	gulp.watch(config.paths.js, gulp.series('js', 'lint'));
	return new Promise((resolve, reject) => resolve());
});

gulp.task('default', gulp.series('html', 'js', 'css', 'images', 'lint', 'open', 'watch', function() {
	return new Promise((resolve, reject) => resolve());
}));