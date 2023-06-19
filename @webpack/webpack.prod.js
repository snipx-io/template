import { merge } from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import common from './.webpack.js'

export default merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new HtmlPlugin({
			filename: 'app.html',
			templateContent: '<html><body><div id="app"></div></body></html>',
		}),
	],
})
