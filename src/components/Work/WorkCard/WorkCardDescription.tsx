import type { ReactElement } from 'react';

type Props = {
  description: string;
};

export const WorkCardDescription = ({ description }: Props): ReactElement => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className="prose mt-4"
    />
  );
};
