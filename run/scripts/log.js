import chalk from 'chalk' 

const start = chalk.bold.cyan
const error = chalk.bold.red
const success = chalk.bold.green
const watch = chalk.bold.magenta

export const log = {
    start: function (message) { console.log(start('🔧  ' + message)) },
    failed: function (message) { console.log(error('❌  ' + message)) },
    passed: function (message) { console.log(success('✅  ' + message)) },
    watch: function (message) { console.log(watch('👀  ' + message)) }
}

export const dlog = {
    start: 'initializing development bundle\n',
    watch: 'watching for next change... \n================================',
    bundle: [
        'bundle failed in development mode', // fail
        'bundled development mode' // pass
    ],
    manifest: [
        'manifest development mode failed', //fail
        'wrote manifest development mode' // pass
    ]
}

export const plog = {
    start: 'initializing production bundle\n',
    bundle: [
        'bundle failed in production mode', // fail
        'bundled production mode' // pass
    ],
    manifest: [
        'manifest production mode failed', // fail
        'wrote manifest production mode' // pass
    ],
    zip: [
        'production mode zip failed', // fail
        'zipped in production mode' // pass
    ]
}