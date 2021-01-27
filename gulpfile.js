const gulp = require('gulp'),
  fLog = require('fancy-log'),
  ansiColors = require('ansi-colors'),
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
  del = require('del'),
  imagemin = require("gulp-imagemin"),

  pkg = require('./package.json'),

  // Nunjucks rendering libraries
  nunjucks = require('nunjucks'),
  nunjucksRender = require('gulp-nunjucks-render');

/*
 * Various configuration options
 *
 * Options like source and destination paths, nunjucks filters and globals, ... can be found in this section.
 */

/**
* This banner is generated from the information in package.json and prepended to CSS and JS output.
* @type {string}
*/
const banner = [
  '/*!',
  ` * ${pkg.name}`,
  ` * ${pkg.title}`,
  " *",
  ` * Url: ${pkg.url}`,
  ` * Author: ${pkg.author}`,
  ` * Copyright ${new Date().getFullYear()}. License: ${pkg.license}`,
  ' */',
  '',
].join('\n');

const srcBase = "src/",
  destBase = "build/",
  paths = {
    // HTML is in the root directory of "build/" by default
    html: {
      src: srcBase + "pages/**/*.njk",
      templatesSrc: srcBase + "templates/",
      dest: destBase,
    },
    // CSS is in build/assets/css/style[.min].css
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
    // other ("data") files are copied recursively to build/assets/
    other: {
      src: srcBase + "other/**/*",
      dest: destBase + "assets/"
    }
};

const nunjucksConfiguration = {
  // Read more: https://mozilla.github.io/nunjucks/api.html#custom-filters
  filters: {
    // Example: shorten(string, length) will shorten the string to num characters.
    //  Sample usage: "{{ "Lorem ipsum dolor sir amet."|shorten(5) }}"
    shorten: function (string, length) {
      return string.slice(0, length);
    }
  },
  // Global nunjucks variables
  globals: {
    // Example
    //  Will be available as a nunjucks variable: "{{ foo }}"
    foo: "This an example using custom nunjucks globals."
  }
};

const manageNunjucksEnvironmentFn = function(env) {
  // Add filters
  for (let [key, value] of Object.entries(nunjucksConfiguration.filters)) {
    env.addFilter(key, value);
  }
  // Add globals
  for (let [key, value] of Object.entries(nunjucksConfiguration.globals)) {
    env.addGlobal(key, value);
  }
};

/*
 * Gulp Tasks
 *
 * SCSS, JS and HTML preprocessing as well as copying other assets and minifying images.
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
    // All scripts will be concatenated into a single javascript file, enough for basic use.
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.init())
    // Check against .jshintrc rules
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    // Create a normal (and later minified) version: scripts.js and scripts.js.min
    .pipe(header(banner))
    .pipe(gulp.dest(paths.js.dest))
    // minify js and log errors
    .pipe(uglify())
    .on("error", function (err) {
      fLog(ansiColors.red("[Error]"), err.toString());
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

function html() {
  return gulp.src(paths.html.src)
    .pipe(nunjucksRender({
      ext: ".html",
      inheritExtension: false,
      loaders: new nunjucks.FileSystemLoader(
        paths.html.templatesSrc,
        { noCache: true }
        ),
      manageEnv: manageNunjucksEnvironmentFn
    }))
    .pipe(gulp.dest(paths.html.dest));
}

function copyOther() {
  return gulp.src(paths.other.src, {since: gulp.lastRun(copyOther)})
    .pipe(gulp.dest(paths.other.dest));
}

function images() {
  return gulp.src(paths.img.src, {since: gulp.lastRun(images)})
    .pipe(imagemin(
      { verbose: true }
      ))
    .pipe(gulp.dest(paths.img.dest));
}

function cleanDist() {
  return del(destBase + "**/*");
}

/*
 * BrowserSync setup
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
 * Gulp Watches
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
exports.reload = reload;

exports.default = gulp.series(
  exports.clean,
  exports.build,
  gulp.parallel(
    exports.watch,
    initBrowserSync
  )
);
