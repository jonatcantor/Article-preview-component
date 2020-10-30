const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('build', gulp.parallel(styles, js, fonts));
gulp.task('default', gulp.series('build', watch));

function watch(){
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('./src/scss/*.scss', styles);
  gulp.watch('./src/pug/*.pug', markup);
  gulp.watch([
    './src/*.html',
    './src/js/*.js'
  ]).on('change', browserSync.reload);
}

function fonts(){
  return gulp.src([
    './node_modules/font-awesome/fonts/*.ttf',
    './node_modules/font-awesome/fonts/*.woff',
    './node_modules/font-awesome/fonts/*.woff2'
  ])
  .pipe(gulp.dest('./src/fonts'));
}

function js(){
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('./src/js'))
  .pipe(browserSync.stream());
}

function styles(){
  return gulp.src([
    './src/scss/*.scss'
  ])
  .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
  .pipe(gulp.dest('./src/css'))
  .pipe(browserSync.stream());
}

function markup(){
  return gulp.src([
    './src/pug/*.pug'
  ])
  .pipe(pug())
  .pipe(gulp.dest('./src'))
  .pipe(browserSync.stream());
}