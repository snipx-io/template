import chalk from 'chalk'

function compiledMessage (_message, _mode) {
	if (_message.includes('$')) {
		if (_mode === 'prod' || _mode === 'production') {
			return _message.replace('$', 'production')
		} else {
			return _message.replace('$', 'development')
		}
	}
}

export default {
	start(message, mode='dev') {
		console.log(chalk.bold.yellow(`🟡  ${compiledMessage(message, mode)}`)) // eslint-disable-line no-console
	},
	error(message, mode='dev') {
		console.log(chalk.bold.red(`🔴  ${compiledMessage(message, mode)}`)) // eslint-disable-line no-console
	},
	success(message, mode='dev') {
		console.log(chalk.bold.green(`🟢  ${compiledMessage(message, mode)}`)) // eslint-disable-line no-console
	},
	end(message, mode='dev') {
		console.log(chalk.bold.blue(`🔵  ${compiledMessage(message, mode)}`)) // eslint-disable-line no-console
	},
	watch(message, mode='dev') {
		console.log(chalk.bold.magenta(`👀  ${compiledMessage(message, mode)}`)) // eslint-disable-line no-console
	}
}
