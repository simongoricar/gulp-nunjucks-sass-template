/**
 * Gulp task: Other assets
 */
import { src as gulpSrc, dest as gulpDest, lastRun as gulpLastRun } from "gulp";

import { AsyncTask } from "async-done";

import { mainConfig } from "./configuration";

export default function copyImages(): ReturnType<AsyncTask> {
    return gulpSrc(
        `${mainConfig.images.srcDir}/**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}`,
        { since: gulpLastRun(copyImages) },
    )
        .pipe(gulpDest(mainConfig.images.outputDir));
}
