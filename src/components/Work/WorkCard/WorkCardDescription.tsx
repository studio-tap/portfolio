import type { ReactElement } from 'react';

type Props = {
  description?: string;
};

export const WorkCardDescription = ({ description }: Props): ReactElement | null => {
  if (!description) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className="prose dark:prose-invert"
    />
  );
};