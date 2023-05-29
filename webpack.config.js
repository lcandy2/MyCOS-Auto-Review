const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  let manifestPath = '';

  if (process.env.WEBPACK_ENV === 'browser_firefox') {
    manifestPath = './src/manifest.firefox.json';
  } else {
    manifestPath = './src/manifest.json';
  }

  return {
    entry: {
      popup: './src/popup.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/background.js', to: 'background.js' },
          { from: 'MyCOS/MyCOS.js', to: 'MyCOS/MyCOS.js' },
          { from: manifestPath, to: 'manifest.json' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'popup.html'),
        filename: 'popup.html',
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
  };
};
