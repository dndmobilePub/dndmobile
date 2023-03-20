const gulp = require("gulp");
// const ejs = require("gulp-ejs");
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps'); 
const sass = require('gulp-sass')(require('sass')); 
const Fiber = require('fibers');
const dartSass = require('dart-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

gulp.task('fileinclude', function() {
  return gulp.src([
      "./src/html/*", // ★★★★ 불러올 파일의 위치
      "!" + "./src/html/include*" // ★★★★ 읽지 않고 패스할 파일의 위치
  ])
  .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
      }))
  .pipe(gulp.dest('./dist/html')); // ★★★★ 변환한 파일의 저장 위치 지정
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./", // ★★★★ 서버에 띄울 폴더 위치 지정 
      directory: true
    },
    startPath: "dist/html/main.html", //첫페이지
     browser: 'chrome',
  });
  gulp.watch("src/*").on("change", browserSync.reload);
  	// ★★★★ src 안의 파일들을 감시하고 있다가, 내용이 변동되면 재실행 
});

// gulp.task(
//     "default",
//     gulp.parallel("browserSync") 
// );
// ★★★★ add end

const apfBrwsowsers = [
  'ie >= 8',
];

gulp.task('sass', function(){
  const options = {
    sass : {
      outputStyle: 'expanded',
      indentType: 'tab',
      indentWidth: 1, 
      compiler: dartSass
    },
    postcss: [ autoprefixer({ 
      browsers: ['last 2 versions', 'iOS >= 12', 'Android >= 8']
    }) ]
  };
  return gulp
    .src("src/assets/scss/*.scss") 
    .pipe(sourcemaps.init()) 
    .pipe(sass({fiber:Fiber}).on('error', sass.logError))
    .pipe(postcss(options.postcss))
    .pipe(sourcemaps.write('./maps')) 
    .pipe(gulp.dest("dist/assets/css")) 
    .pipe(browserSync.stream()); // ★★★★ add
    	// ★★★★ browserSync 가 실행되고 있을 때, scss 변화가 감지되면 바로 수정 반영
});

gs

// ★★★★ add start : 감시대상 scss가 변동되면 자동으로 업데이트!
gulp.task('watch', function () { 
  gulp.watch('./src/assets/scss/*.scss', gulp.series('sass')); // 감시해야할 scss 위치 지정
});
// ★★★★ aadd end

gulp.task(
    "default",
    gulp.parallel("fileinclude","sass", "watch", "browserSync") // ★★★★ add browserSync
);