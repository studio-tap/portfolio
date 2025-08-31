import type { ReactElement } from 'react';
import type { Work } from '@/lib/microcms';
import { WorkCardTitle } from './WorkCard/WorkCardTitle';
import { WorkCardThumbnail } from './WorkCard/WorkCardThumbnail';
import { WorkCardDescription } from './WorkCard/WorkCardDescription';
import { WorkCardTechnologies } from './WorkCard/WorkCardTechnologies';
import { WorkCardLink } from './WorkCard/WorkCardLink';

type Props = {
  work: Work;
};

export const WorkCard = ({ work }: Props): ReactElement => {
  return (
    <article className="border rounded-lg p-4 shadow-md flex flex-col h-full">
      <WorkCardTitle title={work.title} />
      <WorkCardThumbnail thumbnail={work.thumbnail} title={work.title} />
      <div className="flex-grow">
        <WorkCardDescription description={work.description} />
      </div>
      <WorkCardTechnologies technologies={work.technologies} />
      <WorkCardLink url={work.url} />
    </article>
  );
};