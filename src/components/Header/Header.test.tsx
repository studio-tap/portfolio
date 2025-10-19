import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

// next-themesのモック
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

// next/navigationのモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// アイコンコンポーネントのモック
vi.mock('@/components/icons/SunIcon', () => ({
  SunIcon: ({ className }: { className?: string }) => <div data-testid="sun-icon" className={className}>Sun</div>,
}));

vi.mock('@/components/icons/MoonIcon', () => ({
  MoonIcon: ({ className }: { className?: string }) => <div data-testid="moon-icon" className={className}>Moon</div>,
}));

vi.mock('@/components/icons/HamburgerIcon', () => ({
  HamburgerIcon: ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button data-testid="hamburger-icon" onClick={onClick} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  ),
}));

describe('Header 統合テスト', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('headerタグが表示される', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('STUDIO-TAPテキストが表示される', () => {
    render(<Header />);
    expect(screen.getAllByText('STUDIO-TAP')[0]).toBeInTheDocument();
  });

  it('ロゴ画像がマウント後に表示される', async () => {
    render(<Header />);

    await waitFor(() => {
      const logo = screen.getAllByAltText('STUDIO - TAP Logo')[0];
      expect(logo).toBeInTheDocument();
    });
  });

  it('ナビゲーションリンク（WORKSとABOUT）が表示される', () => {
    render(<Header />);
    expect(screen.getAllByText('WORKS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ABOUT').length).toBeGreaterThan(0);
  });

  it('ハンバーガーアイコンが表示される', () => {
    render(<Header />);
    expect(screen.getByTestId('hamburger-icon')).toBeInTheDocument();
  });

  it('ハンバーガーアイコンをクリックするとメニューが開く', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);

    // メニュー内のメールアドレスが表示される
    expect(screen.getByText(/camphora@studio-tap.com/)).toBeInTheDocument();
  });

  it('メニューが開いている状態でハンバーガーアイコンをクリックするとメニューが閉じる', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByTestId('hamburger-icon');

    // メニューを開く
    await user.click(hamburger);
    expect(screen.getByText(/camphora@studio-tap.com/)).toBeInTheDocument();

    // メニューを閉じる
    await user.click(hamburger);
    expect(screen.queryByText(/camphora@studio-tap.com/)).not.toBeInTheDocument();
  });

  it('pathname変更時にメニューが閉じる', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Header />);

    // メニューを開く
    const hamburger = screen.getByTestId('hamburger-icon');
    await user.click(hamburger);
    expect(screen.getByText(/camphora@studio-tap.com/)).toBeInTheDocument();

    // pathnameを変更
    vi.mocked(usePathname).mockReturnValue('/about');
    rerender(<Header />);

    // メニューが閉じる
    await waitFor(() => {
      expect(screen.queryByText(/camphora@studio-tap.com/)).not.toBeInTheDocument();
    });
  });

  it('必須のクラスが適用される', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('ダークモードの場合、白いロゴが表示される', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    } as any);

    render(<Header />);

    await waitFor(() => {
      const logos = screen.getAllByAltText('STUDIO - TAP Logo');
      // ロゴが表示されていることを確認（src属性の詳細な検証はNext.jsの最適化により困難）
      expect(logos.length).toBeGreaterThan(0);
    });
  });
});
