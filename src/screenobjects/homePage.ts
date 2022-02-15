import Button from '../elements/Button';
import Element from '../elements/Element';
import GenericMessages from '../helpers/GenericMessages';
import { TSelectorMap } from '../helpers/Types';
import { iOSPredicate, UISelector, XPath } from '../helpers/Utilities';

const SELECTORS: TSelectorMap = {
  APP_IS_OLD_BUTTON: {
    ANDROID: new UISelector().id('button1'),
    IOS: new iOSPredicate('This would be your predicate string.').asType('Button')
  },
  SECOND_BUTTON: {
    ANDROID: new UISelector().id('btn_2'),
    IOS: new XPath('This is how you pass in a simple XPath string.')
  },
  HEADER_TEXT: {
    ANDROID: new UISelector().id('content').child(new UISelector().id('title'))
  }
};

class HomePage {

  get appIsOldWarningButton (): Button {
    return new Button(SELECTORS.APP_IS_OLD_BUTTON, 'App Is Old Warning');
  }

  get secondButton (): Button {
    return new Button(SELECTORS.SECOND_BUTTON, 'Second Button', { message: GenericMessages.ANOTHER_ERROR_MESSAGE });
  }

  get headerText (): Element {
    return new Element(SELECTORS.HEADER_TEXT, 'Header Text');
  }

}

export default HomePage;
