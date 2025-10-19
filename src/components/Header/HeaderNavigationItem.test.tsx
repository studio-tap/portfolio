import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNavigationItem } from './HeaderNavigationItem';
import { usePathname } from 'next/navigation';

// next/navigationのモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('HeaderNavigationItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('リンクテキストが表示される', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    expect(screen.getByText('WORKS')).toBeInTheDocument();
  });

  it('hrefが正しく設定される', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('現在のページの場合、font-boldクラスが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('font-bold');
  });

  it('現在のページの場合、pointer-events-noneクラスが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('pointer-events-none');
  });

  it('現在のページの場合、aria-disabledがtrueになる', () => {
    vi.mocked(usePathname).mockReturnValue('/');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('他のページの場合、font-mediumとhover-opacity-strongクラスが適用される', () => {
    vi.mocked(usePathname).mockReturnValue('/about');

    render(<HeaderNavigationItem href="/" text="WORKS" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('font-medium', 'hover-opacity-strong');
  });
});
