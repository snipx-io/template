export default {
		webpack: {
			start: 'initializing webpack in $ mode',
			error: 'webpack encountered an error in $ mode',
			success: 'webpack successfully bundled files in $ mode'
		},
		manifest: {
			start: 'initializing manifest in $ mode',
			error: 'manifest encountered an error in $ mode',
			success: 'manifest successfully written in $ mode'
		},
		zip: {
			start: 'initializing zip in $ mode',
			error: 'zip encountered an error in $ mode',
			success: 'zip successfully bundled files in $ mode'
		},
    lint: {
			start: 'initializing linter without --fix',
			startFix: 'initializing linter with --fix',
			error: 'linter encountered an error',
			success: 'linter successfully formatted all files'
		}
}