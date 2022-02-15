/* eslint-disable lines-around-comment */

import { DEFAULT_TIMEOUT, EXTREMELY_LARGE_WAIT } from '../constants';
import Element from '../elements/Element';
import { iOSPredicate, UISelector, XPath } from './Utilities';

/* Selector map for POM pages, this should stop mistakes happening with wrong names/labels */
export type TSelectorMap = Record<string, TSelectorOptions>;

/** Grouped types for any selector used for each platform. */
export type TAndroidSelector = UISelector | XPath;
export type TAppleSelector = iOSPredicate | XPath;

// Doesn't match naming standards of starting with a T as it would be confusing to have TXY Cord.
export type XYCord = {
    x: number;
    y: number;
}

// Doesn't match naming standards of starting with a T as t would be confusing to have a double T.
export type TouchMap = {
    top: XYCord;
    bottom: XYCord;
}

export type TSelectorOptions = {
    /** Android selector string */
    ANDROID?: TAndroidSelector;
    /** IOS selector string */
    IOS?: TAppleSelector;
}

export type TElementOptions = {
  /** If set to true, automation will wait for the element to be visible and clickable before trying to click. */
  waitForElement?: boolean;
  /** Time in milliseconds it will wait for the element to become visible and clickable before trying to click, if this time elapses fully, the test will fail. */
  timeout?: number;
  /** If set to true, the automation will try to close the keyboard after text has been entered, this is because some fields will open the keyboard when entering text. */
  hideKeyboardAfter?: boolean;
  /** If set to true, the automation will validate the text by clicking the field and closing off it. */
  textValidation?: boolean;
  /** If set to true, it will try scan to page for the element first before it tries to click it. */
  scrollToElement?: boolean;
  /** If set to true, this action will only be attempted if the driver is running Android. */
  androidOnly?: boolean;
  /** If set to true, this action will only be attempted if the driver is running iOS., */
  iosOnly?: boolean;
  /** If set to any value above 0, this will delay the test from clicking until that time (in ms) has ellapsed. */
  pause?: number;
  /** If set to true, if this fail, step will continue. */
  ignoreFailures?: boolean;
}

/** This type is used in the TElementOptions to drive the retry functionality */
export type RetryOptions = {
  strategy: 'visible' | 'hidden';
  target: Element | Promise<Element>;
  interval: number;
  maxAttempts?: number;
}

/** References for the builder method */
export type TSelectorReference = 'resourceId' | 'textContains' | 'index' | 'className' | 'childSelector' | 'description' | 'text' | 'resourceIdMatches';

/** Tuple containing  the selector reference and the value of the selector reference, used in the builder method. */
export type TBuildTuple = [TSelectorReference, string];

// Defaults
const defaultElementOptions: TElementOptions = {
  waitForElement: true,
  timeout: DEFAULT_TIMEOUT,
  hideKeyboardAfter: false,
  scrollToElement: true,
  pause: 750
};

const appLoadWait: TElementOptions = { 
  timeout: EXTREMELY_LARGE_WAIT, 
  scrollToElement: false, 
  waitForElement: true,
  pause: 5000
};

export const defaults = {
  appLoadWait,
  defaultElementOptions
};
    