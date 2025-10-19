import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkCardThumbnail } from './WorkCardThumbnail';

describe('WorkCardThumbnail', () => {
  const mockThumbnail = {
    url: 'https://example.com/image.jpg',
    width: 800,
    height: 600,
  };

  it('thumbnailがundefinedの場合、何も表示されない', () => {
    const { container } = render(<WorkCardThumbnail thumbnail={undefined} title="テストタイトル" />);
    expect(container.firstChild).toBeNull();
  });

  it('thumbnailがある場合、画像が表示される', () => {
    render(<WorkCardThumbnail thumbnail={mockThumbnail} title="テストタイトル" />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('altテキストが正しく設定される', () => {
    render(<WorkCardThumbnail thumbnail={mockThumbnail} title="ポートフォリオ" />);
    const image = screen.getByAltText('サムネイル_ポートフォリオ');
    expect(image).toBeInTheDocument();
  });

  it('必須のクラスが適用される', () => {
    render(<WorkCardThumbnail thumbnail={mockThumbnail} title="テスト" />);
    const image = screen.getByRole('img');
    expect(image).toHaveClass('object-cover', 'w-full', 'border-2', 'border-gray-300');
  });
});
