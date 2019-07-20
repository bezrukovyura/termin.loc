let gulp = require('gulp');
let tsc = require('gulp-typescript');
let concat = require('gulp-concat');
let del = require('del');
 
gulp.task('typescript', function () {
  return gulp.src('./Scripts/**/*.ts')
    .pipe(tsc({
      noImplicitAny: true,
      removeComments: true,
      preserveConstEnums: true,
      sourceMap: true,
      target: "ES5"
    }))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('copyJs', function () {
  return gulp.src('./Scripts/app-concat-all.js')
    .pipe(gulp.dest('./deploy/Scripts'));
});

gulp.task('copyCss', function () {
  return gulp.src('./Scripts/**/*.css')
    .pipe(gulp.dest('./deploy/Scripts'));
});

gulp.task('copyImg', function () {
  return gulp.src('./img/**/*.*')
    .pipe(gulp.dest('./deploy/img'));
});

gulp.task('copyHtml', function () {
  return gulp.src('./Scripts/**/*.html')
    .pipe(gulp.dest('./deploy/Scripts'));
});

gulp.task('copyPhp', function () {
  return gulp.src('./php/**/*.php')
    .pipe(gulp.dest('./deploy/php'));
});

gulp.task('copyIndex', function () {
  return gulp.src('./index.php')
    .pipe(gulp.dest('./deploy'));
});

gulp.task('vendorsJs', function () {
  return gulp.src([
    "./node_modules/angular/angular.min.js",
    "./node_modules/angular-animate/angular-animate.min.js",
    "./node_modules/angular-aria/angular-aria.min.js",
    "./node_modules/angular-messages/angular-messages.min.js",
    "./node_modules/angular-material/angular-material.min.js",
    "./node_modules/moment/min/moment.min.js",
    "./node_modules/lodash/lodash.min.js",
    "./node_modules/html2canvas/dist/html2canvas.min.js",
    "./node_modules/pdfmake/build/pdfmake.min.js",
    "./node_modules/pdfmake/build/vfs_fonts.js",
    "./node_modules/js-md5/build/md5.min.js"
  ])
    .pipe(concat('vendors.toDeploy.js'))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('appJs', function () {
  return gulp.src([
    "./Scripts/Components/Termin/Termin.js",
    "./Scripts/Services/AccountService.js",
    "./Scripts/Services/StorageService.js",
    "./Scripts/Services/ConverterService.js",
    "./Scripts/Services/TabService.js",
    "./Scripts/Services/TranslateService/TranslateService.js",
    "./Scripts/Components/FormInput/FormInput.js",
    "./Scripts/Components/LoginAccess/loginAccess.js",
    "./Scripts/Components/Calendar/Calendar.js",
    "./Scripts/Components/UsersEditor/UsersEditor.js",
    "./Scripts/app.js",
  ])
    .pipe(concat('app-concat.toDeploy.js'))
    .pipe(gulp.dest('./Scripts'));
});


gulp.task('appJsAll', function () {
  return gulp.src([
    "./Scripts/vendors.toDeploy.js",
    "./Scripts/app-concat.toDeploy.js",
    "./Scripts/jquery.js",
    "./Scripts/jquery-app.js"
  ])
    .pipe(concat('app-concat-all.toDeploy.js'))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('vendorsCss', function () {
  return gulp.src([
    "./node_modules/angular-material/angular-material.min.css"
  ])
    .pipe(concat('vendors.toDeploy.css'))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('clean', function () {
  return del('./deploy/**/*.*', { force: true });
});

gulp.task('deploy',  gulp.series('copyHtml', 'copyJs', 'copyPhp', 'copyIndex', 'copyImg', 'copyCss'));

gulp.task('vendors', gulp.series('clean', 'vendorsJs', 'vendorsCss'));

gulp.task('default', gulp.series('typescript', 'vendors', 'appJs', 'appJsAll', 'deploy'));