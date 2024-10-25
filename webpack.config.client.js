const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'client.js'
    },
    mode: 'production',
    target: 'web',
    resolve: {
        extensions: ['.html', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/*.html',
                to: path.resolve(__dirname, 'dist')
            }]
        })
    ]
};
