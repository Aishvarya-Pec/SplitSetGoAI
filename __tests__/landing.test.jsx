import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

describe('LandingPage', () => {
  it('renders Bill? Chill badge', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Bill\? Chill\./i)).toBeInTheDocument();
  });
});


