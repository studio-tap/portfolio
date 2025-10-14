import type { ReactElement } from 'react';
import type { Category } from '@/lib/microcms';
import { WorkCardMetaItem } from './WorkCardMetaItem';

type Props = {
  category: Category;
};

export const WorkCardCategory = ({ category }: Props): ReactElement => {
  return <WorkCardMetaItem>{category.name}</WorkCardMetaItem>;
};