/**
 * Webpack Configuration
 */
import { Configuration } from "webpack";
import { mainConfig } from "./configuration";

const webpackConfig: Configuration = {
    mode: mainConfig.isProductionEnv ? "production" : "development",
    entry: mainConfig.js.entries,
    output: {
        path: mainConfig.js.outputDir,
        filename: "[name].js",
    },
    target: "browserslist",
};

export default webpackConfig;
