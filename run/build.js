import chalk from 'chalk'
import runWebpack from './scripts/webpack.js'
import manifest from './scripts/manifest.js'

let compiler = runWebpack.production()

compiler.run((err, stats) => {
    // ...
    // console.log(stats)
    compiler.close((closeErr) => {
      // ...
      console.log(manifest('production'))
    });
});


console.log(chalk.red('run build'))