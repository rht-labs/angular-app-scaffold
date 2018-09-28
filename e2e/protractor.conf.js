// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
 
const { SpecReporter } = require('jasmine-spec-reporter');
const jasmineReporters = require('jasmine-reporters');
const HTMLReport = require('protractor-html-reporter-2');
const fs = require('fs-extra');
 
exports.config = {
 allScriptsTimeout: 11000,
 specs: [
   './src/**/*.e2e-spec.ts'
 ],
 capabilities: {
   'browserName': 'chrome'
 },
 directConnect: true,
 baseUrl: 'http://localhost:4200/',
 framework: 'jasmine',
 jasmineNodeOpts: {
   showColors: true,
   defaultTimeoutInterval: 30000,
   print: function() {}
 },
 onPrepare() {
   require('ts-node').register({
     project: 'e2e/tsconfig.e2e.json'
   });
 
   fs.emptyDir('reports/e2e', (err) => { err && console.log(err); });
 
   const jasmineEnv = jasmine.getEnv();
 
   const specReporter = new SpecReporter({ spec: { displayStacktrace: true } });
 
   const xmlReporter = new jasmineReporters.JUnitXmlReporter({
     consolidateAll: true,
     savePath: './reports/e2e',
     filePrefix: 'results'
   });
 
   const screenshotReporter = {
     specDone: function (result) {
       if (result.status === 'failed') {
         browser.getCapabilities().then(function (caps) {
           const browserName = caps.get('browserName');
 
           browser.takeScreenshot().then(function (png) {
             const stream = fs.createWriteStream('reports/e2e/' + browserName + '-' + result.fullName + '.png');
             stream.write(new Buffer(png, 'base64'));
             stream.end();
           });
         });
       }
     }
   };
 
   jasmineEnv.addReporter(specReporter);
   jasmineEnv.addReporter(xmlReporter);
   jasmineEnv.addReporter(screenshotReporter);
 },
 //HTMLReport called once tests are finished
 onComplete: function() {
   let browserName, browserVersion, platform;
   const capsPromise = browser.getCapabilities();
 
   capsPromise.then(function (caps) {
     browserName = caps.get('browserName');
     browserVersion = caps.get('version');
     platform = caps.get('platform');
 
     const testConfig = {
       reportTitle: 'E2E Test Report',
       outputPath: './reports/e2e',
       outputFilename: 'e2e-test-report',
       screenshotPath: '.',
       testBrowser: browserName,
       browserVersion: browserVersion,
       modifiedSuiteName: false,
       screenshotsOnlyOnFailure: true,
       testPlatform: platform
     };
     new HTMLReport().from('reports/e2e/results.xml', testConfig);
   });
 }
};