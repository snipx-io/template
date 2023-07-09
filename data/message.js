export default {
    production: {
        start: 'initializing production bundle\n',
        webpack: [
            'webpack failed in production mode', // fail
            'webpacked production mode', // pass
        ],
        manifest: [
            'manifest production mode failed', // fail
            'wrote manifest production mode', // pass
        ],
        zip: [
            'production mode zip failed', // fail
            'zipped in production mode', // pass
        ],
        end: 'all systems operational... \n'
    },
    development: {
        start: 'initializing development bundle\n',
        webpack: [
            'webpack failed in development mode', // fail
            'webpacked development mode', // pass
        ],
        manifest: [
            'manifest development mode failed', // fail
            'wrote manifest development mode', // pass
        ],
        end: 'watching for next change... \n================================'
    },
    lint: {
        startNoFix: 'initializing linter without --fix\n',
        startFix: 'initializing linter with --fix\n',
        fixed: 'fixed all rebel .js files',
        end: 'ready to be committed'
    }
}