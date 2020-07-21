const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //每次打包清除dist
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer'); //打包的文件canvas显示引入哪些模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将css单独提取文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //因为将css单独分离出来，所以需要对css进行压缩
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模板
const PurifyCSSPlugin = require('purifycss-webpack'); //消除未用css

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    main: path.join(__dirname, './src/js/pages/main.js'),
    index: path.join(__dirname, './src/js/pages/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-bundle.js'
  },
  devtool: 'source-map', //映射错误
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
    }
  },
  optimization: { //抽取公共文件
    splitChunks: {
      cacheGroups: { // 缓存组，缓存公共代码
        // 首先：打包node_modules中的文件
        vendor: {
          test: /node_modules/,
          name: "vendor",
          minSize: 0,
          minChunks: 1, //被按需引入几次都提取出来
          chunks: "all",
          priority: 1
        },
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 0,
          minChunks: 2,
          priority: 0
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        // exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        // exclude: /node_modules/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              publicPath: '../'
            }
          },
          "css-loader", {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer"),
                require('postcss-pxtorem')({
                  rootValue: 37.5,
                  propList: ['*'],
                })
              ]
            }
          }, "sass-loader"
        ]
      },
      // 处理HTML
      {
        test: /\.html$/,
        use: "html-loader"
      },
      // 处理图片
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        // exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            // <= 2kb，则转换成base64
            limit: 2000,
            // 图片名字
            name: "[name].[ext]", //[name]-[hash:5].[ext]
            // 输出路径
            outputPath: "static/images/",
            // 启用commonJS规范  
            esModule: false
          }
        }
      },
      //处理字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            limit: 5000,
            outputPath: 'static/fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), //每次打包，清除打包文件夹里面的文件
    // new BundleAnalyzerPlugin(), //打包后的内容canvas展示由哪些模块组成
    // -> 热替换
    new webpack.HotModuleReplacementPlugin(),
    // new PurifyCSSPlugin({  //因为vue中有v-if的情况，使用此插件会将页面条件渲染的样式清除
    //   paths: glob.sync(path.join(__dirname, "./src/**/*.html")), //消除未用css 
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }), //css分离
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          // 不生成内联映射,这样配置就会生成一个source-map文件
          inline: false,
          // 向css文件添加source-map路径注释
          // 如果没有此项压缩后的css会去除source-map路径注释
          annotation: true
        }
      },
      // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
      assetNameRegExp: /\.(sa|sc|c|le)ss$/g,
      // 指定一个优化css的处理器，默认cssnano
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }, // 对注释的处理
          normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        }]
      },
      canPrint: true // 是否打印编译过程中的日志
    }),
    new HtmlWebpackPlugin({
      // 模板文件
      template: "./src/index.html",
      // 文件名(相对于output.path)，可通过文件名设置目录，如 static/pages/detail.html
      filename: "index.html",
      // 静态资源位置
      inject: "body",
      // 是否hash
      hash: false,
      // 指定输出文件所依赖的入口文件（*.js）的[name]
      chunks: ["main", "index"],
      // 控制压缩
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true
      }
    }),
  ]
};