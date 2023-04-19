import chalk from 'chalk'
import compiler from './scripts/webpack.js'
import manifest from './scripts/manifest.js'

compiler.run((err, stats) => {
    // ...
    // console.log(stats)
    compiler.close((closeErr) => {
      // ...
      console.log(manifest('production'))
    });
  });


console.log(chalk.red('run build'))