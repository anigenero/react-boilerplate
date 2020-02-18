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
    const {
        analyzer,
        googleAnalyticsId,
        graphqlEndpoint
    } = argv;

    const optionalPlugins = [];
    if (analyzer) {
        optionalPlugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: (argv.mode !== 'production') ? 'server' : 'disabled'
            })
        );
    }

    return {
        context: sourcePath,
        devtool: (argv.mode === 'production' ? 'none' : 'source-map'),
        devServer: {
            historyApiFallback: true,
            hot: false,
            port: 3000
        },
        entry: {
            'main': './index.tsx',
            'service-worker': './service-worker/worker.ts'
        },
        mode: argv.mode,
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
                test: /\.(png|jp(e*)g|gif|ttf|eot|svg|mp3|m4r|m4a|ogg|mp4|webm)$/,
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
        output: {
            chunkFilename: '[name].[hash].bundle.js',
            filename(chunkData) {
                return chunkData.chunk.name === 'service-worker' ? '[name].js' : '[name].[hash].js';
            },
            path: outPath,
            pathinfo: false,
            publicPath: '/'
        },
        plugins: [
            ...optionalPlugins,
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                configuration: JSON.stringify({
                    googleAnalyticsId,
                    graphqlEndpoint
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
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx', 'jsx']
        },
        target: 'web',
    };

};

module.exports = mainConfig;
