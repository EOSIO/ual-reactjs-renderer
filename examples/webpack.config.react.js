const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')

require('dotenv').config()

module.exports = {
  mode: "development",
  entry: [
    "babel-polyfill",
    path.join(__dirname, "src/ButtonWebViewReact.tsx"),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "main_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          babelrc: true,
        }
      },
     {
        test: /\.(js)$/,
        exclude: /node_modules/,
        include: [
          '/node_modules/@blockone/universal-authenticator-library',
          path.join(__dirname, '../')
        ],
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        }

      },
      
    ]
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'build')
  },
  plugins: [
    function () {
      this.plugin('done', function (stats) {
        if (!fs.existsSync('.env')) {
          console.error('\n\nERROR: No .env file found... Did you copy default.env to .env?\n\n');
          process.exit(1);
        }
      });
    },
    new webpack.DefinePlugin({
      'EXAMPLE_ENV': {
        'CHAIN_ID': JSON.stringify(process.env.CHAIN_ID),
        'RPC_PROTOCOL': JSON.stringify(process.env.RPC_PROTOCOL),
        'RPC_HOST': JSON.stringify(process.env.RPC_HOST),
        'RPC_PORT': JSON.stringify(process.env.RPC_PORT)
      }
    }),
    new HtmlWebpackPlugin({
      template: "./server/template.html",
      path: path.join(__dirname, 'build'),
      filename: "index.html"
    })
  ]
}
