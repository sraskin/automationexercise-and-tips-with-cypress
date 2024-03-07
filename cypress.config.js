const {defineConfig} = require('cypress')

module.exports = defineConfig({
    projectId: "niztax",
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: "cypress/reports",
        charts: true,
        reportPageTitle: 'Automation Test Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        code: false,
    },
    e2e: {
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on)
            const environment = config.env.environment || 'prod'
            config.env = require(`./cypress/config/${environment}.json`)
            config.baseUrl = config.env.baseUrl;
            return config;
        },
        // Configure your E2E tests here
        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
        //to run the entire folder in interactive mode
        experimentalRunAllSpecs: true,
        testIsolation: false
    },
    pageLoadTimeout: 80000,
    watchForFileChanges: false,
    video: true,
    screenshots: false,
    headless: true,
    retries: {
        runMode: 2,
        openMode: 0,
    },
    viewportWidth: 1320,
    viewportHeight: 1080,
})