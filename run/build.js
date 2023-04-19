import chalk from 'chalk'
import compiler from './scripts/webpack.js'


compiler.run((err, stats) => {
    // ...
  
    compiler.close((closeErr) => {
      // ...
    });
  });

console.log(chalk.red('run build'))