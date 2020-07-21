const merge = require('webpack-merge');
const commnon = require('./webpack.common');
const path = require('path');
module.exports = merge(commnon, {
  mode: 'production',
  devtool: 'none', //cheap-module-source-map 不映射错误
})