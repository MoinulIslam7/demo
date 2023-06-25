module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 'error',
    'import/no-named-as-default': 'off',
    curly: 'warn',
    semi: 'error',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'linebreak-style': 'off',
    indent: 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-param-reassign': [2, { props: false }],
    'jsx-a11y/no-autofocus': [2, {
      ignoreNonDOM: true,
    }],
  },
  ignorePatterns: [
    'public',
  ],
};
