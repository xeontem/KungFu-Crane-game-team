const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: [
      path.resolve(__dirname, '../src/js/index.js'),
    ],
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../dist")
    }),
    new CopyWebpackPlugin([
      { from: './src/img/', to: './img' },
      { from: './src/sounds/', to: './sounds/' },
      { from: './src/css/', to: './css/' },
    ]),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: 'true',
      WEBGL_RENDERER: 'true'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    })
  ]
};
