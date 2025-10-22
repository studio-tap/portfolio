import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNavigationItem } from './HeaderNavigationItem';
import { usePathname } from 'next/navigation';

// next/navigationのモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Typographyコンポーネントのモック
vi.mock('@/components/Typography/Typography', () => ({
  Typography: ({ children, as: Component = 'span', href, className, 'aria-disabled': ariaDisabled }: any) => {
    if (Component === 'a' || (Component as any)?.name === 'Link') {
      return (
        <a href={href} className={className} aria-disabled={ariaDisabled}>
          {children}
        </a>
      );
    }
    return (
      <Component className={className} aria-disabled={ariaDisabled}>
        {children}
      </Component>
    );
  },
}));

describe('HeaderNavigationItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('リンクがレンダリングされる', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('textが表示される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/about" text="About" />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('hrefが正しく適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('現在のパスと一致する場合はアクティブスタイルが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link.className).toContain('font-bold');
    expect(link.className).toContain('pointer-events-none');
  });

  it('現在のパスと一致しない場合は通常スタイルが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link.className).toContain('font-light');
    expect(link.className).toContain('hover-opacity-strong');
  });

  it('アクティブ時にaria-disabled=trueが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('非アクティブ時にaria-disabled=falseが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/about" text="About" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'false');
  });

  it('リスト要素内にレンダリングされる', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    const { container } = render(<HeaderNavigationItem href="/about" text="About" />);

    const listItem = container.querySelector('li');
    expect(listItem).toBeInTheDocument();
  });
});
