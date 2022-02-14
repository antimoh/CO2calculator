const { merge } = require('webpack-merge')
const path = require('path')
const parts = require('./webpack.parts')
const webpack = require('webpack')

const config = {
    entry: {
        app: ['./source/js/index.js', './source/sass/index.scss'],
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../../static'),
        sourceMapFilename: '[file].map'
    },
    mode: 'development',
    watch: true,
    devtool: 'source-map',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    performance: {
        hints: false
    }
}

const dev = merge([
    parts.loadJS(),
    parts.vueJS(),
    parts.MiniCssExtractPlugin(),
    {
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ]
    }
])

module.exports = merge(config, dev)