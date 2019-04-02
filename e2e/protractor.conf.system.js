const _ = require('lodash');
const protractorBase = require('./protractor.conf')


const overRideConfig = {
  seleniumAddress: 'http://zalenium-labs-ci-cd.apps.companyxyz.emea-1.rht-labs.com/wd/hub',
  directConnect: false,
  multiCapabilities: [{
      browserName: 'chrome',
      chromeOptions: {
        args: ['--window-size=1280x800', '--headless', '--disable-gpu', '--no-sandbox']
      }
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        'args': ['--headless', '--window-size=1280,800', '--width=1280', '--height=800']
      }
    },
  ],
}

const thing = _.merge({}, protractorBase.config, overRideConfig)

// console.info('INFO ::::', thing)
exports.config = thing
