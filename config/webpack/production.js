import { merge } from 'webpack-merge'
import common from './common.js'

import HtmlPlugin from 'html-webpack-plugin'

export default merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new HtmlPlugin({
            filename: 'app.html',
            templateContent: `<html><body><div id="app"></div></body></html>`
        })
    ]
})