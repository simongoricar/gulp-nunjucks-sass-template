/**
 * Gulp task: SCSS -> CSS
 */
import sassCompiler from "sass";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import { src as gulpSrc, dest as gulpDest } from "gulp";

import mainConfig from "./configuration";

export default (): Node.ReadWriteStream => gulpSrc(mainConfig.css.srcEntry)
    .pipe(sourcemaps.init())
    .pipe(sass({ compiler: sassCompiler, outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(sourcemaps.write(mainConfig.css.sourcemapsDir))
    .pipe(gulpDest(mainConfig.css.outputDir));
