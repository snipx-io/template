// Imports
import 'dotenv/config'
import fs from 'fs'
import deepmerge from 'deepmerge'
import p from '../data/path.js'

// Read JSON using absolute paths.
// Coming from 'p' (data/path.js).
function readJSON (file) {
    return JSON.parse(fs.readFileSync(file))
}

// Merge 'manifest_entry' with .env 'key'.
function merge (_key=undefined) {
    const common = readJSON(p.manifest_entry)
    return deepmerge(common, { key: _key })
}

export default function manifest(target='dev') {

    // Empty variable to store the merged data.
    let newManifestData

	// Create output folder
	if ( !fs.existsSync(p.output) ) { 
        fs.mkdirSync(p.output) 
    }

    // If 'target' is equal to 'prod' or 'production',
    // create the production manifest data.
    if (target === 'prod' || target === 'production') {
        // Get production data from .env* if any...
        newManifestData = merge(process.env.MANIFEST_PRODUCTION_KEY)
    }
    // In all other cases, create the development
    // manifest data instead.
    else {
        // Get development data from .env* if any...
        newManifestData = merge(process.env.MANIFEST_DEVELOPMENT_KEY)
    }

    // Up until this point, everything is still in memory. 
    // We have to create the actual file now. 
    console.log(newManifestData)

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