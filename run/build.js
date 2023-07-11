// Imports
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import commonConfig from '../webpack.config.js'
import manifest from './lib/manifest.js'

// Webpack Plugins
import HtmlPlugin from 'html-webpack-plugin'

// Use this object to merge with webpack.config.js
// build.js is for production, dev.js is for development
const productionConfig = {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new HtmlPlugin({
			filename: '[name].html',
			templateContent: '<html><body><div id="app"></div></body></html>'
		})
	]
}

// Merge webpack.config.js with productionConfig^
const webpackCompiler = webpack(
	merge(commonConfig, productionConfig)
)

// Run the webpack compiler with some conditions...
// If 'buildManifest' == true, only then will we trigger
// a manifest build as well.
function runWebpackCompiler (buildManifest) {
	webpackCompiler.run(err => {
		if (err) console.log(err) // eslint-disable-line no-console
		webpackCompiler.close(closeErr => {
			if (!closeErr) {
				console.log('snipx: webpack has no issues')
				if(buildManifest === true) manifest('production')
				console.log('snipx: ready to host your application!')
			} else {
				console.log('snipx: webpack ran into issues...')
				return console.log(closeErr) // eslint-disable-line no-console
			}
		})
	})
}

// 'npm run build --webpack'
if (process.env.npm_config_webpack) {
	console.log('snipx: initialize webpack build')
	// Run compiler with manifest option set to false.
	runWebpackCompiler(false)
}
// 'npm run build --manifest'
else if (process.env.npm_config_manifest) {
	// Run just the manifest script alone.
	manifest('production')
}
// 'npm run build'
else {
	console.log('snipx: initialize project build')
	// Run the compiler and build the manifest.
	runWebpackCompiler(true)
}