# One-Tab Enforcer

The One-Tab Enforcer is a lightweight utility built to ensure that specific pages of a website are only open in one tab at a time. Developed for use at [getchinwag.com](https://www.getchinwag.com), it provides an easy way to prevent resource duplication and potential issues related to having the same page open in multiple tabs.

## Key Features

1. **Lightweight:** The One-Tab Enforcer is very minimal, weighing in at just over 1KB.
2. **No Dependencies:** Written in vanilla JavaScript, it doesn't require any additional libraries to function.
3. **Cross-Browser Support:** It works across different browsers and does not rely on cookies, sessionStorage, etc.

## Usage

### Installation

First, install the package using npm:

```bash
npm install @anotherstarburst/one-tab-enforcer --save
```

### Basic Usage

To use the One-Tab Enforcer, simply wrap the function that you want to run in a unique tab as follows:

```javascript
import oneTabEnforcer from 'one-tab-enforcer';

const customWarningMarkup = `<div style="display: flex; justify-content: center; flex-direction: column; height: 100vh; text-align: center;">
<h1>⚠️ Yo! Our server can only support one tab.</h1>

</div>`;

function myFunction() {
  console.log('This function is running in a unique tab!');
}

oneTabEnforcer(
  {
    appID: 'my-app', // This should be unique to prevent conflicts with other listeners on the same domain.
    timeout: 50, // This is optional and defines how long to wait (in milliseconds) for other tabs to respond before executing the function.
    warningQuerySelector: '#root', // This is optional and defines where the warning should be displayed in the DOM.
    warningMarkup: customWarningMarkup, // This is optional and defines the HTML markup to display as a warning.
  },
  myFunction,
);
```

### With Variable Passing

Here's how you can pass variables to the function:

```javascript
import oneTabEnforcer from '@anotherstarburst/one-tab-enforcer';

const customWarningMarkup = `<div style="display: flex; justify-content: center; flex-direction: column; height: 100vh; text-align: center;">
<h1>⚠️ Yo! Our server can only support one tab.</h1>

</div>`;

function myFunction(myVariable) {
  console.log(myVariable);
}

oneTabEnforcer(
  {
    appID: 'my-app',
    timeout: 50,
    warningQuerySelector: '#root',
    warningMarkup: customWarningMarkup,
  },
  () => {
    const myVariable = 'Hello, world!';
    myFunction(myVariable);
  },
);
```

## How it Works

The One-Tab Enforcer utilizes the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) to communicate between different tabs open on the same domain. When a message is received from another tab, it displays the warning and prevents the function from running.

### Notes

- The `appID` can be any string, but it should be unique to each instance of the One-Tab Enforcer on a single domain to prevent conflicts.

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/anotherstarburst/one-tab-enforcer.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open the page in multiple tabs to see the One-Tab Enforcer in action.

## Planned Features

- **Optimization:** Review the dev dependency list and remove unused ones.

## Contributions

We warmly welcome contributions from the community. If you're interested in contributing, please follow these steps:

1. **Fork the repository**: Use the GitHub UI to fork the repository to your own GitHub account.

2. **Clone your forked repository**: Clone your forked repository to your local machine using:

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/one-tab-enforcer.git
   ```

3. **Create a new branch**: Always create a new branch for your changes. Keep the branch name descriptive:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**: Make the changes you wish to contribute. Be sure to test them thoroughly.

5. **Commit your changes**: Commit your changes to your local repository:

   ```bash
   git add .
   git commit -m "A short description of the change."
   ```

6. **Push your changes**: Push your changes to your forked repository on GitHub:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request**: Use the GitHub UI on your forked repository to create a new pull request. Provide a clear and comprehensive description of the changes in your PR.

## Code of Conduct

As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of their experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, or religion.

## License

This project is open source, and is licensed under the MIT License. Please see the [LICENCE](LICENCE) file for the full text of the license.

## Support

If you encounter any issues or have questions about using the library, please create a [new issue](https://github.com/anotherstarburst/one-tab-enforcer/issues/new) on our GitHub page.
