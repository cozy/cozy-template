'use strict'

const path = require('path')
const fs = require('fs')

const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// use the `OPTIMIZE` env to switch from dev to production build
const optimize = process.env.OPTIMIZE === 'true'

/**
 * Loaders used by webpack
 *
 * - CSS and images files from `vendor` are excluded
 * - stylesheets are optimized via cssnano, minus svgo and autoprefixer that are
 * customized via PostCSS
 * - images are cache-busted in production build
 */
let loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader?importLoaders=1',
      'postcss-loader'
    ]
  },
  {
    test: /\.styl$/,
    loaders: [
      'style-loader',
      'css-loader?importLoaders=1',
      'postcss-loader',
      'stylus-loader'
    ]
  },
  {
    test: /\.svg$/,
    include: /(sprites|icons)/,
    loader: 'svg-sprite?name=[name]_[hash]'
  },
  {
    test: /\.(png|gif|jpe?g|svg)$/i,
    exclude: /(vendor|sprites|icons)/,
    loader: `file?name=img[name]${optimize ? '_[hash].' : '.'}[ext]`
  }
]

/**
 * Configure Webpack's plugins to tweaks outputs:
 *
 * all builds:
 * - ExtractTextPlugin: output CSS to file instead of inlining it
 * - CopyPlugin: copy assets to public dir
 *
 * prod build:
 * - AssetsPlugin: paths to cache-busted's assets to read them from server
 * - DedupePlugin
 * - OccurenceOrderPlugin
 * - UglifyJsPlugin
 * - DefinePlugin: disable webpack env dev vars
 *
 */
let plugins = [
  new ExtractTextPlugin(optimize ? 'app.[hash].css' : 'app.css'),
  new CopyPlugin([
    { from: 'vendor/assets', ignore: ['.gitkeep'] }
  ])
]

if (optimize) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __SERVER__: !optimize,
      __DEVELOPMENT__: !optimize,
      __DEVTOOLS__: !optimize
    }),
    // Extracts Hash in external file for reference
    function () {
      this.plugin('done', (stats) => {
        fs.writeFileSync(
          path.join(__dirname, '..', 'build', 'assets.json'),
          `{"hash":"${stats.hash}"}`
        )
      })
    }
  ])
}

/**
 * Webpack config
 *
 * - output to `public` dir
 * - cache-bust assets when build for production
 */

module.exports = {
  entry: './app',
  output: {
    path: 'public',
    filename: optimize ? 'app.[hash].js' : 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  debug: !optimize,
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  plugins: plugins,
  stylus: {
    use: [require('cozy-ui/lib/stylus')()]
  }
}
