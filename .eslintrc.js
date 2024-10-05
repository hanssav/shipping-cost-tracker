module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'prettier', // Ensures ESLint and Prettier don't conflict
        'plugin:prettier/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows modern ECMAScript features
        sourceType: 'module', // Allows usage of imports
    },
    rules: {
        // Custom rules
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'warn',
    },
};
