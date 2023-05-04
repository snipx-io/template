import chalk from 'chalk';

const start = chalk.bold.cyan;
const error = chalk.bold.red;
const success = chalk.bold.green;
const watch = chalk.bold.magenta;

export const log = {
  start(message) { console.log(start(`🔧  ${message}`)); }, // eslint-disable-line no-console
  failed(message) { console.log(error(`❌  ${message}`)); }, // eslint-disable-line no-console
  passed(message) { console.log(success(`✅  ${message}`)); }, // eslint-disable-line no-console
  watch(message) { console.log(watch(`👀  ${message}`)); }, // eslint-disable-line no-console
};

export const dlog = {
  start: 'initializing development bundle\n',
  watch: 'watching for next change... \n================================',
  bundle: [
    'bundle failed in development mode', // fail
    'bundled development mode', // pass
  ],
  manifest: [
    'manifest development mode failed', // fail
    'wrote manifest development mode', // pass
  ],
};

export const plog = {
  start: 'initializing production bundle\n',
  bundle: [
    'bundle failed in production mode', // fail
    'bundled production mode', // pass
  ],
  manifest: [
    'manifest production mode failed', // fail
    'wrote manifest production mode', // pass
  ],
  zip: [
    'production mode zip failed', // fail
    'zipped in production mode', // pass
  ],
};
