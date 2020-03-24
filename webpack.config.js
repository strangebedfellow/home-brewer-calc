const path = require("path");
const entryPath = "development";
const entryFile = "index.js";
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["whatwg-fetch", `./${entryPath}/js/${entryFile}`],
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `build`)
  },
  devServer: {
    contentBase: path.join(__dirname, `${entryPath}`),
    publicPath: "/",
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(html)$/,
      use: ['html-loader']
   },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "./development/index.html"),

    // })
    new CopyPlugin([
      {
        from: 'development/index.html',
        to: 'index.html',
      }
    ])
  ],
  devtool: 'cheap-module-eval-source-map'
};