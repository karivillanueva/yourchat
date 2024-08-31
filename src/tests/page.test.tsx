import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';

import Home from '@/app/page';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('Home Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/YourChat/i);
    expect(titleElement).toBeInTheDocument();
  });
});
