// gulp 및 패키지 모듈 호출
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps'); 
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const browserSync = require('browser-sync').create(); // browser-sync 호출

/**
 * ==============================+
 * @Path 정의
 * ==============================+
 */
const src   = './src';
const dist  = './dist';
const paths = {
    html: src + '/html/**/*.html',
    image: src + '/assets/images/*',
    font: src + '/assets/font/*',
    js : src + '/assets/js/**/*.js',
    scss : src + '/assets/scss/**/*.scss'
};

/**
 * =====================================+
 * @task : HTML livereload 반영
 * =====================================+
 */

gulp.task('fileinclude', function() {
  return gulp.src([
      "./src/html/**/*.html", // ★★★★ 불러올 파일의 위치
      "!" + "./src/html/include*" // ★★★★ 읽지 않고 패스할 파일의 위치
  ])
  .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
      }))
  .pipe(gulp.dest('./dist/html')) // ★★★★ 변환한 파일의 저장 위치 지정
  .pipe(browserSync.reload({
    stream : true
}));
});

/**
 * =====================================+
 * @task : imgage 병합,압축,min 파일 생성
 * =====================================+
 */
gulp.task('images',function() {
  return gulp.src(paths.image)
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.reload({
      stream : true
  }));
})


/**
 * =====================================+
 * @task : Script 병합,압축,min 파일 생성
 * =====================================+
 */
gulp.task('js', function () {
    return gulp
        .src(paths.js)
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(uglify())
        .pipe(rename({suffix : ".min"}))
        /**
         * 스크립트 파일을 browserSync 로 브라우저에 반영
         */
        .pipe(browserSync.reload(
            {stream : true}
        ));
});

/**
 * ==============================+
 * @SCSS : SCSS Config(환경설정)
 * ==============================+
 */
const scssOptions = {
  outputStyle : "expanded",
  sourceComments: false,

};

/**
 * ==================================+
 * @task : SCSS Compile & sourcemaps
 * ==================================+
 */

gulp.task('scss', function () {
  return gulp
      .src(paths.scss)
      // .pipe(sourcemaps.init())
      .pipe(scss(scssOptions).on('error', scss.logError))
      .pipe(postcss([autoprefixer()]))
      // .pipe(concat("style.css"))
      // .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/assets/css'))
      /**
       * SCSS 컴파일을 수행한 후 browserSync 로 브라우저에 반영
       */
      .pipe(browserSync.reload({
          stream : true
      }));
});

/**
 * ==============================+
 * @task : browserSync
 * ==============================+
 */
gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: "./", // ★★★★ 서버에 띄울 폴더 위치 지정 
      directory: true
    },
    startPath: "dist/html/contact.html", //첫페이지
    browser: 'chrome',
  });
  gulp.watch('./sass/**/*.scss', scss)
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/.js").on("change", browserSync.reload);
  done(); 
});

/**
 * ==================================+
 * @task : watch 파일 변경을 감지
 * ==================================+
 */
gulp.task('watch', function () {
    gulp.watch(paths.html, gulp.series('fileinclude')); 
    gulp.watch(paths.js, gulp.series('js'));
    gulp.watch(paths.scss, gulp.series('scss'));
});

/**
 * ==============================+
 * @task : gulp default
 * ==============================+
 */
gulp.task('default', gulp.parallel('fileinclude','scss','js','images','watch','browserSync'));

