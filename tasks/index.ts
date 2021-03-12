/**
 * Main Gulp 4 task file
 */

import gulp from "gulp";

import taskScripts from "./task-scripts";
import taskHelloWorld from "./task-helloworld";

export const scripts = gulp.series(taskScripts);
export const helloworld = gulp.series(taskHelloWorld);

// noinspection JSUnusedGlobalSymbols
export default gulp.series(scripts, helloworld);
