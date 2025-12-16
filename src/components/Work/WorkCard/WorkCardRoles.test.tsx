import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WorkCardRoles } from './WorkCardRoles';

describe('WorkCardRoles', () => {
  const mockRoles = [
    { id: 'role1', name: 'Design' },
    { id: 'role2', name: 'Frontend Development' },
    { id: 'role3', name: 'Backend Development' },
  ];

  it('全てのロールが表示される', () => {
    render(<WorkCardRoles roles={mockRoles} />);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
  });

  it('rolesがundefinedの場合、何も表示されない', () => {
    const { container } = render(<WorkCardRoles roles={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('rolesが空配列の場合、何も表示されない', () => {
    const { container } = render(<WorkCardRoles roles={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('複数のロールが正しい数だけレンダリングされる', () => {
    render(<WorkCardRoles roles={mockRoles} />);
    const roles = screen.getAllByText(/Design|Frontend Development|Backend Development/);
    expect(roles).toHaveLength(3);
  });
});
