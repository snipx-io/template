import chalk from 'chalk'

const start = chalk.bold.cyan
const error = chalk.bold.red
const success = chalk.bold.green
const end = chalk.bold.magenta

export default {
	start(message) {
		console.log(start(`🔧  ${message}`)) // eslint-disable-line no-console
	},
	failed(message) {
		console.log(error(`❌  ${message}`)) // eslint-disable-line no-console
	},
	passed(message) {
		console.log(success(`✅  ${message}`)) // eslint-disable-line no-console
	},
	end(message) {
		console.log(end(`👀  ${message}`)) // eslint-disable-line no-console
	}
}
