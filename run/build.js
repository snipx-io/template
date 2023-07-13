// Webpack Plugins
import HtmlPlugin from 'html-webpack-plugin'

// Imports
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import commonConfig from '../webpack.config.js'
import manifest from './lib/manifest.js'
import zip from './lib/zip.js'

// Use this object to merge with webpack.config.js
// build.js is for production, dev.js is for development
const productionConfig = {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new HtmlPlugin({
			filename: '[name].html',
			templateContent: '<html><body><div id="app"></div></body></html>',
		}),
	],
}

// Merge webpack.config.js with productionConfig^
const webpackCompiler = webpack(merge(commonConfig, productionConfig))

// Run the webpack compiler with some conditions...
// If 'buildManifest' == true, only then will we trigger
// a manifest build as well.
function runWebpackCompiler(buildManifest, buildZip) {
	// Begin webpack.
	webpackCompiler.run(err => {
		if (err) console.log(err) // eslint-disable-line no-console
		// Close webpack.
		webpackCompiler.close(closeErr => {
			if (!closeErr) {
				console.log('snipx: webpack had no issues') // eslint-disable-line no-console
				// Check for manifest build option.
				// MANIFEST
				if (buildManifest === true) {
					manifest('production')
				}
				if (buildZip === true) {
					zip()
				}
			} else {
				console.log('snipx: webpack ran into issues...') // eslint-disable-line no-console
				return console.log(closeErr) // eslint-disable-line no-console
			}
			console.log('snipx: ready for publishing!') // eslint-disable-line no-console
			return true
		})
	})
}

// 'npm run build --webpack'
if (process.env.npm_config_webpack) {
	console.log('snipx: initialize webpack build') // eslint-disable-line no-console
	// Run compiler with manifest option set to false.
	runWebpackCompiler(false)
}
// 'npm run build --manifest'
else if (process.env.npm_config_manifest) {
	// Run just the manifest script alone.
	manifest('production')
}
// 'npm run build --zip'
else if (process.env.npm_config_zip) {
	console.log('snipx: initialize project build') // eslint-disable-line no-console
	// Run just the manifest script alone.
	runWebpackCompiler(true, true)
}
// 'npm run build'
else {
	console.log('snipx: initialize project build') // eslint-disable-line no-console
	// Run the compiler and build the manifest.
	runWebpackCompiler(true)
}
