const path = require('path');
const packageJson = require('./package.json');

process.env.VUE_APP_PACKAGE = JSON.stringify(packageJson);

const { appSettings } = packageJson;

const skin = process.env.VUE_APP_SKIN || appSettings.defaultSkin;

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    config.resolve.alias.set('@skin', path.resolve(__dirname, `./src/skins/${skin}`));
  },
};
