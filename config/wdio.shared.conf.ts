import dotenv from 'dotenv';
dotenv.config({ path: './apps.env' });
dotenv.config({ path: './credentials.env' });

// We use this list to assert the presence of environment variables at runtime. Anything in this list needs to be in the environment on execution.
const envVaribles = [
  'BROWSERSTACK_ANDROID_APP_ID',
  'BROWSERSTACK_IOS_APP_ID',
  'BROWSERSTACK_USER',
  'BROWSERSTACK_ACCESS_KEY',
];

// Configure env files, confirm all variables are present.
envVaribles.forEach(key => {
  const value = process.env[key];
  if (value == null) {
    throw Error(`Error: Missing environment variable: ${key}, either check .env file or GitHub env variables.`);
  }
});

// Default Super Configuration
export const config = {
  
  // Test file
  specs: ['./src/specs/*.spec.ts'],
  exclude: ['./src/specs/exclude.*.spec.ts'], // Exclude tests that the file name begins with 'exclude.'

  // BrowserStack credentials.
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  // Runner options.
  runner: 'local',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,  
    includeStackTrace: true,
    defaultTimeoutInterval: 60 * 60 * 1000, // Test shouldn't take more than an hour.
    helpers: [],
  },
  sync: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 30 * 60 * 1000, // 30 minutes for webdriverio to try and keep connection.
  connectionRetryCount: 3,
  execArgv: ['--no-wasm-code-gc'],
  reporters: ['spec'],
  capabilities: null,
  services: [
    'browserstack'   
  ],

  // Clear keychain on iOS after ever test suite. used for local testing.
  after: async function (): Promise<void> {
    if (driver.isIOS) {
      await driver.execute('mobile: clearKeychains');
    }
  },

  // TypeScript config.
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  }

};
