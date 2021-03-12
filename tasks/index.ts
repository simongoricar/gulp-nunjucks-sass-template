/**
 * Main Gulp 4 task file
 */

import gulp from "gulp";

import taskScripts from "./task-scripts";
import taskCss from "./task-css";
import taskHtml from "./task-html";
import taskCopyOtherAssets from "./task-other-assets";

export const scripts = taskScripts;
export const css = taskCss;
export const html = taskHtml;
export const otherAssets = taskCopyOtherAssets;

// noinspection JSUnusedGlobalSymbols
export default gulp.parallel(scripts, css, html, otherAssets);
