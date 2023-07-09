import webpack from 'webpack'
import { merge } from 'webpack-merge'
import common from '../webpack.config.js'

// Development Plugins
import CopyPlugin from 'copy-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'

import manifest from './lib/manifest.js'
import { log, dlog } from './lib/log.js'

const developmentConfig = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'run/lib/hotreload.js', to: '' }]
		}),
		new HtmlPlugin({
			templateContent: '<html><body><div id="app"></div><script src="hotreload.js"></script></body></html>'
		})
	]
}

const compiler = webpack(
	merge(common, developmentConfig)
)

log.start(dlog.start)

compiler.watch(
	{
		aggregateTimeout: 300,
		poll: undefined,
	},
	err => {
		if (!err) {
			log.passed(dlog.bundle[1])
			manifest('development')
			log.watch(dlog.watch)
		} else {
			log.failed(dlog.bundle[0])
			console.log(err) // eslint-disable-line no-console
		}
	}
)
