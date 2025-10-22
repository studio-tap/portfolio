import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNav } from './HeaderNav';

// HeaderNavigationItemのモック
vi.mock('./HeaderNavigationItem', () => ({
  HeaderNavigationItem: ({ href, text }: { href: string; text: string }) => (
    <li data-testid={`nav-item-${href}`}>
      <a href={href}>{text}</a>
    </li>
  ),
}));

describe('HeaderNav', () => {
  it('nav要素がレンダリングされる', () => {
    const { container } = render(<HeaderNav />);

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('ul要素がレンダリングされる', () => {
    const { container } = render(<HeaderNav />);

    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('WORKS ナビゲーションアイテムが表示される', () => {
    render(<HeaderNav />);

    expect(screen.getByText('WORKS')).toBeInTheDocument();
  });

  it('ABOUT ナビゲーションアイテムが表示される', () => {
    render(<HeaderNav />);

    expect(screen.getByText('ABOUT')).toBeInTheDocument();
  });

  it('WORKS アイテムが正しいhrefでレンダリングされる', () => {
    render(<HeaderNav />);

    const worksItem = screen.getByTestId('nav-item-/');
    expect(worksItem).toBeInTheDocument();
  });

  it('ABOUT アイテムが正しいhrefでレンダリングされる', () => {
    render(<HeaderNav />);

    const aboutItem = screen.getByTestId('nav-item-/about');
    expect(aboutItem).toBeInTheDocument();
  });

  it('isMobile=falseの場合は横並びのスタイルが適用される', () => {
    const { container } = render(<HeaderNav isMobile={false} />);

    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex');
    expect(ul).toHaveClass('space-x-4');
    expect(ul).not.toHaveClass('flex-col');
    expect(ul).not.toHaveClass('space-y-4');
  });

  it('isMobile=trueの場合は縦並びのスタイルが適用される', () => {
    const { container } = render(<HeaderNav isMobile={true} />);

    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex');
    expect(ul).toHaveClass('flex-col');
    expect(ul).toHaveClass('items-center');
    expect(ul).toHaveClass('space-y-4');
  });

  it('デフォルトではisMobile=falseとして扱われる', () => {
    const { container } = render(<HeaderNav />);

    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('flex');
    expect(ul).toHaveClass('space-x-4');
  });

  it('正しい数のナビゲーションアイテムがレンダリングされる', () => {
    const { container } = render(<HeaderNav />);

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
  });
});
