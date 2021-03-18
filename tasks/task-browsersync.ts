/**
 * Gulp task: Other assets
 */
import browserSync from "browser-sync";
import { AsyncTask } from "async-done";

import { basePaths } from "./configuration";

const browser = browserSync.create();

function browserSyncInit(): ReturnType<AsyncTask<void>> {
    return new Promise((resolve) => {
        browser.init({
            server: {
                baseDir: basePaths.outputDirBase,
            },
            files: [
                `${basePaths.outputDirBase}/**/*`,
            ],
            reloadDelay: 300,
            reloadDebounce: 300,
            reloadOnRestart: true,
        });
        resolve();
    });
}

function browserSyncReload(): ReturnType<AsyncTask<void>> {
    return new Promise((resolve) => {
        browser.reload();
        resolve();
    });
}

export { browserSyncInit, browserSyncReload };
