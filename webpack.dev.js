const merge = require('webpack-merge');
const commnon = require('./webpack.common');
const path = require('path');
module.exports = merge(commnon, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    // host: "localhost",
    port: 8090,
    open: true,
    inline: true,
    hot: true, // 热替换
  }
})