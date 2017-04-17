var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');


module.exports = {
    context: path.join(__dirname),
    entry: {
        app: [
            path.resolve(__dirname, 'src/js/index.js')
        ]
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist/'),
        publicPath: './',
        filename: 'js/bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: './'},
            {from: './src/img/', to: './img'},
            {from: './src/sounds/', to: './sounds/'},
            {from: './src/css/', to: './css/'}
        ]),
         new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            }
        }),
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
