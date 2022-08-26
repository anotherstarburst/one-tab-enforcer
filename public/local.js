// /* eslint-disable no-console */

function runLocal() {
  const root = document.getElementById('root');
  const markup = `
  <div style="display: flex;justify-content: center;flex-direction: column;height: 100vh; text-align: center;" >
    <h1>
        This is the primary tab.
    </h1>
  </div>
  `;
  root.innerHTML = markup;
}

const customMarkup = `
  <div style="display: flex;justify-content: center;flex-direction: column;height: 100vh; text-align: center;" >
    <h1>
      ⚠️ Yo! Our mainframe can only support one tab.
    </h1>
  </div>
`;

this.OneTabEnforcer.default(
  {
    appID: 'some-unique-name', // make this unique such that other listeners on this domain don't pick up the uniqueness check
    timeout: 50, // (optional) how long to wait for other tabs to respond before executing the function
    warningQuerySelector: '#root', // (optional) where should we write the warning?
    warningMarkup: customMarkup, // (optional) what should the markup say. HTML in backticks please.
  },
  runLocal
);
