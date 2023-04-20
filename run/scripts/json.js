import fs from 'fs'

export default {
    read: function (path) {
        if (!fs.existsSync(path)) {
            return undefined
        }
        return JSON.parse(fs.readFileSync(path))
    },
    write: function (path, data) {
        fs.writeFileSync(
            path, JSON.stringify(data, null, 2)
        )
        console.log('wrote manifest file to ' + path)
    }
}