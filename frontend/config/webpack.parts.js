const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

exports.vueJS = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                      'vue-style-loader',
                      'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin()
        ]
    }
}

exports.loadJS = ({
    test = /\.js$/,
    exclude = /node_modules/,
} = {}) => {

    return {
        module: {
            rules: [{
                test,
                exclude,
                use: 'babel-loader'
            }]
        }
    }
}

exports.CompressionPlugin = () => {
    return {
        plugins: [ 
            new CompressionPlugin({
                test: /\.(js|css)$/,
            }),
        ]
    }
}

exports.UglifyJSPlugin = () => {
    return {
        plugins: [
            new UglifyJSPlugin(),
        ]
    }
}

exports.MiniCssExtractPlugin = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.(sass|scss|css)$/,
                    use: [
                        { 
                            // loader: process.env.NODE_ENV !== 'production'
                            // ? 'style-loader'
                            // : MiniCssExtractPlugin.loader,
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.join(__dirname, '../../static')
                            }
                        },
                        { 
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        },
                        { 
                            loader: 'postcss-loader',
                            options: {
                                options: {},
                            }
                        },
                        { 
                            loader: 'sass-loader'
                        },
                    ],
                    exclude: /node_modules/
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(
                {
                    filename: '[name].min.css'
                }
            )
        ]
    }
}

exports.FileManagerPlugin = () => {
    return {
        plugins: [
            new FileManagerPlugin({
                events: {
                    onStart: {
                        delete: [
                            {
                                source: path.join(__dirname, '../../static', '*'),
                                options: {
                                    force: true,
                                }
                            }
                        ]
                    },
                    onEnd: {
                        copy: [
                            {
                                source: path.join(__dirname, '../source/assets'),
                                destination: path.join(__dirname, '../../static'),
                            }
                        ]
                    }
                }
            }),
        ]
    }
}

//delete comments
exports.OptimizeCssAssetsPlugin = () => {
    return {
        plugins: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: {
                        disable: true
                    },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true,
                    },
                },
                canPrint: true
            }),
        ]
    }
}