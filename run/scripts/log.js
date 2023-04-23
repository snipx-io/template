import chalk from 'chalk' 

const start = chalk.bold.cyan
const error = chalk.bold.red
const warning = chalk.bold.yellow
const success = chalk.bold.green

export default {
    start: function (message) {
        console.log(start('🔧  ' + message))
    },
    error: function (message) {
        console.log(error('❌  ' + message))
    },
    warning: function (message) {
        console.log(warning('⚠️  ' + message))
    },
    success: function (message) {
        console.log(success('✅  ' + message))
    },
    end: {
        pass: function (message) {
            console.log(success('🚀  ' + message))
        }, 
        fail: function (message) {
            console.log(error('🛑  ' + message))
        }
    }
}