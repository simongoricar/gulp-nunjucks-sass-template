import path from "path";

process.chdir(`${__dirname}/..`);

const basePaths = {
    srcDirBase: path.resolve("./src"),
    outputDirBase: path.resolve("./dist"),
};

const nunjucksFilters: { [name: string]: (...args: unknown[]) => unknown } = {
    shorten: (...args) => {
        const str: string = <string>args[0];
        const length: number = <number>args[1];

        return str.slice(0, length);
    },
    scriptTag: (...args) => {
        const fileName: string = <string>args[0];
        return `<script src="${encodeURI(fileName)}"></script>`;
    },
    cssTag: (...args) => {
        const fileName: string = <string>args[0];
        return `<link href="${encodeURI(fileName)}" rel="stylesheet">`;
    },
};
const nunjucksGlobals = {
    foo: "bar",
};

const mainConfig = {
    ...basePaths,
    isProductionEnv: process.env.NODE_ENV === "production",
    /**
     * HTML
     *  srcPages: path to the directory containing nunjucks pages (*.njk)
     *  srcTemplates: path to the directory containing nunjucks templates
     *  outputPages: output directory
     */
    html: {
        srcPages: path.join(basePaths.srcDirBase, "pages"),
        srcTemplates: path.join(basePaths.srcDirBase, "pageTemplates"),
        outputDir: basePaths.outputDirBase,
        nunjucks: {
            filters: nunjucksFilters,
            globals: nunjucksGlobals,
        },
    },

    /**
     * SCSS
     *  srcEntry: entry .scss file
     *  sourcemapsDir: directory for source maps, relative to srcEntry
     *  outputDir: stylesheets output directory
     */
    css: {
        srcDir: path.join(basePaths.srcDirBase, "scss"),
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
        srcDir: path.join(basePaths.srcDirBase, "scripts"),
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

export default mainConfig;
