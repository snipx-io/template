import fs from 'fs'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import p from './data/path.js'

import HtmlPlugin from 'html-webpack-plugin'

function readJSON (file) {
    return JSON.parse(fs.readFileSync(file))
}

export default {
	entry: {
		app: p.webpack_entry,
	},
	output: {
		filename: '[name].js',
		path: p.output,
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
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
				include: p.styles,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [tailwindcss(), autoprefixer()],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlPlugin({
			filename: readJSON(p.manifest_entry).action.default_popup
		})
	]
}
