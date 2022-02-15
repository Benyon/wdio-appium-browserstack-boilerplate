import { join } from 'path';
import { Orientation } from '../options/config.enums';
import { config as defaultConfig } from '../wdio.shared.conf';

// Easier to just configure these.
const buildSettings = {
  deviceName: 'emulator-name-1000',
  appFileName: 'example.apk'
};

// We're re-assigning the config to the default config, plus some extra stuff and merging it together. (This avoid type errors).
const config = Object.assign({}, defaultConfig, {
  specs: ['./src/specs/*.spec.ts'],
  exclude: ['./src/specs/exclude.*.ts'],
  path: '/wd/hub',

  // Test capabiltiies.
  capabilities: [{
    platformName: 'Android',
    maxInstances: 1,
    'appium:deviceName': buildSettings.deviceName,
    'appium:platformVersion': '11.0',
    'appium:orientation': Orientation.Portrait,
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(process.cwd(), './builds/' + buildSettings.appFileName),
    'appium:appWaitActivity': 'SplashActivity, SplashActivity, OtherActivity, *, *.SplashActivity',
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
    language: 'en',
    locale: 'GB'
  }],
  reporters: ['spec'],

  // We take all the old services in the shared config, and we apply our additional appium service to it.
  services: (defaultConfig.services ? defaultConfig.services : [].concat([
    [
      'appium',
      {
        command: 'appium',
        args: {
          relaxedSecurity: true,
        },
      },
    ],
  ])),
  port: 4723

});

delete config.user;
delete config.key;
exports.config = config;