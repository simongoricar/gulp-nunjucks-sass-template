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
    module: {
        rules: [
            //
            // SHARING IMAGE PATHS
            // Importing images in your TypeScsript will
            // return the relative path (of the image in the build).
            //
            // Example: "import sampleImage from "../images/sampleimage.jpg";"
            // "sampleImage" will contain "./assets/images/sampleimage.jpg"
            //
            {
                test: /\.(jpg|jpeg|tiff|png|apng)/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            // eslint-disable-next-line max-len
                            outputPath: `${basePaths.outputAssetsDirName}/${basePaths.srcImagesDirName}`,
                            emitFile: false,
                        },
                    },
                ],
            },
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
