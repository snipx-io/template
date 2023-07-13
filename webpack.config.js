import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from './run/lib/path.js'

export default {
	entry: {
		app: path.webpack_entry,
	},
	output: {
		filename: '[name].js',
		path: path.output,
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
				include: path.styles,
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
}
