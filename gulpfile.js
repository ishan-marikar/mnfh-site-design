var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks-html');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var swallowError = function(error) {
  console.log(error.toString());
  this.emit('end');
};

gulp.task('nunjucks', function() {
  return gulp.src(['./app/src/templates/pages/**/*.html'])
    .pipe(nunjucks({
      searchPaths: ['./app/src/templates/'],
      locals: {
        title: 'Meet New Friends Here',
        author: 'JaneSays & MonkehParade'
      }
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('browserify', function() {
  return browserify('./app/src/public/js/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist/public/js/'));
});

gulp.task('sass', function() {
  return gulp.src('./app/src/public/css/**/*.scss')
    .pipe(sass().on('error', swallowError))
    .pipe(gulp.dest('./app/dist/public/css/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copy:images', function() {
  return gulp.src('./app/src/public/img/**/*.*')
    .pipe(gulp.dest('./app/dist/public/img/'));
});

gulp.task('copy:fonts', function() {
  return gulp.src('./app/src/public/fonts/**/*.*')
    .pipe(gulp.dest('./app/dist/public/fonts/'));
});

gulp.task('build', function(next) {
  sequence(
    ['copy:images', 'copy:fonts'],
    ['sass', 'browserify', 'nunjucks'],
    next
  );
});

gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: "./app/dist"
  });

  gulp.watch("./app/src/templates/**/*.html", ['nunjucks']);
  gulp.watch("./app/src/public/css/**/*.scss", ['sass']);
  gulp.watch("./app/src/public/js/**/*.js", ['browserify']);
  gulp.watch("./app/src/**/*.*").on('change', reload);
});
