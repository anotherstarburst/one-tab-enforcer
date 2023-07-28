/**
 * Interface defining the options that can be passed to the DuplicateTabEnforcer function.
 */
interface EnforcerOptions {
    appID?: string;
    timeout?: number;
    warningQuerySelector?: string;
    warningMarkup?: string;
}
/**
 * Ensure that the provided function runs only once in a unique tab.
 *
 * @param {EnforcerOptions} options Configuration options.
 * @param {Function} functionToRun The function to run when no duplicate tab is detected.
 */
declare function DuplicateTabEnforcer(options: EnforcerOptions, functionToRun: Function): void;
export default DuplicateTabEnforcer;
