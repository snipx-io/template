import fs from 'fs'
import log from './log.js'

export default {
    read: function (path) {
        if (!fs.existsSync(path)) {
            return undefined
        }
        return JSON.parse(fs.readFileSync(path))
    },
    write: function (path, data) {
        try {
            fs.writeFileSync(
                path, JSON.stringify(data, null, 2)
            )
            log.success('manifest file built successfully')
        } catch(err) {
            log.error('manifest file did not build successfully')
        }
    }
}