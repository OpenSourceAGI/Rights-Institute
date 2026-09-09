/**
 * @fileoverview Covers the presentational effect components: each one takes a
 * handful of props that decide what a visitor actually sees, and each has a
 * default the rest of the site relies on.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sparkles } from 'lucide-react';

import CardBlock from './CardBlock';
import GlowWrapper from './GlowWrapper';
import ShinyText from './ShinyText';
import Meteors from './Meteors';
import BorderBeam from './BorderBeam';

describe('CardBlock', () => {
  const props = {
    id: 3,
    title: 'Right to Conscience',
    description: 'Every conscious life may reason for itself.',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-500',
  };

  it('shows its number, title and description', () => {
    render(<CardBlock {...props} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Right to Conscience')).toBeInTheDocument();
    expect(
      screen.getByText('Every conscious life may reason for itself.'),
    ).toBeInTheDocument();
  });

  it('renders the title as a heading', () => {
    render(<CardBlock {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Right to Conscience' }),
    ).toBeInTheDocument();
  });

  it('applies the gradient it was given', () => {
    const { container } = render(<CardBlock {...props} />);
    expect(container.innerHTML).toContain('from-blue-500 to-purple-500');
  });

  it('defaults its hover color', () => {
    const { container } = render(<CardBlock {...props} />);
    expect(container.innerHTML).toContain('group-hover:text-purple-300');
  });

  it('honors a hover color override', () => {
    const { container } = render(
      <CardBlock {...props} hoverColor="emerald-400" />,
    );
    expect(container.innerHTML).toContain('group-hover:text-emerald-400');
  });

  it('passes an extra className onto the outer element', () => {
    const { container } = render(<CardBlock {...props} className="col-span-2" />);
    expect(container.firstElementChild?.className).toContain('col-span-2');
  });
});

describe('GlowWrapper', () => {
  it('renders whatever it wraps', () => {
    render(
      <GlowWrapper>
        <button type="button">Click me</button>
      </GlowWrapper>,
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('defaults to the medium size', () => {
    const { container } = render(<GlowWrapper>x</GlowWrapper>);
    expect(container.firstElementChild?.className).toContain('p-px');
  });

  it.each([
    ['sm', 'p-0.5'],
    ['md', 'p-px'],
    ['lg', 'p-1'],
  ] as const)('uses the %s padding for size %s', (size, expected) => {
    const { container } = render(<GlowWrapper size={size}>x</GlowWrapper>);
    expect(container.firstElementChild?.className).toContain(expected);
  });

  it('paints a real conic gradient, not an unparseable one', () => {
    // Regression: the gradient was written with Tailwind's underscore
    // arbitrary-value syntax ("from_90deg_at_50%_50%"), which is not valid CSS
    // in a style attribute — the browser dropped the declaration and the glow
    // this whole component exists for never rendered.
    const { container } = render(<GlowWrapper>x</GlowWrapper>);
    const glow = container.querySelector('span') as HTMLSpanElement;

    expect(glow.style.background).toContain('conic-gradient');
    expect(glow.style.background).not.toContain('_');
  });

  it('paints the glow color it was given', () => {
    // jsdom re-serializes hex colors as rgb(), so the two gradients are
    // compared to each other rather than to a literal hex string.
    const backgroundOf = (element: HTMLElement) =>
      (element.querySelector('span') as HTMLSpanElement).style.background;

    const { container: fallback } = render(<GlowWrapper>x</GlowWrapper>);
    const { container: custom } = render(
      <GlowWrapper glowColor="#3b82f6">x</GlowWrapper>,
    );

    expect(backgroundOf(custom)).not.toBe(backgroundOf(fallback));
    expect(backgroundOf(custom)).toContain('rgb(59, 130, 246)');
  });

  it('passes an extra className onto the wrapper', () => {
    const { container } = render(<GlowWrapper className="w-full">x</GlowWrapper>);
    expect(container.firstElementChild?.className).toContain('w-full');
  });
});

describe('ShinyText', () => {
  it('renders its text as a heading', () => {
    render(<ShinyText text="We Are The Universe" />);
    expect(
      screen.getByRole('heading', { name: 'We Are The Universe' }),
    ).toBeInTheDocument();
  });

  it('clips the gradient to the glyphs so the text is the gradient', () => {
    render(<ShinyText text="x" />);
    const heading = screen.getByRole('heading');
    expect(heading.style.backgroundSize).toContain('200%');
    expect(heading.style.webkitTextFillColor).toBe('transparent');
  });

  it('passes both classNames to their own elements', () => {
    const { container } = render(
      <ShinyText text="x" className="my-wrap" textClassName="my-text" />,
    );
    expect(container.firstElementChild?.className).toContain('my-wrap');
    expect(screen.getByRole('heading').className).toContain('my-text');
  });

  it('forwards a ref to the wrapping element', () => {
    let node: HTMLDivElement | null = null;
    render(<ShinyText text="x" ref={(el) => { node = el; }} />);
    expect(node).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads extra html attributes onto the wrapper', () => {
    render(<ShinyText text="x" data-testid="shiny" />);
    expect(screen.getByTestId('shiny')).toBeInTheDocument();
  });
});

describe('Meteors', () => {
  it('renders a default shower', () => {
    const { container } = render(<Meteors />);
    expect(container.querySelectorAll('span').length).toBeGreaterThan(0);
  });

  it('renders exactly the number of meteors asked for', () => {
    const { container } = render(<Meteors number={7} />);
    expect(container.querySelectorAll('span')).toHaveLength(7);
  });

  it('renders nothing for a count of zero', () => {
    const { container } = render(<Meteors number={0} />);
    expect(container.querySelectorAll('span')).toHaveLength(0);
  });
});

describe('BorderBeam', () => {
  it('renders a beam element', () => {
    const { container } = render(<BorderBeam />);
    expect(container.firstElementChild).not.toBeNull();
  });

  it('exposes its animation settings as css variables', () => {
    const { container } = render(<BorderBeam size={300} duration={5} delay={2} />);
    const beam = container.firstElementChild as HTMLElement;

    expect(beam.style.getPropertyValue('--size')).toBe('300');
    expect(beam.style.getPropertyValue('--duration')).toBe('5');
    expect(beam.style.getPropertyValue('--delay')).toBe('-2s');
  });

  it('falls back to its default beam colors', () => {
    const { container } = render(<BorderBeam />);
    const beam = container.firstElementChild as HTMLElement;

    expect(beam.style.getPropertyValue('--color-from')).toBe('#ffaa40');
    expect(beam.style.getPropertyValue('--color-to')).toBe('#9c40ff');
  });

  it('honors beam color overrides', () => {
    const { container } = render(
      <BorderBeam colorFrom="#00ff00" colorTo="#0000ff" />,
    );
    const beam = container.firstElementChild as HTMLElement;

    expect(beam.style.getPropertyValue('--color-from')).toBe('#00ff00');
    expect(beam.style.getPropertyValue('--color-to')).toBe('#0000ff');
  });
});
