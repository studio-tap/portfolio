import type { ReactElement } from 'react';
import type { Technology } from '@/lib/microcms';
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
          as="li"
          key={tech.id}
          variant="card-technology"
          className="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
        >
          {tech.name}
        </Typography>
      ))}
    </ul>
  );
};
