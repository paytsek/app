module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
    'func-names': 0,
  },
  ignorePatterns: ['/client/src'],
};
