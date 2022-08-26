declare function theEnforcer({ appID, timeout, warningQuerySelector, warningMarkup }: {
    appID?: string;
    timeout?: number;
    warningQuerySelector?: string;
    warningMarkup?: string;
}, functionToRun: Function): void;
export default theEnforcer;
