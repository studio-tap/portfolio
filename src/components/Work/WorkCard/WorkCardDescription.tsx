import type { ReactElement } from 'react';
import parse from 'html-react-parser';

type Props = {
  description?: string;
};

export const WorkCardDescription = ({ description }: Props): ReactElement | null => {
  if (!description) {
    return null;
  }

  return (
    <div className="prose dark:prose-invert">
      {parse(description)}
    </div>
  );
};