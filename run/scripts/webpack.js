import webpack from 'webpack';
import webpackConfigDev from '../../config/webpack/development.js';
import webpackConfigProd from '../../config/webpack/production.js';

export function development() {
  return webpack(webpackConfigDev);
}

export function production() {
  return webpack(webpackConfigProd);
}
