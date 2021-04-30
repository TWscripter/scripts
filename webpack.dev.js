const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        battleReportEnhancer: './src/battle-report-enhancer/main.ts',
        mapUnitArrival: './src/map-unit-arrival/index.ts'
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
        filename: '[name].dev.js',
        path: path.resolve(__dirname, 'build'),
    },
};