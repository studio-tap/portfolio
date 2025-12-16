import { WorkCardMetaItem } from './WorkCardMetaItem';

import type { Role } from '@/lib/microcms';
import type { ReactElement } from 'react';

type Props = {
  roles?: Role[];
};

export const WorkCardRoles = ({ roles }: Props): ReactElement | null => {
  if (!roles || roles.length === 0) {
    return null;
  }

  return (
    <div>
      {roles.map((role) => (
        <WorkCardMetaItem key={role.id}>{role.name}</WorkCardMetaItem>
      ))}
    </div>
  );
};
