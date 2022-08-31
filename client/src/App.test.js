import { render, screen } from '@testing-library/react';
import App from './App';

test('Has a welcome msg', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
test('Has a button', () => {
  render(<App/>);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
});