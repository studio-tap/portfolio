import { WorkCardMetaItem } from './WorkCardMetaItem';

import type { ReactElement } from 'react';

type Props = {
  title: string;
};

export const WorkCardTitle = ({ title }: Props): ReactElement => {
  return (
    <WorkCardMetaItem
      as="h2"
      className="font-bold"
    >
      {title}
    </WorkCardMetaItem>
  );
};
