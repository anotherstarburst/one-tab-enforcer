/* eslint-disable no-console */

const defaultMarkup: string = `
  <div style=" display: flex;justify-content: center;flex-direction: column;height: 100vh; text-align: center;" >
    <h1>
      ⚠️ This is a duplicate tab - please shut it down.
    </h1>
  </div>
`;

/**
 * Description.
 * This sends a warning to the DOM.
 *
 * @param {String} warningMarkup Markup for the warning. This will be put in an element's innerHTML.
 * @param {String} warningQuerySelector The query selector that we'll put the warning markup into.
 * @returns {void}
 */
function showWarning(warningMarkup: string, warningQuerySelector: string): void {
  console.warn('theEnforcer>showWarning: Close this tab down, it is a duplicate');
  const markup = warningMarkup || defaultMarkup;

  if (warningQuerySelector) {
    const elm = document.querySelector(warningQuerySelector);
    elm.innerHTML = markup;
    return;
  }

  const elm = document.createElement('div');
  elm.innerHTML = markup;
  document.body.prepend(elm);
}

function theEnforcer(
  { appID = 'some-unique-name', timeout = 50, warningQuerySelector = '', warningMarkup = '' },
  functionToRun: Function
) {
  console.debug('theEnforcer');
  let siblingsFound = null;

  /**
   * Description.
   * Checks to see if siblings have been found and if not it'll execute the `functionToRun()`.
   * Note, that this function should only run once.
   *
   * @returns {(boolean|Function)}
   */
  function checkNoSiblings(): boolean | Function {
    console.debug('theEnforcer>checkNoSiblings');
    if (siblingsFound !== null) {
      console.debug('theEnforcer>checkNoSiblings: siblingsFound !== null');
      // either this function has run already (`siblingsFound === false `)or siblings
      // have been found (`siblingsFound = true`)
      return false;
    }

    siblingsFound = false;
    return functionToRun();
  }

  /**
   * Description.
   * Kicks off a search for sibling tabs that are listening on the same BroadcastChannel.
   * If found within the `timeout` wait time, it'll shut down the BroadcastChannel listener and
   * show the warning markup.
   */
  function searchForSibling() {
    console.debug('theEnforcer>searchForSibling');
    const bc = new BroadcastChannel(appID);

    bc.onmessage = (event) => {
      console.debug('theEnforcer>searchForSibling>bc.onmessage', event);
      if (event.data === 'pong') {
        siblingsFound = true;
        showWarning(warningMarkup, warningQuerySelector);
        bc.close();
        return;
      }
      bc.postMessage('pong');
    };
    bc.postMessage('ping');
    setTimeout(() => {
      checkNoSiblings();
    }, timeout);
  }

  searchForSibling();
}

export default theEnforcer;
