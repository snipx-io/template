# Chromium extension template
This template is for creating Chromium Extensions using React.js and TailwindCSS.

## How to use
1. First download the repository.
    ```
    git clone https://github.com/snipx-io/template.git
    ```
2. Then install dependencies.
    ```
    npm install
    ```
3. The [run](./run/) directory is where the building happens. Currently, there are two compilation scripts and one linting script:

    - [npm run dev](./run/dev.js)
        - bundle [webpack development mode](./config/webpack/development.js)
        - write [manifest development mode](./config/manifest/development.json)
        - webpack watches for changes
        - reload the extension every half second if change detected
            - current [hotreload script](./run/scripts/hotreload.js) updates extension, but closes popup
    - [npm run build](./run/build.js)
        - bundle [webpack production mode](./config/webpack/production.js)
        - write [manifest production mode](./config/manifest/production.json)
        - optional `--zip` argument
            - .zip the production bundle
    - [npm run lint](./run/lint.js)
        - lint all .js files using ESLint
        - optional `--fix` argument
            - passes *--fix* to ESLint CLI call

## Configure
All configs live in the [config](./config/) directory. Currently, you can configure:
- [Manifest](./config/manifest/)
- [Webpack](./config/webpack/)
- [ESLint](./config/.eslintrc.json)
- [TailwindCSS](./config/tailwindcss.js)

*Note: Manifest and Webpack have common, development, and production configs.*
## License
This project is [MIT licensed](./LICENSE).