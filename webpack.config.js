var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
  context: path.join(__dirname),
  entry: {
    app: [
      path.resolve(__dirname, 'src/js/index.js')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist/'),
    publicPath: './',
    filename: 'js/bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new CopyWebpackPlugin([
      {from: './src/index.html', to: './'},
      {from: './src/img/', to: './img'},
      {from: './src/sounds/', to: './sounds/'}
    ]),
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 8000,
      server: {
        baseDir: ['./dist']
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'] },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
