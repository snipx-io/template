import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
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
									tailwindcss(),
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
