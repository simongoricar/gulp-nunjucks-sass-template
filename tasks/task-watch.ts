/**
 * Gulp task: Other assets
 */
import path from "path";
import fs from "fs";
import { AsyncTask } from "async-done";

import taskCss from "./task-css";
import taskHtml from "./task-html";
import taskCopyOtherAssets from "./task-other-assets";
import taskImages from "./task-images";

import { mainConfig } from "./configuration";
import watcher from "./watcher";

function watchCss(): ReturnType<AsyncTask> | null {
    return watcher(
        [
            "**/*.{css,scss,sass}",
        ],
        {
            cwd: mainConfig.css.srcDir,
        },
        taskCss,
    );
}

function watchHtml(): ReturnType<AsyncTask> | null {
    return watcher(
        [
            "**/*.njk",
        ],
        {
            cwd: mainConfig.html.srcPagesDir,
        },
        taskHtml,
    );
}

function watchImages(): ReturnType<AsyncTask> | null {
    return watcher(
        [
            "**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}",
        ],
        {
            cwd: mainConfig.images.srcDir,
        },
        taskImages,
    );
}

function watchOtherAssets(): ReturnType<AsyncTask> | null {
    return watcher(
        [
            // Important note!
            // If the directory in cwd option does not exist (it can be empty though),
            // THIS SLOWS DOWN EVERY OTHER TASK (?!?!)
            "**/*",
        ],
        {
            cwd: mainConfig.otherAssets.srcDir,
        },
        taskCopyOtherAssets,
    );
}

function taskWarnConfigChanges(): void {
    console.warn("WARNING: Some external configuration file was changed. "
        + "Please keep in mind a full reload is needed to load changes.");
}

function watchAndWarnConfigChanges(): ReturnType<AsyncTask> | null {
    return watcher(
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
    watchCss, watchHtml, watchImages, watchOtherAssets,
    taskWarnConfigChanges, watchAndWarnConfigChanges,
};
