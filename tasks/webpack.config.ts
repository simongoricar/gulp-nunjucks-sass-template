/**
 * Webpack Configuration
 */
import path from "path";
import { Configuration } from "webpack";

import { mainConfig, basePaths } from "./configuration";
import babelConfig from "../babel.config";

const webpackConfig: Configuration = {
    mode: mainConfig.isProductionEnv ? "production" : "development",
    entry: mainConfig.js.entries,
    output: {
        path: path.resolve(mainConfig.js.outputDir),
        filename: "[name].js",
        publicPath: "./",
    },
    target: "browserslist",
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
    },
    resolve: {
        alias: {
            "@": path.resolve(basePaths.srcDirBase),
            "@SCSS": path.resolve(mainConfig.css.srcDir),
            "@SCRIPTS": path.resolve(mainConfig.js.srcDir),
        },
    },
    module: {
        rules: [
            //
            // SHARING SCSS VARIABLES
            // Importing SCSS files in your TypeScript will load the variables.
            // NOTE: Will not actually import SCSS into your project!!
            //
            // Example: "import vars from '@SCSS/_vars.scss'; " (@SCSS resolves to the scss directory)
            // "vars" will now be an object containing camelCased SCSS variables.
            //
            {
                test: /\.scss/i,
                use: [
                    {
                        loader: "sass-variable-loader",
                    },
                ],
            },
            //
            // TypeScript is transpiled to JavaScript.
            // For options, modify babel.config.js in the root directory.
            //
            // To avoid huge relative paths, an alias "@SCRIPTS" is available (resolves to the scripts directory).
            // Example: "import someModule from '@SCRIPTS/test.ts'; "
            //
            {
                test: /\.(js|ts|jsx|tsx)/i,
                loader: "babel-loader",
                options: babelConfig,
            },
        ],
    },
};

export default webpackConfig;
