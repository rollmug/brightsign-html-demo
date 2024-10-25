const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'server.js'
    },
    mode: 'production',
    target: 'node',
    resolve: {
        extensions: ['.html', '.js']
    }
};