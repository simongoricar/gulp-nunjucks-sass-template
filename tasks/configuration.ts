import path from "path";

const basePaths = {
    srcDirBase: path.resolve(`${__dirname}/../src`),
    outputDirBase: path.resolve(`${__dirname}/../dist`),
};

const mainConfig = {
    /**
     * HTML
     *  srcPages: path to the directory containing nunjucks pages (*.njk)
     *  srcTemplates: path to the directory containing nunjucks templates
     *  outputPages: output directory
     */
    html: {
        srcPages: path.join(basePaths.srcDirBase, "pages"),
        srcTemplates: path.join(basePaths.srcDirBase, "templates"),
        outputDir: basePaths.outputDirBase,
    },

    /**
     * SCSS
     *  srcEntry: entry .scss file
     *  sourcemapsDir: directory for source maps, relative to srcEntry
     *  outputDir: stylesheets output directory
     */
    css: {
        srcEntry: path.join(basePaths.srcDirBase, "scss", "main.scss"),
        sourcemapsDir: "sourcemaps",
        outputDir: path.join(basePaths.outputDirBase, "assets", "css"),
    },

    /**
     * JavaScript
     *  srcEntry: entry JS/TS file
     *  outputDir: script chunks output directory
     */
    js: {
        srcEntry: path.join(basePaths.srcDirBase, "scripts", "index.ts"),
        outputDir: path.join(basePaths.outputDirBase, "assets", "js"),
    },

    /**
     * Images
     *  srcDir: directory containing images
     *  outputDir: image output directory
     */
    images: {
        srcDir: path.join(basePaths.srcDirBase, "images"),
        outputDir: path.join(basePaths.outputDirBase, "assets", "images"),
    },

    /**
     * Other Assets
     */
    otherAssets: {
        srcDir: path.join(basePaths.srcDirBase, "other"),
        outputDir: basePaths.outputDirBase,
    },
};

export default { ...basePaths, ...mainConfig };
