// module.exports = function(config) {
//   config.set({
//     testRunner: 'karma',
//     mutator: 'typescript',
//     transpilers: ['typescript'],
//     reporter: ['html', 'clear-text', 'progress'],
//     testFramework: 'jasmine',
//     coverageAnalysis: 'off',
//     karmaConfigFile: 'karma.conf.js',
//     tsconfigFile: 'tsconfig.json',
//     mutate: ['src/app/components/**/*.ts'],
//     mutatorGenerator: 'typescript'
//   });
// };

const getAppFromConfig = require('@angular/cli/utilities/app-utils')
  .getAppFromConfig;
const appConfig = getAppFromConfig();

module.exports = function(config) {
  config.set({
    mutate: [
      'src/app/**/*.component.ts',
      'src/app/**/*.service.ts',
      'src/app/directives/custom-validators-directive.ts' // Seems not possible to run this but not any .spec.ts files
    ],
    testRunner: 'karma',
    mutator: 'typescript',
    transpilers: ['webpack'],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'jasmine',
    coverageAnalysis: 'off',
    karmaConfig: {
      frameworks: ['jasmine'],
      customContextFile: require.resolve(
        '@angular/cli/plugins/karma-context.html'
      ),
      customDebugFile: require.resolve('@angular/cli/plugins/karma-debug.html'),
      plugins: [
        require.resolve('karma-jasmine'),
        require.resolve('karma-chrome-launcher')
      ],
      proxies: {
        '/_karma_webpack_/': '/base/dist/'
      },
      files: [{ pattern: './dist/*.js', included: false }],
      browsers: ['ChromeCustom'],
      customLaunchers: {
        ChromeCustom: {
          base: 'ChromeHeadless',
          // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
          // more permissions than Docker allows by default)
          flags: ['--no-sandbox']
        }
      }
    },
    tsconfigFile: 'tsconfig.json',
    webpack: {
      configFile: 'webpack-stryker.conf.js'
    },
    logLevel: 'info',
    timeoutMs: 10000,
    thresholds: { high: 80, low: 65, break: 50 }
  });
};
