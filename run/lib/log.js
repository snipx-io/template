import chalk from 'chalk'

function compiledMessage (_message, _mode) {
	let mode

	// Set the mode to either 'production or development'
	if (_mode === 'prod' || _mode === 'production') mode = 'production'
	else mode = 'development'

	if (_message.includes('$')) {
		// Split message into words/array
		let msgs = _message.split(' ')
		// Find and replace $ for 'mode'
		for(let i = 0; i < msgs.length; i++) {
			if(msgs[i] === '$') {
				msgs[i] = mode
			}
		}
		return msgs.join(' ')
	}

	return _message
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
