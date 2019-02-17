const path = require('path');

const ROOT_PATH = process.cwd();
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const WEBPACK_PATH = path.resolve(ROOT_PATH, 'internals/webpack');

module.exports = {
  dist: DIST_PATH,
  distPublicBundle: path.resolve(DIST_PATH, 'bundle'),
  distUniversal: path.resolve(DIST_PATH, 'universal'),
  src: path.resolve(ROOT_PATH, 'src'),
  universalApp: path.resolve(DIST_PATH, 'universal/universal.rootContainer'),
  webpackConfigClientLocalWeb: path.resolve(WEBPACK_PATH, 'webpack.config.client.local.web'),
  webpackConfigClientProdWeb: path.resolve(WEBPACK_PATH, 'webpack.config.client.prod.web'),
  webpackConfigUniversalLocal: path.resolve(WEBPACK_PATH, 'webpack.config.universal.local'),
  webpackConfigUniversalProd: path.resolve(WEBPACK_PATH, 'webpack.config.universal.prod'),
};
