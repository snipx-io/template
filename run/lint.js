import { execSync } from 'child_process';

if (process.env.npm_config_fix) {
  execSync('eslint -c ./config/.eslintrc.json . --fix', { stdio: 'inherit' });
} else {
  execSync('eslint -c ./config/.eslintrc.json .', { stdio: 'inherit' });
}
