const webpack = require('webpack');
const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outPath = path.resolve(__dirname, './dist');
const sourcePath = path.resolve(__dirname, './src');

const mainConfig = (env, argv) => {

    const faviconDir = `assets/favicon`;
    const config = require(`./_config/config.${argv.stage}`);

    const devtool = argv.mode === 'production' ? 'none' : 'cheap-source-map';

    return {
        mode: argv.mode,
        context: sourcePath,
        devtool,
        devServer: {
            historyApiFallback: true,
            hot: false,
            port: 3000
        },
        entry: {
            'main': './index.tsx',
            'service-worker': './service-worker/worker.ts'
        },
        output: {
            chunkFilename: '[name].[hash].bundle.js',
            filename: (chunkData) => {
                return chunkData.chunk.name === 'service-worker' ? '[name].js' : '[name].[hash].js';
            },
            path: outPath,
            publicPath: '/',
            pathinfo: false
        },
        target: 'web',
        resolve: {
            extensions: ['.js', '.ts', '.tsx', 'jsx']
        },
        module: {
            rules: [{
                test: /\.ts(|x)?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            '@babel/preset-react',
                            ['@babel/preset-env', {
                                corejs: '3.x',
                                targets: {
                                    browsers: '> 10%, not dead'
                                },
                                useBuiltIns: 'usage',
                            }],
                        ],
                    }
                }, 'ts-loader']
            }, {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            }, {
                test: /\.(png|jp(e*)g|gif|ttf|eot|svg|mp3|m4r|m4a|ogg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './images/[hash].[ext]',
                    }
                }]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }]
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: (argv.mode !== 'production') ? 'server' : 'disabled'
            }),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                configuration: JSON.stringify({
                    ...config
                })
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-[hash].css',
                chunkFilename: '[id]-[hash].css'
            }),
            new CopyWebpackPlugin([
                faviconDir,
                'manifest.json',
                'robots.txt',
                'sitemap.xml'
            ]),
            new WebpackAssetsManifest({
                output: 'cache.json',
                customize(entry) {

                    // prevent service worker from being added to the manifest
                    if (entry.key.toLowerCase().startsWith('service-worker')) {
                        return false;
                    }

                    return entry;

                }
            })
        ]
    };

};

module.exports = mainConfig;
