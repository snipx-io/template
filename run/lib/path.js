// Imports
import { resolve } from 'path'

// Absolute paths used throughout the app.
// We never call upon a path() manually.
export default {
	package_json: resolve('package.json'),
	webpack_entry: resolve('src/App.jsx'),
	webpack_styles: resolve('src/styles'),
	manifest_entry: resolve('manifest.json'),
	manifest_output: resolve('build/manifest.json'),
	output_zip: resolve('dist'),
	output: resolve('build'),
}
