import path from 'path'
import autoprefixer from 'autoprefixer'
import * as dotenv from 'dotenv'
import tailwindcss from 'tailwindcss'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'

dotenv.config()

let devtool, mode, plugins

if (
	process.env.NODE_ENV === 'development' &&
	process.env.NODE_ENV !== 'production'
) {
	mode = 'development'
	devtool = 'cheap-module-source-map'
	plugins = [
		new CopyPlugin({
			patterns: [{ from: 'run/scripts/hotreload.js', to: '' }],
		}),
		new HtmlPlugin({
			filename: 'app.html',
			templateContent:
				'<html><body><div id="app"></div><script src="hotreload.js"></script></body></html>',
		}),
	]
} else if (process.env.NODE_ENV === 'production') {
	mode = 'production'
	devtool = 'source-map'
	plugins = [
		new HtmlPlugin({
			filename: 'app.html',
			templateContent: '<html><body><div id="app"></div></body></html>',
		}),
	]
}

export default {
	mode,
	devtool,
	plugins,
	entry: {
		app: './src/App.jsx',
	},
	output: {
		filename: '[name].js',
		path: path.resolve('out', 'build'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/i,
				include: path.resolve('src', 'styles'),
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									tailwindcss(
										path.resolve('config', 'tailwindcss.js')
									),
									autoprefixer(),
								],
							},
						},
					},
				],
			},
		],
	},
}
