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

function watchCss(): ReturnType<AsyncTask> {
    return gulpWatch(`${mainConfig.css.srcDir}/**/*.scss`, taskCss);
}

function watchHtml(): ReturnType<AsyncTask> {
    return gulpWatch([
        `${mainConfig.html.srcPagesDir}/**/*.njk`,
        `${mainConfig.html.srcTemplates}/**/*.njk`,
    ], taskHtml);
}

function watchImages(): ReturnType<AsyncTask> {
    return gulpWatch(
        `${mainConfig.images.srcDir}/**/*.{png,gif,jpg,bmp,tiff,jpeg,webp}`,
        taskImages,
    );
}

function watchOtherAssets(): ReturnType<AsyncTask> {
    return gulpWatch(
        `${mainConfig.otherAssets.srcDir}/**/*`,
        taskCopyOtherAssets,
    );
}

function watchScripts(): ReturnType<AsyncTask> {
    return gulpWatch(
        `${mainConfig.js.srcDir}/**/*.{js,ts}`,
        taskScripts,
    );
}

export {
    watchCss, watchHtml, watchImages, watchOtherAssets, watchScripts,
};
