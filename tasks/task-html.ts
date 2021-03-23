/**
 * Gulp task: Nunjucks -> HTML
 */
// @ts-ignore
import nunjucksRender from "gulp-nunjucks-render";
// @ts-ignore
import htmlMin from "gulp-htmlmin";
import { src as gulpSrc, dest as gulpDest } from "gulp";
import nunjucks, { Environment } from "nunjucks";
import { AsyncTask } from "async-done";

import { mainConfig, nunjucksFilters, nunjucksGlobals } from "./configuration";

const nunjucksLoader = new nunjucks.FileSystemLoader(
    mainConfig.html.srcTemplates,
    { noCache: true },
);

const nunjucksEnv = (env: Environment) => {
    // Add filters
    Object.entries(nunjucksFilters).forEach(
        ([key, value]) => {
            env.addFilter(key, value);
        },
    );

    // Add globals
    Object.entries(nunjucksGlobals).forEach(
        ([key, value]) => {
            env.addGlobal(key, value);
        },
    );
};

export default function html(): ReturnType<AsyncTask> {
    return gulpSrc(
        `${mainConfig.html.srcPagesDir}/*.njk`,
        // { since: gulpLastRun(html) },
    )
        .pipe(nunjucksRender({
            ext: ".html",
            inheritExtension: false,
            loaders: nunjucksLoader,
            manageEnv: nunjucksEnv,
        }))
        .pipe(htmlMin(
            mainConfig.isProductionEnv ? {
                collapseWhitespace: true,
                conservativeCollapse: true,
            } : {
                maxLineLength: 120,
            },
        ))
        .pipe(gulpDest(mainConfig.html.outputDir));
}
