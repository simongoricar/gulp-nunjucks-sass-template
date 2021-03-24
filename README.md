# A customizable [Gulp 4](https://gulpjs.com/) template

<span>
    <img alt="GitHub" src="https://img.shields.io/github/license/DefaultSimon/gulp-nunjucks-sass-template?style=flat-square">
    <img alt="GitHub tag (latest SemVer)" src="https://img.shields.io/github/v/tag/DefaultSimon/gulp-nunjucks-sass-template?label=latest%20version&sort=semver&style=flat-square">
    <br>
    <img alt="gulp" src="https://img.shields.io/github/package-json/dependency-version/DefaultSimon/gulp-nunjucks-sass-template/dev/gulp?color=CF4647&logo=gulp&logoColor=white&style=flat-square">
    <img alt="Webpack" src="https://img.shields.io/github/package-json/dependency-version/DefaultSimon/gulp-nunjucks-sass-template/dev/webpack?color=8DD6F9&label=webpack&logo=webpack&logoColor=white&style=flat-square">
    <img alt="(Dart) Sass" src="https://img.shields.io/github/package-json/dependency-version/DefaultSimon/gulp-nunjucks-sass-template/dev/sass?color=CC6699&label=%28Dart%29%20Sass&logo=sass&logoColor=white&style=flat-square">
    <img alt="TypeScript" src="https://img.shields.io/github/package-json/dependency-version/DefaultSimon/gulp-nunjucks-sass-template/dev/typescript?color=3178C6&label=TypeScript&logo=typescript&logoColor=white&style=flat-square">
</span>

##### You're looking at v2.0. If you're searching for v1.2.0, go to the [relevant tag](https://github.com/DefaultSimon/gulp-nunjucks-sass-template/tree/v1.2.0).

