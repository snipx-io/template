import webpack from 'webpack'
import devConfig from '../@webpack/webpack.dev.js'

import manifest from '../lib/manifest.js'
import { log, dlog } from '../lib/log.js'

const compiler = webpack(devConfig)

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
