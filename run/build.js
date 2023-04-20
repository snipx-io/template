import { production } from './scripts/webpack.js'
import manifest from './scripts/manifest.js'
import log from './scripts/log.js'

let compiler = production()

compiler.run((err, stats) => {
    // ...
    // console.log(stats)
    compiler.close((closeErr) => {
      // ...
      log.success(manifest('production'))
    });
});


log.start('run build')
log.end.pass('run build')