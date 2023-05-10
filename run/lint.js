import { execSync } from 'child_process'
import { log, lintlog } from './scripts/log.js'

if (process.env.npm_config_fix) {
	log.start(lintlog.startFix)
	execSync('prettier --write .', { stdio: 'inherit' })
	log.passed(lintlog.fixed)
} else {
	log.start(lintlog.startNoFix)
	execSync('eslint .', { stdio: 'inherit' })
}

log.passed(lintlog.end)
