<!-- SHIELDS -->

[![Manifest][manifest-shield]][manifest-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<!-- LOGO -->
<br />
<div align="center">

  <h1 align="center">Web Extension Template</h1>

  <p align="center" style="width: 680px;">
    Node.js template, designed to easily create modular Web Extensions, following Manifest Version 3 (MV3). Powered by Webpack, Babel, React.js, and Tailwind CSS.<br>
    <a href="https://github.com/snipx-io/template/issues/new?assignees=arakilian0&labels=bug&projects=&template=bug_report.md&title=%5BFix%5D%3A+">Report Bug</a>
    ·
    <a href="https://github.com/snipx-io/template/issues/new?assignees=arakilian0&labels=enhancement&projects=&template=feature_request.md&title=%5BFeat%5D%3A+">Request Feature</a>
    ·
    <a href="https://github.com/snipx-io/template/discussions/27">Feedback</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li>
			<a href="#documentation">Documentation</a>
			<ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
		</li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

This template was made specifically for [snipx.io][snipx-url], to create the only web-extension you'll ever need.

It comes pre-configured with **Webpack**, **Babel**, **React**, and **Tailwind CSS**. It also has a couple **npm-scripts** that you can completely modify to fit your build pipeline. Of course, everything can be modified.

If you modify the template, please consider [contributing](#contributing). You can start a conversation through [discussions][discussions-url].

### What is SnipX?

SnipX is short for Snippet Extension. A web extension that lets you inject CSS and JavaScript into your current browser tab.

Have you ever found yourself writing **HTML**, **CSS**, or **JavaScript** code in the developer tools, then refreshing the page only to lose all of your changes? With SnipX, you can write your code in the extension, and your changes will always be rendered.

Checkout out the [demo][project-demo-url].

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- DOCUMENTATION -->

## Documentation

### Requirements

This template requires [Node.js][node-url] and [npm][npm-url].

<details>
  <summary>How to get it, if you don't already have it.</summary>
	<br>
	<p>To download and install, visit <a href="https://nodejs.org">nodejs.org</a> and download the recommended Long-term Support version.</p>
	<img src="https://raw.githubusercontent.com/arakilian0/images/master/snipx-template/node-download-screenshot-v2.jpg">
	<p>After running the installer, you should have both Node and npm.</p>
	<p>Run the following code in the console to check if your machine has <b>Node.js</b> and <b>npm</b> installed.</p>
		<pre>node -v
npm -v</pre>
	<p>They should each return a corresponding version number.
</details>

### Installation

The easiest and recommended way of using this template is via GitHub's built-in [template repository][github-docs-url] support.

![How to install this template on GitHub.com][installation-screenshot]

This will prompt you to name your new project and choose it's remote location. After doing so, `clone` your newly created repo using Git and run `npm install` to configure dependencies.

```
git clone https://github.com/[username]/[repository].git
```

```
cd [repository]
```

```
npm install
```

### Usage

Note: run/build.js and run/dev.js merge with webpack.config.js.

#### **NPM Scripts**

The following **npm-scripts** can be found in the **run** directory.

Take a look at the [package.json][package-json-url] file for a list of the available **npm-scripts**.

```
scripts: {
	"dev": "node run/dev.js",
	"build": "node run/build.js",
	"lint": "node run/lint.js"
}
```

#### **Development**

[run/dev.js][run-dev-url]

Accepts no options/arguments. Uses Webpack **`compiler.watch`**.

```
npm run dev                   // Watch/build extension for development
```

#### **Production**

[run/build.js][run-build-url]

Accepts 1 of 3 options at a time. Uses Webpack **`compiler.run`**.

```
npm run build                 // Build extension for production
npm run build --manifest      // Build only manifest.json
npm run build --webpack       // Build only webpack
npm run build --zip           // Build extension for production then .zip
```

#### **Linter**

[run/lint.js][run-lint-url]

Accepts 1 option, and multiple file-paths as input. Not configured to work with Webpack.

```
npm run lint                   // Run ESLint and Prettier on extension
npm run lint [file]            // Run ESLint and Prettier on a specific file
npm run lint [file1] [file2]   // Run ESLint and Prettier on each given file
npm run lint --fix             // Fix and format extension using ESLint and Prettier
```

#### **Utility Scripts**

The **_utility-scripts_** assist our **_npm-scripts_** to orchestrate a build pipeline:

- [run/lib/hotreload.js][run-hotreload-url]
  - Reload extension on change (dev only).
  - Included in _run/dev.js_.
- [run/lib/manifest.js][run-manifest-url]
  - Build the manifest.json file.
  - Uses **package.json** to fill in **`name`**, **`version`**, and **`description`**. Enforces Manifest Version 3, and uses **webpack_entry** from **run/lib/path.js** as **`defualt_popup`**.
  - Additionally, you can provide a development and production **`key`** in a **`.env`** file:
    ```
    MANIFEST_DEVELOPMENT_KEY="123"      # used in run/dev.js
    MANIFEST_PRODUCTION_KEY="321"       # used in run/build.js
    ```
  - Merges data (from above), with **manifest.json**. All defaults can be overwritten using **manifest.json**.
  - Included in _run/dev.js_ and _run/build.js_.
- [run/lib/path.js][run-path-url]
  - Hard-coded paths are avoided as much as possible, in favor of this **"config"** file.
  - Included in _run/lib/manifest.js_, _run/lib/zip.js_, and _webpack.config.js_.
- [run/lib/zip.js][run-zip-url]
  - Archives (.zip) **output** from **run/lib/path.js**.
  - Included in _run/build.js_.

### Deployment

#### **Development**

Visit `chrome://extensions`. Make sure you have **Developer mode** active, then use **Load unpacked** to install your **build**.

![How to install your own extension on Chrome.][development-screenshot]

#### **Production**

[How to publish in the Chrome Web Store][chrome-publish-url].

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Support Chromium
- [ ] Support Firefox
- [ ] Webpack Plugin (manifest)
- [ ] Webpack Plugin (zip)
- [ ] Improve Watcher
- [ ] Improve Logger
- [ ] Extension Starter Files
- [ ] Improve Documentation
- [ ] Examples

See the [open issues][issues-url] for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "feat".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/feature_name`)
3. Commit your Changes (`git commit -m 'type(scope): add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email: help@snipx.io

Project Link: [github.com/snipx-io/template][project-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Chrome Extensions][chrome-extensions-url]
- [Manifest Version 3][manifest-url]
- [Webpack][webpack-url]
- [Babel][babel-url]
- [React][react-url]
- [Tailwind CSS][tailwindcss-url]
- [ESLint][eslint-url]
- [Prettier][prettier-url]
- [crx-hotreload][crx-hotreload-url]
- [node-bestzip][bestzip-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/snipx-io/template.svg?style=for-the-badge&color=green
[forks-shield]: https://img.shields.io/github/forks/snipx-io/template.svg?style=for-the-badge&color=blue
[stars-shield]: https://img.shields.io/github/stars/snipx-io/template.svg?style=for-the-badge&color=yellow
[issues-shield]: https://img.shields.io/github/issues/snipx-io/template.svg?style=for-the-badge&color=red
[license-shield]: https://img.shields.io/github/license/snipx-io/template.svg?style=for-the-badge&color=yellowgreen
[manifest-shield]: https://img.shields.io/badge/Manifest-v3-black?style=for-the-badge
[manifest-url]: https://developer.chrome.com/docs/extensions/mv3/intro
[contributors-url]: https://github.com/snipx-io/template/graphs/contributors
[forks-url]: https://github.com/snipx-io/template/network/members
[stars-url]: https://github.com/snipx-io/template/stargazers
[issues-url]: https://github.com/snipx-io/template/issues
[license-url]: https://github.com/snipx-io/template/blob/master/LICENSE
[project-url]: https://github.com/snipx-io/template
[project-demo-url]: https://github.com/startrev/SnipX
[snipx-url]: https://snipx.io
[webpack-url]: https://webpack.js.org
[babel-url]: https://babeljs.io
[react-url]: https://react.dev
[tailwindcss-url]: https://tailwindcss.com
[eslint-url]: https://eslint.org
[prettier-url]: https://prettier.io
[crx-hotreload-url]: https://github.com/xpl/crx-hotreload
[bestzip-url]: https://github.com/nfriedly/node-bestzip
[node-url]: https://nodejs.org
[npm-url]: https://npmjs.com
[discussions-url]: https://github.com/snipx-io/template/discussions
[github-docs-url]: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
[webpack-config-url]: https://github.com/snipx-io/template/blob/main/webpack.config.js
[package-json-url]: https://github.com/snipx-io/template/blob/main/package.json
[run-url]: https://github.com/snipx-io/template/tree/main/run
[run-lib-url]: https://github.com/snipx-io/template/tree/main/run/lib
[run-build-url]: https://github.com/snipx-io/template/blob/main/run/build.js
[run-dev-url]: https://github.com/snipx-io/template/blob/main/run/dev.js
[run-lint-url]: https://github.com/snipx-io/template/blob/main/run/lint.js
[run-hotreload-url]: https://github.com/snipx-io/template/blob/main/run/lib/hotreload.js
[run-manifest-url]: https://github.com/snipx-io/template/blob/main/run/lib/manifest.js
[run-path-url]: https://github.com/snipx-io/template/blob/main/run/lib/path.js
[run-zip-url]: https://github.com/snipx-io/template/blob/main/run/lib/zip.js
[extensions-url]: chrome://extensions
[chrome-extensions-url]: https://developer.chrome.com/docs/extensions
[chrome-publish-url]: https://developer.chrome.com/docs/webstore/publish
[development-screenshot]: https://raw.githubusercontent.com/arakilian0/images/master/snipx-template/chrome-development-screenshot-v2.jpg
[installation-screenshot]: https://raw.githubusercontent.com/arakilian0/images/master/snipx-template/github-installation-screenshot-v2.jpg
