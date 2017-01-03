'use strict'

module.exports = {
  resolve: {
    extensions: ['.jsx']
  },
  module: {
    loaders : [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  }
}
