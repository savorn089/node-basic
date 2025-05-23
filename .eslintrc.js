module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {},
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
    ignores: ['node_modules/'],
  },
];
