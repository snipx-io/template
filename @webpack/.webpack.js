import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import p from '../data/path.js'

export default {
	entry: {
		app: p.app,
	},
	output: {
		filename: '[name].js',
		path: p.build,
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
}
