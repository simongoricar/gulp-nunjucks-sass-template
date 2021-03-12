const config = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: "3.9",
            },
        ],
        "@babel/preset-typescript",
    ],
};

module.exports = config;
