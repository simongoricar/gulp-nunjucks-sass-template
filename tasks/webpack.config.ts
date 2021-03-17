/**
 * Webpack Configuration
 */
import { Configuration } from "webpack";
import mainConfig from "./configuration";

const isProductionEnv = process.env.NODE_ENV === "production";

const webpackConfig: Configuration = {
    mode: isProductionEnv ? "production" : "development",
    entry: mainConfig.js.srcEntry,
    output: {
        path: mainConfig.js.outputDir,
        filename: "[name]-[contenthash].js",
    },
    target: "browserslist",
};

export default webpackConfig;
