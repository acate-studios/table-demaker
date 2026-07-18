import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["dist/**", "storybook-static/**", ".eslintrc.cjs"],
  },
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      "simple-import-sort": eslintPluginSimpleImportSort,
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
      "testing-library": testingLibrary,
      storybook,
      vitest,
    },
    settings: {
      react: {
        version: "18.2.0",
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // error prevention
      "array-callback-return": ["error", { checkForEach: true }],
      "no-await-in-loop": "error",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "no-promise-executor-return": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: true,
          allowNamedExports: false,
        },
      ],
      "require-atomic-updates": "error",

      // good practises
      camelcase: ["error", { properties: "never" }],
      eqeqeq: "error",
      "new-cap": ["error", { capIsNew: false }],
      "no-array-constructor": "error",
      "no-console": ["error", { allow: ["error"] }],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-extend-native": "error",
      "no-lonely-if": "error",
      "no-param-reassign": "error",
      "no-return-assign": "error",
      "no-throw-literal": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      radix: "error",
      yoda: "error",

      // style
      curly: "error",
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
      semi: ["error", "always"],
      quotes: ["error", "double"],

      // plugins
      // "import/first": "error",
      // "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      // "import/no-unresolved": "error",
      "import/no-webpack-loader-syntax": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // testing library
      "testing-library/await-async-queries": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-debugging-utils": "off", // warn
      "testing-library/no-dom-import": "off",

      // vitest
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }], // you can also modify rules' behavior using option like this

      // storybook
      // "storybook/await-interactions": "error", y
      // "storybook/default-exports": "error",
      // "storybook/hierarchy-separator": "warn",
      // "storybook/no-redundant-story-name": "warn", y
      // "storybook/no-uninstalled-addons": "warn",
      // "storybook/prefer-pascal-case": "error",
      // "storybook/story-exports": "error",
      // "storybook/use-storybook-expect": "error", y
      // "storybook/use-storybook-testing-library": "error",
    },
  },
];
