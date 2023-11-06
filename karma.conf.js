module.exports = function(config) {
    config.set({
      basePath: '../..',
      frameworks: ['jasmine'],
      browsers: [
        'Chrome',
        'ChromeHeadlessCI'
    ],
    customLaunchers: {
        ChromeHeadlessCI: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
        }
    },
    })
  };