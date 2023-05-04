import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';
import json from './json.js';

const manifestOutDir = path.resolve('out', 'build');
const manifestConfigDir = path.resolve('config', 'manifest');

let manifestTarget;

export default function manifest(mode = 'development') {
  // Create output folder
  if (!fs.existsSync(path.resolve('out'))) {
    fs.mkdirSync(path.resolve('out'));
    // Create output build folder
    if (!fs.existsSync(manifestOutDir)) {
      fs.mkdirSync(manifestOutDir);
    }
  }

  // Get manifest JSON data
  function getManifest(file) {
    return json.read(path.join(manifestConfigDir, `${file}.json`));
  }

  // Assign `manifestTarget`
  switch (mode) {
    case 'development': manifestTarget = getManifest(mode); break;
    case 'production': manifestTarget = getManifest(mode); break;
    default: manifestTarget = getManifest('development'); break;
  }

  // Write manifest.json file
  json.write(
    path.join(manifestOutDir, 'manifest.json'),
    merge(getManifest('common'), manifestTarget),
    mode,
  );

  return true;
}
