const webpack           = require('webpack')
const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devServer: {
        contentBase       : path.join(__dirname, "build"),
        compress          : true,
        port              : 3000,
        historyApiFallback: true
    },
    devtool  : 'cheap-eval-source-map',
    entry    : './src/index.js',
    output   : {path: `${__dirname}/build`, filename: 'bundle.js'},
    module   : {
        loaders: [
            {
                test   : /\.jsx?$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                query  : {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },
    plugins  : [new HtmlWebpackPlugin({
        title: 'Auto-suggestions'
    })]
};
