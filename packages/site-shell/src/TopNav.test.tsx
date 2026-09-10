/**
 * @fileoverview Covers the site-wide top navigation.
 *
 * The bar renders from the root layout on every page, so what matters is that
 * every category from the shared catalogue is reachable: a dropdown per
 * category, each listing its documents with the right hrefs, and a menu that
 * closes again on Escape.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: React.ComponentProps<'a'> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('@rights/auth/AuthButton', () => ({
  AuthButton: () => <button type="button">Sign In</button>,
}));

const { TopNav } = await import('./TopNav');
const { SITE_CATEGORIES, navLabel } = await import('./site-nav');

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('TopNav', () => {
  it('offers a dropdown trigger for every category', () => {
    render(<TopNav />);

    for (const category of SITE_CATEGORIES) {
      expect(screen.getByRole('button', { name: new RegExp(category.title) })).toBeInTheDocument();
    }
  });

  it('keeps every category collapsed until it is opened', () => {
    render(<TopNav />);

    for (const category of SITE_CATEGORIES) {
      expect(screen.getByRole('button', { name: new RegExp(category.title) })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });

  it('lists a category\'s documents, linking each to its own page', () => {
    render(<TopNav />);
    const category = SITE_CATEGORIES[0];

    fireEvent.click(screen.getByRole('button', { name: new RegExp(category.title) }));

    for (const doc of category.documents) {
      expect(screen.getByRole('menuitem', { name: new RegExp(navLabel(doc)) })).toHaveAttribute(
        'href',
        doc.href,
      );
    }
  });

  it('closes an open menu on Escape', () => {
    render(<TopNav />);
    const category = SITE_CATEGORIES[0];
    const trigger = screen.getByRole('button', { name: new RegExp(category.title) });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('carries the sign-in state and a link home', () => {
    render(<TopNav />);

    expect(screen.getAllByRole('button', { name: 'Sign In' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Rights Institute' })).toHaveAttribute('href', '/');
  });
});
