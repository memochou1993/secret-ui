module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parserOptions: {
    ecmaVersion: '2020',
  },
  rules: {
    'arrow-body-style': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
  },
};
