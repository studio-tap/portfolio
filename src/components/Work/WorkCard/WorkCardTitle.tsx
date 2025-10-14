import type { ReactElement } from 'react';
import { WorkCardMetaItem } from './WorkCardMetaItem';

type Props = {
  title: string;
};

export const WorkCardTitle = ({ title }: Props): ReactElement => {
  return (
    <WorkCardMetaItem as="h2" className="font-bold">
      {title}
    </WorkCardMetaItem>
  );
};
