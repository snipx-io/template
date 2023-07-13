// Webpack Plugins
import CopyPlugin from 'copy-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'

// Imports
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import common from '../webpack.config.js'
import manifest from './lib/manifest.js'

// Use this object to merge with webpack.config.js
// dev.js is for development, build.js is for production
const developmentConfig = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'run/lib/hotreload.js', to: '' }],
		}),
		new HtmlPlugin({
			filename: '[name].html',
			templateContent:
				'<html><body><div id="app"></div><script src="hotreload.js"></script></body></html>',
		}),
	],
}

// Merge webpack.config.js with developmentConfig^
const compiler = webpack(merge(common, developmentConfig))

console.log('snipx: initialize project dev mode') // eslint-disable-line no-console

// Run the webpack compiler in watch mode...
// Build the manifest and check for errors.
compiler.watch(
	// https://webpack.js.org/configuration/watch/
	{
		aggregateTimeout: 300,
		poll: undefined,
	},
	err => {
		if (!err) {
			console.log('snipx: webpack had no issues') // eslint-disable-line no-console
			// MANIFEST
			manifest('development')
			console.log('snipx: watching for next change...') // eslint-disable-line no-console
		} else {
			console.log('snipx: webpack had no issues') // eslint-disable-line no-console
			console.log(err) // eslint-disable-line no-console
		}
	}
)
