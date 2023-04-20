import webpack from 'webpack'
import webpackConfigDev from '../../config/webpack/development.js'
import webpackConfigProd from '../../config/webpack/production.js'

export default {
    development: function () {
        return webpack(webpackConfigDev)
    },
    production: function () {
        return webpack(webpackConfigProd)
    }
}