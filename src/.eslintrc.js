module.exports = {
    parser: '@typescript-eslint/parser', // Используем TypeScript-парсер
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      // Укажите путь к вашему tsconfig.json, если он используется:
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended',
    ],
    rules: {
      // ваши правила ESLint
    },
  };
