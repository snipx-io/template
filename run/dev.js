import { development } from './scripts/webpack.js'
import manifest from './scripts/manifest.js'
import { log, dlog } from './scripts/log.js'

const compiler = development()

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
