import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNav } from './HeaderNav';
import { usePathname } from 'next/navigation';

// next/navigationのモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('HeaderNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('navタグが表示される', () => {
    const { container } = render(<HeaderNav />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('WORKSリンクが表示される', () => {
    render(<HeaderNav />);
    expect(screen.getByText('WORKS')).toBeInTheDocument();
  });

  it('ABOUTリンクが表示される', () => {
    render(<HeaderNav />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });

  it('isMobile=falseの場合、横並びのレイアウトになる', () => {
    const { container } = render(<HeaderNav isMobile={false} />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex', 'space-x-4');
    expect(ul).not.toHaveClass('flex-col');
  });

  it('isMobile=trueの場合、縦並びのレイアウトになる', () => {
    const { container } = render(<HeaderNav isMobile={true} />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex', 'flex-col', 'items-center', 'space-y-4');
  });

  it('デフォルト（isMobileなし）の場合、横並びのレイアウトになる', () => {
    const { container } = render(<HeaderNav />);
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex', 'space-x-4');
  });
});
