// Imports
import chalk from 'chalk'

// Styles the final output and adds an icon
function formatMessage (_style, __message, _icon) {
	return _style(`${_icon} ${__message}`)
}

// Reason for the underscore is because we eventually change the final result.
// The result we want, we store inside a variable without the underscore.
// Here, event's value never changes so it doesn't have an underscore.
export default function log (_message, event, _mode='dev') {
	// Here, we create the empty variables that will eventually hold
	// the final results we're looking for.
	let mode
	let message

	// 'style' and 'icon' hold the formatting options if any.
	// They are set in a switch statement starting on line 40 & 41...
	let style
	let icon

	// If no message, exit script.
	if (!_message) return undefined
	// If message but no event, log with no formatting.
	if (!event) return console.log(_message)

	// Set the mode for the script.
	// If none, set to 'development' as default
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

	// Based on the event, set the formatting options for the log.
	// If invalid event option, log with no formatting.
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
		default: return console.log(_message)
	}

	// Here, we check if the message includes a target.
	// In this case it's the '$' dollar sign.
	if (_message.includes('$')) {
		// Split message into words/array
		let msgs = _message.split(' ')
		// Find and replace $ for 'mode'
		for(let i = 0; i < msgs.length; i++) {
			if(msgs[i] === '$') {
				msgs[i] = mode
			}
		}
		// Join it all back together.
		message = msgs.join(' ')
	}

	// The final result.
	return console.log(formatMessage(style, message, icon))
}