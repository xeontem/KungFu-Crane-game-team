const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const PHASER_PATH = path.join(__dirname, '/node_modules/phaser-ce/');
const PHASER_SPLIT_PATH = path.join(PHASER_PATH, 'build/custom/phaser-split.js');
const PIXI_PATH = path.join(PHASER_PATH, 'build/custom/pixi.js');
const P2_PATH = path.join(PHASER_PATH, 'build/custom/p2.js');

const isDevelopment = () => process.env.NODE_ENV === 'development';

module.exports = () => {
  // common plugins
  const plugins = [
    new CopyWebpackPlugin([
      { from: './src/index.html', to: './' },
      { from: './src/img/', to: './img' },
      { from: './src/sounds/', to: './sounds/' },
      { from: './src/css/', to: './css/' },
    ]),
  ];

  // mode specific plugins
  if (isDevelopment()) {
    const browserSyncPlugin = new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 8000,
      server: {
        baseDir: ['./dist'],
      },
    });
    plugins.push(browserSyncPlugin);
  } else {
    const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
    });
    plugins.push(uglifyPlugin);
  }

  return {
    context: path.join(__dirname),
    entry: {
      app: [
        path.resolve(__dirname, 'src/js/index.js'),
      ],
    },
    devtool: 'source-map',
    output: {
      pathinfo: true,
      path: path.resolve(__dirname, 'dist/'),
      publicPath: './',
      filename: 'js/bundle.js',
    },
    watch: isDevelopment(),
    plugins,
    module: {
      rules: [
        { test: /\.js$/, use: ['babel-loader'] },
        { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
        { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
        { test: /p2\.js/, use: ['expose-loader?p2'] },
      ],
    },
    resolve: {
      alias: {
        phaser: PHASER_SPLIT_PATH,
        pixi: PIXI_PATH,
        p2: P2_PATH,
      },
    },
  };
};