## Full list of features
- *HTML*: [**Nunjucks**](https://mozilla.github.io/nunjucks/) template engine. Renders *at build time* for static websites. Includes a basic template `templates/base.njk` to get you started and minification on production builds.
- *CSS*: [**SCSS**](https://sass-lang.com/) (and SASS) support. Includes minification on production builds and autoprefixing via [Autoprefixer](https://github.com/postcss/autoprefixer).
- *JS*: [**TypeScript**](https://www.typescriptlang.org/) support (via webpack and Babel). Multiple entry points are supported (e.g. a script for each page; see `tasks/configuration.ts`).
- *IMAGES and ASSETS*: Automatically copy your images and other assets into your build.
- *DEVELOPMENT*: [**Browsersync**](https://www.browsersync.io/) support (real-time browser updates when you're developing).
- *LINTING*: [**eslint**](https://eslint.org/) for TypeScript, [**stylelint**](https://stylelint.io) for SCSS with relevant scripts prepared.
- **Easy customization** via options in `tasks/configuration.ts` and modular tasks in `tasks`

---

### 1. Installation
To get started: *fork*, *clone* or *download* the repository.

#### Cloning or downloading
In order to clone this repository, run the command beelow or use the download button to download a zipped version.
```
git clone https://github.com/DefaultSimon/gulp-nunjucks-sass-template.git
```
 
If you intend to push changes to your site to your own repository though, you'll have to update the remote in your clone (which forking already does for you). For further help, see [this help article](https://help.github.com/en/articles/cloning-a-repository).

#### Forking
Forking makes an online copy of this repository which is then available under your repositories. Click the *Fork* button or see help [here](https://help.github.com/en/articles/fork-a-repo).

### 2. Usage
This projects uses [Yarn 2](https://yarnpkg.com/en/) as the package manager.  Install if needed and run `yarn install` in the base directory, and you're done. 

Familiarize yourself with the template by looking at the documentation and the relevant files.
When you've looked around a bit you can, if needs arise, start to customize `tasks/configuration.ts` and even the individual tasks.

### 2.1. Structure
The file structure is as follows:

```
src
- pages
  > your Nunjucks pages (.njk) here
  > the pages will be compiled to HTML and copied to "dist"

- templates
  > Nunjucks templates here (already includes one: base.njk)
  > See index.njk for an example on extending templates
  
- scss
  > SCSS files (main.scss is the entry point and should import other files)
  > normalize.css, pure.css, include-media and Bones are available.

- scripts
  > This project supports multiple entry points!
  > see tasks/configuration.ts to see an example on how to set them up

- images
  > images are copied into "dist/assets/images"

- other
  > *any* files are recursively copied to the "dist/assets" directory
  > for cases where you want some custom assets in your build
```

### 2.2. Nunjucks (HTML)
[**Nunjucks**](https://mozilla.github.io/nunjucks/) is a powerful HTML templating engine built by Mozilla. The syntax is similar to (and inspired by) Python's jinja2.
For more on templating, read [**Nunjucks' documentation**](https://mozilla.github.io/nunjucks/templating.html).

Put your pages in `src/pages` and your templates in `src/templates`. In this project, a base template named `base.njk` is already set up. A few examples on using Nunjucks are available in `src/pages`.

To add custom Nunjucks globals and filters, check out `tasks/configuration.ts`.

### 2.3. SCSS (CSS)
**SCSS** is a stylesheet language that compiles to CSS using the [(Dart) Sass](https://sass-lang.com) project.
By default, there is a single entry point in ˙src/scss/main.scss` that imports a variety of rules and modules.

This template includes the following:
- [**normalize.css**](https://necolas.github.io/normalize.css/) for a consistent base across browsers
- [**pure.css**](https://purecss.io/) as the style foundation
- [**include-media**](https://eduardoboucas.github.io/include-media/) (Sass library for @media queries) as a handy tool for consistent @media queries. Breakpoints customized with help from [a bunch](https://www.freecodecamp.org/news/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862/) [of](https://flaviocopes.com/css-breakpoints/) [articles](https://howto-wordpress-tips.com/responsive-breakpoints-tutorial/) [and frameworks](https://polypane.app/blog/css-breakpoints-used-by-popular-css-frameworks/) and packed into the `modules/_media.scss` module with shorthands for easy styling.
- **Bones**, a personal set of common rules compacted into mixins and CSS classes. Short documentation is available in `bones.njk`/`bones.html` and the source is available at `src/scss/vendor/bones`.

Each of these modules is located in `src/scss/vendor` and can be easily removed if you do not need them by deleting the relevant directory and removing the import in `main.scss`.

The resulting CSS `<link>` tag is available as the variable `tags.css` (e.g. `{{ tags.css | safe }}` will output `<link href="assets/css/style.min.css" rel="stylesheet">`).

### 2.4. TypeScript
[**TypeScript**](https://www.typescriptlang.org/) is an open-source language which builds on JavaScript by adding static type definitions.

All `*.ts` code in `src/scripts` goes through webpack and Babel (with `preset-env` and `preset-typescript`). To facilitate splitting your code, multiple entry points ("multiple scripts") can be set up in `tasks/configuration.ts`. 

The resulting `<script>` tags (one for each entry point) will be available under `tags.scripts` (e.g. with an entry point you named `index`: `{{ tags.scripts.index | safe }}`` will output `<script src="assets/js/index.js"></script>`).

Another useful feature: importing SCSS variables into your TypeScript is easy! Webpack is already configured, simply import the `.scss` file, and you're done (see `src/scripts/index.ts` for an example)! This will not impact the styles (no additional file is emitted), but will import the variables you might want to use. Side note: instead of a relative path, the `@SCSS` alias is available (as shown in the example).

### 2.5. Development
**To start developing, execute `yarn run dev` in the console.** This will build a development version of the project, open the browser and watch for changes, updating them in real-time in the browser.

To just build in production mode (enabling minified scripts, webpack's production mode and such), execute `yarn run buildProduction` (or `buildDev` for a one-time dev build). For other single tasks, check out `tasks/index.ts`.


### 2.6. Linting
Linting will check your code against a set of TypeScript and SCSS rules. The rules can be adjusted in `.eslintrc.js` and `.stylelintrc.json`.

To use linters, prefferably enable support for ESLint and Stylelint in your IDE, or run the following scripts to lint manually:
- `lintTS` (or `lintTSFix` to automatically fix problems)
- `lintSCSS` (or `lintSCSSFix` to automatically fix problems)

For example, run `yarn run lintTSFix` to run the `lintTSFix` script.
