/**
 * Main Gulp 4 task file
 */

import gulp from "gulp";

import taskScripts from "./task-scripts";
import taskCss from "./task-css";
import taskHtml from "./task-html";

export const scripts = taskScripts;
export const css = taskCss;
export const html = taskHtml;

// noinspection JSUnusedGlobalSymbols
export default gulp.parallel(scripts, css, html);
