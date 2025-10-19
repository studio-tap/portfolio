import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkCardTechnologies } from './WorkCardTechnologies';

describe('WorkCardTechnologies', () => {
  const mockTechnologies = [
    { id: 'tech1', name: 'React' },
    { id: 'tech2', name: 'TypeScript' },
    { id: 'tech3', name: 'Next.js' },
  ];

  it('全ての技術名が表示される', () => {
    render(<WorkCardTechnologies technologies={mockTechnologies} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('technologiesが空配列の場合、何も表示されない', () => {
    const { container } = render(<WorkCardTechnologies technologies={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('複数の技術が正しい数だけレンダリングされる', () => {
    render(<WorkCardTechnologies technologies={mockTechnologies} />);
    const technologies = screen.getAllByText(/React|TypeScript|Next.js/);
    expect(technologies).toHaveLength(3);
  });

  it('各技術にliタグが使用される', () => {
    render(<WorkCardTechnologies technologies={mockTechnologies} />);
    const reactElement = screen.getByText('React');
    expect(reactElement.tagName).toBe('LI');
  });


});
