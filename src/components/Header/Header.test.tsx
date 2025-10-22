import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { usePathname } from 'next/navigation';

// next/navigationのモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// 子コンポーネントのモック
vi.mock('./ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

vi.mock('./HeaderNav', () => ({
  HeaderNav: ({ isMobile }: { isMobile?: boolean }) => (
    <div data-testid={isMobile ? 'header-nav-mobile' : 'header-nav-pc'}>HeaderNav</div>
  ),
}));

vi.mock('@/components/icons/HamburgerIcon', () => ({
  HamburgerIcon: ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button data-testid="hamburger-icon" onClick={onClick} aria-label="メニュー">
      {isOpen ? 'Close' : 'Open'}
    </button>
  ),
}));

vi.mock('@/components/Typography/Typography', () => ({
  Typography: ({ children, as: Component = 'span', href, className }: any) => {
    if (Component === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (Component === 'p') {
      return <p className={className}>{children}</p>;
    }
    if (Component === 'a' || (Component as any)?.name === 'Link') {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    }
    return <Component className={className}>{children}</Component>;
  },
}));

vi.mock('@/components/Link/BaseLink', () => ({
  BaseLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="base-link">
      {children}
    </a>
  ),
}));

vi.mock('@/components/Link/ExternalLink', () => ({
  ExternalLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="external-link" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
}));

// next/imageのモック
vi.mock('next/image', () => ({
  default: ({ src, alt, priority, fetchPriority, ...rest }: any) => {
    const imgSrc = typeof src === 'object' && src?.src ? src.src : src;
    return <img src={imgSrc} alt={alt} {...rest} />;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('header要素がレンダリングされる', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('サイト名（STUDIO-TAP）が表示される', () => {
    render(<Header />);

    const siteNames = screen.getAllByText('STUDIO-TAP');
    expect(siteNames.length).toBeGreaterThan(0);
  });

  it('ホームへのリンクが設定される', () => {
    render(<Header />);

    const links = screen.getAllByRole('link');
    const homeLink = links.find((link) => link.getAttribute('href') === '/');
    expect(homeLink).toBeInTheDocument();
  });

  it('ロゴ画像が複数レンダリングされる', () => {
    const { container } = render(<Header />);

    const images = container.querySelectorAll('img');
    // ヘッダー内のロゴ2枚（aria-hidden含む）
    // モバイルメニューは閉じているのでDOMに存在しない
    expect(images.length).toBe(2);
  });

  it('ロゴのaltが正しく設定される', () => {
    const { container } = render(<Header />);

    const images = container.querySelectorAll('img');
    const logoWithAlt = Array.from(images).find((img) => img.getAttribute('alt') === 'STUDIO - TAP Logo');
    const logoWithoutAlt = Array.from(images).find((img) => img.getAttribute('alt') === '');

    expect(logoWithAlt).toBeInTheDocument();
    expect(logoWithoutAlt).toBeInTheDocument();
  });

  it('PCナビゲーションが表示される', () => {
    render(<Header />);

    expect(screen.getByTestId('header-nav-pc')).toBeInTheDocument();
  });

  it('ThemeSwitcherが表示される', () => {
    render(<Header />);

    const themeSwitchers = screen.getAllByTestId('theme-switcher');
    expect(themeSwitchers.length).toBeGreaterThan(0);
  });

  it('ハンバーガーアイコンが表示される', () => {
    render(<Header />);

    expect(screen.getByTestId('hamburger-icon')).toBeInTheDocument();
  });

  it('初期状態ではモバイルメニューが表示されない', () => {
    render(<Header />);

    expect(screen.queryByTestId('header-nav-mobile')).not.toBeInTheDocument();
  });

  it('ハンバーガーアイコンをクリックするとモバイルメニューが表示される', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);

    expect(screen.getByTestId('header-nav-mobile')).toBeInTheDocument();
  });

  it('モバイルメニュー内にメールアドレスが表示される', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);

    expect(screen.getByText(/camphora@studio-tap.com/)).toBeInTheDocument();
  });

  it('モバイルメニュー内にフォームリンクが表示される', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);

    expect(screen.getByText('Google Form')).toBeInTheDocument();
  });

  it('モバイルメニュー内にThemeSwitcherが表示される', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);

    const themeSwitchers = screen.getAllByTestId('theme-switcher');
    // PC用 + モバイル用 = 2つ
    expect(themeSwitchers.length).toBe(2);
  });

  it('ハンバーガーアイコンを再度クリックするとモバイルメニューが閉じる', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');

    // メニューを開く
    await user.click(hamburger);
    expect(screen.getByTestId('header-nav-mobile')).toBeInTheDocument();

    // メニューを閉じる
    await user.click(hamburger);
    expect(screen.queryByTestId('header-nav-mobile')).not.toBeInTheDocument();
  });

  it('pathname変更時にモバイルメニューが閉じる', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Header />);

    // メニューを開く
    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);
    expect(screen.getByTestId('header-nav-mobile')).toBeInTheDocument();

    // pathnameを変更
    vi.mocked(usePathname).mockReturnValue('/about');
    rerender(<Header />);

    // メニューが閉じる
    expect(screen.queryByTestId('header-nav-mobile')).not.toBeInTheDocument();
  });

  it('aria-hiddenがダークモード用ロゴに適用される', () => {
    const { container } = render(<Header />);

    const images = container.querySelectorAll('img');
    const hiddenLogo = Array.from(images).find((img) => img.getAttribute('aria-hidden') === 'true');
    expect(hiddenLogo).toBeInTheDocument();
  });
});
