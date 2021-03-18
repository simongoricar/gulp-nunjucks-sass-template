/**
 * Gulp task: Other assets
 */
import browserSync from "browser-sync";
import { AsyncTask } from "async-done";
import path from "path";

import { basePaths } from "./configuration";
import packageJson from "../package.json";

const browser = browserSync.create();

function browserSyncInit(): ReturnType<AsyncTask<void>> {
    return new Promise((resolve) => {
        browser.init({
            server: {
                baseDir: basePaths.outputDirBase,
            },
            files: [
                path.join(basePaths.outputDirBase, "**", "*"),
            ],
            reloadDelay: 300,
            reloadDebounce: 300,
            reloadOnRestart: true,
            logPrefix: packageJson.name,
            online: false,
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
