module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parserOptions: {
    ecmaVersion: '2020',
  },
  rules: {
    'no-undef': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/prop-types': 'off',
  },
};
