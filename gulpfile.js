const gulp = require('gulp'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      jshint = require('gulp-jshint'),
      header  = require('gulp-header'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      cssnano = require('gulp-cssnano'),
      sourcemaps = require('gulp-sourcemaps'),
      nunjucksRender = require('gulp-nunjucks-render'),
      del = require('del'),
      imagemin = require("gulp-imagemin"),
      pkg = require('./package.json');

const banner = [
  '/*!',
  ` * ${pkg.name}`,
  ` * ${pkg.title}`,
  " *",
  ` * Url: ${pkg.url}`,
  ` * Author: ${pkg.author}`,
  ` * Copyright 2019-${new Date().getFullYear()}. ${pkg.license} licensed.`,
  ' */',
  '',
].join('\n');

/*
 * CONFIGURATION
 * If you want to build files to a different directory simply modify the configuration below!
 */
const srcBase = "src/",
      destBase = "build/";
const paths = {
  // html is in build/*
  html: {
    src: srcBase + "pages/*.njk",
    templatesSrc: srcBase + "templates/",
    dest: destBase,
  },
  // css is in build/assets/css/style[.min].css
  stylesheets: {
    src: srcBase + "scss/main.scss",
    dest: destBase + "assets/css/",
  },
  // js is in build/assets/js/*
  js: {
    srcMain: srcBase + "js/*.js",
    srcExternal: srcBase + "js/external/**/*.js",
    dest: destBase + "assets/js/",
  },
  // images are in build/assets/img/*
  img: {
    src: srcBase + "img/*.{png,gif,jpg,bmp,tiff,jpeg,webp}",
    dest: destBase + "assets/img/"
  },
  // other files are copied recursively to build/assets/
  other: {
    src: srcBase + "other/**/*",
    dest: destBase + "assets/"
  }
};

/*
 * SCSS, JS and HTML preprocessing
 */
function css() {
  return gulp.src(paths.stylesheets.src, {since: gulp.lastRun(css)})
    .pipe(rename("style.css"))
    .pipe(sourcemaps.init())
    // Compile scss and prefix
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({browsers: "last 4 version"}))
    // Create two files: style.css and style.css.min
    .pipe(gulp.dest(paths.stylesheets.dest))
    // Compress css, etc.
    .pipe(cssnano())
    .pipe(rename({suffix: ".min"}))
    .pipe(header(banner))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(browserSync.reload({stream: true}));
}

function jsMain() {
  return gulp.src(paths.js.srcMain, {since: gulp.lastRun(jsMain)})
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.init())
    // Check against .jshintrc rules
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    // Create two files: scripts.js and scripts.js.min
    .pipe(header(banner))
    .pipe(gulp.dest(paths.js.dest))
    // minify js and log errors
    .pipe(uglify())
    .on("error", function(err) { gutil.log(gutil.colors.red("[Error]]"), err.toString()); })
    .pipe(header(banner))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.reload({ stream: true, once: true }));
}

function jsExternal() {
  // Just copy the external js files
  return gulp.src(paths.js.srcExternal, {since: gulp.lastRun(jsExternal)})
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.reload({ stream: true, once: true }));
}

function html() {
  return gulp.src(paths.html.src, {since: gulp.lastRun(html)})
    .pipe(nunjucksRender({
      ext: ".html",
      inheritExtension: false,
      path: paths.html.templatesSrc
    }))
    .pipe(gulp.dest(paths.html.dest));
}

/*
 * OTHER TASKS
 */
function copyOther() {
  return gulp.src(paths.other.src, {since: gulp.lastRun(copyOther)})
    .pipe(gulp.dest(paths.other.dest));
}

function images() {
  return gulp.src(paths.img.src)
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest(paths.img.dest));
}

function cleanDist() {
  return del(destBase + "**/*");
}

/*
 * BROWSER SYNC
 */
function initBrowserSync() {
  browserSync.init(null, {
    server: {
      baseDir: destBase
    }
  });
}

function browserSyncReload() {
  browserSync.reload();
}

/*
 * WATCHERS
 */
function watchCss() {
  return gulp.watch(`${srcBase}scss/**/*.scss`, css);
}
function watchJsMain() {
  return gulp.watch(`${srcBase}js/*.js`, jsMain);
}
function watchJsExternal() {
  return gulp.watch(`${srcBase}js/external/*.js`, jsExternal);
}
function watchHtml() {
  return gulp.watch([`${srcBase}pages/**/*.njk`, `${srcBase}templates/**/*.njk`], html);
}
function watchOther() {
  return gulp.watch(`${srcBase}other/**/*`, copyOther);
}

/*
 * EXPORTED TASKS
 */
exports.css = css;
exports.js = gulp.parallel(jsMain, jsExternal);
exports.html = html;
exports.images = images;
exports.other = copyOther;

exports.build = gulp.parallel(css, jsMain, jsExternal, html, images, copyOther);

exports.watch = gulp.parallel(watchCss, watchJsMain, watchJsExternal, watchHtml, watchOther);
exports.clean = cleanDist;
exports.reload = browserSyncReload;

exports.default = gulp.series(
  exports.clean,
  exports.build,
  gulp.parallel(
    exports.watch,
    initBrowserSync
  )
);
