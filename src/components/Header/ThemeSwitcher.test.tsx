import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from 'next-themes';

// next-themesのモック
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

// アイコンコンポーネントのモック
vi.mock('@/components/icons/SunIcon', () => ({
  SunIcon: ({ className }: { className?: string }) => (
    <div data-testid="sun-icon" className={className}>
      Sun
    </div>
  ),
}));

vi.mock('@/components/icons/MoonIcon', () => ({
  MoonIcon: ({ className }: { className?: string }) => (
    <div data-testid="moon-icon" className={className}>
      Moon
    </div>
  ),
}));

describe('ThemeSwitcher', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('SunIconとMoonIconが表示される', () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('ToggleSwitchが表示される', () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('初期レンダリング時はトグルが無効化されている', () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('マウント後はトグルが有効化される', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });
  });

  it('aria-labelが適用される', () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'ダークモード切り替え');
  });

  it('ライトモードのときトグルがオフになっている', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    render(<ThemeSwitcher />);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  it('ダークモードのときトグルがオンになっている', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    } as any);

    render(<ThemeSwitcher />);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  it('resolvedThemeがundefinedのときトグルがオフになっている', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: undefined,
    } as any);

    render(<ThemeSwitcher />);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  it('トグルをオンにするとsetThemeがdarkで呼ばれる', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    } as any);

    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    // トグルが有効化されるまで待つ
    await waitFor(() => {
      expect(screen.getByRole('checkbox')).not.toBeDisabled();
    });

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it('トグルをオフにするとsetThemeがlightで呼ばれる', async () => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    } as any);

    const user = userEvent.setup();
    render(<ThemeSwitcher />);

    // トグルが有効化されるまで待つ
    await waitFor(() => {
      expect(screen.getByRole('checkbox')).not.toBeDisabled();
    });

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });
});
