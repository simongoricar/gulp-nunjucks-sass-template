/**
 * Gulp task: Other assets
 */
import path from "path";
import { AsyncTask } from "async-done";

import taskCss from "./task-css";
import taskHtml from "./task-html";
import taskCopyOtherAssets from "./task-other-assets";
import taskImages from "./task-images";

import { mainConfig } from "./configuration";
import watcher from "./watcher";

function watchCss(): ReturnType<AsyncTask> {
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

function watchHtml(): ReturnType<AsyncTask> {
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

function watchImages(): ReturnType<AsyncTask> {
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

function watchOtherAssets(): ReturnType<AsyncTask> {
    return watcher(
        [
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

function watchAndWarnConfigChanges(): ReturnType<AsyncTask> {
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
