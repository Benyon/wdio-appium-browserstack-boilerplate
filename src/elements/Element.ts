import { defaults, TElementOptions, TouchMap, TSelectorOptions } from '../helpers/Types';
import { Builder } from '../helpers/Utilities';

export default class Element {
    selector: string;
    elementName: string;
    options: TElementOptions;
    message: string;

    constructor (selector: TSelectorOptions, elementName: string, loggingOptions?: { message: string }) {
      
      // We pass in a builder, as we build this when we get the element in run time.
      const platformSelector: Builder = selector[driver.isAndroid ? 'ANDROID' : 'IOS'];
      this.selector = platformSelector?.build?.();

      // Set options.
      this.options = defaults.defaultElementOptions;
      this.elementName = elementName;
      this.message = loggingOptions?.message;
    }

    async isVisible (): Promise<'hidden' | 'visible'> {
      const currentElement = await $(this.selector);
      const isDisplayed = await currentElement.isDisplayed();
      const visibilityStatus = isDisplayed ? 'visible' : 'hidden';
      return visibilityStatus;
    }

    async click (opts: TElementOptions = this.options): Promise<void> {
      try {

        // Re-assign the options to override the default options.
        opts = Object.assign({}, this.options, opts);

        // Guard to end the path if it's not suppose to run on a certain OS
        if (opts.androidOnly && driver.isIOS) return;
        if (opts.iosOnly && driver.isAndroid) return;

        // Wait a certain amount of time before pressing the button.
        if (opts.pause) {
          await driver.pause(opts.pause);
        }

        // Get the element
        const element = await $(this.selector);

        // Scroll/Wait if we have specifed.
        if (opts.scrollToElement) {
          await this.scrollIntoView();
        } 
        if (opts.waitForElement) {
          await this.waitForExistance(opts);
        }

        // Finally click the element.
        await element.click();

        // On falure, throw the error, unless stated otherwise.
      } catch (err) {
        if (!opts.ignoreFailures) {
          throw err;
        }
        console.warn('Ignoring failure of element: ' + this.elementName);
      }

      // Hide keyboard afterwards, if we have that option.
      if (opts.hideKeyboardAfter) {
        await this.hideKeyboard();
      }

    }

    async hideKeyboard (): Promise<void> {
      if (driver.isIOS) {
        console.warn('iOS does not support hideKeyboard on simulated devices. This is an XCUITest bug.');
      } else {
        await driver.hideKeyboard();
      }
    }

    async scrollDirection (direction: 'down' | 'up', touchLocations: TouchMap): Promise<void> {
      const touchActionPromise = browser.touchPerform([
        { action: 'press', options: direction == 'up' ? touchLocations.bottom : touchLocations.top },
        { action: 'wait', options: { ms: 500 }},
        { action: 'moveTo', options: direction == 'up' ? touchLocations.top : touchLocations.bottom },
        { action: 'release' }
      ]);
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, 2000, 'Touch Action Timeout');
      });
      await Promise.race([touchActionPromise, timeoutPromise]);
    }

    async scrollIntoView (maximumScrolls = 30): Promise<void> {
      let element = await $(this.selector);
      let elementIsVisible = await element.isDisplayed();
      for (let scrolls = 0; scrolls < maximumScrolls; scrolls++) { // While we have a scroll in the queue, scroll.
        if (elementIsVisible) return; // If the element has been found, quit out. 
        const scrollDirection = scrolls < maximumScrolls / 2.5 ? 'down' : 'up';
        const { width, height } = await driver.getWindowRect(); // Get the height and width of the screen.

        // Create two points on the phone screen that we scroll from and too.
        const touchLocations: TouchMap = { 
          top: { x: width/2, y: height/3 }, 
          bottom: { x: width/2, y:  height/5 }
        };

        await this.scrollDirection(scrollDirection, touchLocations);
        
        element = await $(this.selector);
        elementIsVisible = await element.isDisplayed();
      }
      const defaultMessage = `Could not find screen element '${this.elementName}' while attempting to scroll the element into view, with the maximum retries of ${maximumScrolls}. Searching by selector: ${this.selector}`;
      throw Error((this.message ?? '%m').replace('%m', defaultMessage));
    }

    async waitForExistance (opts: TElementOptions = this.options): Promise<void> {
    
      // Re-assign the options to override the default options.
      opts = Object.assign({}, this.options, opts);
      if (opts.androidOnly && driver.isIOS) return;
      if (opts.iosOnly && driver.isAndroid) return;

      const defaultMessage = `Could not find screen element '${this.elementName}' within the wait time of ${opts.timeout / 1000} seconds. Searching by selector: ${this.selector}`;
      
      // Now... we wait.
      const waitOptions = {
        timeout: opts.timeout,
        timeoutMsg: (this.message ?? '%m').replace('%m', defaultMessage)
      };
      const element = await $(this.selector);
      await element.waitForExist(waitOptions);
      await element.waitForEnabled(waitOptions);
      await element.waitForDisplayed(waitOptions);
    }

    /**
     * Gets the raw webdriverio element(s)
     * @param {boolean} asArray If true, this will return all elements matching that selector, default false.
     * @returns {Promise<WebdriverIO.Element | WebdriverIO.ElementArray>} The raw type webdriverio uses. Try to avoid using this.
     */
    async getRaw (asArray: boolean): Promise<WebdriverIO.Element | WebdriverIO.ElementArray>{
      return asArray
        ? await $(this.selector)
        : await $$(this.selector);
    }

    /**
     * Gets the value of the attribute 'text'
     * @param {IElementOptions} opts Optional parameters to change functionality of the method.
     * @returns {Promise<string>} The text value of the element.
     */
    async getText (opts: TElementOptions = this.options): Promise<string> {
      const element = await $(this.selector);
      if (opts.scrollToElement) {
        await this.scrollIntoView();
      } 
      if (opts.waitForElement) {
        await this.waitForExistance(opts);
      }
      return await element.getText();
    }
}
