module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 11,
    project: './tsconfig.json',
  },
  rules: {
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/strict-boolean-expressions': [0],
    '@typescript-eslint/restrict-template-expressions': [0],
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-void': [0],
    'import/order': ['error', {
      'newlines-between': 'always-and-inside-groups',
    }],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'ignore',
      named: 'ignore',
      asyncArrow: 'ignore',
    }],
    '@typescript-eslint/naming-convention': 'off',
  },
}
