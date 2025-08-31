import type { ReactElement } from 'react';

type Props = {
  url?: string;
};

export const WorkCardLink = ({ url }: Props): ReactElement | null => {
  if (!url) {
    return null;
  }

  return (
    <div className="mt-4">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        サイトを見る
      </a>
    </div>
  );
};
