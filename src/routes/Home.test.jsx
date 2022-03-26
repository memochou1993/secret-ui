import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('', () => {
  render(<Home />);
  const element = screen.getByText();
  expect(element).toBeInTheDocument();
});
