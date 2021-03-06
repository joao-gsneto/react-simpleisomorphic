const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../ssr/server/public');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            'webpack/hot/only-dev-server',
            './src/client/index.js',
        ]
    },
    devServer: {
        hot: true
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /public/],
                use: [
                    { loader: 'babel-loader?' + JSON.stringify(babelLoaderQuery) },
                ],
            },
            { test: /\.json$/, loader: 'json-loader',                 
             exclude: [/node_modules/, /public/],
            },
        ]
    },
    resolve: {
        modules: ['common', 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                HOST_NAME: JSON.stringify(process.env.HOST_NAME),
            },
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
        }),
        webpackIsomorphicToolsPlugin.development()
    ]
};
