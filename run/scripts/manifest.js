import fs from 'fs'
import path from 'path'

let manifest = JSON.parse(fs.readFileSync(
    path.resolve(`manifest.json`)))

export default function (mode) {
    if (!fs.existsSync(path.resolve('out'))) {
        fs.mkdirSync(path.resolve('out'))
    }
    if (!fs.existsSync(path.resolve('out', 'build'))) {
        fs.mkdirSync(path.resolve('out', 'build'))
    }

    fs.writeFileSync(
        path.resolve('out', 'build', 'manifest.json'), 
        JSON.stringify(manifest, null, 2)
    )
    
    return true
}