const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require("webpack-spritesmith");
const webpack = require("webpack");
const UglifyJsPlguin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 4000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "html", "index.html"),
      filename: path.resolve(__dirname, "dist", "index.html"),
      title: "我是index"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "html", "foo.html"),
      filename: path.resolve(__dirname, "dist", "foo.html"),
      title: "我是Foo"
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src', 'icons'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src', 'sprite', 'sprite.png'),
        css: path.resolve(__dirname, 'src', 'sprite', 'sprite.css')
      },
      apiOptions: {
        cssImageRef: 'sprite.png'
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new UglifyJsPlguin(),
    new CompressionPlugin(),
    new OptimizeCSSAssetsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  }
}