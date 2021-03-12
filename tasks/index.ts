/**
 * Main Gulp 4 task file
 */

import gulp from "gulp";

import taskScripts from "./task-scripts";
import taskCss from "./task-css";

export const scripts = taskScripts;
export const css = taskCss;

// noinspection JSUnusedGlobalSymbols
export default gulp.series(scripts, taskCss);
