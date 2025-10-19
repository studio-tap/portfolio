import type { ReactElement } from 'react';
import type { Work } from '@/lib/microcms';
import { WorkCardCategory } from './WorkCard/WorkCardCategory';
import { WorkCardRoles } from './WorkCard/WorkCardRoles';
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
    <article className="border-2 border-foreground-light dark:border-foreground-dark p-6 sm:p-8 flex flex-col">
      {/* 上部セクション */}
      <div className="flex flex-col sp:flex-row justify-between gap-4">
        {/* 左側 */}
        <div className="flex-grow">
          <WorkCardCategory category={work.category} />
          <WorkCardTitle title={work.title} />
          <WorkCardRoles roles={work.roles} />
        </div>
        {/* 右側 */}
        <div className="flex-shrink-0 w-full sp:max-w-[7rem] lg:max-w-[12rem]">
          <WorkCardTechnologies technologies={work.technologies} />
        </div>
      </div>

      {/* 中部セクション */}
      <div className="mt-8 lg:mt-12 mb-4">
        <WorkCardThumbnail thumbnail={work.thumbnail} title={work.title} />
      </div>

      {/* 下部セクション */}
      <div className="flex-grow flex flex-col justify-end gap-4">
        <WorkCardDescription description={work.description} />
        <div className="text-right">
          <WorkCardLink url={work.url} />
        </div>
      </div>
    </article>
  );
};
