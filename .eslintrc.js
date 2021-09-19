module.exports = {
  env: {
    browser: false,
    es6: false,
    commonjs: false,
    es6: false,
    node: false,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['airbnb-typescript','prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    project: 'tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      pragma: 'React',
      version: '17',
    },
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': [0, { requireForBlockBody: false }],
    'jsx-quotes': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
};
