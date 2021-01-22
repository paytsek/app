module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/standard', 'prettier/babel', 'prettier/react'],
  plugins: ['prettier', 'react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    'react/jsx-fragments': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'react/no-unescaped-entities': 0,
  },
};
