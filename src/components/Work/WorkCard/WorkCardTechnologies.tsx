import type { ReactElement } from 'react';
import type { Technology } from '@/lib/microcms';

type Props = {
  technologies: Technology[];
};

export const WorkCardTechnologies = ({ technologies }: Props): ReactElement | null => {
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg">使用技術:</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech) => (
          <li key={tech.id} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
            {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
