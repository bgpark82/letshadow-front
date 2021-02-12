module.exports = {
    extends: ['airbnb-typescript','prettier'],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/object-curly-spacing':0,
        '@typescript-eslint/space-infix-ops':0,
    }
};