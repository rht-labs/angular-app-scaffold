// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {
  SpecReporter
} = require('jasmine-spec-reporter');
const jasmineReporters = require('jasmine-reporters');
const HTMLReport = require('protractor-html-reporter-2');
const fs = require('fs-extra');

exports.config = {
  allScriptsTimeout: 19000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--window-size=1280,800']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 25000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });

    var width = 1440;
    var height = 900;
    browser.driver.manage().window().setSize(width, height);

    fs.emptyDir('reports/e2e', (err) => {
      err && console.log(err);
    });

    const jasmineEnv = jasmine.getEnv();

    const specReporter = new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    });

    return browser.getCapabilities().then(function (caps) {
      const reportName = `${caps.get('browserName')}-${caps.get('version')}`;
      // console.info('REPORT NAME : ', reportName);
      const xmlReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: './reports/e2e',
        filePrefix: reportName
      });

      const screenshotReporter = {
        specDone: function (result) {
          if (result.status === 'failed') {
            browser.takeScreenshot().then(function (png) {
              const stream = fs.createWriteStream('reports/e2e/' + reportName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          }
        }
      };

      jasmineEnv.addReporter(specReporter);
      jasmineEnv.addReporter(xmlReporter);
      jasmineEnv.addReporter(screenshotReporter);
    });


  },
  //HTMLReport called once tests are finished
  onComplete: function () {
    let browserName, browserVersion, platform;
    browser.getCapabilities().then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      const reportName = `${caps.get('browserName')}-${caps.get('version')}`;

      const testConfig = {
        reportTitle: 'E2E Test Report',
        outputPath: './reports/e2e',
        screenshotPath: '.',
        testBrowser: reportName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      //  console.info("INFO - NEW REPORT NAME - " , reportName)
      new HTMLReport().from(`reports/e2e/${reportName}.xml`, testConfig);
    });
  }
};
