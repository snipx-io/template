// Imports
import 'dotenv/config'
import {
    writeFileSync,
    readFileSync,
    existsSync,
    mkdirSync,
} from 'fs'
import deepmerge from 'deepmerge'
import path from '../data/path.js'
import { sep } from 'path'

const pkg = readJSON(path.package_json)

// Read JSON using absolute paths.
function readJSON (file) {
    return JSON.parse(readFileSync(file))
}

export default function manifest(target='dev') {

    // Variables
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

	// Create output folder
	if ( !existsSync(path.output) ) {
        mkdirSync(path.output)
    }

    // PRODUCTION
    if (target === 'prod' || target === 'production') {
        if (process.env.MANIFEST_PRODUCTION_KEY) {
            localManifest["key"] = process.env.MANIFEST_PRODUCTION_KEY
        }
        compiledManifest = deepmerge(localManifest, mainManifest)
    }

    // DEVELOPMENT
    else {
        if (process.env.MANIFEST_DEVELOPMENT_KEY) {
            localManifest["key"] = process.env.MANIFEST_DEVELOPMENT_KEY
        }
        compiledManifest = deepmerge(localManifest, mainManifest)
    }

    // Try/Catch while using fs sync methods for errors.
    try {
        writeFileSync(
            // First argument: absolute path w/ filename.
            path.manifest_output,
            // Second: the data to write into the file.
            JSON.stringify(compiledManifest, null, 2)
        )
    } catch (writeErr) {
        // Log any errors.
        console.log(writeErr)
    }
}