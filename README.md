# DnD Mobile

## 설명

디앤디모바일 홈페이지 퍼블리싱 파일

## 시작하기

### 설치

1. Clone the repo
```
git clone https://github.com/dndmobilePub/dndmobile.git
```
2. Install NPM packages
```
npm install
```
```
npm install gulp
```
```
npm install -g gulp
```
```
npm install --save-dev gulp
```
```
npm link gulp
```
```
npm link gulp-file-include gulp-sourcemaps gulp-concat gulp-uglify gulp-rename gulp-sass sass gulp-postcss cssnano autoprefixer browser-sync
```

3. Local start
```
gulp
```

### 배포
1. src 폴더에서 수정 후 local 확인 필수 (현행화 필수)
2. ftp_upload 폴더에서 한번 더 수정 후 ftp upload 진행 (ftp_upload 파일에서 진행하는 이유 : 폴더 구조 변경으로 인한 경로 수정)
3. project.html 변경시 data-content 경로 수정 필수! (data 호출하는 레이어팝업) 
4. /(루트 폴더)에 html 파일 upload
5. dndmobile 폴더에 assets 파일 업로드
