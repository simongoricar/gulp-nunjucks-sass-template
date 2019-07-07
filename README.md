# A [Gulp 4](https://gulpjs.com/) template including [SCSS](https://sass-lang.com/), [Nunjucks](https://mozilla.github.io/nunjucks/), [JS](https://www.javascript.com/) and more

### Full list of features:
- [SCSS](https://sass-lang.com/) compilation (including minification, auto-prefixing and all that sweet stuff)
- [Nunjucks](https://mozilla.github.io/nunjucks/) template rendering (with some boilerplate for adding custom filters and globals)
- [Javascript](https://www.javascript.com/) (with [jshint](https://jshint.com/docs/) and minification)
- Automatically includes "headers" at the beginning of files with information about the author and the license
- Easy src/build path customization in [gulpfile.js](https://github.com/DefaultSimon/gulp-nunjucks-sass-template/blob/master/gulpfile.js)
- Image optimization with [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [Browser-sync](https://browsersync.io/) support (real-time changes in your browser)


### Installation
To get started, first fork, clone or download the repository.

##### Cloning or downloading
In order to clone this repository, execute `git clone https://github.com/DefaultSimon/gulp-nunjucks-sass-template.git` in your console (alternatively, use the download button to download a zipped version).  
If you intend to push changes to your site to your own repository though, you'll have to update the remote in your clone (which forking already does for you). For further help, see [this help article](https://help.github.com/en/articles/cloning-a-repository).

##### Forking
Forking makes an online copy of this repository which is then available under your repositories. Click the *Fork* button or see help [here](https://help.github.com/en/articles/fork-a-repo).

### Usage
This projects uses [Yarn](https://yarnpkg.com/en/) as a package manager. Once installed, execute `yarn install` in the base directory and you're done. Optionally, you can customize `gulpfile.js`, if you have a specific need.

The file structure is as follows:

```
src
- pages
  > your Nunjucks pages (.njk) are here
- templates
  > Nunjucks templates should be put here
  
- scss
  > SCSS files (main.scss should import all other files)
- js
  > all *.js files in here are concatenated into scripts.js
  - external
    > this folder is meant for libraries and is simply copied
- img
  > images here are optimized and copied
- other
  > *any* files are recursively copied to the 'assets' directory
  > useful for cases where you need some custom data
```

To start gulp, execute `gulp` in the console. This will build the project, open the browser and watch for changes.
To just build and exit, execute `gulp build`. For other tasks, check out the gulpfile.
