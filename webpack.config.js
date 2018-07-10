const webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outPath = Path.resolve(__dirname, './dist');
const sourcePath = Path.resolve(__dirname, './src');

module.exports = () => {
    return {
        devtool: 'source-map',
        context: sourcePath,
        entry: {
            main: './index.tsx'
        },
        output: {
            path: outPath,
            publicPath: '/',
            filename: 'bundle-[name]-[hash].js'
        },
        target: 'web',
        resolve: {
            extensions: ['.js', '.ts', '.tsx', 'jsx', '.css', '.png', '.jpg', '.gif']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                            plugins: ['react-hot-loader/babel'],
                        },
                    }, 'ts-loader']
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|jp(e*)g|gif|ttf|eot|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'assets/[name]-[hash].[ext]'
                        }
                    }]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'assets/[name]-[hash].[ext]',
                        mimetype: 'application/font-woff'
                    }
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                environment: JSON.stringify({
                    production: false,
                    graphqlEndpoint: 'http://localhost:4000/graph'
                })
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name]-[hash].css",
                chunkFilename: "[id]-[hash].css"
            }),
            new BitBarWebpackProgressPlugin()
        ]
    }
};
