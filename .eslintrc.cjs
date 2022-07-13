const fs = require("fs");
const path = require("path");

const sourceRoot = path.resolve(__dirname, "./src");
const dirEntries = fs.readdirSync(sourceRoot, { withFileTypes: true });
const moduleDirectories = dirEntries
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .join("|");

module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2020": true,
    "node": true,
    "shared-node-browser": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": ".",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json",
    "warnOnUnsupportedTypeScriptVersion": false
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "plugin:ramda/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "@typescript-eslint/eslint-plugin",
    "@next/eslint-plugin-next",
    "import",
    "ramda",
    "react",
    "react-hooks",
    "sort-destructure-keys",
    "sort-keys-fix"
  ],
  "settings": {
    "import/internal-regex": `^(${ moduleDirectories })`,
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "no-type-imports"
      }
    ],
    "@typescript-eslint/indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        "multiline": {
          "delimiter": "none"
        },
        "singleline": {
          "delimiter": "comma"
        }
      }
    ],
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unused-expressions": [
      "warn",
      {
        "allowShortCircuit": true,
        "allowTaggedTemplates": true,
        "allowTernary": true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_.+",
        "varsIgnorePattern": "^_.+"
      }
    ],
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/semi": [
      "warn",
      "never"
    ],
    "@typescript-eslint/sort-type-union-intersection-members": "warn",
    "import/order": [
      "warn",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always",
        "warnOnUnassignedImports": true
      }
    ],
    "react/display-name": "off",
    "react/jsx-closing-bracket-location": [
      "warn",
      "after-props"
    ],
    "react/jsx-curly-newline": [
      "warn",
      "consistent"
    ],
    "react/jsx-curly-spacing": [
      "warn",
      {
        "children": {
          "when": "always"
        },
        "attributes": {
          "when": "always"
        },
        "when": "always",
        "spacing": {
          "objectLiterals": "never"
        }
      }
    ],
    "react/jsx-indent": [
      "warn",
      2,
      {
        "checkAttributes": true,
        "indentLogicalExpressions": true
      }
    ],
    "react/jsx-indent-props": [
      "warn",
      2
    ],
    "react/jsx-pascal-case": [
      "error",
      {
        "allowAllCaps": true
      }
    ],
    "react/jsx-sort-default-props": [
      "error",
      {
        "ignoreCase": true
      }
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        "callbacksLast": true,
        "ignoreCase": true,
        "reservedFirst": true,
        "shorthandFirst": true
      }
    ],
    "react/jsx-tag-spacing": [
      "warn",
      {
        "afterOpening": "never",
        "beforeClosing": "never",
        "beforeSelfClosing": "always",
        "closingSlash": "never"
      }
    ],
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn",
    "react/sort-comp": [
      "error",
      {
        "order": [
          "static-variables",
          "static-methods",
          "instance-variables",
          "instance-methods",
          "everything-else",
          "render"
        ]
      }
    ],
    "react/sort-prop-types": [
      "error",
      {
        "callbacksLast": true,
        "ignoreCase": true,
        "requiredFirst": true,
        "sortShapeProp": true
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "RecoilCallback"
      }
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      {
        "caseSensitive": false
      }
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
    "accessor-pairs": "off",
    "comma-dangle": [
      "warn",
      "always-multiline"
    ],
    "eol-last": "off",
    "indent": "off",
    "jsx-quotes": [
      "warn",
      "prefer-single"
    ],
    "no-extra-boolean-cast": "off",
    "no-extra-semi": "off",
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 2,
        "maxBOF": 0
      }
    ],
    "no-regex-spaces": "off",
    "no-return-assign": "off",
    "no-trailing-spaces": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "no-var": "warn",
    "object-curly-spacing": [
      "warn",
      "always",
      {
        "objectsInObjects": false
      }
    ],
    "prefer-const": "warn",
    "prefer-rest-params": "error",
    "quotes": [
      "warn",
      "single",
      {
        "allowTemplateLiterals": true,
        "avoidEscape": true
      }
    ],
    "radix": "error",
    "semi": "off",
    "sort-imports": "off",
    "sort-keys": [
      "error",
      "asc",
      {
        "caseSensitive": false,
        "natural": true
      }
    ],
    "sort-vars": "off",
    "space-before-function-paren": [
      "warn",
      {
        "anonymous": "never",
        "named": "always",
        "asyncArrow": "always"
      }
    ],
    "template-curly-spacing": [
      "warn",
      "always"
    ]
  },
  "overrides": [
    {
      "files": "**/config/**",
      "rules": {
        "indent": "off",
        "sort-keys": "off",
        "sort-vars": "off"
      }
    },
    {
      "files": "**/*.js",
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}
