import { development } from './scripts/webpack.js'
import manifest from './scripts/manifest.js'
import log from './scripts/log.js'

let compiler = development()

log.start('initializing development mode')

compiler.watch(
    {
        // Example
        aggregateTimeout: 300,
        poll: undefined,
    },
    (err, stats) => {
        // Print watch/build result here...
        if (!err) {
            log.success('bundled development mode')
            manifest('development')
            log.end.pass('ready to try out in browser!')
            console.log('================================')
        }
        else {
            log.end.fail('bundle failed, read below to find out why:')
            console.log(err)
        }
    }
)