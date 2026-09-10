'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AuthButton } from '@rights/auth/AuthButton';
import { SITE_CATEGORIES, SITE_LINKS, navLabel, type SiteCategory } from './site-nav';

/** Height of the fixed bar, mirrored by the layout's top padding. */
export const TOP_NAV_HEIGHT_CLASS = 'h-16';

function CategoryMenu({
  category,
  isOpen,
  onOpen,
  onClose,
}: {
  category: SiteCategory;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const CategoryIcon = category.icon;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        // Only close once focus has actually left the whole menu, or
        // tabbing from the trigger into the first item would shut it.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
      >
        <CategoryIcon className="h-4 w-4 shrink-0" />
        {category.title}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={category.title}
          className="absolute left-0 top-full z-50 w-80 pt-2"
        >
          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/95 p-2 shadow-2xl backdrop-blur-md">
            {category.documents.map((doc) => {
              const DocIcon = doc.icon;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  role="menuitem"
                  onClick={onClose}
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-800 focus-visible:bg-gray-800 focus-visible:outline-none"
                >
                  <DocIcon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-gray-100">{navLabel(doc)}</span>
                    <span className="mt-0.5 block line-clamp-2 text-xs text-gray-400">
                      {doc.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Site-wide top navigation: the brand, a dropdown per document category, the
 * standalone links, and the sign-in state. Rendered from the root layout so it
 * is present on every page.
 */
export function TopNav() {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const closeAll = useCallback(() => {
    setOpenCategory(null);
    setMobileOpen(false);
  }, []);

  // A route change should never leave a menu hanging open over the new page.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeAll();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [closeAll]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex ${TOP_NAV_HEIGHT_CLASS} items-center justify-between gap-4`}>
          <div className="flex min-w-0 items-center gap-6">
            <Link href="/" className="shrink-0 text-xl font-bold text-white">
              Rights Institute
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {SITE_CATEGORIES.map((category) => (
                <CategoryMenu
                  key={category.title}
                  category={category}
                  isOpen={openCategory === category.title}
                  onOpen={() => setOpenCategory(category.title)}
                  onClose={() =>
                    setOpenCategory((current) => (current === category.title ? null : current))
                  }
                />
              ))}
              {SITE_LINKS.filter((link) => link.href !== '/').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <AuthButton />
            </div>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="site-nav-mobile"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="site-nav-mobile"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-800 bg-gray-900/95 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {SITE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {SITE_CATEGORIES.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div key={category.title}>
                  <div
                    className={`mb-2 flex items-center gap-2 border-b pb-2 ${category.borderColor}`}
                  >
                    <CategoryIcon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                    <span className="text-sm font-semibold text-gray-200">{category.title}</span>
                  </div>
                  <div className="flex flex-col">
                    {category.documents.map((doc) => (
                      <Link
                        key={doc.href}
                        href={doc.href}
                        onClick={closeAll}
                        className="rounded-md px-2 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        {navLabel(doc)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="sm:hidden">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default TopNav;
