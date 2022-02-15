import { config } from '../wdio.shared.conf';
import { GPSLocations, GEOLocations, Languages, Devices } from '../options/config.enums';

// Easier to just configure these.
const buildSettings = {
  device: Devices.Android.SamsungGalaxyS20,
  project: 'My Project Name',
  build: 'My Build Name',
  name: 'suite_name (This will be updated with the test name'
};

config.capabilities = [
  {
    maxInstances: 10,
    project: buildSettings.project, 
    build: buildSettings.build,
    name: buildSettings.name,
    app: process.env.BROWSERSTACK_ANDROID_APP_ID,
    language: Languages.English,
    locale: GEOLocations.UK,
    'browserstack.debug': true,
    'browserstack.resignApp': false,
    'browserstack.networkLogs':true,
    'browserstack.idleTimeout': 300,
    'browserstack.gpsLocation': GPSLocations.UK.Manchester,
    'browserstack.appium_version': '1.22.0',
    device: buildSettings.device.name,
    os_version: buildSettings.device.version
  },
];

exports.config = config;
