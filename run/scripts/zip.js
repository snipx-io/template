import fs from 'fs';
import path from 'path';
import bestzip from 'bestzip';
import json from './json.js';
import { log, plog } from './log.js';

const manifest = json.read(path.resolve('config', 'manifest', 'common.json'));
const filename = `${manifest.name}-${manifest.version}.zip`;

export default function zip() {
  if (!fs.existsSync(path.resolve('out', 'dist'))) {
    fs.mkdirSync(path.resolve('out', 'dist'));
  } else if (fs.existsSync(path.resolve('out', 'dist', filename))) {
    fs.rmSync(
      path.resolve('out', 'dist', filename),
      { recursive: true, force: true },
    );
  }

  bestzip({
    source: '*', // zip all contents
    cwd: path.resolve('out', 'build'), // from output
    destination: path.resolve('out', 'dist', filename), // into filename
  }).then(() => {
    log.passed(plog.zip[1]);
  }).catch((err) => {
    log.failed(plog.zip[0]);
    console.error(err.stack);
    process.exit(1);
  });
}
