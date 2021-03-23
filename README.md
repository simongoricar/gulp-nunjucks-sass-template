# A customizable [Gulp 4](https://gulpjs.com/) template

![Gulp v4.0.2](https://img.shields.io/static/v1?logo=gulp&logoColor=white&label=gulp&message=v4.0.2&color=CF4647)
![Webpack v5.25.0](https://img.shields.io/static/v1?logo=webpack&logoColor=white&label=webpack&message=v5.25.0&color=8DD6F9)

## Full list of features
- *HTML*: [**Nunjucks**](https://mozilla.github.io/nunjucks/) template rendering *at build time*. Includes a basic template (`templates/base.njk`) to get you started.
- *CSS*: [**SCSS**](https://sass-lang.com/) support (with minification and autoprefixing via [Autoprefixer](https://github.com/postcss/autoprefixer))
- *JS*: [**TypeScript**](https://www.typescriptlang.org/) support (via webpack and Babel)
- *IMAGES and ASSETS*: Automatically copy your images and other assets into your build.
- *DEVELOPMENT*: [**Browsersync**](https://www.browsersync.io/) support (real-time browser updates when you modify the source)
- *LINTING*: [**eslint**](https://eslint.org/) for TypeScript, [**stylelint**](https://stylelint.io) for SCSS (for more, see below)
- **Easy customization** via options in `tasks/configuration.ts` and modular tasks in `tasks`

---

### Installation
To get started first fork, clone or download the repository.

##### Cloning or downloading
In order to clone this repository, execute `git clone https://github.com/DefaultSimon/gulp-nunjucks-sass-template.git` in your console (alternatively, use the download button to download a zipped version).  
If you intend to push changes to your site to your own repository though, you'll have to update the remote in your clone (which forking already does for you). For further help, see [this help article](https://help.github.com/en/articles/cloning-a-repository).

##### Forking
Forking makes an online copy of this repository which is then available under your repositories. Click the *Fork* button or see help [here](https://help.github.com/en/articles/fork-a-repo).

### Usage
This projects uses [Yarn 2](https://yarnpkg.com/en/) as the package manager. Once installed, execute `yarn install` in the base directory, and you're done. When you've looked around a bit, you can, if needs arise, start to customize `tasks/configuration.ts` and even the individual tasks.

### Structure
The file structure is as follows:

```
src
- pages
  > your Nunjucks pages (.njk) here

- templates
  > Nunjucks templates here (already includes one: base.njk)
  > See index.njk for an example on extending templates
  
- scss
  > SCSS files (main.scss is the entry point and should import other files)

- scripts
  > This project supports multiple completely separate entry points!
  > see tasks/configuration.ts to see an example and set them up

- images
  > images are copied

- other
  > *any* files are recursively copied to the 'assets' directory
  > for cases where you want some custom assets in your build
```

**To start developing, execute `yarn run dev` in the console.** This will build a development version the project, open the browser and watch for changes.
To just build in production mode, execute `yarn run buildProduction` (or `buildDev` for a one-time dev build). For other single tasks, check out `tasks/index.ts`.


### Linting
Prefferably enable support for ESLint and Stylelint in your IDE, but to lint manually, use the scripts:
- `lintTS` (or `lintTSFix` to automatically fix problems)
- "lintSCSS"
