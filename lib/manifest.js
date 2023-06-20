import fs from 'fs'
import deepmerge from 'deepmerge'
import p from '../data/path.js'

// Read JSON using absolute paths.
// Coming from 'p' (data/path.js).
function readJSON (file) {
    return JSON.parse(fs.readFileSync(file))
}

// Merge common manifest with '_target'.
function merge (_target) {
    const common = readJSON(p.manifest('common'))
    return deepmerge(common, readJSON(p.manifest(_target)))
}

export default function manifest(target='dev') {

    // Empty variable to store the merged data.
    let newManifestData

	// Create output folder
	if ( !fs.existsSync(p.build) ) { 
        fs.mkdirSync(p.build) 
    }

    // If 'target' is equal to 'prod' or 'production',
    // create the production manifest data.
    if (target === 'prod' || target === 'production') {
        newManifestData = merge('production')
    }
    // In all other cases, create the development
    // manifest data instead.
    else {
        newManifestData = merge('development')
    }

    // Up until this point, everything is still in memory. 
    // We have to create the actual file now. 
    console.log(newManifestData)

    // Try/Catch while using fs sync methods for errors.
    try {
        fs.writeFileSync(
            // First argument: absolute path w/ filename.
            p.manifest('build'), 
            // Second: the data to write into the file.
            JSON.stringify(newManifestData, null, 2)
        )
    } catch (writeErr) {
        // Log any errors.
        console.log(writeErr)
    }
}

// manifest('prod')