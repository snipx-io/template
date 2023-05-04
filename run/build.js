import { production } from './scripts/webpack.js';
import manifest from './scripts/manifest.js';
import zip from './scripts/zip.js';
import { log, plog } from './scripts/log.js';

const compiler = production();

log.start(plog.start);

compiler.run((err, stats) => {
  compiler.close((closeErr) => {
    if (!closeErr) {
      log.passed(plog.bundle[1]);
      manifest('production');
      if (process.env.npm_config_zip) zip();
    } else {
      log.failed(plog.bundle[0]);
      console.log(closeErr);
    }
  });
});
