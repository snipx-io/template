import chalk from 'chalk'

function formatMessage (_style, __message, _icon) {
	return _style(`${_icon} ${__message}`)
}

export default function log (_message, event, _mode='dev') {
	let mode
	let message
	let style
	let icon

	if (!_message) return undefined
	if (!event) return console.log(_message)

	switch (_mode) {
		case 'dev':
		case 'development':
			mode = 'development'
			break
		case 'prod':
		case 'production':
			mode = 'production'
			break
		default: mode = 'development'
	}

	switch (event) {
		case 'start':
			icon = '🟡'
			style = chalk.bold.yellow
			break
		case 'success':
			icon = '🟢'
			style = chalk.bold.green
			break
		case 'error':
			icon = '🔴'
			style = chalk.bold.red
			break
		case 'end':
			icon = '🔵'
			style = chalk.bold.blue
			break
		case 'watch':
			icon = '👀'
			style = chalk.bold.magenta
			break
		default: return undefined
	}

	if (_message.includes('$')) {
		// Split message into words/array
		let msgs = _message.split(' ')
		// Find and replace $ for 'mode'
		for(let i = 0; i < msgs.length; i++) {
			if(msgs[i] === '$') {
				msgs[i] = mode
			}
		}
		message = msgs.join(' ')
	}

	console.log(formatMessage(style, message, icon))
}