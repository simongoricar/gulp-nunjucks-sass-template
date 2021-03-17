/**
 * Gulp task: Other assets
 */
import browserSync from "browser-sync";
import { AsyncTask } from "async-done";

import { mainConfig } from "./configuration";

const browser = browserSync.create();

function browserSyncInit(): ReturnType<AsyncTask<void>> {
    return new Promise((resolve) => {
        browser.init({
            server: {
                baseDir: mainConfig.outputDirBase,
            },
            files: [
                `${mainConfig.outputDirBase}/**/*`,
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
