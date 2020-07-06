const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const LessAutoPrefix = require('less-plugin-autoprefix');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const pipeline = require('readable-stream').pipeline;
const autoprefix = new LessAutoPrefix({ browsers: ['last 2 versions'] });

gulp.task('javascript', function (){
    return gulp.src('./*.js')
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(clean({force: true}))
      .uglify()
      .pipe(gulp.dest('./js'))
    });

gulp.task('less', function () {
  return gulp.src('./css/*.less')
    .pipe(less({
      plugins: [autoprefix],
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.less', gulp.series('less'));
  gulp.watch('js/*.js', gulp.series('javascript'));
});

gulp.task('default',gulp.series('less', 'javascript'));