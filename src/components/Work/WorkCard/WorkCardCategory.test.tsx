import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkCardCategory } from './WorkCardCategory';

describe('WorkCardCategory', () => {
  const mockCategory = {
    id: 'cat1',
    name: 'Web Development',
  };

  it('カテゴリ名が表示される', () => {
    render(<WorkCardCategory category={mockCategory} />);
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('WorkCardMetaItemを使用している', () => {
    render(<WorkCardCategory category={mockCategory} />);
    const element = screen.getByText('Web Development');
    // WorkCardMetaItemのクラスが適用されているか確認
    expect(element).toHaveClass('border-b', 'mt-2');
  });
});
