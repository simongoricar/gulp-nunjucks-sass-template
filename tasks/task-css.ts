/**
 * Gulp task: SCSS -> CSS
 */
import gulpDartSass from "gulp-dart-sass";
import Fiber from "fibers";
import sourcemaps from "gulp-sourcemaps";
import gulpRename from "gulp-rename";
import { src as gulpSrc, dest as gulpDest } from "gulp";
import { AsyncTask } from "async-done";

import { mainConfig } from "./configuration";

export default function css(): ReturnType<AsyncTask> {
    return gulpSrc(mainConfig.css.srcEntry)
        .pipe(gulpRename(mainConfig.css.outputFilename))
        .pipe(sourcemaps.init())
        .pipe(
            gulpDartSass(
                {
                    includePaths: [
                        mainConfig.css.srcDir,
                    ],
                    // @ts-ignore
                    fiber: Fiber,
                    ...(mainConfig.isProductionEnv ? {
                        outputStyle: "compressed",
                        sourceComments: false,
                    } : {
                        outputStyle: "expanded",
                        sourceComments: true,
                    }),
                },
            ).on("error", gulpDartSass.logError),
        )
        .pipe(sourcemaps.write(mainConfig.css.sourcemapsDir))
        .pipe(gulpDest(mainConfig.css.outputDir));
}
