import chalk from 'chalk' 

const start = chalk.bold.cyan
const error = chalk.bold.red
const success = chalk.bold.green

export const log = {
    start: function (message) { console.log(start('🔧  ' + message)) },
    failed: function (message) { console.log(error('❌  ' + message)) },
    passed: function (message) { console.log(success('✅  ' + message)) },
    watch: function (message) { console.log(success('👀  ' + message)) }
}

export const dlog = {
    watch: 'watching for next change...',
    bundle: [
        'initializing bundle development mode', // start
        'bundled development mode', // pass
        'bundle failed in development mode' // fail
    ],
    manifest: [
        'initializing manifest development mode', // start
        'wrote manifest development mode', // pass
        'manifest development mode failed' //fail
    ]
}

export const plog = {
    bundle: [
        'initializing bundle production mode', // start
        'bundled production mode', // pass
        'bundle failed in production mode' // fail
    ],
    manifest: [
        'initializing manifest production mode', // start
        'wrote manifest production mode', // pass
        'manifest production mode failed' // fail
    ]
}