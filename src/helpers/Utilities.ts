import { TBuildTuple } from './Types';

/** All builder classes must contain a build method even if it simply returns the builder value. */
export abstract class Builder {
    abstract build (): string;
}

export class iOSPredicate implements Builder {
    private buildString: string;
    private buildType = '';

    constructor (value: string) {
      this.buildString = value;
    }

    asType (value: string): iOSPredicate {
      this.buildType = `type CONTAINS "${value}" && `;
      return this;
    }

    build (): string {
      
      // Could be just "ios=${string}"
      return `-ios predicate string:${this.buildType}${this.buildString}`;
    }
}

export class XPath implements Builder {
    private buildString: string;

    constructor (value = '') {
      this.buildString = value;
    }

    build (): string {
      return this.buildString;
    }
}

/**
 * Used to build UISelector strings and improve readability.
 */
export class UISelector implements Builder {
    private buildMap: Array<TBuildTuple> = [];

    id (value: string): UISelector {
      this.buildMap.push(['resourceIdMatches', `".*${value}.*"`]);
      return this;
    }

    absoluteId (value: string): UISelector {
      this.buildMap.push(['resourceId', `"${value}"`]);
      return this;
    }

    text (value: string): UISelector {
      this.buildMap.push(['textContains', `"${value}"`]);
      return this;
    }

    absoluteText (value: string): UISelector {
      this.buildMap.push(['text', `"${value}"`]);
      return this;
    }

    class (value: string): UISelector {
      this.buildMap.push(['className', `"${value}"`]);
      return this;
    }

    child (value: UISelector): UISelector {
      this.buildMap.push(['childSelector', `${value.build(false)}`]);
      return this;
    }

    index (value: number): UISelector {
      this.buildMap.push(['index', value.toString()]);
      return this;
    }

    description (value: string): UISelector {
      this.buildMap.push(['description', `"${value}"`]);
      return this;
    }

    build (prefix = true): string {
      let builtString = '';
      this.buildMap.forEach((buildTuple: TBuildTuple) => {
        builtString += `.${buildTuple[0]}(${buildTuple[1]})`;
      });
      return (prefix ? 'android=new UiSelector()' : 'new UiSelector()') + builtString;
    }
}