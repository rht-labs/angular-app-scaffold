const _ = require('lodash');
const protractorBase =  require('./protractor.conf')


const overRideConfig = {
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--no-sandbox" ]
    }
  }
}

const thing = _.merge({}, protractorBase.config, overRideConfig)

console.info("INFO ::::", thing)
exports.config = thing