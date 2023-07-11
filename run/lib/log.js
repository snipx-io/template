import chalk from 'chalk'

export default {
	start(message) {
		console.log(chalk.bold.yellow(`🟡  ${message}`)) // eslint-disable-line no-console
	},
	error(message) {
		console.log(chalk.bold.red(`🔴  ${message}`)) // eslint-disable-line no-console
	},
	success(message) {
		console.log(chalk.bold.green(`🟢  ${message}`)) // eslint-disable-line no-console
	},
	end(message) {
		console.log(chalk.bold.blue(`🔵  ${message}`)) // eslint-disable-line no-console
	},
	watch(message) {
		console.log(chalk.bold.magenta(`👀  ${message}`)) // eslint-disable-line no-console
	}
}
