import { render, screen } from '@testing-library/react';
import DemoIntro from './DemoIntro';

test('renders Demo description and sub forms', () => {
  render(<DemoIntro />);
  const linkElement = screen.getByText(/issac@swmmReact.org/i);
  expect(linkElement).toBeInTheDocument();
});
