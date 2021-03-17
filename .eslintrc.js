// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript"
    ],
    parserOptions: {
        project: "./tsconfig.json"
    },
    rules: {
        "no-console": "off",
        indent: ["error", 4],
        "@typescript-eslint/indent": "off",
        quotes: ["error", "double"],
        "@typescript-eslint/quotes": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "max-len": ["error", { comments: 120, code: 90 }],
    },
    overrides: [
        {
            files: ["tasks/**/*.ts"],
            rules: {
                "import/no-extraneous-dependencies": "off",
                "no-param-reassign": "off",
            }
        }
    ]
};
