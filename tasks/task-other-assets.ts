/**
 * Gulp task: Other assets
 */
import { src as gulpSrc, dest as gulpDest, lastRun as gulpLastRun } from "gulp";
import { AsyncTask } from "async-done";

import { mainConfig } from "./configuration";

export default function copyOtherAssets(): ReturnType<AsyncTask> {
    return gulpSrc([
        `${mainConfig.otherAssets.srcDir}/**/*`,
        `!${mainConfig.otherAssets.srcDir}/OTHER_ASSETS_HERE.md`,
    ], { since: gulpLastRun(copyOtherAssets) })
        .pipe(gulpDest(mainConfig.otherAssets.outputDir));
}
