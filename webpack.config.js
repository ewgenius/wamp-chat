var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/src/main.jsx',
  output: {
    path: __dirname + '/client/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: ['syntax-decorators'],
        presets: ['es2015', 'react']
      }
    }]
  },
};
