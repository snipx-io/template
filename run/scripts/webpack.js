import webpack from 'webpack'
import webpackConfig from '../../config/webpack/production.js'

const compiler = webpack(webpackConfig)

export default compiler