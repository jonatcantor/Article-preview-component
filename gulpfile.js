const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('build', gulp.parallel(markup, styles, js, fonts));
gulp.task('default', gulp.series('build', watch));

function watch(){
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./src/scss/*.scss', styles);
  gulp.watch('./src/pug/*.pug', markup);
  gulp.watch([
    './src/js/*.js'
  ]).on('change', browserSync.reload);
}

function fonts(){
  return gulp.src([
    './node_modules/font-awesome/fonts/*.ttf',
    './node_modules/font-awesome/fonts/*.woff',
    './node_modules/font-awesome/fonts/*.woff2'
  ])
  .pipe(gulp.dest('./build/fonts'));
}

function js(){
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './src/js/*.js'
  ])
  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.stream());
}

function styles(){
  return gulp.src([
    './src/scss/*.scss'
  ])
  .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
}

function markup(){
  return gulp.src([
    './src/pug/*.pug'
  ])
  .pipe(pug())
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.stream());
}