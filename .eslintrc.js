module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-undef': 0,
    'max-len': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'object-curly-spacing': 0,
    'object-curly-newline': 0,
    'no-plusplus': 0,
    'linebreak-style': 0,
  },
};