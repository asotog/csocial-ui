var webpack = require('webpack');
var WebpackStrip = require('strip-loader');
var prodConfig = require('./webpack.config.js');

const stripLoader = {
    test: [/\.js$/, /\.es6$/],
    exclude: /node_modules/,
    loader: WebpackStrip.loader('eval')
}
prodConfig.devtool = 'source-map';

prodConfig.module.loaders.push(stripLoader);

prodConfig.plugins.push(new webpack.DefinePlugin({ // Change flag to prod: for example React uses optimized code better than dev version
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
}));

prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false,
    },
    sourceMap: true
}));

module.exports = prodConfig;