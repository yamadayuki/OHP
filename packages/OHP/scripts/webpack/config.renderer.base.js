const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const pkg = require('../../package.json')

const { src, entries } = require('./configuration')
const base = require('./config.base')

const config = {
  entry: {
    app: [
      path.resolve(entries, 'index.css'),
      path.resolve(entries, 'app'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
          ],
        }),
        exclude: /node_modules\/(highlight\.js)/
      },
    ],
  },

  output: {
    filename: '[name]-[hash].js',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      title: pkg.name,
      filename: 'index.html',
      template: path.resolve(src, 'index.html'),
      chunks: ['app'],
      inject: true
    }),

    new ExtractTextPlugin('[name]-[hash].css'),
  ],

  externals: [
  ],

  target: 'electron-renderer',
}

module.exports = merge(base, config)