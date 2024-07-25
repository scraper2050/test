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
    "react-app",
    "eslint:all",
  ],
  rules: {
    "linebreak-style": 0,
    "max-lines": "off",
    "no-inline-comments": "off",
    "line-comment-position": "off",
    "no-magic-numbers": "off",
    "object-curly-newline": "off",
    "object-property-newline": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    "react/prop-types": ["off"],
    "no-use-before-define": "off",
    "no-useless-escape": "off",
    "no-undef": "off",
    "vars-on-top": "off",
    "no-var": "off",
    "semi-spacing": "off",
    "no-useless-concat": "off",
    "no-extra-boolean-cast": "off",
    "block-scoped-var": "off",
    "no-bitwise": "off",
    "one-var": "off",
    "no-redeclare": "off",
    "yoda": "off",
    "no-unneeded-ternary": "off",
    "prefer-arrow-callback": "off",
    "require-atomic-updates": "off",
    "no-useless-return": "off",
    "no-prototype-builtins": "off",
    "array-callback-return": "off",
    "prefer-promise-reject-errors": "off",
    "template-curly-spacing": "off",
    "no-warning-comments": "off",
    "no-continue": "off",
    "no-await-in-loop": "off",
    "no-lone-blocks": "off",
    "comma-style": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": "off",
    "quotes": "off",
    "indent": "off",
    "no-return-await": "off",
    "no-prototype-builtins": "off",
    "no-promise-executor-return": "off",
    "no-throw-literal": "off",
    "function-call-argument-newline": "off",
    "array-bracket-spacing": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "id-length": [
      "error",
      {
        min: 1,
      },
    ],
    "implicit-arrow-linebreak": 0,
    "react/jsx-wrap-multilines": 0,
    "capitalized-comments": "off",
    "multiline-comment-style": "off",
    "multiline-ternary": "off",
    "no-eq-null": "off",
    "func-names": "off",
    "func-call-spacing": "off",
    "arrow-parens": "off",

    "react/jsx-max-depth": 0,
    "max-depth": ["error", 20],
    "prefer-named-capture-group": 0,
    "object-curly-spacing": "off",
    "one-var": "off",
    "prefer-destructuring": "off",
    "react/prefer-stateless-function": [
      2,
      {
        ignorePureComponents: true,
      },
    ],
    "padded-blocks": "off",
    "space-before-function-paren": "off",
    "spaced-comment": "off",
    "function-paren-newline": "off",
    "newline-per-chained-call": "off",
    "space-before-blocks": "off",

    "react/forbid-component-props": [0],
    "max-lines-per-function": ["error", 2000],
    "react/require-optimization": [0],
    "array-element-newline": "off",
    "array-bracket-newline": "off",
    "no-ternary": 0,
    "no-tabs": "off",
    "no-process-env": 0,
    "func-style": 0,
    "max-statements": ["error", 200],
    "no-negated-condition": 0,
    "no-new-wrappers": "off",
    "object-shorthand": 0,
    "no-nested-ternary": 0,
    "react/jsx-no-bind": 0,
    "no-invalid-this": 0,
    "react/jsx-closing-tag-location": 0,
    "react/forbid-prop-types": 0,
    "default-case": "off",

    "react/require-default-props": 0,
    "react/jsx-curly-brace-presence": "off",
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: ["render"],
      },
    ],
    "react/no-set-state": 0,
    "max-params": 0,
    "no-shadow": 0,
    "dot-notation": "off",

    "nonblock-statement-body-position": "off",
    "react/jsx-closing-bracket-location": [
      1,
      {
        selfClosing: "line-aligned",
        nonEmpty: "after-props",
      },
    ],
    "no-underscore-dangle": 0,
    "no-confusing-arrow": 0,
    "no-case-declarations": "off",
    "complexity": 0,
    "init-declarations": "off",
    "no-multiple-empty-lines": "off",
    "react/no-array-index-key": 0,
    "no-return-assign": 0,
    "no-async-promise-executor": 0,
    "radix": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-curly-newline": 0,
    "curly": "off",
    "sort-imports": "off",
    "default-param-last": 0,
    "no-empty-function": 0,
    "no-empty":"off",

    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: false,
        beforeLineComment: false,
      },
    ],
    "no-mixed-operators": 1,
    "no-import-assign": 0,
    "react/default-props-match-prop-types": [
      0,
      {
        allowRequiredDefaults: 0,
      },
    ],
    "no-undefined": 0,
    "no-console": 1,
    "new-cap": 0,
    "function-call-argument-newline": "off",
    "keyword-spacing": "off",
    "key-spacing": "off",
    "quote-props": "off",
    "sort-keys": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "camelcase": "off",
    "no-unused-vars": "warn",
    "space-in-parens": "off",
    "space-infix-ops": "off",

    "no-implicit-coercion": "off",
    "semi": "off",
    "eol-last": "off",
    "no-extra-parens": ["error", "functions"],
    "wrap-regex": "off",
    "require-unicode-regexp": "off",
    "generator-star-spacing": "off",
    "no-trailing-spaces": "off",
    "no-else-return": "off",
    "jsx-quotes": "off",
    "eqeqeq": "off",
    "operator-linebreak": "off",
    "prefer-const": "off",
    "no-multi-spaces": "off",
    "no-extra-semi": "off",
    "no-plusplus": "off",
    "semi-style": "off",
    "no-duplicate-imports": "off",
    "brace-style": "off",
    "max-statements-per-line": "off",
    "template-tag-spacing": "off",
    "block-spacing": "off",
    "no-lonely-if": "off",
    "require-await": "off",
    "no-extra-parens": "off",
    "no-param-reassign": "off",
    "no-duplicate-case": "off",
    "no-unreachable": "off",
    "prefer-template": "off",
    "arrow-spacing": "off"
  },
};
