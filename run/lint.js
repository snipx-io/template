import { execSync } from 'child_process';
import { log, lintlog } from './scripts/log.js';

if (process.env.npm_config_fix) {
  log.start(lintlog.startFix);
  execSync('eslint -c ./config/.eslintrc.json . --fix', { stdio: 'inherit' });
  log.passed(lintlog.fixed);
} else {
  log.start(lintlog.startNoFix);
  execSync('eslint -c ./config/.eslintrc.json .', { stdio: 'inherit' });
}

log.passed(lintlog.end);
