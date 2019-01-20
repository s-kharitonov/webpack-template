const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        overlay: true,
        compress: true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(
                {
                    sourceMap: true
                }
            )
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: './postcss.config.js' } }
                    },
                    // {
                    //     loader: "resolve-url-loader",
                    //     options: {
                    //         debug: true,
                    //         sourceMap: true
                    //     },
                    // },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options:{
                            mozjpeg:{
                                progressive: true,
                                quality: 70
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './pages/index.html',
                removeScriptTypeAttributes: true,
            }
        ),
        new  MiniCssExtractPlugin(
            {
                filename: 'scss/[name].css'
            }
        ),
        new CleanWebpackPlugin(
            [
                './dist/*'
            ]
        ),
        new CopyWebpackPlugin(
            [
                {
                    from: './img',
                    to: 'img'
                },
                {
                    from: './fonts',
                    to: 'fonts'
                }
            ],
            {
                ignore: [
                    {glob: 'svg/*'}
                ]
            }
        )
    ]
};