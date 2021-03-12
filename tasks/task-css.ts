/**
 * Gulp task: SCSS -> CSS
 */
import sassCompiler from "sass";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import gulpRename from "gulp-rename";
import { src as gulpSrc, dest as gulpDest } from "gulp";

import { AsyncTask } from "async-done";

import mainConfig from "./configuration";

export default (): ReturnType<AsyncTask> => gulpSrc(mainConfig.css.srcEntry)
    .pipe(gulpRename("style.min.css"))
    .pipe(sourcemaps.init())
    .pipe(
        sass(
            { compiler: sassCompiler, outputStyle: "compressed" },
        ).on("error", sass.logError),
    )
    .pipe(sourcemaps.write(mainConfig.css.sourcemapsDir))
    .pipe(gulpDest(mainConfig.css.outputDir));
