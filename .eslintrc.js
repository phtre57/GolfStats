module.exports = {
  root: true,
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules/**', '../cms/dist/**', '../cms/node_modules/**', '../cdk/node_modules/**', '../cdk/build/**'],
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    curly: ['error', 'all'],
    semi: ['error', 'never'],
    'prefer-regex-literals': 0,
    '@typescript-eslint/no-empty-interface': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/2483
    '@typescript-eslint/no-shadow': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/destructuring-assignment': 1,
    'react/jsx-curly-newline': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-promise-executor-return': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-useless-fragment': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-restricted-syntax': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': [1, 140],
    'object-curly-newline': 0,
    'no-undef': 0,
    'consistent-return': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'guard-for-in': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'react/no-unescaped-entities': 0,
    'react/forbid-prop-types': 0,
    'react/no-unstable-nested-components': 0,
    'import/named': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    '@typescript-eslint/camelcase': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-plusplus': 0,
    'no-useless-constructor': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'object'],
        pathGroups: [
          {
            pattern: '**.scss',
            group: 'object',
            patternOptions: { matchBase: true },
          },
        ],
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-new': 0,
    'class-methods-use-this': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        paths: ['./backend', './packages'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
