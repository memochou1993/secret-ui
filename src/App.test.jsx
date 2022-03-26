import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('', () => {
  render(<App />);
  const element = screen.getByText();
  expect(element).toBeInTheDocument();
});
