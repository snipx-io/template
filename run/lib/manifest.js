// Imports
import 'dotenv/config'
import fs from 'fs'
import deepmerge from 'deepmerge'
import p from '../../data/path.js'

// Read JSON using absolute paths.
function readJSON (file) {
    return JSON.parse(fs.readFileSync(file))
}

export default function manifest(target='dev') {

    // Variables
    let newManifestData
    const common = readJSON(p.manifest_entry)

	// Create output folder
	if ( !fs.existsSync(p.output) ) { 
        fs.mkdirSync(p.output) 
    }

    // PRODUCTION
    if (target === 'prod' || target === 'production') {
        if (process.env.MANIFEST_PRODUCTION_KEY) {
            newManifestData = deepmerge(common, { key: process.env.MANIFEST_PRODUCTION_KEY })
        }
        else {
            newManifestData = deepmerge(common)
            console.log('no prod key .env file')
        }
    }

    // DEVELOPMENT
    else {
        if (process.env.MANIFEST_DEVELOPMENT_KEY) {
            newManifestData = deepmerge(common, { key: process.env.MANIFEST_DEVELOPMENT_KEY })
        }
        else {
            newManifestData = deepmerge(common)
            console.log('no dev key .env file')
        }
    }

    // Try/Catch while using fs sync methods for errors.
    try {
        fs.writeFileSync(
            // First argument: absolute path w/ filename.
            p.manifest_output, 
            // Second: the data to write into the file.
            JSON.stringify(newManifestData, null, 2)
        )
    } catch (writeErr) {
        // Log any errors.
        console.log(writeErr)
    }
}