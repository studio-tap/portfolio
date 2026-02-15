import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconBase } from './IconBase';

describe('IconBase', () => {
  // テスト1: デフォルト動作
  it('デフォルトでspan要素として描画される', () => {
    render(<IconBase>🌙</IconBase>);

    const element = screen.getByText('🌙');
    expect(element.tagName).toBe('SPAN');
  });

  // テスト2: デフォルトのサイズ
  it('デフォルトでtext-mサイズが適用される', () => {
    render(<IconBase>🌙</IconBase>);

    const element = screen.getByText('🌙');
    expect(element).toHaveClass('text-m', 'leading-none');
  });

  // テスト3: カスタムサイズ
  it('size propで指定したサイズが適用される', () => {
    render(<IconBase size="text-xl">🌙</IconBase>);

    const element = screen.getByText('🌙');
    expect(element).toHaveClass('text-xl', 'leading-none');
  });

  // テスト4: カスタムクラス
  it('className propで追加のクラスが適用される', () => {
    render(<IconBase className="text-red-500">🌙</IconBase>);

    const element = screen.getByText('🌙');
    expect(element).toHaveClass('text-m', 'leading-none', 'text-red-500');
  });

  // テスト5: 複数のpropsの組み合わせ
  it('複数のpropsを組み合わせて使用できる', () => {
    render(
      <IconBase
        className="text-blue-500"
        size="text-2xl"
      >
        ☀️
      </IconBase>
    );

    const element = screen.getByText('☀️');
    expect(element).toHaveClass('text-2xl', 'leading-none', 'text-blue-500');
  });

  // テスト6: 子要素の表示
  it('children propで渡された内容が表示される', () => {
    render(<IconBase>テストアイコン</IconBase>);

    expect(screen.getByText('テストアイコン')).toBeInTheDocument();
  });

  // テスト7: 複雑な子要素
  it('複雑な子要素も正しく表示される', () => {
    render(
      <IconBase>
        <span>アイコン1</span>
        <span>アイコン2</span>
      </IconBase>
    );

    expect(screen.getByText('アイコン1')).toBeInTheDocument();
    expect(screen.getByText('アイコン2')).toBeInTheDocument();
  });

  // テスト8: leading-noneが常に適用される
  it('leading-noneクラスが常に適用される', () => {
    const { rerender } = render(<IconBase>🌙</IconBase>);
    expect(screen.getByText('🌙')).toHaveClass('leading-none');

    rerender(<IconBase size="text-xl">🌙</IconBase>);
    expect(screen.getByText('🌙')).toHaveClass('leading-none');

    rerender(
      <IconBase
        className="custom-class"
        size="text-2xl"
      >
        🌙
      </IconBase>
    );
    expect(screen.getByText('🌙')).toHaveClass('leading-none');
  });

  // テスト9: 各サイズの動作確認
  it('様々なサイズが正しく適用される', () => {
    const sizes = ['text-xs', 'text-s', 'text-m', 'text-xl', 'text-2xl'];

    sizes.forEach((size) => {
      const { container } = render(<IconBase size={size}>{size}</IconBase>);

      const element = screen.getByText(size);
      expect(element).toHaveClass(size, 'leading-none');

      container.remove();
    });
  });
});
