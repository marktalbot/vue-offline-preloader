const path = require('path');

module.exports = {
    context: __dirname,

    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loaders: ['vue-loader'],
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.vue'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'vue-component-template',
        libraryTarget: 'umd',
    },

    externals: {
        vue: 'vue',
    },
};