/**
 * Gulp task: Other assets
 */
import { watch as gulpWatch } from "gulp";
import { AsyncTask } from "async-done";

import taskScripts from "./task-scripts";
import taskCss from "./task-css";
import taskHtml from "./task-html";
import taskCopyOtherAssets from "./task-other-assets";
import taskImages from "./task-images";

import { mainConfig } from "./configuration";
import * as path from "path";

function watchCss(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "**/*.{css,scss,sass}",
        ],
        {
            cwd: mainConfig.css.srcDir,
        },
        taskCss,
    );
}

function watchHtml(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "**/*.njk",
        ],
        {
            cwd: mainConfig.html.srcPagesDir,
        },
        taskHtml,
    );
}

function watchImages(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}",
        ],
        {
            cwd: mainConfig.images.srcDir,
        },
        taskImages,
    );
}

function watchOtherAssets(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "**/*",
        ],
        {
            cwd: mainConfig.otherAssets.srcDir,
        },
        taskCopyOtherAssets,
    );
}

function watchScripts(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "**/*.{js,ts}",
        ],
        {
            cwd: mainConfig.js.srcDir,
        },
        taskScripts,
    );
}

function taskWarnConfigChanges(): void {
    console.warn("WARNING: Some external configuration file was changed. "
        + "Please keep in mind a full reload is needed to load changes.");
}

function watchAndWarnConfigChanges(): ReturnType<AsyncTask> {
    return gulpWatch(
        [
            "*.ts",
        ],
        {
            cwd: path.join(".", "tasks"),
        },
        taskWarnConfigChanges,
    );
}

export {
    watchCss, watchHtml, watchImages, watchOtherAssets, watchScripts,
    taskWarnConfigChanges, watchAndWarnConfigChanges,
};
