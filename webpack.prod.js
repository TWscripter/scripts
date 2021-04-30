const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        battleReportEnhancer: './src/battle-report-enhancer/main.ts',
        mapUnitArrival: './src/map-unit-arrival/index.ts'
    },
    optimization: {
        usedExports: true, // <- remove unused function
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                output: {comments: true}
            }
        })]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
};