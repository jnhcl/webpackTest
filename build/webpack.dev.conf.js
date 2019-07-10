const webpackConfig = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugin: loader => [
                                require(autoprefixer)({
                                    browsers: [
                                        "last 2 versions",
                                        "> 1%"
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:  JSON.stringify('development')
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: 9000,
        // hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        publicPath: '/',
        // outer host
        // host: '0.0.0.0'
    }
})