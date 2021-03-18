import path from "path";

process.chdir(`${__dirname}/..`);

const basePaths = {
    // Bases
    srcDirBase: path.join(".", "src"),
    outputDirBase: path.join(".", "dist"),

    /**
     * SOURCES
     * (all under srcDirBase, example: "./src/pages")
     *
     * HTML
     *  srcHtmlDirname: name of the pages directory
     *  srcHtmlTemplatesDirname: name of the page template directory
     *
     * CSS
     *  srcCssDirname: name of the SCSS source directory
     *  srcCssEntry:
     *      Main SCSS entry file. The <link...> tag will
     *      be mapped as "{{ tags.css }}" in Nunjucks pages.
     *
     * TYPESCRIPT
     *  srcTSDirName: TypeScript source directory
     *  srcTSEntries:
     *      An object containing entry points. Each entry point will result in an output file.
     *      Each entry point's script tag will be mapped as "{{ tags.scripts.<name> }}" in Nunjucks pages.
     *
     * IMAGES
     *  srcImagesDirName: source images directory
     *
     * OTHER ASSETS
     *  srcOtherAssetsDirName: source directory for other assets
     */
    srcHtmlDirName: "pages",
    srcHtmlTemplatesDirName: "templates",

    srcScssDirName: "scss",
    srcCssEntry: "main.scss",

    srcTSDirName: "scripts",
    srcTSEntries: {
        // Output filename will be "[entry key].js"
        index: "index.ts",
        samplepage: "sample-page.ts",
    },

    srcImagesDirName: "images",

    srcOtherAssetsDirName: "other",

    /**
     * OUTPUTS
     * (all under outputDirBase, example: "./dist/css")
     *
     *  outputAssetsDirName:
     *      Name of the main assets directory. CSS, JavaScript and images will be in it.
     *
     * HTML
     *  outputHtmlDirName: where to output pages
     *      (default is ".", which is in the base output directory)
     *
     * CSS
     *  (relative to outputAssetsDirName)
     *  outputCssDirName: name of the CSS output directory
     *  outputCssFilename: output file name
     *  outputCssSourcemapsDirName: name of the CSS sourcemaps directory (inside outputCssDirName)
     *
     * JavaScript
     *  (relative to outputAssetsDirName)
     *  outputJsDirName: JavaScript output directory
     *
     * IMAGES
     *  (relative to outputAssetsDirName)
     *  outputImagesDirName: image output directory
     *
     * OTHER ASSETS
     *  outputOtherAssetsDirName: other assets output directory
     *      (default is ".", which is in the base output directory)
     */
    outputAssetsDirName: "assets",

    outputHtmlDirName: ".",

    outputCssDirName: "css",
    outputCssFilename: "style.min.css",
    outputCssSourcemapsDirName: "sourcemaps",

    outputJsDirName: "js",

    outputImagesDirName: "images",

    outputOtherAssetsDirName: ".",

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

// eslint-disable-next-line import/no-mutable-exports
let nunjucksGlobals: { [key: string]: unknown } = {
    foo: "bar",
    // per-page complete script tags (and css tags) are added automatically based on the data below
    // (format for variables: "tags.script.name" and "tags.css", see index.njk for an example)
};

const mainConfig = {
    /**
     * THIS IS NOT THE EDITABLE CONFIGURATION
     * This is generated from values above in basePaths. Please edit that one.
     */
    isProductionEnv: process.env.NODE_ENV === "production",

    html: {
        // This will for example resolve into "./src/pages" by default
        srcPagesDir: path.join(basePaths.srcDirBase, basePaths.srcHtmlDirName),
        srcTemplates: path.join(basePaths.srcDirBase, basePaths.srcHtmlTemplatesDirName),
        outputDir: path.join(basePaths.outputDirBase, basePaths.outputHtmlDirName),
    },

    css: {
        srcDir: path.join(basePaths.srcDirBase, basePaths.srcScssDirName),
        srcEntry: path.join(
            basePaths.srcDirBase, basePaths.srcScssDirName, basePaths.srcCssEntry,
        ),
        sourcemapsDir: basePaths.outputCssSourcemapsDirName,
        outputDir: path.join(
            basePaths.outputDirBase,
            basePaths.outputAssetsDirName,
            basePaths.outputCssDirName,
        ),
        outputFilename: basePaths.outputCssFilename,
    },

    js: {
        entries: Object.fromEntries(Object.entries(basePaths.srcTSEntries).map(
            (item) => [
                item[0],
                `./${path.join(basePaths.srcDirBase, basePaths.srcTSDirName, item[1])}`,
            ],
        )),
        srcDir: path.join(basePaths.srcDirBase, basePaths.srcTSDirName),
        outputDir: path.join(
            basePaths.outputDirBase,
            basePaths.outputAssetsDirName,
            basePaths.outputJsDirName,
        ),
    },

    images: {
        srcDir: path.join(basePaths.srcDirBase, basePaths.srcImagesDirName),
        outputDir: path.join(
            basePaths.outputDirBase,
            basePaths.outputAssetsDirName,
            basePaths.srcImagesDirName,
        ),
    },

    otherAssets: {
        srcDir: path.join(basePaths.srcDirBase, basePaths.srcOtherAssetsDirName),
        outputDir: path.join(basePaths.outputDirBase, basePaths.outputOtherAssetsDirName),
    },
};

// Dynamically add script globals
nunjucksGlobals = {
    ...nunjucksGlobals,

    tags: {
        css: nunjucksFilters.cssTag([
            basePaths.outputAssetsDirName,
            basePaths.outputCssDirName,
            basePaths.outputCssFilename,
        ].join("/")),
        // Dynamic ready script tags
        scripts: Object.fromEntries(
            Object.entries(mainConfig.js.entries).map(
                (item) => {
                    const key = item[0];
                    return [
                        key,
                        nunjucksFilters.scriptTag(
                            `assets/js/${key}.js`,
                        ),
                    ];
                },
            ),
        ),
    },
};

export {
    basePaths, mainConfig, nunjucksGlobals, nunjucksFilters,
};
