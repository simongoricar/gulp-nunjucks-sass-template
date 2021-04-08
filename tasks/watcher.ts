/*
 * Because gulp.watch uses glob-watcher, which still uses chokidar v2,
 * I've rewritten the functionality I need from that library with chokidar v3.
 *
 * TODO remove this when glob-watcher is updated to chokidar v3
 */
import chokidar, { WatchOptions } from "chokidar";
import { parallel, TaskFunction } from "gulp";
import { EventEmitter } from "events";
import justDebounce from "just-debounce";
import asyncDone, { AsyncTask } from "async-done";
import fs from "fs";
import { mainConfig } from "./configuration";

const chokidarEvents = ["add", "change", "unlink"];
const defaultOptions: WatchOptions = {
    ignoreInitial: true,
};

function watchGlobs(
    globs: string[], chokidarOptions: WatchOptions, callback: TaskFunction,
): EventEmitter | null {
    if (chokidarOptions.cwd) {
        if (!fs.existsSync(chokidarOptions.cwd)) {
            console.warn(
                `[watcher] Directory "${
                    chokidarOptions.cwd
                }" does not exist, not watching.`,
            );
            return null;
        }
    }

    const watcher = chokidar.watch(
        globs,
        Object.assign(defaultOptions, chokidarOptions),
    );

    // If a change event fires while we are running a task
    let isQueued = false;
    let isRunning = false;

    function onComplete(err: null | Error): void {
        if (err) {
            watcher.emit("error", err);
        }

        isRunning = false;

        // Event was fired while we were already running the task, rerun it
        if (isQueued) {
            isQueued = false;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            chokidarOnChangeCallback();
        }
    }

    function chokidarOnChangeCallback() {
        if (isRunning) {
            isQueued = true;
        } else {
            isRunning = true;
            // parallel(callback) - this way tasks are logged
            asyncDone(<AsyncTask>parallel(callback), onComplete);
        }
    }

    const chokidarOnChange = justDebounce(chokidarOnChangeCallback, 100);

    chokidarEvents.forEach(
        (event: string) => watcher.on(event, chokidarOnChange),
    );

    return watcher;
}

export default watchGlobs;
