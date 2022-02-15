import { TSelectorOptions } from '../helpers/Types';
import Element from '../elements/Element';

// This isn't a useless constructor, we may need to add button functionality later, this scales nicer you want to add button specific methods.
export default class Button extends Element {
  constructor (selector: TSelectorOptions, elementName: string, messageOptions?: { message: string }) {
    super(selector, elementName, messageOptions);
  }
}
