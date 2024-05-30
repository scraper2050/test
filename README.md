# Project Title

## Description
A brief description of what the project does, its features, and its benefits.

## Table of Contents
- [Installation](#installation)
- [Style and other guidelines](#style-and-other-guidelines)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Authors and Acknowledgments](#authors-and-acknowledgments)
- [Contact Information](#contact-information)
- [Changelog](#changelog)
- [FAQ](#faq)

## Installation
### Prerequisites
Operating system:
- Linux-based distributions: Ubuntu, Mint, etc. (recommended).
- MacOS.
- Windows (not recommended): in the past it has caused some problems when it comes to installing node-gyp packages. Using a virtual machine running a Linux-based distribution is a good option if you have enough hardware resources.

Mandatory software:
- Git.
- Node / npm **version 14**.
- yarn.

Recommended software:
- Github desktop client.
- Visual studio code.
- Nvm to manage multiple node versions.

### Steps
1. Make sure you were granted **permissions to the corresponding Github repository** and you can access it in the browser: [https://github.com/blueclerk/blueclerk_react_web.git](https://github.com/blueclerk/blueclerk-node-api.git)
2. **Clone the repository**. You can use Github desktop or the CLI command. In the second scenario, make sure you configured one of these authentication methods: [Github SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) or [Github tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
```bash
git clone https://github.com/blueclerk/blueclerk_react_web.git
```
3. Check node and npm versions:
```bash
node -v
# 14.*.*
npm -v
# 6.*.*
```
4. Install the project dependencies:
```bash
yarn install
```
6. All good so far? Then you are ready to **run the project**:
```bash
npm run start
```
8. App will start running in [http://localhost:3000](http://localhost:3000).

## Style and other guidelines

### `Structure`

- Components
  -- folder
  -- file-kebab-case.tsx
- Pages
  -- folder
  -- file-kebab-case.tsx
- Actions
  -- folder
  -- file-kebab-case.action.ts
  -- file-kebab-case.type.ts
- Reducers
  -- file-kebab-case.reducer.ts
- Saga
  -- file-kebab-case.saga.ts
- Modals
  -- folder
  -- file-kebab-case.tsx
- Models
  -- Model.ts
- Assets
- Utils || Shared Services
  -- theme.scss
  -- Constants.ts
  -- Api.ts

### `Styling`

- Use axios as a dependency for fetching data for an API
- Make a method or function in Api.ts file and use that method in the component

### `Styling`

- Use JSS for styling (Material UI by default uses JSS)

### `State Management`

- Redux for State Management
- Redux-Thunk as a Middleware

### `Naming`

- Use of PascalCase for constructor functions naming
- Use of camelCase for variable naming
- Use of kebab-case for file naming
- Prefix component with page or component name
- Reducer Naming (name-kebabcase.reducer.ts)
- Action Naming (name-kebabcase.action.ts)
- Style Naming (page-or-component.style.ts)

### `Utils`

- Theming would be in one single file (fonts, colors, general items)
- App constants
- Api.ts (General implementation as a service for api call, all methods for api endpoints should be declared here)

### `Modals`

- General implementation for modal container as a React Portal
- Separate folder for all the application Modals

### `Forms`

- Use Formik for forms [https://formik.org/docs/overview]

### `Don't`

- No use of class based component
- No use of template.tsx (prefix component with page or component name)
- No use of class based component
- Don't just add any dependency

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Usage
Provide usage examples, screenshots, and instructions.

## Configuration
Explain configuration options.

## Contributing
Explain how to contribute and include a link to the code of conduct.

## License
State the license and link to the full text.

## Authors and Acknowledgments
List main contributors and acknowledge others.

## Contact Information
Provide contact details.

## Changelog
Document version history.

## FAQ
Address common questions.
