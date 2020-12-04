module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    // "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    // "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "react-app",
    "eslint:all",
    "plugin:react/all"
  ],
  "rules": {
    "linebreak-style": 0,
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "max-lines": "off",
    "no-inline-comments": "off",
    "line-comment-position": "off",
    "no-magic-numbers": "off",
    "object-curly-newline": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    "react/prop-types": [
      "off"
    ],
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": "off",
    "quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "react/jsx-indent": [
      2,
      2
    ],
    "react/jsx-indent-props": [
      2,
      2
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          '.ts',
          '.tsx'
        ]
      }
    ],
    "id-length": [
      "error",
      {
        "min": 1
      }
    ],
    "implicit-arrow-linebreak": 0,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-max-depth": 0,
    "max-depth": [
      "error",
      20
    ],
    "prefer-named-capture-group": 0,
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "one-var": [
      "error",
      "never"
    ],
    "prefer-destructuring:": "off",
    "react/prefer-stateless-function": [
      2,
      {
        "ignorePureComponents": true
      }
    ],
    "padded-blocks": [
      "error",
      "never"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "react/forbid-component-props": [
      0
    ],
    "max-lines-per-function": [
      "error",
      700
    ],
    "react/require-optimization": [
      0
    ],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "no-ternary": 0,
    "no-process-env": 0,
    "func-style": 0,
    "max-statements": [
      "error",
      200
    ],
    "no-negated-condition": 0,
    "object-shorthand": 0,
    "no-nested-ternary": 0,
    "react/jsx-no-bind": 0,
    "no-invalid-this": 0,
    "react/jsx-closing-tag-location": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-curly-brace-presence": [
      2,
      {
        "props": "always",
        "children": "always"
      }
    ],
    "class-methods-use-this": [
      "error",
      {
        "exceptMethods": [
          "render"
        ]
      }
    ],
    "react/no-set-state": 0,
    "max-params": 0,
    "no-shadow": 0,
    "react/jsx-closing-bracket-location": [
      1,
      {
        "selfClosing": "line-aligned",
        "nonEmpty": "after-props"
      }
    ],
    "no-underscore-dangle": 0,
    "no-confusing-arrow": 0,
    "complexity": 0,
    "react/no-array-index-key": 0,
    "prefer-promise-reject-errors": [
      "error",
      {
        "allowEmptyReject": true
      }
    ],
    "react/no-multi-comp": [
      2,
      {
        "ignoreStateless": true
      }
    ],
    "no-return-assign": 0,
    "no-async-promise-executor": 0,
    "radix": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-curly-newline": 0,
    "sort-imports": [
      "error",
      {
        "memberSyntaxSortOrder": [
          "all",
          "single",
          "multiple",
          "none"
        ]
      }
    ],
    "default-param-last": 0,
    "no-empty-function": 0,
    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": false,
        "beforeLineComment": false
      }
    ],
    "no-mixed-operators": 1,
    "no-import-assign": 0,
    "react/default-props-match-prop-types": [
      0,
      {
        "allowRequiredDefaults": 0
      }
    ],
    "no-undefined": 0,
    "no-console": 1,
    "new-cap": 0,
    "function-call-argument-newline": ["error", "consistent"]
  }
};
