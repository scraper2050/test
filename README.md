## What to Follow

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
- No use of index.tsx (prefix component with page or component name)
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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
