import { merge } from 'webpack-merge'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import common from './common.js'

export default merge(common, {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'run/scripts/hotreload.js', to: '' }],
		}),
		new HtmlPlugin({
			filename: 'app.html',
			templateContent:
				'<html><body><div id="app"></div><script src="hotreload.js"></script></body></html>',
		}),
	],
})
