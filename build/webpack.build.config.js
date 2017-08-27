let path = require('path');
let webpack = require('webpack');
let ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
let os = require('os');

module.exports = {
    context: path.resolve(__dirname, '.'),
    entry: {
        lue: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../dist'),
        library: 'lue',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js'],
        modules: [path.join(__dirname, '../node_modules')]
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ParallelUglifyPlugin({
            workerCount: os.cpus().length,
            cacheDir: '.cache/',
            uglifyJS: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                comments: false,
                sourceMap: false,
                mangle: true
            }
        }),
    
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};
