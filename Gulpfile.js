(function() {
  'use strict';

  /* Required packages */
  var gulp         = require('gulp');
  var glob         = require('glob');
  var tap          = require('gulp-tap');
  var browserSync  = require('browser-sync');
  var reload       = browserSync.reload;
  var sass         = require('gulp-sass');
  var sourcemaps   = require('gulp-sourcemaps');
  var reveal       = require('gulp-reveal');
  var markdown     = require('gulp-markdown');
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  var sorter       = require('postcss-property-sorter');

  /* Environment variables */
  var _assets_dir = 'assets/';
  var _css_dir    = _assets_dir + 'css/';
  var _md_dir     = _assets_dir + 'md/';

  gulp.task('sass', function() {
    var processors = [
      sorter({
        plan: 'csscomb'
      }),
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      })
    ];
    gulp.src(_css_dir + 'reveal.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(sourcemaps.write())
      .pipe(postcss(processors))
      .pipe(gulp.dest(_css_dir))
      .pipe(reload({stream: true}));
  });

  gulp.task('md', function() {
    gulp.src(_md_dir + 'index.md')
      .pipe(markdown())
      .pipe(reveal({
        title: 'Keeping RWD Simple & Sassy',
        author: 'James Steinbach',
        index: false,
        description: 'RWD Summit 2016',
        analytics: 'UA-43397146-5'
      }))
      .pipe(gulp.dest('.'))
      .pipe(reload({stream: true}));
  });

  gulp.task('serve', function() {
    browserSync({
      server: '.',
      port: '4040'
    });
  });

//  gulp.task('build', ['md', 'sass',]);
  gulp.task('build', [ 'sass',]);

//  gulp.task('watch', ['md', 'sass', 'serve'], function() {
  gulp.task('watch', [ 'sass', 'serve'], function() {
    gulp.watch(_css_dir + '**/*.scss', ['sass']);
    gulp.watch(_md_dir + '**/*.md', ['md']);
  //  gulp.watch('**/*.mustache', ['md']);
    gulp.watch('index.html').on('change', reload);
  });

  gulp.task('default', ['watch']);
}());