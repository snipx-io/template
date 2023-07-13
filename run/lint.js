// Imports
import { ESLint } from 'eslint'
import { existsSync } from 'fs'
import { resolve } from 'path'

// Variables
let fix
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
	fix = true
} else {
	fix = false
}

// Check each argument provided to see if it's a valid file.
// If it is, add it to the 'files' array if it doesn't already exist.
for (let i = 0; i < commands.length; i += 1) {
	if (validFile(commands[i]) && !files.includes(validFile(commands[i]))) {
		files.push(validFile(commands[i]))
	}
}

// If there are no validated files at all.
if (files.length === 0) {
	files = [resolve()]
}

// If / (root) was added to the array, remove everything else.
if (files.includes(resolve())) {
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

// Run ESLint. Already configured to work with Prettier.
runESLint()
