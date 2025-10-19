import type { ReactElement } from 'react';
import type { Role } from '@/lib/microcms';
import { WorkCardMetaItem } from './WorkCardMetaItem';

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
        <WorkCardMetaItem key={role.id} className='font-light'>
          {role.name}
        </WorkCardMetaItem>
      ))}
    </div>
  );
};
