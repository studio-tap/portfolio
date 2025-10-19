import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('デフォルトでpタグ、body-normalスタイルとしてレンダリングされる', () => {
    render(<Typography>テストテキスト</Typography>);
    const element = screen.getByText('テストテキスト');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('text-s', 'leading-normal', 'tracking-tight');
  });

  it('asプロパティで指定したタグとしてレンダリングされる', () => {
    render(<Typography as="h1">見出し</Typography>);
    const element = screen.getByText('見出し');
    expect(element.tagName).toBe('H1');
  });

  it('variantに応じたクラスが適用される', () => {
    render(<Typography variant="header-nav">ナビゲーション</Typography>);
    const element = screen.getByText('ナビゲーション');
    expect(element).toHaveClass('text-xl', 'leading-none', 'tracking-tight');
  });

  it('classNameプロパティが正しく適用される', () => {
    render(<Typography className="custom-class">カスタムクラス</Typography>);
    const element = screen.getByText('カスタムクラス');
    expect(element).toHaveClass('custom-class');
  });

  it('追加のpropsが正しく渡される', () => {
    render(<Typography data-testid="test-typography">プロパティテスト</Typography>);
    const element = screen.getByTestId('test-typography');
    expect(element).toBeInTheDocument();
  });
});
