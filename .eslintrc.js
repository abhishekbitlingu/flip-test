module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['react', 'react-native', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-raw-text': [
      2,
      {
        skip: ['Typography'],
      },
    ],
    'react-native/no-color-literals': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react/prop-types': 0,
  },
};