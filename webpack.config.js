var path = require('path');
var webpack = require("webpack");

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mainStylesExtract = new ExtractTextPlugin('[name].css');
const EXCLUDES = [/node_modules/];

var projectPlugins = [
    mainStylesExtract
];

module.exports = {
    context: path.resolve('src'),
    entry: {
        'main': './js/main.js'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve('build/'),
        publicPath: '/build',
        filename: '[name].js',
        sourceMapFilename: '[file]-map' // changed this because crafter studio does not support doubled extension files like .map.js
    },
    devServer: {
        contentBase: 'src',
        disableHostCheck: true
    },
    module: {
        loaders: [{ // Javascript
            test: /\.js$/,
            exclude: EXCLUDES,
            loader: 'babel-loader',
            options: {
                presets: ["stage-0", "env", "react"]
            }
        }, { // Sass 
            test: /\.scss$/,
            exclude: EXCLUDES,
            loader: mainStylesExtract.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['./node_modules']
                    }
                }]
            })
        }, {
            test: /\.svg/,
            loader: 'svg-url-loader',
            include: [
                path.resolve(__dirname, 'src/images')
            ],
            options: {}
        }, {
            test: /fontello\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                publicPath: './',
                name: 'fonts/icons/[name].[ext]'
            }
        }]
    },
    plugins: projectPlugins
};