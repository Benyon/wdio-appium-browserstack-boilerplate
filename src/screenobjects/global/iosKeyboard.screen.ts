import Button from '../../elements/Button';
import { TSelectorMap } from '../../helpers/Types';
import { XPath } from '../../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  DONE: {
    IOS: new XPath('//*[@label="done"]')
  },
  NEXT: {
    IOS: new XPath('//*[@label="next"]')
  },
};

class iOSKeyboardScreen {
  get doneKey (): Button {
    return new Button(SELECTORS.DONE, 'iOS Keyboard Done');
  }

  get nextKey (): Button {
    return new Button(SELECTORS.NEXT, 'iOS Keyboard Next');
  }
}

export default new iOSKeyboardScreen();