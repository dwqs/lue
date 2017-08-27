let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

let webpackDevConfig = require('./webpack.dev.config.js');

let compiler = webpack(webpackDevConfig);
let server = new WebpackDevServer(compiler, webpackDevConfig.devServer);

server.listen(8000, 'localhost', (err) => {
    if (err) {
        console.log('err', err.message);
    }
});
