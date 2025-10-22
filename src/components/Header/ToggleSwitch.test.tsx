import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch', () => {
  it('チェックボックスがレンダリングされる', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('checked=trueのときチェックボックスがオンになる', () => {
    render(<ToggleSwitch checked={true} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('checked=falseのときチェックボックスがオフになる', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('クリック時にonChangeが正しい値で呼ばれる（オフ→オン）', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<ToggleSwitch checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('クリック時にonChangeが正しい値で呼ばれる（オン→オフ）', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<ToggleSwitch checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(false);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('labelが渡されたとき表示される', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} label="テストラベル" />);

    expect(screen.getByText('テストラベル')).toBeInTheDocument();
  });

  it('labelがない場合にaria-labelが適用される', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} ariaLabel="トグルスイッチ" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'トグルスイッチ');
  });

  it('labelがある場合はaria-labelが適用されない', () => {
    render(
      <ToggleSwitch
        checked={false}
        onChange={vi.fn()}
        label="テストラベル"
        ariaLabel="トグルスイッチ"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toHaveAttribute('aria-label');
  });

  it('disabled=trueのとき無効化される', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} disabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('disabled=trueのときクリックしてもonChangeが呼ばれない', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<ToggleSwitch checked={false} onChange={handleChange} disabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disabled=falseのとき有効化される', () => {
    render(<ToggleSwitch checked={false} onChange={vi.fn()} disabled={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeDisabled();
  });

  it('classNameが適用される', () => {
    const { container } = render(
      <ToggleSwitch checked={false} onChange={vi.fn()} className="custom-class" />
    );

    const label = container.querySelector('label');
    expect(label).toHaveClass('custom-class');
  });
});
