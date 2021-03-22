/**
 * Webpack Configuration
 */
import path from "path";
import dartSass from "sass";
import { Configuration } from "webpack";

import { mainConfig, basePaths } from "./configuration";
import babelConfig from "../babel.config";

const webpackConfig: Configuration = {
    mode: mainConfig.isProductionEnv ? "production" : "development",
    entry: mainConfig.js.entries,
    output: {
        path: path.resolve(mainConfig.js.outputDir),
        filename: "[name].js",
    },
    target: "browserslist",
    module: {
        rules: [
            //
            // SHARING SCSS VARIABLES
            // Importing SCSS files in your TypeScript will load the variables.
            // NOTE: Will not actually import SCSS into your project!!
            //
            // Example: "import vars from '../scss/_vars.scss';"
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
            {
                test: /\.(js|ts|jsx|tsx)/i,
                loader: "babel-loader",
                options: babelConfig,
            },
        ],
    },
};

export default webpackConfig;
