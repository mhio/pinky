module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
}

/*
parserOptions:
  ecmaVersion: 2017
env:
  node: true
  mocha: true
  es6: true
extends: eslint:recommended
rules:
  quotes: [ 1, "single" ]
  semi: [ 1, "never" ]
  eqeqeq: 1
  no-alert: 2
  no-else-return: 2
  no-eval: 2
  no-extra-semi: 2

  no-global-assign: 2
  no-implicit-globals: 2
  no-implicit-coercion: 2
  no-implied-eval: 2
  no-loop-func: 2
  no-redeclare: 2
  no-throw-literal: 2
  yoda: [ 2, "never" ]
  no-unused-vars: 2
  no-nested-ternary: 2

#  array-bracket-spacing: [ 1, "always", { "singleValue": false } ]
  block-spacing: [ 1, "always" ]

*/
