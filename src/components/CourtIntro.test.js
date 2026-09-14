import { render, screen, fireEvent, act } from '@testing-library/react';
import CourtIntro from './CourtIntro';
jest.mock('./CourtCinema', () => () => <div>3D court</div>);

beforeEach(() => {
  jest.useFakeTimers();
  sessionStorage.clear();
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
});
afterEach(() => { jest.useRealTimers(); });

test('intro can be skipped, replayed, and completes without user action', () => {
  render(<CourtIntro />);
  fireEvent.click(screen.getByRole('button', { name: /Skip intro/i }));
  expect(screen.queryByRole('button', { name: /Skip intro/i })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Replay court intro/i }));
  expect(screen.getByRole('button', { name: /Skip intro/i })).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(10000));
  expect(screen.queryByRole('button', { name: /Skip intro/i })).not.toBeInTheDocument();
});

test('reduced motion skips automatic intro', () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(<CourtIntro />);
  expect(screen.queryByRole('button', { name: /Skip intro/i })).not.toBeInTheDocument();
});
