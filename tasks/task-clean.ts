/**
 * Gulp task: Other assets
 */
import del from "del";
import { AsyncTask } from "async-done";

import { mainConfig } from "./configuration";

export default function cleanOutputDir(): ReturnType<AsyncTask> {
    return del(mainConfig.outputDirBase);
}
