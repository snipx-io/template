import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';
import json from './json.js';

const manifestOutDir = path.resolve('out', 'build');
const manifestConfigDir = path.resolve('config', 'manifest');

let manifestCommon; let
  manifestTarget;

export default function (mode = 'development') {
  // Check for valid argument
  if (mode !== 'development' && mode !== 'production') {
    mode = 'development';
  }

  // Create output folder
  if (!fs.existsSync(path.resolve('out'))) {
    fs.mkdirSync(path.resolve('out'));
    // Create output build folder
    if (!fs.existsSync(manifestOutDir)) {
      fs.mkdirSync(manifestOutDir);
    }
  }

  // Assign common manifest data
  manifestCommon = json.read(
    path.join(manifestConfigDir, 'common.json'),
  );

  // Assign target manifest data
  switch (mode) {
    case 'development':
      manifestTarget = json.read(
        path.join(manifestConfigDir, `${mode}.json`),
      );
      break;
    case 'production':
      manifestTarget = json.read(
        path.join(manifestConfigDir, `${mode}.json`),
      );
      break;
  }

  // Write the manifest.json file
  json.write(
    path.join(manifestOutDir, 'manifest.json'),
    merge(manifestCommon, manifestTarget),
    mode,
  );

  return true;
}
