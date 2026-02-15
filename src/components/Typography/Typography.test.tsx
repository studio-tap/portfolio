import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Typography } from './Typography';

describe('Typography', () => {
  // テスト1: デフォルト動作
  it('デフォルトでp要素として描画される', () => {
    render(<Typography>テストテキスト</Typography>);

    const element = screen.getByText('テストテキスト');
    expect(element.tagName).toBe('P');
  });

  // テスト2: デフォルトのバリアント
  it('デフォルトでbody-normalバリアントが適用される', () => {
    render(<Typography>テストテキスト</Typography>);

    const element = screen.getByText('テストテキスト');
    expect(element).toHaveClass('text-s', 'leading-normal', 'tracking-tight');
  });

  // テスト3: as propのテスト
  it('as propで指定した要素として描画される', () => {
    render(<Typography as="h1">見出し</Typography>);

    const element = screen.getByText('見出し');
    expect(element.tagName).toBe('H1');
  });

  // テスト4: variantのテスト
  it('variant propで指定したスタイルが適用される', () => {
    render(<Typography variant="header-nav">ナビゲーション</Typography>);

    const element = screen.getByText('ナビゲーション');
    expect(element).toHaveClass('text-xl', 'leading-none', 'tracking-tight');
  });

  // テスト5: classNameのテスト
  it('className propで追加のクラスが適用される', () => {
    render(<Typography className="custom-class">テキスト</Typography>);

    const element = screen.getByText('テキスト');
    expect(element).toHaveClass('text-s', 'leading-normal', 'tracking-tight', 'custom-class');
  });

  // テスト6: 複数のpropsの組み合わせ
  it('複数のpropsを組み合わせて使用できる', () => {
    render(
      <Typography
        as="span"
        variant="card-meta"
        className="text-red-500"
      >
        カスタムテキスト
      </Typography>
    );

    const element = screen.getByText('カスタムテキスト');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('text-s', 'leading-normal', 'tracking-tight', 'text-red-500');
  });

  // テスト7: ネイティブpropsのテスト（button要素）
  it('button要素としてネイティブpropsが動作する', () => {
    const handleClick = vi.fn();

    render(
      <Typography
        as="button"
        onClick={handleClick}
      >
        ボタン
      </Typography>
    );

    const button = screen.getByRole('button', { name: 'ボタン' });
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // テスト8: ネイティブpropsのテスト（a要素）
  it('a要素としてネイティブpropsが動作する', () => {
    render(
      <Typography
        as="a"
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        リンク
      </Typography>
    );

    const link = screen.getByRole('link', { name: 'リンク' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // テスト9: 全バリアントのテスト
  it('すべてのバリアントが正しく適用される', () => {
    const variants = [
      { variant: 'body-normal', classes: ['text-s', 'leading-normal', 'tracking-tight'] },
      { variant: 'header-nav', classes: ['text-xl', 'leading-none', 'tracking-tight'] },
      { variant: 'logo-text', classes: ['text-s', 'leading-none', 'tracking-none'] },
      { variant: 'about-title', classes: ['text-m', 'leading-loose', 'tracking-tight'] },
      { variant: 'card-meta', classes: ['text-s', 'leading-normal', 'tracking-tight'] },
      { variant: 'card-technology', classes: ['text-xs', 'leading-none', 'tracking-none'] },
    ] as const;

    variants.forEach(({ variant, classes }) => {
      const { container } = render(
        <Typography variant={variant}>{variant}</Typography>
      );

      const element = screen.getByText(variant);
      classes.forEach((className) => {
        expect(element).toHaveClass(className);
      });

      container.remove();
    });
  });
});
