/**
 * Gulp task: Nunjucks -> HTML
 */
import nunjucks from "nunjucks";
// @ts-ignore
import nunjucksRender from "gulp-nunjucks-render";
import { src as gulpSrc, dest as gulpDest, lastRun as gulpLastRun } from "gulp";

import { AsyncTask } from "async-done";

import mainConfig from "./configuration";

const nunjucksLoader = new nunjucks.FileSystemLoader(
    mainConfig.html.srcTemplates,
    { noCache: true },
);

const nunjucksEnv = (env: unknown) => {
    // Add filters
    Object.entries(mainConfig.html.nunjucks.filters).forEach(
        ([key, value]) => {
            // @ts-ignore
            env.addFilter(key, value);
        },
    );

    // Add globals
    Object.entries(mainConfig.html.nunjucks.globals).forEach(
        ([key, value]) => {
            // @ts-ignore
            env.addGlobal(key, value);
        },
    );
};

export default function html(): ReturnType<AsyncTask> {
    return gulpSrc(
        `${mainConfig.html.srcPages}/*.njk`,
//        { since: gulpLastRun(html) },
    )
        .pipe(nunjucksRender({
            ext: ".html",
            inheritExtension: false,
            loaders: nunjucksLoader,
            manageEnv: nunjucksEnv,
        }))
        .pipe(gulpDest(mainConfig.html.outputDir));
}
