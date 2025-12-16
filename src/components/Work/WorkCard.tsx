import { WorkCardCategory } from './WorkCard/WorkCardCategory';
import { WorkCardDescription } from './WorkCard/WorkCardDescription';
import { WorkCardLink } from './WorkCard/WorkCardLink';
import { WorkCardRoles } from './WorkCard/WorkCardRoles';
import { WorkCardTechnologies } from './WorkCard/WorkCardTechnologies';
import { WorkCardThumbnail } from './WorkCard/WorkCardThumbnail';
import { WorkCardTitle } from './WorkCard/WorkCardTitle';

import type { Work } from '@/lib/microcms';
import type { ReactElement } from 'react';

type Props = {
  work: Work;
};

export const WorkCard = ({ work }: Props): ReactElement => {
  return (
    <article className="flex flex-col border-2 border-foreground-light p-6 dark:border-foreground-dark sm:p-8">
      {/* 上部セクション */}
      <div className="flex flex-col justify-between gap-4 sp:flex-row">
        {/* 左側 */}
        <div className="flex-grow">
          <WorkCardCategory category={work.category} />
          <WorkCardTitle title={work.title} />
          <WorkCardRoles roles={work.roles} />
        </div>
        {/* 右側 */}
        <div className="w-full flex-shrink-0 sp:max-w-[7rem] lg:max-w-[12rem]">
          <WorkCardTechnologies technologies={work.technologies} />
        </div>
      </div>

      {/* 中部セクション */}
      <div className="mb-4 mt-8 lg:mt-12">
        <WorkCardThumbnail
          thumbnail={work.thumbnail}
          title={work.title}
        />
      </div>

      {/* 下部セクション */}
      <div className="flex flex-grow flex-col justify-end gap-4">
        <WorkCardDescription description={work.description} />
        <div className="text-right">
          <WorkCardLink url={work.url} />
        </div>
      </div>
    </article>
  );
};
