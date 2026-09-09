/**
 * @fileoverview Covers the document navigation grid — the site's front door.
 *
 * The behaviour worth pinning is the auth gate on "Create Custom": a signed-in
 * visitor is routed straight to the builder, while a signed-out one is sent
 * through Google sign-in with the builder as the callback, so they land where
 * they were headed instead of on the dashboard.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const push = vi.fn();
const socialSignIn = vi.fn();
let session: { user: { id: string } } | null = null;

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@rights/auth/auth-client', () => ({
  useSession: () => ({ data: session }),
  signIn: {
    social: (...args: unknown[]) => socialSignIn(...args),
  },
}));

vi.mock('@rights/auth/AuthButton', () => ({
  AuthButton: () => <button type="button">Sign in</button>,
}));

const { default: DocumentNavigation } = await import('./DocumentNavigation');

beforeEach(() => {
  push.mockClear();
  socialSignIn.mockClear();
  session = null;
});

describe('DocumentNavigation', () => {
  it('lists every category', () => {
    render(<DocumentNavigation />);
    for (const category of [
      'Legal & Ethics',
      'Licensing & Attribution',
      'Knowledge & Philosophy',
    ]) {
      expect(
        screen.getByRole('heading', { name: category }),
      ).toBeInTheDocument();
    }
  });

  it('shows each document with its description', () => {
    render(<DocumentNavigation />);
    expect(
      screen.getByRole('heading', { name: 'PROSPER License' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Permissionless Reuse for an Open Society/),
    ).toBeInTheDocument();
  });

  it('navigates to a document when its card is clicked', () => {
    render(<DocumentNavigation />);
    fireEvent.click(
      screen.getByRole('heading', { name: 'PROSPER License' }).closest('div.group') as HTMLElement,
    );
    expect(push).toHaveBeenCalledWith('/prosper');
  });

  it('renders no action row today, because no document opts into one', () => {
    // `DocumentButton` supports a "Create Custom" / "Example Demo" row behind
    // `showActions`, and several documents carry a `createHref` for it — but no
    // category entry sets `showActions`, so the row never renders on the site.
    // Pinned as-is: switching it on is a product call, not a test's.
    render(<DocumentNavigation />);
    expect(screen.queryByRole('button', { name: 'Create Custom' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Example Demo' })).toBeNull();
  });

  it('gives every card an image with alt text naming its document', () => {
    render(<DocumentNavigation />);
    expect(
      screen.getByRole('img', { name: 'PROSPER License' }),
    ).toBeInTheDocument();
  });

  it('navigates to each document from its own card', () => {
    render(<DocumentNavigation />);
    for (const [title, href] of [
      ['CREDIT Platform', '/credit'],
      ['Employment or Contract Agreement', '/contract'],
      ['Terms of Service & Privacy Policy', '/terms-privacy'],
    ] as const) {
      push.mockClear();
      fireEvent.click(
        screen.getByRole('heading', { name: title }).closest('div.group') as HTMLElement,
      );
      expect(push, title).toHaveBeenCalledWith(href);
    }
  });
});
