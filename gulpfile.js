var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');

var paths = {
  scripts: ['public/scripts/*.js'],
  sass: ['public/styles/sass/*.scss'],
  html: ['public/*.html', 'public/views/*.html']
};

gulp.task('server', function() {
  nodemon({ script: 'app.js' });
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/min'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('public/styles'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['scripts', 'lint']);
});

gulp.task('default', ['server', 'sass', 'scripts', 'lint', 'watch']);
