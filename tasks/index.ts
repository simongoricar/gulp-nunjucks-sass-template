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
    watchCss, watchHtml, watchImages, watchOtherAssets, watchScripts,
} from "./task-watch";

export const scripts = taskScripts;
export const css = taskCss;
export const html = taskHtml;
export const otherAssets = taskCopyOtherAssets;
export const images = taskImages;
export const clean = taskClean;

// noinspection JSUnusedGlobalSymbols
export default gulp.series(
    clean,
    gulp.parallel(scripts, css, html, otherAssets, images),
    gulp.parallel(
        watchCss, watchHtml, watchImages,
        watchOtherAssets, watchScripts,
    ),
);
