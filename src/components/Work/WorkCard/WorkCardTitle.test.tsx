import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkCardTitle } from './WorkCardTitle';

describe('WorkCardTitle', () => {
  it('タイトルが表示される', () => {
    render(<WorkCardTitle title="ポートフォリオサイト" />);
    expect(screen.getByText('ポートフォリオサイト')).toBeInTheDocument();
  });

  it('h2タグとしてレンダリングされる', () => {
    render(<WorkCardTitle title="見出し" />);
    const element = screen.getByText('見出し');
    expect(element.tagName).toBe('H2');
  });

  it('太字クラスが適用される', () => {
    render(<WorkCardTitle title="太字タイトル" />);
    const element = screen.getByText('太字タイトル');
    expect(element).toHaveClass('font-bold');
  });
});
