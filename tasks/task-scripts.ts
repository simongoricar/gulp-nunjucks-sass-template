/**
 * Gulp task: scripts
 */
import webpack from "webpack";

import webpackConfig from "./webpack-config";

export default (): Promise<void> => new Promise(
    (resolve) => webpack(webpackConfig, (error, stats) => {
        if (error) {
            console.warn("[Webpack] ", error);
        }
        if (stats) {
            console.log(stats.toString());
        }

        resolve();
    }),
);
