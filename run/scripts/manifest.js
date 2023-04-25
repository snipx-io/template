import fs from 'fs'
import path from 'path'
import json from './json.js'
import merge from 'deepmerge'

let manifestCommon, 
    manifestTarget, 
    manifestOutDir = path.resolve('out', 'build'),
    manifestConfigDir = path.resolve('config', 'manifest')

export default function (mode='development') {
    // Check for valid argument
    if (mode !== 'development' && mode !== 'production') {
        mode = 'development'
    }

    // Create output folder
    if (!fs.existsSync(path.resolve('out'))) {
        fs.mkdirSync(path.resolve('out'))
        // Create output build folder
        if (!fs.existsSync(manifestOutDir)) {
            fs.mkdirSync(manifestOutDir)
        }
    }
    
    // Assign common manifest data
    manifestCommon = json.read(
        path.join(manifestConfigDir, 'common.json')
    )

    // Assign target manifest data
    switch (mode) {
        case 'development':
            manifestTarget = json.read(
                path.join(manifestConfigDir, `${mode}.json`)
            )
            break;
        case 'production':
            manifestTarget = json.read(
                path.join(manifestConfigDir, `${mode}.json`)
            )
            break;
    }
    
    // Write the manifest.json file
    json.write(
        path.join(manifestOutDir, 'manifest.json'), 
        merge(manifestCommon, manifestTarget),
        mode
    )

    return true
}