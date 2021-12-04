const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',
  devtool: 'eval',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    app: ['./client.jsx'],
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: { 
        presets: ['@babel/preset-env', '@babel/preset-react'],
        /*
          ['@babel/preset-env', {
              targets: {
                browers: ['last 2 chrome versions'],
              },
              debug: true
          }], 
          '@babel/preset-react'
        ],
        */

        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'
        ],
      },
    }],
  },

  plugins: [
    new RefreshWebpackPlugin()
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist'
  }, // 출력

  devServer: {
    devMiddleware: {publicPath: '/dist'},
    static: {directory: path.resolve(__dirname)},
    hot: true
  }
};