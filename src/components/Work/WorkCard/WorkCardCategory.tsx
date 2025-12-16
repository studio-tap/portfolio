import { WorkCardMetaItem } from './WorkCardMetaItem';

import type { Category } from '@/lib/microcms';
import type { ReactElement } from 'react';

type Props = {
  category: Category;
};

export const WorkCardCategory = ({ category }: Props): ReactElement => {
  return <WorkCardMetaItem>{category.name}</WorkCardMetaItem>;
};
