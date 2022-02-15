import { TElementOptions, TSelectorOptions } from '../helpers/Types';
import Element from './Element';

export default class Field extends Element {
  constructor (selector: TSelectorOptions, elementName: string, messageOptions?: { message: string }) {
    super(selector, elementName, messageOptions);
  }

  async sendText (text: string, opts: TElementOptions = {}): Promise<void> {
    opts = Object.assign({}, this.options, opts);
    const element = await $(this.selector);
    if (opts.scrollToElement) {
      await this.scrollIntoView();
    } 
    if (this.options.waitForElement) {
      await this.waitForExistance(opts);
    }
    await driver.pause(this.options.pause);
    await element.setValue(text);
    if (opts.textValidation) {
      await this.hideKeyboard();
    }
    if (opts.hideKeyboardAfter) {
      await this.hideKeyboard();
    }
  }

  async iOSCarriageReturn (): Promise<void> {
    if (driver.isIOS) {
      console.log('sending carriage return to text field for iOS');
      const element = await $(this.selector);
      await element.setValue(await element.getText() + '\n');
    } // Doesn't do anything if it's android... hence the name iOSCarriageReturn.
  }
}
