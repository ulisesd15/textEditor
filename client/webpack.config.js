const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
        chunks: ['main'],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: './install.html',
        chunks: ['install'],
      }),
      new WebpackPwaManifest({
        name: 'Jate',
        short_name: 'Jate',
        description: 'A simple note-taking app',
        background_color: '#01579b',
        theme_color: '#01579b',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/icons/icon-512x512.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      workboxPlugin,
      
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.css$/i,
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
          },
        }
      ],
    },
  };
};
