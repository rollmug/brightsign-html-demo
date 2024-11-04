const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist/public/src'),
        filename: 'client.js'
    },
    mode: 'development',
    devtool: 'source-map',
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
            patterns: [
                {
                    from: './public/images/*',
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: './public/*.json',
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: './views/*.ejs',
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: './.env',
                    to: path.resolve(__dirname, 'dist')
                }]
        })
    ]
};
