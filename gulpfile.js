const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function watch(){
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch([
    './node_modules/bootstrap/scss/bootstrap.scss',
    './src/sass/*.sass'
  ], styles);

  gulp.watch([
    './src/pug/*.pug'
  ], markup);

  gulp.watch([
    './src/*.js',
    './src/*.html'
  ]).on('change', browserSync.reload);
}

exports.watch = watch;

function styles(){
  return gulp.src([
    './node_modules/bootstrap/scss/bootstrap.scss',
    './src/sass/*.sass'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./src/css'))
  .pipe(browserSync.stream());
}

exports.styles = styles;

function markup(){
  return gulp.src([
    './src/pug/*.pug'
  ])
  .pipe(pug())
  .pipe(gulp.dest('./src'));
}

exports.markup = markup;