import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkCardLink } from './WorkCardLink';

describe('WorkCardLink', () => {
  it('urlがundefinedの場合、何も表示されない', () => {
    const { container } = render(<WorkCardLink url={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('urlがある場合、リンクが表示される', () => {
    render(<WorkCardLink url="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('VIEW SITEテキストが表示される', () => {
    render(<WorkCardLink url="https://example.com" />);
    expect(screen.getByText('VIEW SITE')).toBeInTheDocument();
  });

  it('href属性が正しく設定される', () => {
    render(<WorkCardLink url="https://example.com" />);
    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link.href).toBe('https://example.com/');
  });

  it('inline-blockクラスが適用される', () => {
    render(<WorkCardLink url="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('inline-block');
  });
});
