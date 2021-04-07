/**
 * Main Gulp 4 task file
 */

import gulp from "gulp";

import taskScripts from "./task-scripts";
import taskCss from "./task-css";
import taskHtml from "./task-html";
import taskCopyOtherAssets from "./task-other-assets";
import taskImages from "./task-images";
import taskClean from "./task-clean";
import {
    watchCss, watchHtml, watchImages, watchOtherAssets,
    watchAndWarnConfigChanges,
} from "./task-watch";
import { browserSyncInit } from "./task-browsersync";

export const scripts = taskScripts;
export const css = taskCss;
export const html = taskHtml;
export const otherAssets = taskCopyOtherAssets;
export const images = taskImages;

export const clean = taskClean;
export const build = gulp.series(
    clean,
    gulp.parallel(scripts, css, html, otherAssets, images),
);
export const watch = gulp.parallel(
    watchCss, watchHtml, watchImages,
    watchOtherAssets, watchAndWarnConfigChanges,
);

// noinspection JSUnusedGlobalSymbols
export default gulp.series(
    build,
    gulp.parallel(
        watch,
        browserSyncInit,
    ),
);
