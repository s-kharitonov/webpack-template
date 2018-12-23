const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    // autoprefixer = require('autoprefixer'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true,
        compress: true,
        openPage: 'dist/'
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
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
                template: './index.html',
                removeScriptTypeAttributes: true,
            }
        ),
        new  MiniCssExtractPlugin(
            {
                filename: 'scss/[name].css',
            }
        ),
        new CleanWebpackPlugin(
            [
                './dist/*'
            ]
        ),
        new CopyWebpackPlugin(
            [
                {from: './img', to: 'img'}
            ],
            {
                ignore: [
                    {glob: 'svg/*'}
                ]
            }
        ),
        new OptimizeCssAssetsPlugin(
            {
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            }
        )
    ]
};