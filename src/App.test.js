import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

test('renders the portfolio positioning', () => {
  renderAt();
  expect(screen.getByText(/QA discipline/i)).toBeInTheDocument();
  expect(screen.getByText(/Order automation/i)).toBeInTheDocument();
  expect(screen.getByText(/3PL operations/i)).toBeInTheDocument();
});

test('renders the Eternights case study route', () => {
  renderAt('/case-studies/eternights-qa');
  expect(screen.getByText(/release-focused QA/i)).toBeInTheDocument();
  expect(screen.getByText(/What I did—and what I do not claim/i)).toBeInTheDocument();
});

test('renders the GPS order automation route', () => {
  renderAt('/case-studies/gps-order-automation');
  expect(screen.getByText(/Reduced to thirty minutes/i)).toBeInTheDocument();
  expect(screen.getByText(/Automation was useful only if the output could be trusted/i)).toBeInTheDocument();
  expect(screen.getByText(/From workflow analysis to tested operational automation/i)).toBeInTheDocument();
});

test('renders the GPS operations route', () => {
  renderAt('/case-studies/gps-3pl-operations');
  expect(screen.getByText(/Designing operations/i)).toBeInTheDocument();
  expect(screen.getByText(/Validate the workflow manually/i)).toBeInTheDocument();
});

test('renders the LAYRD operations route', () => {
  renderAt('/case-studies/layrd-operations');
  expect(screen.getByText(/Operating the systems/i)).toBeInTheDocument();
  expect(screen.getByText(/The infrastructure around the storefront/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Visit the store/i })).toHaveAttribute('href', 'https://layrd-shop.com/');
});
