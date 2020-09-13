const gulp = require('gulp'),
  fLog = require('fancy-log'),
  ansicolors = require('ansi-colors'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),

  // gulp-uglify with uglify-es for ES6+ support
  uglifyEs = require('uglify-es'),
  composer = require('gulp-uglify/composer'),
  uglify = composer(uglifyEs, console),

  jshint = require('gulp-jshint'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  nunjucksRender = require('gulp-nunjucks-render'),
  data = require('gulp-data'),
  fs = require('fs'),
  path = require('path'),
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
    src: srcBase + "pages/**/*.njk",
    templatesSrc: srcBase + "templates/",
    dest: destBase,
  },
  // css is in build/assets/css/style[.min].css
  stylesheets: {
    src: srcBase + "scss/main.scss",
    dest: destBase + "assets/css/",
  },
  // js is in build/assets/js/*
  // external js is in build/assets/js/external/**/*.js
  js: {
    srcMain: srcBase + "js/*.js",
    srcExternal: srcBase + "js/external/**/*.js",
    dest: destBase + "assets/js/",
  },
  // images are in build/assets/img/*
  img: {
    src: srcBase + "img/**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}",
    dest: destBase + "assets/img/"
  },
  // other files are copied recursively to build/assets/
  other: {
    src: srcBase + "other/**/*",
    dest: destBase + "assets/"
  }
};

const customNunjucksEnv = {
  // functions that process the passed arguments
  filters: {},
  // globals can be either variables or functions
  globals: {}
};

/*
 * SCSS, JS and HTML preprocessing
 */
function css() {
  return gulp.src(paths.stylesheets.src)
    .pipe(rename("style.css"))
    .pipe(sourcemaps.init())
    // Compile scss and prefix
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    // Create two files: style.css and style.css.min
    .pipe(gulp.dest(paths.stylesheets.dest))
    // Compress css, etc.
    .pipe(cssnano())
    .pipe(rename({suffix: ".min"}))
    .pipe(header(banner))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.stylesheets.dest));
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
    .on("error", function (err) {
      fLog(ansicolors.red("[Error]]"), err.toString());
    })
    .pipe(header(banner))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write())
    // Write the minified file
    .pipe(gulp.dest(paths.js.dest));
}

function jsExternal() {
  // Just copy the external js files
  return gulp.src(paths.js.srcExternal, {since: gulp.lastRun(jsExternal)})
    .pipe(gulp.dest(paths.js.dest));
}

function getDataForFile(file) {
  return JSON.parse(fs.readFileSync(srcBase + '/data/' + path.basename(file.path) + '.json'));
}

function html() {
  // TODO test
  const manageEnvFn = function(env) {
    // Add filters
    for (let [key, value] of Object.entries(customNunjucksEnv.filters)) {
      env.addFilter(key, value);
    }
    // Add globals
    for (let [key, value] of Object.entries(customNunjucksEnv.globals)) {
      env.addGlobal(key, value);
    }
  };

  return gulp.src(paths.html.src, {since: gulp.lastRun(html)})
    .pipe(data(getDataForFile))
    .pipe(nunjucksRender({
      ext: ".html",
      inheritExtension: false,
      path: paths.html.templatesSrc,
      manageEnv: manageEnvFn,
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
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.img.dest));
}

function cleanDist() {
  return del(destBase + "**/*");
}

/*
 * BROWSER SYNC
 */
function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: destBase
    },
    reloadDelay: 350,
    files: [`${destBase}/**/*.*`]
  });
}

function reload(done) {
  browserSync.reload({ stream: false });
  done();
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
  return gulp.watch([`${srcBase}pages/**/*.njk`, `${srcBase}templates/**/*.njk`, `${srcBase}data/**/*.json`], html);
}

function watchData() {
  return gulp.watch([`${srcBase}data/**/*.json`], html);
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

exports.watch = gulp.parallel(watchCss, watchJsMain, watchData, watchJsExternal, watchHtml, watchOther);
exports.clean = cleanDist;
exports.reload = reload;

exports.default = gulp.series(
  exports.clean,
  exports.build,
  gulp.parallel(
    exports.watch,
    initBrowserSync
  )
);
