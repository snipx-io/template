// Imports
import 'dotenv/config'
import {
    writeFileSync,
    readFileSync,
    existsSync,
    mkdirSync,
} from 'fs'
import { sep } from 'path'
import deepmerge from 'deepmerge'
import path from './path.js'

// Reference to meta data to build the manifest.
const pkg = readJSON(path.package_json)

// Read JSON using absolute paths.
function readJSON (file) {
    return JSON.parse(readFileSync(file))
}

export default function manifest(target='dev') {

    // Variables
		let mode
    let compiledManifest
    const mainManifest = readJSON(path.manifest_entry)
    // Split the webpack entry path provided by 'path'
    let dirSplit = path.webpack_entry.split(sep)
    // Split the last element(filename) by '.'
    let fileSplit = dirSplit[dirSplit.length-1].split('.')
    // Replace file extension with 'html'
    fileSplit[fileSplit.length-1] = 'html'
    // Then join it all back together in lowercase form
    let file = fileSplit.join('.').toLocaleLowerCase()

		// Use this object to merge with manifest.json
    let localManifest = {
        // This template is built for Chrome Manifest Version 3.
        // https://developer.chrome.com/docs/extensions/mv3/intro
        manifest_version: '3',
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        action: {
            default_title: pkg.name,
            default_popup: file
        }
    }

		console.log('snipx: initialize manifest build') // eslint-disable-line no-console

		// Create the output folder if it doesn't exist.
		if ( !existsSync(path.output) ) {
        mkdirSync(path.output)
  	}

		// Set the build mode.
		switch (target) {
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

		// Check if a local '.env' file has the entry of
		// 'MANIFEST_PRODUCTION_KEY' or 'MANIFEST_DEVELOPMENT_KEY'
		// If so, add that key to the manifest.
		if (process.env.MANIFEST_PRODUCTION_KEY) {
			localManifest["key"] = process.env.MANIFEST_PRODUCTION_KEY
		}
		if (process.env.MANIFEST_DEVELOPMENT_KEY) {
			localManifest["key"] = process.env.MANIFEST_DEVELOPMENT_KEY
		}

		// The manifest.json in the root of the project takes precedence.
		// localManifest being the object created in this script
		// mainManifest being the JSON file in the root of the project
		compiledManifest = deepmerge(localManifest, mainManifest)

    // Try/Catch while using fs sync methods for errors.
    try {
        writeFileSync(
          // First argument: absolute path w/ filename.
          path.manifest_output,
          // Second: the data to write into the file.
          JSON.stringify(compiledManifest, null, 2)
        )
				return console.log('snipx: manifest had no issues') // eslint-disable-line no-console
    } catch (writeErr) {
        // Log any errors.
				console.log('snipx: unable to create manifest.json') // eslint-disable-line no-console
        return console.log(writeErr) // eslint-disable-line no-console
    }
}