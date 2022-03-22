import { Configuration } from 'webpack';
import * as path from 'path';

const isDevelopment = process.env.ENV === 'development';

const config: Configuration[] = [
    // Main
    {
        mode: isDevelopment ? 'development' : 'production',
        entry: path.join(__dirname, 'src', 'main', 'app-main.ts'),
        target: 'electron-main',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src\/main/,
                use: {
                    loader: 'ts-loader'
                }
            }]
        },
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'electron-main.js'
        }
    },

    // Preload
    {
        mode: isDevelopment ? 'development' : 'production',
        entry: path.join(__dirname, 'src', 'preload', 'preload.ts'),
        target: 'electron-preload',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [{
                test: /\.ts$/,
                include: /src\/preload/,
                use: {
                    loader: 'ts-loader'
                }
            }]
        },
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'electron-preload.js'
        }
    }
];

export default config;
