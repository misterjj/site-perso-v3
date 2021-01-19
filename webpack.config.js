const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: {
        main: [
            './assets/js/app.tsx',
            './assets/css/app.scss',
        ],
        404: [
            './assets/js/404.tsx',
            './assets/css/404.scss'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)/,
                use: [MiniCssExtractPlugin.loader , 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mp4$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "video"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[contenthash].[ext]",
                            outputPath: "images"
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].min.js",
        publicPath: '',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
    ]
}

module.exports = config