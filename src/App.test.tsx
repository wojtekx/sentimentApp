import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sentimental Analyzer text', () => {
  render(<App />);
  const element = screen.getByText('Sentimental Analyzer');
  expect(element).toBeInTheDocument();
});
