import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkCardDescription } from './WorkCardDescription';

describe('WorkCardDescription', () => {
  it('descriptionがundefinedの場合、何も表示されない', () => {
    const { container } = render(<WorkCardDescription description={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('descriptionが空文字列の場合、何も表示されない', () => {
    const { container } = render(<WorkCardDescription description="" />);
    expect(container.firstChild).toBeNull();
  });

  it('descriptionが表示される', () => {
    const description = 'これはテストの説明文です。';
    render(<WorkCardDescription description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('HTMLがパースされて表示される', () => {
    const description = '<p>これは<strong>太字</strong>のテキストです。</p>';
    render(<WorkCardDescription description={description} />);
    expect(screen.getByText('太字')).toBeInTheDocument();
    const strongElement = screen.getByText('太字');
    expect(strongElement.tagName).toBe('STRONG');
  });

  it('proseクラスが適用される', () => {
    const description = 'テスト';
    const { container } = render(<WorkCardDescription description={description} />);
    const divElement = container.firstChild as HTMLElement;
    expect(divElement).toHaveClass('prose', 'dark:prose-invert');
  });
});
