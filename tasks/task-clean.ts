/**
 * Gulp task: Other assets
 */
import del from "del";
import { AsyncTask } from "async-done";

import { basePaths } from "./configuration";

export default function cleanOutputDir(): ReturnType<AsyncTask> {
    return del(basePaths.outputDirBase);
}
