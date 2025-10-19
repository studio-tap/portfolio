import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkCardMetaItem } from './WorkCardMetaItem';

describe('WorkCardMetaItem', () => {
  it('デフォルトでpタグとしてレンダリングされる', () => {
    render(<WorkCardMetaItem>テストテキスト</WorkCardMetaItem>);
    const element = screen.getByText('テストテキスト');
    expect(element.tagName).toBe('P');
  });

  it('asプロパティでh2タグとしてレンダリングされる', () => {
    render(<WorkCardMetaItem as="h2">見出し</WorkCardMetaItem>);
    const element = screen.getByText('見出し');
    expect(element.tagName).toBe('H2');
  });

  it('必須のクラスが適用される', () => {
    render(<WorkCardMetaItem>メタ情報</WorkCardMetaItem>);
    const element = screen.getByText('メタ情報');
    expect(element).toHaveClass('border-b', 'border-foreground-light', 'dark:border-foreground-dark', 'mt-2');
  });

  it('追加のclassNameが適用される', () => {
    render(<WorkCardMetaItem className="font-bold">太字</WorkCardMetaItem>);
    const element = screen.getByText('太字');
    expect(element).toHaveClass('font-bold');
  });

  it('card-metaバリアントが適用される', () => {
    render(<WorkCardMetaItem>バリアント</WorkCardMetaItem>);
    const element = screen.getByText('バリアント');
    expect(element).toHaveClass('text-s', 'leading-normal', 'tracking-tight');
  });
});
