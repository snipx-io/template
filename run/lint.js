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
console.log('snipx:', files, '\n') // eslint-disable-line no-console

// Implementation of ESLint (API).
// https://eslint.org/docs/latest/integrate/nodejs-api#eslint-class
function runESLintAPI() {
	;(async function main() {
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

// Before running ESLint, check if it's a .js file.
function runESLint() {
	if (files[0] !== resolve()) {
		files.forEach(file => {
			if (file.substr(file.length - 3) === '.js') {
				runESLintAPI()
			} else {
				console.log('snipx: no "js/jsx" file detected') // eslint-disable-line no-console
				console.log('snipx: eslint turned off for this process \n') // eslint-disable-line no-console
			}
		})
	} else {
		runESLintAPI()
	}
}

// Implementation of Prettier (CLI).
// https://prettier.io/docs/en/cli.html
function runPrettier() {
	// Run on every file entry.
	// Update this implementation to allow globs as well as files.
	files.forEach(file => {
		try {
			shell.exec(`prettier ${file} ${pretty}`)
		} catch (execError) {
			console.error(execError) // eslint-disable-line no-console
		}
	})
	// Add line for readability in the console.
	console.log('') // eslint-disable-line no-console
}

// Run ESLint and Prettier.
runESLint()
runPrettier()
