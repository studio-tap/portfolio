import type { Technology } from '@/lib/microcms';
import type { ReactElement } from 'react';

import { Typography } from '@/components/Typography/Typography';

type Props = {
  technologies: Technology[];
};

export const WorkCardTechnologies = ({ technologies }: Props): ReactElement | null => {
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap justify-end gap-2">
      {technologies.map((tech) => (
        <Typography
          key={tech.id}
          as="li"
          className="rounded-full bg-gray-200 p-2 dark:bg-gray-700"
          variant="card-technology"
        >
          {tech.name}
        </Typography>
      ))}
    </ul>
  );
};
