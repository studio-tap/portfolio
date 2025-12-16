import type { Work } from '@/lib/microcms';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkCard } from './WorkCard';

describe('WorkCard 統合テスト', () => {
  const mockWork: Work = {
    id: 'work1',
    title: 'ポートフォリオサイト',
    description: '<p>これはテストの<strong>説明文</strong>です。</p>',
    thumbnail: {
      url: 'https://example.com/thumbnail.jpg',
      width: 800,
      height: 600,
    },
    url: 'https://example.com',
    category: {
      id: 'cat1',
      name: 'Web Development',
    },
    roles: [
      { id: 'role1', name: 'Design' },
      { id: 'role2', name: 'Frontend Development' },
    ],
    technologies: [
      { id: 'tech1', name: 'React' },
      { id: 'tech2', name: 'TypeScript' },
    ],
    order: 1,
    publishedAt: '2024-01-01',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    revisedAt: '2024-01-01',
  };

  it('全ての情報が正しく表示される', () => {
    render(<WorkCard work={mockWork} />);

    // カテゴリ
    expect(screen.getByText('Web Development')).toBeInTheDocument();

    // タイトル
    expect(screen.getByText('ポートフォリオサイト')).toBeInTheDocument();

    // ロール
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();

    // 技術
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // サムネイル
    expect(screen.getByAltText('サムネイル_ポートフォリオサイト')).toBeInTheDocument();

    // 説明文
    expect(screen.getByText('説明文')).toBeInTheDocument();

    // リンク
    expect(screen.getByText('VIEW SITE')).toBeInTheDocument();
  });

  it('オプショナルな項目がない場合でもエラーにならない', () => {
    const minimalWork: Work = {
      ...mockWork,
      description: undefined,
      thumbnail: undefined,
      url: undefined,
      roles: [],
    };

    const { container } = render(<WorkCard work={minimalWork} />);

    // カテゴリとタイトルは必須なので表示される
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('ポートフォリオサイト')).toBeInTheDocument();

    // 技術は表示される
    expect(screen.getByText('React')).toBeInTheDocument();

    // 説明文、サムネイル、リンクは表示されない
    expect(screen.queryByText('VIEW SITE')).not.toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('articleタグとしてレンダリングされる', () => {
    const { container } = render(<WorkCard work={mockWork} />);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('必須のクラスが適用される', () => {
    const { container } = render(<WorkCard work={mockWork} />);
    const article = container.querySelector('article');
    expect(article).toHaveClass(
      'border-2',
      'border-foreground-light',
      'dark:border-foreground-dark',
      'p-6',
      'sm:p-8',
      'flex',
      'flex-col'
    );
  });

  it('レスポンシブレイアウトのクラスが適用される', () => {
    const { container } = render(<WorkCard work={mockWork} />);
    const layoutDiv = container.querySelector('.flex.flex-col.sp\\:flex-row');
    expect(layoutDiv).toBeInTheDocument();
  });
});
