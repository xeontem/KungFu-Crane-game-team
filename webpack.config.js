const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

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
  if (isDevelopment) {
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
    // TODO: uglify crash the build process
    // plugins.push(uglifyPlugin);
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
    watch: isDevelopment,
    plugins,
    module: {
      rules: [
        { test: /\.js$/, use: ['babel-loader'] },
        { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
        { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
        { test: /p2\.js/, use: ['expose-loader?p2'] },
      ],
    },
  };
};
