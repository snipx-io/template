// Imports
import { ESLint } from 'eslint'
import { existsSync } from 'fs'
import { resolve } from 'path'
// eslint-disable-next-line
import shell from 'shelljs'

// Variables
let fix
let pretty
// Store validated files here.
let files = []
// Reference to the additional arguments.
// npm run lint [alpha] [bravo] [charlie]
const commands = process.argv.slice(2)

// Check if a given file exists.
// If it does, return the absolute path.
function validFile(file) {
	if (!existsSync(resolve(file))) {
		return undefined
	}
	return resolve(file)
}

// Set the user defined option of --fix if present.
// Used in runESLint (line 58 and 60).
if (process.env.npm_config_fix) {
	pretty = '--write'
	fix = true
} else {
	pretty = '--check'
	fix = false
}

// Check each argument provided to see if it's a valid file.
// If it is, add it to the 'files' array if it doesn't already exist.
for (let i = 0; i < commands.length; i += 1) {
	if (validFile(commands[i]) && !files.includes(validFile(commands[i]))) {
		files.push(validFile(commands[i]))
	}
}

// If there are validated files, check if 'root' is in the bunch.
if (files.length >= 1) {
	// If / (root) was added to the array, remove everything else.
	if (files.includes(resolve())) {
		files = [resolve()]
	}
} else {
	// If no valid files, make / (root) the entry point.
	files = [resolve()]
}

console.log('snipx: initialize project linter') // eslint-disable-line no-console
console.log('snipx: include the following file(s)') // eslint-disable-line no-console
console.log('snipx:', files) // eslint-disable-line no-console

// Now we can run ESLint!
// https://eslint.org/docs/latest/integrate/nodejs-api#eslint-class
function runESLint() {
	// eslint-disable-next-line
	(async function main() {
		const eslint = new ESLint({ fix })
		const results = await eslint.lintFiles(files)
		if (fix) {
			await ESLint.outputFixes(results)
		}
		const formatter = await eslint.loadFormatter('stylish')
		const resultText = formatter.format(results)
		// If there are results ("errors"), log them to the console.
		if (resultText) {
			console.log(resultText) // eslint-disable-line no-console
		} else {
			console.log('snipx: file(s) provided cleared 👍') // eslint-disable-line no-console
		}
	})().catch(error => {
		process.exitCode = 1
		console.error(error) // eslint-disable-line no-console
	})
}

// Implementation of Prettier API.
function runPrettier() {
	let command
	files.forEach(file => {
		command = `prettier ${file} ${pretty}`
	})
	shell.exec(command)
	// if (shell.exec(command).code !== 0) {
	// 	shell.echo('Error: prettier failed')
	// 	shell.exit(1)
	// }
}

// Run ESLint. Already configured to work with Prettier.
runESLint()
runPrettier()
