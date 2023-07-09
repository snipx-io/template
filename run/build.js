import webpack from 'webpack'
import { merge } from 'webpack-merge'
import common from '../webpack.config.js'

// Production Plugins
import HtmlPlugin from 'html-webpack-plugin'

import manifest from './lib/manifest.js'
// import { log, plog } from './lib/log.js'

const productionConfig = {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new HtmlPlugin({
			templateContent: '<html><body><div id="app"></div></body></html>'
		})
	]
}

const compiler = webpack(
	merge(common, productionConfig)
)

// log.start(plog.start)

function runWebpackCompiler (buildManifest) {
	compiler.run(err => {
		if (err) console.log(err) // eslint-disable-line no-console
		compiler.close(closeErr => {
			if (!closeErr) {
				// log.passed(plog.bundle[1])
				if(buildManifest === true) manifest('production')
			} else {
				// log.failed(plog.bundle[0])
				console.log(closeErr) // eslint-disable-line no-console
			}
		})
	})
}

if (process.env.npm_config_W || process.env.npm_config_webpack) {
	runWebpackCompiler(false)
}
else if (process.env.npm_config_M || process.env.npm_config_manifest) {
	manifest('production')
}
else {
	runWebpackCompiler(true)
}