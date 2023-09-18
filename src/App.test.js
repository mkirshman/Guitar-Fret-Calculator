import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const renderElement = screen.getByText(/Basic Fret Distance Calculator/i);
  expect(renderElement).toBeInTheDocument();
});
