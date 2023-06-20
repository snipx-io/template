import webpack from 'webpack'
import prodConfig from '../@webpack/webpack.prod.js'

import manifest from '../lib/manifest.js'
import { log, plog } from '../lib/log.js'

const compiler = webpack(prodConfig)

log.start(plog.start)

function runWebpackCompiler (buildManifest) {
	compiler.run(err => {
		if (err) console.log(err) // eslint-disable-line no-console
		compiler.close(closeErr => {
			if (!closeErr) {
				log.passed(plog.bundle[1])
				if(buildManifest === true) manifest('production')
			} else {
				log.failed(plog.bundle[0])
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