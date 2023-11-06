module.exports = (config) => {
  const coverage = config.singleRun ? ["coverage"] : [];

  config.set({
    frameworks: ["jasmine"],
    plugins: [
      "karma-jasmine",
      "karma-webpack",
      "karma-coverage",
      "karma-remap-istanbul",
      "karma-chrome-launcher",
    ],
    files: [
      "./src/tests.entry.ts",
      {
        pattern: "**/*.map",
        served: true,
        included: false,
        watched: true,
      },
    ],
    preprocessors: {
      "./src/tests.entry.ts": ["webpack", "sourcemap"],
      "./src/**/!(*.test|tests.*).(ts|js)": ["sourcemap"],
    },

    webpack: {
      plugins,
      entry: "./src/tests.entry.ts",
      devtool: "inline-source-map",
      resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"],
      },
      module: {
        rules: combinedLoaders().concat(
          config.singleRun ? [loaders.istanbulInstrumenter] : []
        ),
      },
      stats: { colors: true, reasons: true },
    },
    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    reporters: ["spec"]
      .concat(coverage)
      .concat(coverage.length > 0 ? ["karma-remap-istanbul"] : []),

    remapIstanbulReporter: {
      src: "coverage/chrome/coverage-final.json",
      reports: {
        html: "coverage",
      },
    },

    coverageReporter: {
      reporters: [{ type: "json" }],
      dir: "./coverage/",
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0]; // returns 'chrome'
      },
    },

    port: 9876,
    browsers: ["Chrome"], // Alternatively: 'PhantomJS'
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 6000,
  });
};
