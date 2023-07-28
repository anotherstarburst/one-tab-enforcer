/**
 * The default HTML markup to display when a duplicate tab is detected.
 */
const defaultWarningMarkup: string = `
  <div style="display: flex; justify-content: center; flex-direction: column; height: 100vh; text-align: center;" >
    <h1>
      ⚠️ This is a duplicate tab - please shut it down.
    </h1>
  </div>
`;

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
 * Display a warning message in the console and on the DOM.
 *
 * @param {String} markup Markup for the warning. This will be put in an element's innerHTML.
 * @param {String} querySelector The query selector that we'll put the warning markup into.
 * @returns {void}
 */
function displayWarning(markup: string, querySelector: string): void {
  const effectiveMarkup = markup || defaultWarningMarkup;

  let targetElement: HTMLElement;

  if (querySelector) {
    targetElement = document.querySelector(querySelector);
    if (!targetElement) {
      console.warn(`No element matches the provided query selector "${querySelector}".`);
      return;
    }
  } else {
    targetElement = document.createElement('div');
    document.body.prepend(targetElement);
  }

  targetElement.innerHTML = effectiveMarkup;
}

/**
 * Ensure that the provided function runs only once in a unique tab.
 *
 * @param {EnforcerOptions} options Configuration options.
 * @param {Function} functionToRun The function to run when no duplicate tab is detected.
 */
// eslint-disable-next-line @typescript-eslint/default-param-last
function DuplicateTabEnforcer(options: EnforcerOptions = {}, functionToRun: Function): void {
  const { appID = 'some-unique-name', timeout = 50, warningQuerySelector = '', warningMarkup = '' } = options;

  let duplicateTabDetected: boolean | null = null;

  /**
   * Execute the provided function if no duplicate tab is detected.
   *
   * @returns {boolean}
   */
  function executeIfUnique(): boolean {
    if (duplicateTabDetected !== null) {
      console.warn('Duplicate tab detected or function has already been executed. Function will not be executed.');
      return false;
    }

    duplicateTabDetected = false;
    functionToRun();
    return true;
  }

  /**
   * Start a search for duplicate tabs.
   * If a duplicate tab is found within the specified timeout, show a warning and stop the function execution.
   */
  function initiateTabSearch(): void {
    const bc = new BroadcastChannel(appID);

    bc.onmessage = (event: MessageEvent): void => {
      if (event.data === 'pong') {
        duplicateTabDetected = true;
        displayWarning(warningMarkup, warningQuerySelector);
        bc.close();
      } else {
        bc.postMessage('pong');
      }
    };

    bc.postMessage('ping');

    setTimeout(executeIfUnique, timeout);
  }

  initiateTabSearch();
}

export default DuplicateTabEnforcer;
