import { resolve, join } from 'path'

const _src = 'src'
const _app = 'App.jsx'
const _styles = 'styles'

const _build = 'build'
const _dist = 'dist'

const _manifest = '@manifest'
const _manifestDev = 'development.json'
const _manifestProd = 'production.json'
const _manifestCommon = 'common.json'

export default {
    // src/App.jsx
    app: join(resolve(_src), _app),
    // src/styles/
    styles: join(resolve(_src), _styles),
    // build/
    build: resolve(_build),
    // dist/
    dist: resolve(_dist),

    // Takes an argument to return a specific manifest path.
    manifest: (target) => {
        // Set default path for manifest files.
        let manifestPath = resolve(_manifest)
        // Return best option for given target.
        switch (target) {
            // build/manifest.json
            case 'build': 
                return join(resolve(_build), 'manifest.json')
            // @manifest/common.json
            case 'common': 
                return join(manifestPath, _manifestCommon)
            // @manifest/development.json
            case 'dev': 
            case 'development': 
                return join(manifestPath, _manifestDev)
            // @manifest/production.json
            case 'prod': 
            case 'production': 
                return join(manifestPath, _manifestProd)
            // @manifest/
            default: 
                return manifestPath
        }
    }
}