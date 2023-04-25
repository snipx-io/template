import { production } from './scripts/webpack.js'
import manifest from './scripts/manifest.js'
import { log, plog }  from './scripts/log.js'

let compiler = production()

log.start(plog.bundle[0])

compiler.run((err, stats) => {
    compiler.close((closeErr) => {
      if (!closeErr) {
        log.passed(plog.bundle[1])
        manifest('production')
      }
      else {
        log.failed(plog.bundle[2])
        console.log(closeErr)
      }
    })
})
