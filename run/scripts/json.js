import fs from 'fs'
import { log, plog, dlog } from './log.js'

export default {
    read: function (path) {
        if (!fs.existsSync(path)) {
            return undefined
        }
        return JSON.parse(fs.readFileSync(path))
    },
    write: function (path, data, mode) {
        try {
            fs.writeFileSync(
                path, JSON.stringify(data, null, 2)
            )
            if (mode==='development') log.passed(dlog.manifest[1])
            else if (mode==='production') log.passed(plog.manifest[1])
        } catch(writeErr) {
            if (mode==='development') { log.failed(dlog.manifest[0]); console.log(writeErr) }
            else if (mode==='production') { log.failed(plog.manifest[0]); console.log(writeErr) }
        }
    }
}