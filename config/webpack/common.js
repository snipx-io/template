import path from 'path'
import HtmlPlugin from 'html-webpack-plugin'

export default {
    entry: {
        app: './src/App.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve('out', 'build'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', 
                '@babel/preset-react'
              ]
            }
          }
        }
      ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'app.html',
            templateContent: `<html><body><div id="app"></div></body></html>`
        })
    ]
}