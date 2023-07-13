// Imports
import { readFileSync, existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'
import bestzip from 'bestzip'
import path from './path.js'

// Read JSON using absolute paths.
function readJSON(file) {
	return JSON.parse(readFileSync(file))
}

// Reference to meta data to build the filename.
const pkg = readJSON(path.package_json)

// pkg is for package.json.
const filename = `${pkg.name}-${pkg.version}.zip`

export default function zip() {
	// Create the output_zip folder if it doesn't exist.
	if (!existsSync(path.output_zip)) {
		mkdirSync(path.output_zip)
	} else if (existsSync(join(path.output_zip, filename))) {
		// If the old distributable has the exact same filename, delete the old.
		rmSync(join(path.output_zip, filename), {
			recursive: true,
			force: true,
		})
	}

	// Calls native 'zip' command if available,
	// or falls back to a Node.js implementation.
	// https://www.npmjs.com/package/bestzip
	bestzip({
		source: '*', // zip all contents
		cwd: path.output, // from output
		destination: join(path.output_zip, filename), // into (output_zip) + (filename)
	})
		// SUCCESS
		.then(() => {
			console.log('snipx: create .zip distributable') // eslint-disable-line no-console
			console.log(`snipx: ${join(path.output_zip, filename)}`) // eslint-disable-line no-console
		})
		// ERROR
		.catch(err => {
			console.log('snipx: bestzip ran into some issue...') // eslint-disable-line no-console
			console.error(err.stack) // eslint-disable-line no-console
			process.exit(1)
		})
}
