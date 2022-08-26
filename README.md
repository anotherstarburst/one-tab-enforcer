# one-tab-enforcer

This is a wrapper for any function that ensures the website is only open in one tab.

It was built to ensure some pages at (getchinwag.com)[https://www.getchinwag.com] were only open on one tab.

## Why use this

1. It's tiny. Weighing in at a shade over 1kb.
2. Vanilla JavaScript, no dependencies
3. Cross browser support with no need for cookies, sessionStorage, etc.

## Using this module

1. Install this package

   `npm install @anotherstarburst/one-tab-enforcer --save`

2. Wrap the function you want to run as follows

```javascript
import oneTabEnforcer from 'one-tab-enforcer';

const customMarkup = `
  <div style=" display: flex;justify-content: center;flex-direction: column;height: 100vh; text-align: center;" >
    <h1>
      ⚠️ Yo! Our mainframe can only support one tab.
    </h1>
  </div>
`;

function functionYouWantToRun() {
  console.log('It works!');
}

oneTabEnforcer(
  {
    appID: 'some-unique-name', // make this unique such that other listeners on this domain don't pick up the uniqueness check
    timeout: 50, // (optional) how long to wait for other tabs to respond before executing the function
    warningQuerySelector: '#root', // (optional) where should we write the warning?
    warningMarkup: customMarkup, // (optional) what should the markup say. HTML in backticks please.
  },
  functionYouWantToRun
);
```

### Passing variables

It's a little messy...

```javascript
import oneTabEnforcer from '@anotherstarburst/one-tab-enforcer';

const customMarkup = `
  <div style=" display: flex;justify-content: center;flex-direction: column;height: 100vh; text-align: center;" >
    <h1>
      ⚠️ Yo! Our mainframe can only support one tab.
    </h1>
  </div>
`;

function functionYouWantToRun(myHandyVariable) {
  console.log(myHandyVariable);
}

oneTabEnforcer(
  {
    appID: 'some-unique-name', // make this unique such that other listeners on this domain don't pick up the uniqueness check
    timeout: 50, // (optional) how long to wait for other tabs to respond before executing the function
    warningQuerySelector: '#root', // (optional) where should we write the warning?
    warningMarkup: customMarkup, // (optional) what should the markup say. HTML in backticks please.
  },
  () => {
    const myHandyVariable = 'It still works!';
    functionYouWantToRun(myHandyVariable);
  }
);
```

## Under the hood

We're using the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) to send a message to other listening channels on the same domain. The original tab will be the only one that should remain live, with any others getting the `warningMarkup` presented to them.

### Notes

- The [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) ensures that the plugin will only look for unique tabs on a single domain.

- The `appID` can be anything. But if you want to have multiple instances of the one-tab-enforcer running on a single domain without conflict, please make it something sensible.

### Setting up the development environment for this module

1. Clone

   `git clone https://github.com/anotherstarburst/one-tab-enforcer.git`

2. Install dependencies

   `npm install`

3. Run

   `npm start`

4. Open multiple tabs to see the magic in action.

##  TODO's

- Tests
  - Can probably embed an iframe in a page to simulate a second tab
- Remove unused (dev) dependencies
