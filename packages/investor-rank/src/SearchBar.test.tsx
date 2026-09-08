import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the current search term as the input value', () => {
    render(<SearchBar searchTerm="fintech" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search investors/i)).toHaveValue('fintech');
  });

  it('calls onSearchChange with the new value when typing', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(/search investors/i);
    await user.type(input, 'ai');

    expect(onSearchChange).toHaveBeenCalledTimes(2);
    expect(onSearchChange).toHaveBeenNthCalledWith(1, 'a');
    expect(onSearchChange).toHaveBeenNthCalledWith(2, 'i');
  });

  it('renders an empty input when searchTerm is empty', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search investors/i)).toHaveValue('');
  });
});
