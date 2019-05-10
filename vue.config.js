const path = require('path');
const { appSettings } = require('./package.json');

const skin = appSettings.defaultSkin;

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    config.resolve.alias.set('@skin', path.resolve(__dirname, `./src/skins/${skin}`));
  },
};
