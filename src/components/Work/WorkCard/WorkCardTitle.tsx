import type { ReactElement } from 'react';

type Props = {
  title: string;
};

export const WorkCardTitle = ({ title }: Props): ReactElement => {
  return <h2 className="text-2xl font-bold mb-2">{title}</h2>;
};
