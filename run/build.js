import webpack from 'webpack'
import prodConfig from '../@webpack/webpack.prod.js' 

import manifest from './scripts/manifest.js'
import zip from './scripts/zip.js'
import { log, plog } from './scripts/log.js'

const compiler = webpack(prodConfig)

log.start(plog.start)

compiler.run(err => {
	if (err) console.log(err) // eslint-disable-line no-console
	compiler.close(closeErr => {
		if (!closeErr) {
			log.passed(plog.bundle[1])
			manifest('production')
			if (process.env.npm_config_zip) zip()
		} else {
			log.failed(plog.bundle[0])
			console.log(closeErr) // eslint-disable-line no-console
		}
	})
})
